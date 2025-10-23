"use client";

import React from "react";
import { createPortal } from "react-dom";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

export type ScrollIdleHintOverlaySize = "xs" | "sm" | "m" | "lg" | "xl";

export type ScrollIdleHintOverlayProps = {
    children: React.ReactNode;
    delaysMs?: number[];
    targetRef?: React.RefObject<HTMLElement>;
    title?: string;
    className?: string;
    idleGraceMs?: number;
    /** Tamaño visual de la notificación */
    size?: ScrollIdleHintOverlaySize;
    /** Forzar supresión (por ejemplo si tu modal system lo sabe). */
    isModalOpen?: boolean;
    endTolerancePx?: number;
    showAgainOffsetPx?: number;
    /** Suprime mientras este elemento esté visible en viewport (sección específica). */
    suppressWhenInViewRef?: React.RefObject<HTMLElement>;
};

export default function ScrollIdleHintOverlay({
                                                  children,
                                                  delaysMs = [6000],
                                                  targetRef,
                                                  title,
                                                  className = "",
                                                  idleGraceMs = 400,
                                                  size = "m",
                                                  isModalOpen,
                                                  endTolerancePx = 8,
                                                  showAgainOffsetPx = 64,
                                                  suppressWhenInViewRef,
                                              }: ScrollIdleHintOverlayProps) {
    const [visible, setVisible] = React.useState(false);
    const [isTouch, setIsTouch] = React.useState(false);
    const [suppressed, setSuppressed] = React.useState(false);

    const delayIndexRef = React.useRef(0);
    const idleTimerRef = React.useRef<number | null>(null);
    const suppressTimerRef = React.useRef<number | null>(null);
    const lastPosRef = React.useRef(0);
    const lastActivityTsRef = React.useRef<number>(Date.now());

    const endSuppressedRef = React.useRef(false);
    const endSuppressedAtYRef = React.useRef(0);

    const bodyReady = typeof document !== "undefined";
    const getTarget = React.useCallback(() => targetRef?.current ?? null, [targetRef]);

    // --- Tamaños por prop
    const sizeConfig: Record<
        ScrollIdleHintOverlaySize,
        { lottie: string; padding: string; text: string }
    > = {
        xs: { lottie: "h-20 w-20", padding: "px-2 py-1", text: "text-xs" },
        sm: { lottie: "h-28 w-28", padding: "px-3 py-2", text: "text-sm" },
        m: { lottie: "h-36 w-36", padding: "px-4 py-3", text: "text-base" },
        lg: { lottie: "h-44 w-44", padding: "px-5 py-4", text: "text-lg" },
        xl: { lottie: "h-56 w-56", padding: "px-6 py-5", text: "text-xl" },
    };
    const cfg = sizeConfig[size];

    const getScrollPos = React.useCallback(() => {
        const el = getTarget();
        if (el) return typeof el.scrollTop === "number" ? el.scrollTop : 0;
        if (typeof window !== "undefined") {
            const winY = window.scrollY ?? 0;
            const docY =
                document?.documentElement?.scrollTop ?? document?.body?.scrollTop ?? 0;
            return Math.max(winY, docY);
        }
        return 0;
    }, [getTarget]);

    const getScrollMax = React.useCallback(() => {
        const el = getTarget();
        if (el) return el.scrollHeight - el.clientHeight;
        if (typeof document !== "undefined") {
            const d = document.documentElement;
            const b = document.body;
            const scrollHeight = Math.max(
                d?.scrollHeight ?? 0,
                b?.scrollHeight ?? 0,
                d?.offsetHeight ?? 0,
                b?.offsetHeight ?? 0,
                d?.clientHeight ?? 0
            );
            const clientHeight = d?.clientHeight ?? window.innerHeight ?? 0;
            return Math.max(0, scrollHeight - clientHeight);
        }
        return 0;
    }, [getTarget]);

    const updateEndSuppression = React.useCallback(
        (endTol: number, upOffset: number) => {
            const y = getScrollPos();
            const max = getScrollMax();
            if (!endSuppressedRef.current && max - y <= endTol) {
                endSuppressedRef.current = true;
                endSuppressedAtYRef.current = y;
            }
            if (endSuppressedRef.current) {
                const requiredUp = endSuppressedAtYRef.current - upOffset;
                if (y <= requiredUp) endSuppressedRef.current = false;
            }
        },
        [getScrollPos, getScrollMax]
    );

    const detectModalOpen = React.useCallback(() => {
        if (typeof window === "undefined") return false;
        if (isModalOpen === true) return true;
        if (isModalOpen === false) return false;
        const bodyHidden =
            window.getComputedStyle(document.body).overflow === "hidden" ||
            document.body.style.overflow === "hidden";
        const ariaModal = !!document.querySelector('[aria-modal="true"]');
        return bodyHidden || ariaModal;
    }, [isModalOpen]);

    const computeSuppressed = React.useCallback(() => {
        updateEndSuppression(endTolerancePx, showAgainOffsetPx);
        let inViewSuppressed = false;
        if (suppressWhenInViewRef?.current && typeof window !== "undefined") {
            const el = suppressWhenInViewRef.current;
            const r = el.getBoundingClientRect();
            const vh = window.innerHeight || document.documentElement.clientHeight || 0;
            const vw = window.innerWidth || document.documentElement.clientWidth || 0;
            if (vw > 0 && vh > 0) {
                const verticallyIn = r.top < vh && r.bottom > 0;
                const horizontallyIn = r.left < vw && r.right > 0;
                inViewSuppressed = verticallyIn && horizontallyIn;
            }
        }
        return detectModalOpen() || endSuppressedRef.current || inViewSuppressed;
    }, [detectModalOpen, updateEndSuppression, endTolerancePx, showAgainOffsetPx, suppressWhenInViewRef]);

    // Detectar touch
    React.useEffect(() => {
        if (typeof window === "undefined") return;
        const detect = () => {
            const mqCoarse = window.matchMedia?.("(pointer: coarse)")?.matches ?? false;
            const mqHoverNone = window.matchMedia?.("(hover: none)")?.matches ?? false;
            const touchPoints = (navigator as any)?.maxTouchPoints || 0;
            return mqCoarse || mqHoverNone || touchPoints > 0 || "ontouchstart" in window;
        };
        setIsTouch(detect());
        const mql = window.matchMedia?.("(pointer: coarse)");
        const listener = () => setIsTouch(detect());
        // @ts-ignore
        mql?.addEventListener?.("change", listener);
        return () => {
            // @ts-ignore
            mql?.removeEventListener?.("change", listener);
        };
    }, []);

    const clearTimer = (ref: React.MutableRefObject<number | null>) => {
        if (ref.current) window.clearTimeout(ref.current);
        ref.current = null;
    };

    const scheduleIdle = React.useCallback(() => {
        clearTimer(idleTimerRef);
        if (computeSuppressed()) {
            setSuppressed(true);
            clearTimer(suppressTimerRef);
            suppressTimerRef.current = window.setTimeout(() => {
                if (!computeSuppressed()) {
                    setSuppressed(false);
                    scheduleIdle();
                } else {
                    scheduleIdle();
                }
            }, 600);
            return;
        } else setSuppressed(false);

        const list = Array.isArray(delaysMs) && delaysMs.length ? delaysMs : [6000];
        const idx = delayIndexRef.current % list.length;
        const delay = Math.max(0, list[idx]);

        idleTimerRef.current = window.setTimeout(() => {
            if (computeSuppressed()) {
                scheduleIdle();
                return;
            }
            const since = Date.now() - lastActivityTsRef.current;
            if (since < idleGraceMs)
                idleTimerRef.current = window.setTimeout(() => setVisible(true), idleGraceMs);
            else setVisible(true);
        }, delay);
    }, [delaysMs, idleGraceMs, computeSuppressed]);

    // Montaje
    React.useEffect(() => {
        lastPosRef.current = getScrollPos();
        lastActivityTsRef.current = Date.now();
        updateEndSuppression(endTolerancePx, showAgainOffsetPx);
        setSuppressed(computeSuppressed());
        scheduleIdle();
        return () => {
            clearTimer(idleTimerRef);
            clearTimer(suppressTimerRef);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Listeners
    React.useEffect(() => {
        if (typeof window === "undefined") return;
        const targetEl = getTarget();
        const ac = new AbortController();
        const opts: AddEventListenerOptions = { passive: true, signal: ac.signal };

        const markActivity = () => (lastActivityTsRef.current = Date.now());
        const advanceAndResched = () => {
            const list = Array.isArray(delaysMs) && delaysMs.length ? delaysMs : [6000];
            delayIndexRef.current = (delayIndexRef.current + 1) % list.length;
            scheduleIdle();
        };
        const hideAndCycle = () => {
            if (!visible) return;
            setVisible(false);
            advanceAndResched();
        };

        const handleScroll = () => {
            markActivity();
            updateEndSuppression(endTolerancePx, showAgainOffsetPx);
            const sup = computeSuppressed();
            setSuppressed(sup);
            if (sup) {
                if (visible) setVisible(false);
                return;
            }
            const current = getScrollPos();
            const diff = current - lastPosRef.current;
            const isDown = diff > 0;
            if (visible && isDown) hideAndCycle();
            else if (!visible) scheduleIdle();
            lastPosRef.current = current;
        };

        const onWheel = (e: WheelEvent) => {
            markActivity();
            updateEndSuppression(endTolerancePx, showAgainOffsetPx);
            const sup = computeSuppressed();
            setSuppressed(sup);
            if (sup) {
                if (visible) setVisible(false);
                return;
            }
            const isDown = e.deltaY > 0;
            if (visible && isDown) hideAndCycle();
            else if (!visible) scheduleIdle();
            lastPosRef.current = getScrollPos();
        };

        const onTouchMove = () => handleScroll();
        const onPointerDown = () => {
            markActivity();
            updateEndSuppression(endTolerancePx, showAgainOffsetPx);
            const sup = computeSuppressed();
            setSuppressed(sup);
            if (sup) {
                if (visible) setVisible(false);
                return;
            }
            if (visible) hideAndCycle();
            else scheduleIdle();
        };

        (targetEl ?? window).addEventListener("scroll", handleScroll, opts);
        (targetEl ?? window).addEventListener("touchmove", onTouchMove, opts);
        window.addEventListener("wheel", onWheel as any, { passive: true, signal: ac.signal });
        window.addEventListener("pointerdown", onPointerDown, { signal: ac.signal });
        window.addEventListener("click", onPointerDown, { signal: ac.signal });

        return () => ac.abort();
    }, [
        getTarget,
        getScrollPos,
        delaysMs,
        scheduleIdle,
        visible,
        computeSuppressed,
        updateEndSuppression,
        endTolerancePx,
        showAgainOffsetPx,
    ]);

    const lottieSrc = isTouch ? "/lottie/swipe-up.json" : "/lottie/scroll-down.json";
    const computedTitle =
        title ?? (isTouch ? "Desliza hacia abajo" : "Desplázate hacia abajo");

    const overlayVisible =
        "opacity-100 translate-y-0 transition-opacity transition-transform duration-500";
    const overlayHidden =
        "opacity-0 translate-y-2 transition-opacity transition-transform duration-500";

    const overlay = (
        <div
            aria-hidden={!visible || suppressed}
            aria-live="polite"
            role="status"
            className={
                "pointer-events-none fixed inset-0 z-[100] flex items-end justify-center p-6 " +
                (visible && !suppressed ? overlayVisible : overlayHidden)
            }
        >
            <div
                className={`pointer-events-none mb-10 flex flex-col items-center justify-center rounded-2xl bg-white/70 ${cfg.padding} text-gray-900 shadow-lg backdrop-blur-sm`}
            >
                <DotLottieReact src={lottieSrc} autoplay loop className={cfg.lottie} />
                <div className={`mt-1 font-medium tracking-wide ${cfg.text}`}>
                    {computedTitle}
                </div>
            </div>
        </div>
    );

    return (
        <div className={className}>
            {children}
            {bodyReady ? createPortal(overlay, document.body) : overlay}
        </div>
    );
}