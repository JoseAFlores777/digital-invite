"use client";

import React from "react";
import { useGsapContext, gsap } from "@/hooks/useGsapContext";
import styles from "./PerspectiveZoom.module.scss";

/** Capas de profundidad */
export type ZoomLayer = 1 | 2 | 3;

/** Config individual por imagen */
export interface ZoomItemConfig {
    src: string;
    alt?: string;
    layer?: ZoomLayer;
    x?: string;
    y?: string;
    width?: string;
    initialOpacity?: number;
    zIndex?: number;
}

/** Props del componente */
export interface PerspectiveZoomProps {
    headingText?: string;
    quoteText?: string | React.ReactNode | Array<string | React.ReactNode>;
    headingContent?: React.ReactNode;
    items?: ZoomItemConfig[];
    autoLayout?: boolean;
    perspective?: string;
    seed?: number;
    markers?: boolean;
    pinSpacing?: boolean;
    sectionsEnd?: number | string;
    imageProps?: React.ImgHTMLAttributes<HTMLImageElement>;
}

/* ---------------------------
 * Utilidades para auto-layout
 * -------------------------- */
function seededRandom(seed: number) {
    let s = seed % 2147483647;
    if (s <= 0) s += 2147483646;
    return () => (s = (s * 16807) % 2147483647) / 2147483647;
}

