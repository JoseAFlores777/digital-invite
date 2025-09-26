"use client";

import React, { useRef } from "react";
import { useIsReducedMotion } from "@/hooks/useIsReducedMotion";
import { useGsapContext, gsap, ScrollTrigger } from "@/hooks/useGsapContext";

export default function Hero() {
  const root = useRef<HTMLDivElement>(null);
  const reduced = useIsReducedMotion();

  useGsapContext(() => {
    if (!root.current) return;
    const q = gsap.utils.selector(root);

    // Initial stagger for headline elements
    gsap.from(q('[data-anim="hero-item"]'), {
      y: 24,
      opacity: 0,
      duration: 0.9,
      ease: "power2.out",
      stagger: 0.1,
    });

    // SVG stroke draw for monogram
    const paths = q('svg [data-stroke]');
    paths.forEach((p: Element) => {
      const el = p as SVGPathElement;
      const len = el.getTotalLength?.() ?? 300;
      el.style.strokeDasharray = String(len);
      el.style.strokeDashoffset = String(len);
    });
    gsap.to(paths, {
      strokeDashoffset: 0,
      duration: 1.6,
      ease: "power2.out",
      delay: 0.15,
      onComplete: () => {
        gsap.to(q('[data-anim="mono-fill"]'), { opacity: 1, duration: 0.8, ease: "power1.out" });
      },
    });

    // Parallax background
    if (!reduced) {
      const bg = q('[data-anim="hero-bg"]')[0];
      if (bg) {
        gsap.fromTo(
          bg,
          { yPercent: -10 },
          {
            yPercent: 0,
            ease: "none",
            scrollTrigger: {
              trigger: root.current,
              start: "top top",
              end: "+=60%",
              scrub: true,
            },
          }
        );
      }
    }
  }, [reduced]);

  return (
    <section id="inicio" ref={root} className="relative overflow-hidden bg-white">
      <div className="absolute inset-0" aria-hidden="true" data-anim="hero-bg">
        <img src="/assets/hero.svg" alt="" className="w-full h-full object-cover" />
      </div>
      <div className="relative max-w-5xl mx-auto px-6 pt-[20dvh] pb-[18dvh] grid md:grid-cols-[1fr,1fr] items-center gap-10">
        <div className="order-2 md:order-1 text-center md:text-left">
          <h1 className="display-font text-4xl md:text-6xl tracking-tight" data-anim="hero-item">
            José <span className="opacity-60">&</span> Clarisa
          </h1>
          <p className="mt-3 text-neutral-600" data-anim="hero-item">
            Sábado 21 de diciembre de 2025 — 4:30 PM
          </p>
          <a href="#detalles" className="btn btn-primary mt-6 inline-block" data-anim="hero-item" aria-label="Ver detalles principales">
            Ver detalles
          </a>
        </div>
        <div className="order-1 md:order-2 flex items-center justify-center">
          {/* Inline SVG monogram for stroke-draw animation */}
          <svg width="220" height="220" viewBox="0 0 220 220" role="img" aria-label="Monograma">
            <circle cx="110" cy="110" r="96" fill="none" stroke="#9cb3c7" strokeWidth="1.5" data-stroke="1" />
            <path d="M80 150c18-12 28-32 28-58 0-12-2-24-6-34" fill="none" stroke="#2a3947" strokeWidth="2.4" strokeLinecap="round" data-stroke="1" />
            <path d="M140 70c-12 6-20 18-20 32 0 22 16 40 36 40 6 0 12-2 16-4" fill="none" stroke="#2a3947" strokeWidth="2.4" strokeLinecap="round" data-stroke="1" />
            <g data-anim="mono-fill" style={{ opacity: 0 }}>
              <circle cx="110" cy="110" r="6" fill="#b3c7db" />
            </g>
          </svg>
        </div>
      </div>
    </section>
  );
}
