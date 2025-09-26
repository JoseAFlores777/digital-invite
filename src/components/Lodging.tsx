"use client";

import React, { useRef } from "react";
import { useIsReducedMotion } from "@/hooks/useIsReducedMotion";
import { useGsapContext, gsap } from "@/hooks/useGsapContext";

const hotels = [
  { name: "Hotel Aurora", phone: "+504 2222-1111", url: "https://example.com/hotel-aurora" },
  { name: "Casa Azul", phone: "+504 2222-2222", url: "https://example.com/casa-azul" },
  { name: "Gran Vista", phone: "+504 2222-3333", url: "https://example.com/gran-vista" },
  { name: "Lago Norte", phone: "+504 2222-4444", url: "https://example.com/lago-norte" },
];

export default function Lodging() {
  const root = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const reduced = useIsReducedMotion();

  useGsapContext(() => {
    if (!root.current || !track.current) return;
    const q = gsap.utils.selector(root);
    gsap.from(q('[data-anim="bus"]'), {
      opacity: 0,
      y: 20,
      duration: 0.6,
      ease: "power2.out",
      scrollTrigger: { trigger: root.current, start: "top 80%", toggleActions: "play none none reverse" },
    });

    if (!reduced) {
      const totalWidth = track.current.scrollWidth - track.current.clientWidth;
      gsap.fromTo(
        track.current,
        { x: 0 },
        {
          x: () => (totalWidth > 0 ? -Math.min(totalWidth, 400) : 0),
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top 80%",
            end: "+=60%",
            scrub: 0.6,
          },
        }
      );
    }
  }, [reduced]);

  return (
    <section id="alojamiento" ref={root} className="bg-white">
      <div className="max-w-5xl mx-auto px-6 py-20">
        <h2 className="display-font text-3xl md:text-4xl text-center mb-10">Alojamientos & Transporte</h2>
        <div className="overflow-hidden">
          <div ref={track} className="flex gap-4 will-change-transform">
            {hotels.map((h) => (
              <a
                key={h.name}
                href={h.url}
                target="_blank"
                rel="noopener noreferrer"
                className="min-w-[260px] rounded-2xl border border-neutral-200 p-5 bg-white/80 hover:bg-neutral-50 transition-colors"
              >
                <div className="display-font text-xl">{h.name}</div>
                <div className="text-neutral-600 mt-1">{h.phone}</div>
                <div className="text-sm text-neutral-500 mt-2">Ver detalles</div>
              </a>
            ))}
          </div>
        </div>
        <div className="rounded-2xl border border-neutral-200 p-6 mt-8" data-anim="bus">
          <h3 className="display-font text-2xl">Bus</h3>
          <p className="text-neutral-700 mt-1">Salida 6:30 PM desde Parroquia hacia Villa Floresta.</p>
          <a
            className="btn btn-ghost mt-3"
            target="_blank"
            rel="noopener noreferrer"
            href="https://maps.google.com/?q=Parroquia%20Casa%20Blanca%20Tegucigalpa"
          >
            Punto de encuentro en Maps
          </a>
        </div>
      </div>
    </section>
  );
}
