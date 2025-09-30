"use client";

import React from "react";
import { useGsapContext, gsap } from "../hooks/useGsapContext";

export default function Hero({ fadeTo = "#ffffff" }: { fadeTo?: string }) {
  const fadeVars: React.CSSProperties = { "--fade-to": fadeTo } as React.CSSProperties;
  const sectionRef = React.useRef<HTMLElement | null>(null);

  useGsapContext(() => {
    const section = sectionRef.current;
    if (!section) return;
    if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const zoomEl = section.querySelector<HTMLElement>("[data-hero-zoom]");
    if (!zoomEl) return;

    gsap.fromTo(
      zoomEl,
      { scale: 1 },
      {
        scale: 3,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      }
    );
  }, []);

  return (
    <section ref={sectionRef} id="inicio" className="relative overflow-hidden bg-white min-h-[100dvh]">
      <div className="absolute inset-0" aria-hidden="true" data-anim="hero-bg">
        <img
          data-hero-zoom
          src="/images/IMG_0150.JPG"
          alt=""
          className="w-full h-full object-cover origin-center"
          style={{ willChange: "transform" }}
          loading="eager"
          decoding="async"
          onError={(e) => {
            const img = e.currentTarget as HTMLImageElement;
            if (img.src.endsWith("IMG_0150.JPG")) img.src = "/images/IMG_0049.JPG";
          }}
        />
        {/* Dusty blue tint overlay for better legibility */}
        <div className="absolute inset-0 pointer-events-none bg-wedgewood-1400/35" />
      </div>
      <div className="z-20 max-w-5xl mx-auto px-6 absolute inset-x-0 bottom-0 pt-[62dvh] pb-[calc(10dvh+env(safe-area-inset-bottom))] md:relative md:inset-auto md:bottom-auto md:pt-[22dvh] md:pb-[calc(12dvh+env(safe-area-inset-bottom))]">
        <div className="relative isolate grid place-items-center py-10 text-center">
          <span aria-hidden="true" className="pointer-events-none select-none absolute inset-0 grid place-items-center -z-10">
            <span className="font-display italic leading-none text-[clamp(12rem,30vw,28rem)] text-wedgewood-1100/10">
              &
            </span>
          </span>

          <p className="uppercase tracking-[0.35em] text-[0.8rem] md:text-sm text-wedgewood-1100/90">Boda</p>

          <h1 className="mt-1 font-display italic text-5xl md:text-6xl lg:text-7xl text-foreground">Clarisa</h1>

          <p className="mt-2 text-[0.85rem] md:text-base tracking-[0.45em] text-wedgewood-1100/90">21 · 12 · 2025</p>

          <h2 className="mt-1 font-display italic text-5xl md:text-6xl lg:text-7xl text-foreground">José</h2>

          <p className="mt-2 uppercase tracking-[0.35em] text-[0.8rem] md:text-sm text-wedgewood-1100/90">DIOS ES FIEL</p>
        </div>
      </div>

      {/* Bottom fade divider to smooth the transition into the next section */}
      <div
        id="hero-fade"
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-10"
        style={fadeVars}
      >
        <div className="h-full w-full bg-[linear-gradient(to_top,color-mix(in_oklab,var(--fade-to,_#ffffff)_100%,transparent)_0%,color-mix(in_oklab,var(--fade-to,_#ffffff)_70%,transparent)_55%,color-mix(in_oklab,var(--fade-to,_#ffffff)_40%,transparent)_80%,transparent_100%)]" />
      </div>
    </section>
  );
}