function buildDefaultItems(count = 12, seed = 1234): ZoomItemConfig[] {
    const rnd = seededRandom(seed);
    const items: ZoomItemConfig[] = [];
    for (let i = 0; i < count; i++) {
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

/** Layout circular automático (unidades en vw) */
function applyAutoLayout(items: ZoomItemConfig[], seed = 1234): ZoomItemConfig[] {
    const rnd = seededRandom(seed);
    const N = items.length;
    const radiusVW = 30;
    const minW = 5;
    const maxW = 14;

    return items.map((it, idx) => {
        const angle = (idx / N) * Math.PI * 2 + rnd() * 0.7;
        const r = radiusVW * (0.8 + rnd() * 0.4);
        const x = 50 + r * Math.cos(angle);
        const y = 50 + r * Math.sin(angle);
        const width = minW + rnd() * (maxW - minW);

        return {
            ...it,
            x: it.x ?? `${x}vw`,
            y: it.y ?? `${y}vw`,
            width: it.width ?? `${width}vw`,
        };
    });
}

/* ---------------------------
 * Conversión Markdown → HTML
 * -------------------------- */
const isHtmlString = (s: string) => /<[^>]+>/.test(s);
const isLikelyMarkdown = (s: string) => /(^|\s)([#*_`$begin:math:display$]|\\d+\\.|>\\s)/.test(s) || s.includes("\\n");
const escapeHtml = (s: string) =>
    s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

/** ⚠️ Usa exactamente este regex para links Markdown */
const markdownToHtml = (md: string) => {
    let html = escapeHtml(md);

    // Enlaces [texto](url) — patrón correcto

    // Negritas **texto** o __texto__
    html = html
        .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
        .replace(/__([^_]+)__/g, "<strong>$1</strong>");

    // Cursivas *texto* o _texto_
    html = html
        .replace(/(^|\W)\*([^*]+)\*(?=\W|$)/g, "$1<em>$2</em>")
        .replace(/(^|\W)_([^_]+)_(?=\W|$)/g, "$1<em>$2</em>");

    // Código inline `code`
    html = html.replace(/`([^`]+)`/g, "<code>$1</code>");

    // Saltos de línea y párrafos
    html = html.replace(/\n/g, "<br/>");
    html = html
        .split(/\n{2,}/)
        .map((blk) => `<p>${blk.trim()}</p>`)
        .join("");

    // Sanitización básica
    html = html.replace(/\son\w+="[^"]*"/g, "");
    html = html.replace(/\sstyle="[^"]*"/g, "");

    return html;
};

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
                                            markers = false,
                                            pinSpacing = true,
                                            sectionsEnd = "+=1500",
                                            imageProps,
                                        }: PerspectiveZoomProps) {
    const rootRef = React.useRef<HTMLDivElement | null>(null);
    const listRef = React.useRef<HTMLDivElement | null>(null);

    const quotes = React.useMemo<(string | React.ReactNode)[]>(() => {
        if (Array.isArray(quoteText)) return quoteText;
        return quoteText != null ? [quoteText] : [];
    }, [quoteText]);

    const computedItems = React.useMemo(() => {
        const base = items?.length ? items : buildDefaultItems(12, seed);
        return autoLayout ? applyAutoLayout(base, seed) : base;
    }, [items, autoLayout, seed]);

    useGsapContext(() => {
        const root = rootRef.current;
        const list = listRef.current;
        if (!root || !list) return;
        if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;

        // Timeline principal
        const tl = gsap.timeline({
            defaults: { ease: "power1.inOut" },
            scrollTrigger: {
                id: "perspective-zoom-main",
                trigger: `.${styles.zoomContainer}`,
                start: "top top",
                end: "+=150%",
                pin: true,
                scrub: 1,
                markers,
                pinSpacing,
            },
        });

        const layerBase: Record<ZoomLayer, { opacity: number; zTarget: number }> = {
            1: { opacity: 0.2, zTarget: 400 },
            2: { opacity: 0.4, zTarget: 600 },
            3: { opacity: 0.6, zTarget: 800 },
        };

        // Items
        computedItems.forEach((_, i) => {
            const el = list.querySelector<HTMLElement>(`[data-idx='${i}']`);
            if (!el) return;
            const layer = Number(el.dataset.layer || 1) as ZoomLayer;
            const base = layerBase[layer];
            gsap.set(el, {
                opacity: el.dataset.initialOpacity ? Number(el.dataset.initialOpacity) : base.opacity,
                z: 0,
                transformPerspective: 1000,
                force3D: true,
                willChange: "transform, opacity",
            });
            tl.to(el, { opacity: 1, z: base.zTarget }, 0);
        });

        // Heading
        tl.to(`.${styles.heading}`, { opacity: 1, z: 50 }, 0);

        // Secciones de quotes
        const sections = root.querySelectorAll<HTMLElement>(
            `section.${styles.sectionStick}[data-quote-section="true"]`
        );

        sections.forEach((section, idx) => {
            const paragraph = section.querySelector<HTMLParagraphElement>("p.js-quote-text");
            const htmlBlock = section.querySelector<HTMLElement>(".js-quote-html");

            const tl2 = gsap.timeline({
                scrollTrigger: {
                    id: `quote-${idx}`,
                    trigger: section,
                    start: "center center",
                    end: sectionsEnd ?? "+=1500",
                    pin: true,
                    scrub: 1,
                    markers,
                    pinSpacing,
                },
            });

            if (paragraph) {
                // Construcción idempotente de spans
                if (!paragraph.querySelector(".char")) {
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
                        (span.style as any).opacity = "0.2";
                        frag.appendChild(span);
                    }
                    paragraph.appendChild(frag);
                }

                const chars = paragraph.querySelectorAll<HTMLSpanElement>(".char");
                tl2
                    .to(chars, { opacity: 1, duration: 0.6, ease: "none", stagger: 0.03 })
                    .to({}, { duration: 0.5 })
                    .to(paragraph, { opacity: 0, scale: 1.2, duration: 1.2 });
            } else if (htmlBlock) {
                tl2
                    .fromTo(htmlBlock, { opacity: 0.2 }, { opacity: 1, duration: 0.8, ease: "none" })
                    .to({}, { duration: 0.5 })
                    .to(htmlBlock, { opacity: 0, scale: 1.03, duration: 1.0 });
            }
        });
    }, [computedItems, markers, pinSpacing, sectionsEnd]);

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
                    <h1 className={`${styles.heading} absolute left-1/2 top-1/2 opacity-10 text-center`}>
                        {headingText}
                    </h1>
                )}

                {/* Lista de ítems */}
                <div ref={listRef} className="contents">
                    {computedItems.map((it, i) => {
                        const layer: ZoomLayer = it.layer ?? 1;
                        return (
                            <div
                                key={`${it.src}-${layer}-${i}`}
                                className={styles.zoomItem}
                                data-layer={layer}
                                data-idx={i}
                                data-initial-opacity={
                                    typeof it.initialOpacity === "number" ? it.initialOpacity : undefined
                                }
                                data-zindex={typeof it.zIndex === "number" ? it.zIndex : undefined}
                                aria-hidden="true"
                                style={{
                                    position: "absolute",
                                    left: it.x ?? "50vw",
                                    top: it.y ?? "50vw",
                                    width: it.width ?? "10vw",
                                    transform: "translate(-50%, -50%) translate3d(0,0,0)",
                                    pointerEvents: "none",
                                }}
                            >
                                <img
                                    src={it.src}
                                    alt={it.alt ?? ""}
                                    loading="lazy"
                                    decoding="async"
                                    sizes="(min-width:1024px) 10vw, (min-width:768px) 20vw, 40vw"
                                    style={{ willChange: "transform, opacity", transform: "translate3d(0,0,0)" }}
                                    {...imageProps}
                                />
                            </div>
                        );
                    })}
                </div>
            </div>

            {quotes.map((q, idx) => {
                if (typeof q === "string") {
                    const asHtml = isHtmlString(q)
                        ? q
                        : isLikelyMarkdown(q)
                            ? markdownToHtml(q)
                            : null;

                    if (asHtml) {
                        return (
                            <section
                                key={`html-${idx}`}
                                data-quote-section="true"
                                data-index={idx}
                                className={`${styles.sectionStick} min-h-screen bg-white flex justify-center items-center text-neutral-900`}
                                tabIndex={-1}
                                style={{ contentVisibility: "auto", containIntrinsicSize: "1000px" }}
                            >
                                <div
                                    className="opacity-reveal js-quote-html prose prose-neutral text-center text-3xl md:text-5xl lg:text-6xl w-4/5 md:w-3/5 leading-tight"
                                    dangerouslySetInnerHTML={{ __html: asHtml }}
                                />
                            </section>
                        );
                    }

                    return (
                        <section
                            key={`text-${idx}`}
                            data-quote-section="true"
                            data-index={idx}
                            className={`${styles.sectionStick} min-h-screen bg-white flex justify-center items-center text-neutral-900`}
                            tabIndex={-1}
                            style={{ contentVisibility: "auto", containIntrinsicSize: "1000px" }}
                        >
                            <p className="opacity-reveal js-quote-text text-center text-4xl md:text-6xl lg:text-7xl w-4/5 md:w-3/5 leading-tight whitespace-pre-wrap">
                                {q}
                            </p>
                        </section>
                    );
                }

                return (
                    <section
                        key={`node-${idx}`}
                        data-quote-section="true"
                        data-index={idx}
                        className={`${styles.sectionStick} min-h-screen bg-white flex justify-center items-center text-neutral-900`}
                        tabIndex={-1}
                        style={{ contentVisibility: "auto", containIntrinsicSize: "1000px" }}
                    >
                        <div className="opacity-reveal w-4/5 md:w-3/5">{q as React.ReactNode}</div>
                    </section>
                );
            })}
        </main>
    );
}