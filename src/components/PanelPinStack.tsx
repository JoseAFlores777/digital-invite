'use client';

import React from 'react';
import PhotoBanner1, {PhotoZoomAnchor} from "@/components/photoBanner_1";


export default function PanelPinStack() {


    return (
        <>
            <div className="relative">
                <div
                    className="sticky top-0 h-screen w-full">
                    <PhotoBanner1
                        src="/images/Etapas/hermanos.webp"
                        anchor={PhotoZoomAnchor.Center}
                        priority
                        imageFilter={"grayscale(100%)"}
                        imageOpacity={0.5}
                        projection={getBannerTitle('Hermanos...')}
                    />
                </div>
                <div
                    className="sticky top-0 h-screen w-full">
                    <PhotoBanner1
                        src="/images/Etapas/amigos.webp"
                        imageFilter={"grayscale(100%)"}
                        imageOpacity={0.5}
                        projection={getBannerTitle('Amigos...')}
                    />
                </div>
                <div
                    className="sticky top-0 h-screen w-full">
                    <PhotoBanner1
                        src="/images/Etapas/novios.webp"
                        imageFilter={"grayscale(100%)"}
                        imageOpacity={0.5}
                        projection={getBannerTitle('Novios...')}
                    />
                </div>
                <div
                    className="sticky top-0 h-screen w-full">
                    <PhotoBanner1
                        src="/images/Etapas/prometidos.webp"
                        imageFilter={"grayscale(100%)"}
                        imageOpacity={0.7}
                        projection={getBannerTitle('Prometidos...')}
                    />
                </div>
            </div>
        </>
);
}


// function getBannerTitle(title: string) {
//     return (
//         <section
//             aria-label={title}
//             className="
//         relative isolate w-full
//         px-4 sm:px-6
//         /* Altura/paddings pensados para móviles */
//         pt-[28svh] pb-[calc(12svh+env(safe-area-inset-bottom))]
//         /* En pantallas medianas subimos el aire */
//         md:pt-[22dvh] md:pb-[calc(12dvh+env(safe-area-inset-bottom))]
//       "
//         >
//             {/* Fondo tipográfico gigante, centrado y sin overflow */}
//             <div
//                 aria-hidden="true"
//                 className="
//           absolute inset-0 -z-10
//           flex items-center justify-center
//           overflow-hidden
//           pointer-events-none select-none
//         "
//             >
//         <span
//             className="
//             font-display italic leading-none tracking-tight
//             /* Tamaños contenidos en móvil; crecen en md */
//             text-[clamp(3.5rem,14vw,8rem)]
//             md:text-[clamp(8rem,20vw,22rem)]
//             text-wedgewood-1100/10 dark:text-wedgewood-50/10
//             blur-[0.5px]
//             /* Evita cortes y permite saltos elegantes */
//             max-w-[95%]
//             [text-wrap:balance]
//             break-words
//             hyphens-auto
//           "
//         >
//           {title}
//         </span>
//             </div>
//
//         </section>
//     );
// }


function getBannerTitle(title: string) {
    return <BannerTitle title={title} />;
}

/* ---------- Componente ---------- */


function BannerTitle({ title }: { title: string }) {
    const sectionRef = React.useRef<HTMLElement | null>(null);
    const textRef = React.useRef<HTMLSpanElement | null>(null);
    const [fontSizePx, setFontSizePx] = React.useState<number | null>(null);

    // Ajusta el font-size para que el texto quepa en 1 línea en móviles
    React.useEffect(() => {
        const section = sectionRef.current;
        const textEl = textRef.current;
        if (!section || !textEl) return;

        // Evita recalcular en usuarios con "reduce motion" (igual funciona, pero reducimos trabajo)
        if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;

        const MIN_PX_MOBILE = 28;   // tamaño mínimo legible en móviles
        const MAX_PX_MOBILE = 128;  // límite para no desbordar
        const CHAR_WIDTH_FACTOR = 0.58; // aprox. ancho medio por carácter (depende de la fuente)

        const compute = () => {
            // Ancho disponible dentro del section (con paddings ya aplicados por Tailwind)
            const rect = section.getBoundingClientRect();
            const available = rect.width;

            // Evita division por cero
            const len = Math.max(title.trim().length, 1);

            // Cálculo base: distribuye ancho por nº de caracteres y factor medio de ancho
            const raw = available / (len * CHAR_WIDTH_FACTOR);

            // Reduce un poco para dejar "aire" lateral
            const padded = raw * 0.94;

            // Aplica límites para móviles (svh) y deja que el CSS escale en md hacia arriba
            const next = Math.max(MIN_PX_MOBILE, Math.min(padded, MAX_PX_MOBILE));

            setFontSizePx(next);
        };

        // Observa cambios de tamaño del contenedor
        const ro = new ResizeObserver(compute);
        ro.observe(section);

        // Primer cálculo
        compute();

        return () => {
            ro.disconnect();
        };
    }, [title]);

    return (
        <section
            ref={sectionRef}
            aria-label={title}
            className="
        relative isolate w-full
        px-4 sm:px-6
        /* Altura/paddings pensados para móviles */
        pt-[28svh] pb-[calc(12svh+env(safe-area-inset-bottom))]
        /* En pantallas medianas subimos el aire */
        md:pt-[22dvh] md:pb-[calc(12dvh+env(safe-area-inset-bottom))]
      "
        >
            {/* Fondo tipográfico gigante, centrado y sin overflow */}
            <div
                aria-hidden="true"
                className="
          absolute inset-0 -z-10
          flex items-center justify-center
          overflow-hidden
          pointer-events-none select-none
        "
            >
        <span
            ref={textRef}
            className="
            font-display italic leading-none tracking-tight
            text-wedgewood-1100/25 dark:text-wedgewood-70/10
            blur-[0.5px]
            /* No permitir wraps: siempre quepa en una línea (ajustamos tamaño vía JS) */
            whitespace-nowrap
            /* En md+ dejamos que crezca con clamp adicional para escenarios amplios */
            md:[font-size:clamp(8rem,20vw,22rem)]
          "
            style={
                fontSizePx
                    ? {
                        // En móviles imponemos el tamaño calculado; en md+ el clamp puede superarlo.
                        fontSize: `${fontSizePx}px`,
                    }
                    : undefined
            }
        >
          {title}
        </span>
            </div>
        </section>
    );
}