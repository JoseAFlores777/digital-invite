"use client";

import React from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let ST_CONFIGURED = false;
if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
    if (!ST_CONFIGURED) {
        ScrollTrigger.config({ ignoreMobileResize: true });
        ST_CONFIGURED = true;
    }
}

type Props = {
    /** Total de fotogramas disponibles: anillo-1.jpg ... anillo-N.jpg */
    frameCount?: number;
    /** Pixeles de scroll por fotograma (mayor = más lento) */
    pixelsPerFrame?: number;
    /** Relación de aspecto base del render de tus imágenes (para calcular alto) */
    baseAspectWidth?: number;
    baseAspectHeight?: number;
    /** Patrón de archivo por si cambias el nombre en el futuro */
    pathPattern?: (i: number) => string;
    /** Opacidad del bloque (0..1) controlada desde el padre */
    opacity?: number;
    /** Clases Tailwind para el contenedor (controla tamaño/posicionamiento) */
    containerClassName?: string;
    /** Clases Tailwind extra para el canvas */
    canvasClassName?: string;
};

export default function AnilloScrollSequence({
                                                 frameCount = 147,
                                                 pixelsPerFrame = 80,
                                                 baseAspectWidth = 1158,
                                                 baseAspectHeight = 770,
                                                 pathPattern,
                                                 opacity = 1,
                                                 containerClassName = "w-full",
                                                 canvasClassName = "",
                                             }: Props) {
    const sectionRef = React.useRef<HTMLElement | null>(null);
    const canvasRef = React.useRef<HTMLCanvasElement | null>(null);
    const ctxRef = React.useRef<CanvasRenderingContext2D | null>(null);

    const imagesRef = React.useRef<(HTMLImageElement | null)[]>([]);
    const sequenceRef = React.useRef({ frame: 0 });
    const animRef = React.useRef<gsap.core.Tween | null>(null);
    const stId = "anillo-st";
    const lastSizeRef = React.useRef({ w: 0, h: 0 });

    const currentFrame = (i: number) =>
        pathPattern ? pathPattern(i) : `/images/anillos/anillo-${i + 1}.webp`;

    const DPR = () => Math.max(1, Math.floor(window.devicePixelRatio || 1));
    const isReady = (img?: HTMLImageElement | null) =>
        !!img && img.complete && img.naturalWidth > 0 && img.naturalHeight > 0;

    const ensureCtx = React.useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        if (!ctxRef.current) {
            const ctx = canvas.getContext("2d", { alpha: true }); // transparencia habilitada
            if (ctx) ctxRef.current = ctx;
        }
    }, []);

    const setCanvasSize = React.useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const rect = canvas.getBoundingClientRect();
        const cssW = Math.max(1, rect.width);
        const aspect = baseAspectWidth / baseAspectHeight;
        const cssH = Math.round(cssW / aspect);
        const dpr = DPR();

        canvas.width = Math.round(cssW * dpr);
        canvas.height = Math.round(cssH * dpr);

        ensureCtx();
        const ctx = ctxRef.current;
        if (ctx) {
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
            ctx.clearRect(0, 0, canvas.width, canvas.height); // limpieza transparente
        }
    }, [baseAspectWidth, baseAspectHeight, ensureCtx]);

    const render = React.useCallback(() => {
        const canvas = canvasRef.current;
        const ctx = ctxRef.current;
        const images = imagesRef.current;
        if (!canvas || !ctx || images.length === 0) return;

        let idx = sequenceRef.current.frame | 0;
        while (idx >= 0 && !isReady(images[idx])) idx--;
        if (idx < 0) return;

        const img = images[idx]!;
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const canvasW = canvas.width / DPR();
        const canvasH = canvas.height / DPR();

        // COVER (sin franjas): usa Math.max
        const scale = Math.max(canvasW / img.naturalWidth, canvasH / img.naturalHeight);
        const drawW = img.naturalWidth * scale;
        const drawH = img.naturalHeight * scale;
        const dx = (canvasW - drawW) / 2;
        const dy = (canvasH - drawH) / 2;

        ctx.drawImage(img, dx, dy, drawW, drawH);
    }, []);

    const loadImage = (url: string) =>
        new Promise<HTMLImageElement>((resolve, reject) => {
            const img = new Image();
            img.onload = async () => {
                try {
                    // @ts-ignore
                    if (img.decode) await img.decode();
                    if (isReady(img)) resolve(img);
                    else reject(new Error("Image not ready after decode"));
                } catch {
                    if (isReady(img)) resolve(img);
                    else reject(new Error("Image decode failed"));
                }
            };
            img.onerror = () => reject(new Error("Image load error: " + url));
            img.src = url;
        });

    React.useEffect(() => {
        const section = sectionRef.current;
        const canvas = canvasRef.current;
        if (!section || !canvas) return;

        ensureCtx();
        setCanvasSize();

        lastSizeRef.current = { w: window.innerWidth, h: window.innerHeight };

        const onResize = () => {
            const w = window.innerWidth;
            const h = window.innerHeight;
            const prev = lastSizeRef.current;
            const widthChanged = w !== prev.w;
            lastSizeRef.current = { w, h };

            setCanvasSize();
            render();

            if (widthChanged) {
                ScrollTrigger.refresh();
            }
        };
        const onOrientation = () => {
            setCanvasSize();
            render();
            ScrollTrigger.refresh();
        };

        window.addEventListener("resize", onResize, { passive: true });
        window.addEventListener("orientationchange", onOrientation);

        let killed = false;

        imagesRef.current = new Array(frameCount).fill(null);

        const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
        const totalScrollPx = Math.max(1, frameCount * pixelsPerFrame);

        if (reduce) {
            sequenceRef.current.frame = 0;
            render();
        } else {
            animRef.current = gsap.to(sequenceRef.current, {
                frame: frameCount - 1,
                ease: "none",
                scrollTrigger: {
                    id: stId,
                    trigger: section,
                    start: "top bottom",
                    end: `+=${totalScrollPx}`,
                    scrub: true,
                    invalidateOnRefresh: true,
                    anticipatePin: 1,
                    onUpdate: (self) => {
                        const st = self as ScrollTrigger;
                        const sc = st.scroll();
                        const dist = Math.max(0, Math.min(sc - st.start, totalScrollPx));
                        const desiredIndex = Math.min(frameCount - 1, Math.floor(dist / pixelsPerFrame));

                        let idx = desiredIndex;
                        const imgs = imagesRef.current;
                        while (idx >= 0 && !isReady(imgs[idx])) idx--;
                        if (idx >= 0) {
                            sequenceRef.current.frame = idx;
                            render();
                        }
                    },
                },
            });
        }

        for (let i = 0; i < frameCount; i++) {
            if (killed) break;
            const url = currentFrame(i);
            loadImage(url)
                .then((img) => {
                    if (killed) return;
                    imagesRef.current[i] = img;
                    if (i === 0) {
                        render();
                        ScrollTrigger.refresh();
                    }
                })
                .catch((e) => {
                    console.warn("[AnilloSequence] No se pudo cargar:", url, e);
                });
        }

        return () => {
            killed = true;
            window.removeEventListener("resize", onResize);
            window.removeEventListener("orientationchange", onOrientation);
            animRef.current?.kill();
            ScrollTrigger.getById(stId)?.kill();
        };
    }, [frameCount, pixelsPerFrame, ensureCtx, setCanvasSize, render]);

    return (
        <section
            ref={sectionRef}
            id="anillo-sequence"
            className={`relative ${containerClassName}`}
            aria-label="Secuencia de imágenes en canvas transparente"
            style={{ opacity }} // 👈 opacidad controlada por el padre
        >
            {/* Reserva layout alrededor si quieres: añade padding/margins via containerClassName */}
            <div className="relative">
                <canvas
                    ref={canvasRef}
                    id="anillo-canvas"
                    className={`block h-auto bg-transparent ${canvasClassName}`}
                    aria-hidden="true"
                />
            </div>
        </section>
    );
}