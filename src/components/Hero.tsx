"use client";

import React from "react";

export default function Hero({ fadeTo = "#ffffff" }: { fadeTo?: string }) {

  const fadeVars: React.CSSProperties = { "--fade-to": fadeTo } as React.CSSProperties;

  return (
    <section id="inicio" className="relative overflow-hidden bg-white min-h-[100dvh]">
      <div className="absolute inset-0" aria-hidden="true" data-anim="hero-bg">
        <img
          src="/images/IMG_0150.JPG"
          alt=""
          className="w-full h-full object-cover"
          loading="eager"
          decoding="async"
          onError={(e) => {
            const img = e.currentTarget as HTMLImageElement;
            if (img.src.endsWith("IMG_0150.JPG")) img.src = "/images/IMG_0049.JPG";
          }}
        />
        {/* Dusty blue tint overlay for better legibility */}
        <div className="absolute inset-0 pointer-events-none bg-[color:var(--color-dusty-900)]/35" />
      </div>
      <div className="z-20 max-w-5xl mx-auto px-6 absolute inset-x-0 bottom-0 pt-[62dvh] pb-[calc(10dvh+env(safe-area-inset-bottom))] md:relative md:inset-auto md:bottom-auto md:pt-[22dvh] md:pb-[calc(12dvh+env(safe-area-inset-bottom))]">
        <div className="text-center">
          <h1 className="display-font text-4xl md:text-6xl tracking-tight text-white drop-shadow-md" data-anim="hero-item">
            Clarisa <span className="text-white/70">&</span> José
          </h1>
          <p className="mt-3 text-neutral-100/90" data-anim="hero-item">
            Sábado 21 de diciembre de 2025 — 4:30 PM
          </p>
          <a href="#detalles" className="btn btn-primary mt-6 inline-block" data-anim="hero-item" aria-label="Ver detalles principales">
            Ver detalles
          </a>
        </div>
      </div>

      {/* Bottom fade divider to smooth the transition into the next section */}
      <div
        id="hero-fade"
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 -bottom-px z-10 h-full"
        style={fadeVars}
      >
        <div className="h-full w-full bg-hero-fade-card" />
      </div>
    </section>
  );
}
