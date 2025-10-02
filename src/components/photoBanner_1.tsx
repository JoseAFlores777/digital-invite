"use client";

import React from "react";

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
};

export default function PhotoBanner1({
                                         speed = 2, // 1 -> escala final 2; 2 -> 3; etc.
                                         maxScale = 3,
                                         easing = 1,
                                         src = "/images/IMG_0150.JPG",
                                         alt = "",
                                         tint = "rgb(23 44 60 / 0.35)", // wedgewood-1400/35 aprox
                                         fadeTo = "#ffffff",
                                         id = "inicio",
                                     }: PhotoBanner1Props) {
    const sectionRef = React.useRef<HTMLElement | null>(null);
    const isActiveRef = React.useRef(false); // solo animar si 1px es visible
    const lastKnownScrollY = React.useRef(0);
    const rafPending = React.useRef(false);

    React.useEffect(() => {
        const section = sectionRef.current;
        if (!section) return;

        // Respeta prefers-reduced-motion
        if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
            const zoomEl = section.querySelector<HTMLElement>("[data-hero-zoom]");
            if (zoomEl) zoomEl.style.setProperty("--hero-zoom", "1");
            return;
        }

        const zoomEl = section.querySelector<HTMLElement>("[data-hero-zoom]");
        if (!zoomEl) return;

        // Variables de layout
        let sectionTop = 0;
        let sectionHeight = 1;
        let viewportH = window.innerHeight || 1;

        const getDocTop = (el: HTMLElement) => {
            let top = 0;
            let node: HTMLElement | null = el;
            while (node) {
                top += node.offsetTop || 0;
                node = node.offsetParent as HTMLElement | null;
            }
            return top;
        };

        const recompute = () => {
            sectionTop = getDocTop(section);
            sectionHeight = section.offsetHeight || 1;
            viewportH = window.innerHeight || 1;
        };

        const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v));
        const easeProgress = (p: number, exp: number) => (exp === 1 ? p : Math.pow(p, exp));

        const update = () => {
            rafPending.current = false;
            if (!isActiveRef.current) return;

            const y = lastKnownScrollY.current;
            const start = sectionTop - viewportH; // comienza cuando el top del section toca el borde inferior del viewport
            const end = sectionTop + sectionHeight; // termina cuando el bottom del section llega al top del viewport
            const raw = (y - start) / (end - start);
            const progress = clamp(raw, 0, 1);

            // Easing controlable
            const eased = easeProgress(progress, easing);

            // Escala de 1 a (1 + speed), con límite superior
            const targetScale = clamp(1 + speed * eased, 1, maxScale);

            zoomEl.style.setProperty("--hero-zoom", String(targetScale));
        };

        const onScroll = () => {
            lastKnownScrollY.current = window.scrollY;
            if (!rafPending.current) {
                rafPending.current = true;
                requestAnimationFrame(update);
            }
        };

        // Observer para activar cuando 1px aparezca
        const io = new IntersectionObserver(
            (entries) => {
                for (const entry of entries) {
                    // isIntersecting ya cubre "aparece ≥1px"
                    isActiveRef.current = entry.isIntersecting;
                    if (isActiveRef.current) {
                        // recompute por si llega desde fuera de viewport
                        recompute();
                        // primer cuadro
                        lastKnownScrollY.current = window.scrollY;
                        update();
                    }
                }
            },
            { threshold: 0, rootMargin: "100% 0px 100% 0px" } // pre-activa ~1 viewport antes, simétrico arriba/abajo
        );
        io.observe(section);

        const ro = new ResizeObserver(() => {
            recompute();
            // Recalcular un frame tras resize
            lastKnownScrollY.current = window.scrollY;
            update();
        });
        ro.observe(section);

        window.addEventListener("scroll", onScroll, { passive: true });
        window.addEventListener("resize", recompute);

        // Primer cálculo
        recompute();
        lastKnownScrollY.current = window.scrollY;
        update();

        return () => {
            window.removeEventListener("scroll", onScroll);
            window.removeEventListener("resize", recompute);
            ro.disconnect();
            io.disconnect();
        };
    }, [easing, maxScale, speed]);

    const varClasses = [`[--tint:${tint}]`].join(" ");

    return (
        <section
            ref={sectionRef}
            id={id}
            className={`relative overflow-hidden bg-white min-h-[100dvh] ${varClasses}`}
            style={{ ["--fade-to" as any]: fadeTo }}
        >
            {/* Imagen "fill" */}
            <div
                //<div class="mask-y-from-70% mask-y-to-90% bg-[url(/img/mountains.jpg)] ..."></div>
                // className="absolute inset-0 [mask-image:linear-gradient(to_bottom,black_0%,transparent_25%,transparent_75%,black_100%)] [mask-repeat:no-repeat] [mask-size:100%_100%]"
                className="absolute inset-0 [mask-image:linear-gradient(to_bottom,black_0%,transparent_100%,transparent_100%,black_100%)] [mask-repeat:no-repeat] [mask-size:100%_100%]"
                aria-hidden="true"
                data-anim="hero-bg"
            >
                <img
                    data-hero-zoom
                    src={src}
                    alt={alt}
                    className="w-full h-full object-cover origin-center [will-change:transform] [transform:translateZ(0)_scale(var(--hero-zoom,1))]"
                    loading="eager"
                    decoding="async"
                    onError={(e) => {
                        const img = e.currentTarget as HTMLImageElement;
                        // fallback simple
                        if (img.src.endsWith("IMG_0150.JPG")) img.src = "/images/IMG_0049.JPG";
                    }}
                />
                {/* Tinte con gradiente (más opaco abajo, se desvanece hacia arriba) */}
                <div className="absolute inset-0 pointer-events-none [background:linear-gradient(to_top,var(--tint)_0%,transparent_30%)]" />
            </div>

            {/* Contenido */}
          {/*  <div className="z-20 max-w-5xl mx-auto px-6 absolute inset-x-0 bottom-0 pt-[62dvh] pb-[calc(10dvh+env(safe-area-inset-bottom))] md:relative md:inset-auto md:bottom-auto md:pt-[22dvh] md:pb-[calc(12dvh+env(safe-area-inset-bottom))]">*/}
          {/*      <div className="relative isolate grid place-items-center py-10 text-center">*/}
          {/*<span aria-hidden="true" className="pointer-events-none select-none absolute inset-0 grid place-items-center -z-10">*/}
          {/*  <span className="font-display italic leading-none text-[clamp(12rem,30vw,28rem)] text-wedgewood-1100/10">*/}
          {/*    &*/}
          {/*  </span>*/}
          {/*</span>*/}

          {/*          <p className="uppercase tracking-[0.35em] text-[0.8rem] md:text-sm text-wedgewood-1100/90">*/}
          {/*              Boda*/}
          {/*          </p>*/}

          {/*          <h1 className="mt-1 font-display italic text-5xl md:text-6xl lg:text-7xl text-foreground">*/}
          {/*              Clarisa*/}
          {/*          </h1>*/}

          {/*          <p className="mt-2 text-[0.85rem] md:text-base tracking-[0.45em] text-wedgewood-1100/90">*/}
          {/*              21 · 12 · 2025*/}
          {/*          </p>*/}

          {/*          <h2 className="mt-1 font-display italic text-5xl md:text-6xl lg:text-7xl text-foreground">*/}
          {/*              José*/}
          {/*          </h2>*/}

          {/*          <p className="mt-2 uppercase tracking-[0.35em] text-[0.8rem] md:text-sm text-wedgewood-1100/90">*/}
          {/*              DIOS ES FIEL*/}
          {/*          </p>*/}
          {/*      </div>*/}
          {/*  </div>*/}

            {/* Bottom fade divider to smooth the transition into the next section */}
            <div id="hero-fade" aria-hidden="true" className="pointer-events-none absolute inset-0 z-10">
                <div className="h-full w-full bg-[linear-gradient(to_top,color-mix(in_oklab,var(--fade-to,_#ffffff)_100%,transparent)_0%,color-mix(in_oklab,var(--fade-to,_#ffffff)_70%,transparent)_55%,color-mix(in_oklab,var(--fade-to,_#ffffff)_40%,transparent)_80%,transparent_100%)]" />
            </div>
        </section>
    );
}