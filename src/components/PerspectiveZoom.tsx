"use client";

import React from "react";
import { useGsapContext, gsap } from "@/hooks/useGsapContext";
import styles from "./PerspectiveZoom.module.scss";

/** Capas de profundidad */
export type ZoomLayer = 1 | 2 | 3;

/** Config individual por imagen */
export interface ZoomItemConfig {
    /** URL de la imagen */
    src: string;
    /** Texto alternativo */
    alt?: string;
    /** Capa (profundidad) — define opacidad base y z-target */
    layer?: ZoomLayer;
    /** Posición absoluta (CSS). Ej: "15vw", "30%", "120px" */
    x?: string; // mapea a left/right según prefieras
    y?: string; // mapea a top/bottom según prefieras
    /** Ancho (CSS) Ej: "10vw", "220px" */
    width?: string;
    /** Opacidad inicial (si quieres override del default por layer) */
    initialOpacity?: number;
    /** z-index inicial (si quieres override) */
    zIndex?: number;
}

/** Props del componente */
export interface PerspectiveZoomProps {
    headingText?: string;
    quoteText?: string;
    /** Contenido alternativo para el heading (permite pasar un componente) */
    headingContent?: React.ReactNode;

    /** Imágenes (si no se pasan, se generan mocks de picsum) */
    items?: ZoomItemConfig[];

    /** Distribuir automáticamente en círculo si faltan x/y/width */
    autoLayout?: boolean;

    /** Perspectiva del contenedor (CSS) */
    perspective?: string; // p.ej. "100svh"

    /** Semilla para auto-layout reproducible */
    seed?: number;
}

/* ---------------------------
 * Utilidades para auto-layout
 * -------------------------- */
function seededRandom(seed: number) {
    // LCG simple (determinista para layout reproducible)
    let s = seed % 2147483647;
    if (s <= 0) s += 2147483646;
    return () => (s = (s * 16807) % 2147483647) / 2147483647;
}

function buildDefaultItems(count = 12, seed = 1234): ZoomItemConfig[] {
    const rnd = seededRandom(seed);
    const items: ZoomItemConfig[] = [];
    for (let i = 0; i < count; i++) {
        // picsum con id “aleatorio” pero estable
        const id = Math.floor(rnd() * 1000) + 1;
        const layer: ZoomLayer = ([1, 2, 3] as ZoomLayer[])[Math.floor(rnd() * 3)];
        items.push({
            src: `https://picsum.photos/seed/${id}/600/600`,
            alt: `Mock image ${id}`,
            layer,
        });
    }
    return items;
}

/** Rellena x/y/width cuando falten usando un layout circular */
function applyAutoLayout(items: ZoomItemConfig[], seed = 1234): ZoomItemConfig[] {
    const rnd = seededRandom(seed);
    const N = items.length;
    const radiusVW = 30; // radio en vw
    const minW = 5; // vw
    const maxW = 14; // vw

    return items.map((it, idx) => {
        const angle = (idx / N) * Math.PI * 2 + rnd() * 0.7; // separa y rompe simetría
        const r = radiusVW * (0.8 + rnd() * 0.4); // radio ±20%
        const x = 50 + r * Math.cos(angle); // centro 50vw
        const y = 50 + r * Math.sin(angle); // centro 50%
        const width = minW + rnd() * (maxW - minW);

        return {
            ...it,
            x: it.x ?? `${x}vw`,
            y: it.y ?? `${y}%`,
            width: it.width ?? `${width}vw`,
        };
    });
}

/* ---------------------------
 * Componente principal
 * -------------------------- */
