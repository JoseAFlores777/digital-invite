"use client";

import React from "react";
import { createPortal } from "react-dom";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

export type SwipeRightHintOverlaySize = "xs" | "sm" | "m" | "lg" | "xl";

export type SwipeRightHintOverlayProps = {
    children: React.ReactNode;
    delaysMs?: number[];              // tiempos de espera (cíclicos)
    title?: string;
    className?: string;
    idleGraceMs?: number;             // anti-jitter
    enableOnDesktop?: boolean;        // <- por defecto TRUE para que te funcione ya
    intervalMs?: number;              // deprecado, compatibilidad
    size?: SwipeRightHintOverlaySize; // xs..xl
    isModalOpen?: boolean;            // si tú controlas los modales
    suppressWhenModal?: boolean;      // heurística de modal (body overflow hidden, aria-modal)
    debug?: boolean;                  // logs
};

export default function SwipeRightHintOverlay({
                                                  children,
                                                  delaysMs,
                                                  title = "Desliza hacia la derecha",
                                                  className = "",
                                                  idleGraceMs = 400,
                                                  enableOnDesktop = true,           // <- default true
                                                  intervalMs,                       // compat
                                                  size = "m",
                                                  isModalOpen,
                                                  suppressWhenModal = true,         // <- puedes poner false si tu body usa overflow hidden
                                                  debug = false,
                                              }: SwipeRightHintOverlayProps) {
    const [visible, setVisible] = React.useState(false);
    const [isTouch, setIsTouch] = React.useState(false);
    const [suppressed, setSuppressed] = React.useState(false);

    const delayIndexRef = React.useRef(0);
    const idleTimerRef = React.useRef<number | null>(null);
    const suppressTimerRef = React.useRef<number | null>(null);
    const lastActivityTsRef = React.useRef<number>(Date.now());

    const bodyReady = typeof document !== "undefined";

    const delays = React.useMemo(() => {
        if (Array.isArray(delaysMs) && delaysMs.length) return delaysMs;
        if (typeof intervalMs === "number" && intervalMs >= 0) return [intervalMs];
        return [5000]; // <- más corto para probar
    }, [delaysMs, intervalMs]);

    const sizeCfg: Record<SwipeRightHintOverlaySize, { lottie: string; pad: string; text: string; bottom: string }> = {
        xs: { lottie: "h-20 w-20", pad: "px-2 py-1", text: "text-xs", bottom: "mb-6" },
        sm: { lottie: "h-28 w-28", pad: "px-3 py-2", text: "text-sm", bottom: "mb-8" },
        m:  { lottie: "h-36 w-36", pad: "px-4 py-3", text: "text-base", bottom: "mb-10" },
        lg: { lottie: "h-44 w-44", pad: "px-5 py-4", text: "text-lg", bottom: "mb-12" },
        xl: { lottie: "h-56 w-56", pad: "px-6 py-5", text: "text-xl", bottom: "mb-14" },
    };
    const cfg = sizeCfg[size];

    // Touch detection
    React.useEffect(() => {
        if (typeof window === "undefined") return;
        const detect = () => {
            const mqCoarse = window.matchMedia?.("(pointer: coarse)")?.matches ?? false;
            const mqHoverNone = window.matchMedia?.("(hover: none)")?.matches ?? false;
            const touchPoints = (navigator as any)?.maxTouchPoints || 0;
            return mqCoarse || mqHoverNone || touchPoints > 0 || "ontouchstart" in window;
        };
        const apply = () => {
            const v = detect();
            setIsTouch(v);
            debug && console.log("[SwipeRightHint] isTouch =", v);
        };
        apply();
        const mql = window.matchMedia?.("(pointer: coarse)");
        // @ts-ignore
        mql?.addEventListener?.("change", apply);
        return () => {
            // @ts-ignore
            mql?.removeEventListener?.("change", apply);
        };
    }, [debug]);

    // Modal suppression (heurística opcional)
    const detectModalOpen = React.useCallback(() => {
        if (!suppressWhenModal) return false;
        if (typeof window === "undefined") return false;
        if (isModalOpen === true) return true;
        if (isModalOpen === false) return false;

        const bodyHidden =
            window.getComputedStyle(document.body).overflow === "hidden" ||
            document.body.style.overflow === "hidden";
        const ariaModal =
            !!document.querySelector('[role="dialog"][aria-modal="true"]') ||
            !!document.querySelector('[aria-modal="true"][role="alertdialog"]');

        return bodyHidden || ariaModal;
    }, [isModalOpen, suppressWhenModal]);

    const computeSuppressed = React.useCallback(() => {
        const sup = detectModalOpen();
        debug && sup && console.log("[SwipeRightHint] SUPPRESSED by modal heuristic");
        return sup;
    }, [detectModalOpen, debug]);

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
        } else {
            setSuppressed(false);
        }

        const idx = delayIndexRef.current % delays.length;
        const delay = Math.max(0, delays[idx]);
        debug && console.log("[SwipeRightHint] scheduling hint in", delay, "ms (idx=", idx, ")");

        idleTimerRef.current = window.setTimeout(() => {
            if (computeSuppressed()) {
                scheduleIdle();
                return;
            }
            const since = Date.now() - lastActivityTsRef.current;
            if (since < idleGraceMs) {
                debug && console.log("[SwipeRightHint] idle grace hit, delaying show by", idleGraceMs, "ms");
                idleTimerRef.current = window.setTimeout(() => setVisible(true), idleGraceMs);
            } else {
                setVisible(true);
            }
        }, delay);
    }, [delays, idleGraceMs, computeSuppressed, debug]);

    // Start
    React.useEffect(() => {
        lastActivityTsRef.current = Date.now();
        setSuppressed(computeSuppressed());
        scheduleIdle();
        return () => {
            clearTimer(idleTimerRef);
            clearTimer(suppressTimerRef);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Interactions
    React.useEffect(() => {
        if (typeof window === "undefined") return;

        const eligible = enableOnDesktop || isTouch;
        if (!eligible) {
            debug && console.warn("[SwipeRightHint] not eligible (enableOnDesktop=false & isTouch=false)");
            return;
        }

        const ac = new AbortController();
        const markActivity = () => (lastActivityTsRef.current = Date.now());

        const hideAndCycle = () => {
            if (!visible) return;
            setVisible(false);
            delayIndexRef.current = (delayIndexRef.current + 1) % Math.max(1, delays.length);
            debug && console.log("[SwipeRightHint] HIDE → next idx", delayIndexRef.current);
            scheduleIdle();
        };

        // Swipe right (touch)
        let touchStartX = 0;
        let touchStartY = 0;
        const THRESH = 24;

        const onTouchStart = (e: TouchEvent) => {
            if (!visible) return;
            const t = e.touches[0];
            touchStartX = t.clientX;
            touchStartY = t.clientY;
        };

        const onTouchMove = (e: TouchEvent) => {
            markActivity();
            if (!visible) return;
            const t = e.touches[0];
            const dx = t.clientX - touchStartX;
            const dy = t.clientY - touchStartY;
            if (Math.abs(dx) > Math.abs(dy) && dx > THRESH) {
                debug && console.log("[SwipeRightHint] touch swipe → right");
                hideAndCycle();
            }
        };

        // Desktop fallbacks (si enabled)
        const onPointerDown = () => {
            markActivity();
            if (visible) {
                debug && console.log("[SwipeRightHint] pointerdown → hide");
                hideAndCycle();
            }
        };

        const onKeyDown = (e: KeyboardEvent) => {
            const tag = (e.target as HTMLElement)?.tagName;
            if (["INPUT", "TEXTAREA", "SELECT"].includes(tag ?? "")) return;
            const keysProceed = ["ArrowRight", "Enter", " ", "Spacebar"];
            if (keysProceed.includes(e.key)) {
                markActivity();
                if (visible) {
                    debug && console.log("[SwipeRightHint] key", e.key, "→ hide");
                    hideAndCycle();
                } else {
                    scheduleIdle();
                }
            }
        };

        const onWheel = (e: WheelEvent) => {
            markActivity();
            if (!visible) return;
            if (Math.abs(e.deltaX) > Math.abs(e.deltaY) && e.deltaX > 8) {
                debug && console.log("[SwipeRightHint] wheel horizontal → right");
                hideAndCycle();
            }
        };

        window.addEventListener("touchstart", onTouchStart, { passive: true, signal: ac.signal });
        window.addEventListener("touchmove", onTouchMove, { passive: true, signal: ac.signal });
        window.addEventListener("pointerdown", onPointerDown, { signal: ac.signal });
        window.addEventListener("click", onPointerDown, { signal: ac.signal });
        window.addEventListener("keydown", onKeyDown, { signal: ac.signal });
        window.addEventListener("wheel", onWheel as any, { passive: true, signal: ac.signal });

        return () => ac.abort();
    }, [delays.length, enableOnDesktop, isTouch, scheduleIdle, visible, debug]);

    // Fade-in/out + slide
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
                className={`pointer-events-none flex flex-col items-center justify-center rounded-2xl bg-white/70 ${cfg.pad} ${cfg.bottom} text-gray-900 shadow-lg backdrop-blur-sm`}
            >
                <DotLottieReact src="/lottie/swipe-right.json" autoplay loop className={cfg.lottie} />
                <div className={`mt-1 font-medium tracking-wide ${cfg.text}`}>{title}</div>
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