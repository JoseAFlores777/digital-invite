"use client";

import React from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let ST_CONFIGURED = false;

export enum PhotoZoomAnchor {
    TopLeft = "TopLeft",
    TopCenter = "TopCenter",
    TopRight = "TopRight",
    CenterLeft = "CenterLeft",
    Center = "Center",
    CenterRight = "CenterRight",
    BottomLeft = "BottomLeft",
    BottomCenter = "BottomCenter",
    BottomRight = "BottomRight",
}

const ORIGIN_CSS: Record<PhotoZoomAnchor, string> = {
    [PhotoZoomAnchor.TopLeft]: "top left",
    [PhotoZoomAnchor.TopCenter]: "top center",
    [PhotoZoomAnchor.TopRight]: "top right",
    [PhotoZoomAnchor.CenterLeft]: "center left",
    [PhotoZoomAnchor.Center]: "center",
    [PhotoZoomAnchor.CenterRight]: "center right",
    [PhotoZoomAnchor.BottomLeft]: "bottom left",
    [PhotoZoomAnchor.BottomCenter]: "bottom center",
    [PhotoZoomAnchor.BottomRight]: "bottom right",
};

 type PhotoBanner1Props = {
     /** Factor de velocidad del zoom: progreso 0→1 escalará a 1→(1 + speed). Ej: 2 -> escala final 3 */
     speed?: number;
     /** Límite superior de la escala final (por seguridad visual) */
     maxScale?: number;
     /** Exponente de easing para el progreso del zoom (1 = lineal, 2 = ease-in, 0.5 = ease-out) */
     easing?: number;

     /** Ruta de la imagen principal */
     src?: string;
     /** Alt de la imagen (accesibilidad) */
     alt?: string;

     /** Tinte superior opcional para legibilidad. Ej: "rgb(0 0 0 / 0.35)" o "oklch(... / 0.35)" */
     tint?: string;

     /** Color de difuminado inferior para transición (igual a Hero) */
     fadeTo?: string;

     /** id del section */
     id?: string;

     /** Prioridad de carga de la imagen (solo usar en el primer slide) */
     priority?: boolean;

     /** Punto de anclaje del zoom */
     anchor?: PhotoZoomAnchor;

     /** Filtro CSS opcional para la imagen (ej.: "grayscale(100%)", "sepia(40%) contrast(1.1)") */
     imageFilter?: string;

     /** Opacidad de la imagen (0–1). Ej.: 0.6 */
     imageOpacity?: number;

     /** Contenido proyectado centrado sobre la imagen */
     projection?: React.ReactNode;
 };

 export default function PhotoBanner1({
                                          speed = 2, // 1 -> escala final 2; 2 -> 3; etc.
                                          maxScale = 3,
                                          easing = 1,
                                          src = "/images/IMG_0150.webp",
                                          alt = "",
                                          tint = "rgb(23 44 60 / 0.35)", // wedgewood-1400/35 aprox
                                          fadeTo = "#ffffff",
                                          id = "inicio",
                                          priority = false,
                                          anchor = PhotoZoomAnchor.Center,
                                          imageFilter,
                                          imageOpacity,
                                          projection,
                                      }: PhotoBanner1Props) {
    const sectionRef = React.useRef<HTMLElement | null>(null);

    React.useEffect(() => {
        const section = sectionRef.current;
        if (!section) return;

        const zoomEl = section.querySelector<HTMLElement>("[data-hero-zoom]");
        if (!zoomEl) return;

        // Respeta prefers-reduced-motion
        if (window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches) {
            zoomEl.style.setProperty("--hero-zoom", "1");
            return;
        }

        gsap.registerPlugin(ScrollTrigger);

        if (!ST_CONFIGURED) {
            ScrollTrigger.config({ ignoreMobileResize: true });
            ST_CONFIGURED = true;
        }

        const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v));
        const applyFromProgress = (p: number) => {
            const eased = easing === 1 ? p : Math.pow(p, easing);
            const targetScale = clamp(1 + speed * eased, 1, maxScale);
            zoomEl.style.setProperty("--hero-zoom", String(targetScale));
        };

        const st = ScrollTrigger.create({
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.2,
            onEnter: () => zoomEl.style.setProperty("will-change", "transform"),
            onEnterBack: () => zoomEl.style.setProperty("will-change", "transform"),
            onLeave: () => zoomEl.style.removeProperty("will-change"),
            onLeaveBack: () => zoomEl.style.removeProperty("will-change"),
            onUpdate: (self) => applyFromProgress(self.progress),
        });

        // Estado inicial
        applyFromProgress(st.progress || 0);

        return () => {
            st.kill();
        };
    }, [easing, maxScale, speed]);

    const varClasses = [`[--tint:${tint}]`].join(" ");

    return (
        <section
            ref={sectionRef}
            id={id}
            className={`relative overflow-hidden bg-white min-h-[100dvh] ${varClasses}`}
            style={{ "--fade-to": fadeTo } as React.CSSProperties}
        >
            {/* Imagen "fill" */}
            <div
                //<div class="mask-y-from-70% mask-y-to-90% bg-[url(/img/mountains.jpg)] ..."></div>
                // className="absolute inset-0 [mask-image:linear-gradient(to_bottom,black_0%,transparent_25%,transparent_75%,black_100%)] [mask-repeat:no-repeat] [mask-size:100%_100%]"
                className="absolute inset-0 [mask-image:linear-gradient(to_bottom,black_0%,transparent_100%,transparent_100%,black_100%)] [mask-repeat:no-repeat] [mask-size:100%_100%]"
                aria-hidden="true"
                data-anim="hero-bg"
            >
                <Image
                    data-hero-zoom
                    src={src || "/images/IMG_0150.webp"}
                    alt={alt || ""}
                    fill
                    sizes="100vw"
                    quality={70}
                    priority={priority}
                    className="object-cover [transform:translateZ(0)_scale(var(--hero-zoom,1))]"
                    style={{ transformOrigin: ORIGIN_CSS[anchor], filter: imageFilter, opacity: imageOpacity }}
                />
                {/* Tinte con gradiente (más opaco abajo, se desvanece hacia arriba) */}
                <div className="absolute inset-0 pointer-events-none [background:linear-gradient(to_top,var(--tint)_0%,transparent_30%)]" />
            </div>

            {projection ? (
                <div className="absolute inset-0 z-20 grid place-items-center">
                    {projection}
                </div>
            ) : null}

            {/* Bottom fade divider to smooth the transition into the next section */}
            <div id="hero-fade" aria-hidden="true" className="pointer-events-none absolute inset-0 z-10">
                <div className="h-full w-full bg-[linear-gradient(to_top,color-mix(in_oklab,var(--fade-to,_#ffffff)_100%,transparent)_0%,color-mix(in_oklab,var(--fade-to,_#ffffff)_70%,transparent)_55%,color-mix(in_oklab,var(--fade-to,_#ffffff)_40%,transparent)_80%,transparent_100%)]" />
            </div>
        </section>
    );
}