export default function PerspectiveZoom({
                                            headingText = "Nuestra historia",
                                            quoteText = "El amor es paciente, es bondadoso. No es envidioso ni jactancioso ni orgulloso. Todo lo cree, todo lo espera, todo lo soporta. (1 Corintios 13:4-7)",
                                            headingContent,
                                            items,
                                            autoLayout = true,
                                            perspective = "100svh",
                                            seed = 20251003,
                                        }: PerspectiveZoomProps) {
    const rootRef = React.useRef<HTMLDivElement | null>(null);
    const quoteRef = React.useRef<HTMLParagraphElement | null>(null);
    const listRef = React.useRef<HTMLDivElement | null>(null);

    const computedItems = React.useMemo(() => {
        const base = items?.length ? items : buildDefaultItems(12, seed);
        return autoLayout ? applyAutoLayout(base, seed) : base;
    }, [items, autoLayout, seed]);

    useGsapContext(() => {

        const root = rootRef.current;
        const list = listRef.current;
        if (!root || !list) return;

        if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
            return;
        }

        // Timeline principal: pin + profundidad por capas
        const tl = gsap.timeline({
            defaults: { ease: "power1.inOut" },
            scrollTrigger: {
                trigger: `.${styles.zoomContainer}`,
                start: "top top",
                end: "+=150%",
                pin: true,
                scrub: 1,
                // markers: true,
            },
        });

        // Estado base por capa (si el dev no lo overridea)
        const layerBase: Record<ZoomLayer, { opacity: number; zTarget: number }> = {
            1: { opacity: 0.2, zTarget: 400 },
            2: { opacity: 0.4, zTarget: 600 },
            3: { opacity: 0.6, zTarget: 800 },
        };

        // Aplica animación a cada item según su data-layer
        computedItems.forEach((_, i) => {
            const el = list.querySelector<HTMLElement>(`[data-idx='${i}']`);
            if (!el) return;
            const layer = Number(el.dataset.layer || 1) as ZoomLayer;
            const base = layerBase[layer];
            gsap.set(el, {
                opacity: el.dataset.initialOpacity
                    ? Number(el.dataset.initialOpacity)
                    : base.opacity,
                zIndex: el.dataset.zindex ? Number(el.dataset.zindex) : layer,
                z: 0,
                transformPerspective: 1000,
                force3D: true,
            });
            tl.to(
                el,
                {
                    opacity: 1,
                    z: base.zTarget,
                },
                0
            );
        });

        // Heading (entra hacia cámara)
        tl.to(
            `.${styles.heading}`,
            {
                opacity: 1,
                z: 50,
            },
            0
        );

        // -------- Split casero para quote --------
        const paragraph = quoteRef.current;
        if (paragraph) {
            const text = paragraph.textContent || "";
            paragraph.textContent = "";
            const frag = document.createDocumentFragment();
            for (const ch of text) {
                if (ch === "\n") {
                    frag.appendChild(document.createElement("br"));
                    continue;
                }
                const span = document.createElement("span");
                span.className = "char inline-block";
                span.textContent = ch === " " ? "\u00A0" : ch;
                span.style.opacity = "0.2";
                frag.appendChild(span);
            }
            paragraph.appendChild(frag);

            const chars = paragraph.querySelectorAll<HTMLSpanElement>(".char");

            const tl2 = gsap.timeline({
                scrollTrigger: {
                    trigger: `.${styles.sectionStick}`,
                    start: "center center",
                    end: "+=1500",
                    pin: true,
                    scrub: 1,
                    // markers: true,
                },
            });

            tl2
                .to(chars, {
                    opacity: 1,
                    duration: 0.6,
                    ease: "none",
                    stagger: 0.03,
                })
                .to({}, { duration: 0.5 })
                .to(paragraph, { opacity: 0, scale: 1.2, duration: 1.2 });
        }
    }, [computedItems]);

    return (
        <main ref={rootRef} className="bg-white text-neutral-900 font-sans">
            <div
                className={`${styles.zoomContainer} w-full h-screen overflow-hidden relative`}
                style={{ perspective }}
            >
                {/* Heading */}
                {headingContent ? (
                    <div className={`${styles.heading} absolute left-1/2 top-1/2 opacity-10 text-center`}>
                        {headingContent}
                    </div>
                ) : (
                    <h1
                        className={`${styles.heading} absolute left-1/2 top-1/2 opacity-10 text-center`}
                    >
                        {headingText}
                    </h1>
                )}

                {/* Lista de ítems */}
                <div ref={listRef} className="contents">
                    {computedItems.map((it, i) => {
                        const layer: ZoomLayer = it.layer ?? 1;
                        return (
                            <div
                                key={i}
                                className={`${styles.zoomItem}`}
                                data-layer={layer}
                                data-idx={i}
                                data-initial-opacity={
                                    typeof it.initialOpacity === "number" ? it.initialOpacity : undefined
                                }
                                data-zindex={typeof it.zIndex === "number" ? it.zIndex : undefined}
                                aria-hidden="true"
                                style={{
                                    position: "absolute",
                                    left: it.x ?? "50%",
                                    top: it.y ?? "50%",
                                    width: it.width ?? "10vw",
                                    transform: "translate(-50%, -50%)",
                                }}
                            >
                                <img src={it.src} alt={it.alt ?? ""} />
                            </div>
                        );
                    })}
                </div>
            </div>

            <section className={`${styles.sectionStick} min-h-screen bg-white flex justify-center items-center text-neutral-900`}>
                <p
                    ref={quoteRef}
                    className="opacity-reveal text-center text-4xl md:text-6xl lg:text-7xl w-4/5 md:w-3/5 leading-tight whitespace-pre-wrap"
                >
                    {quoteText}
                </p>
            </section>
        </main>
    );
}