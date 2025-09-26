"use client";

import React, { useRef } from "react";
import { useIsReducedMotion } from "@/hooks/useIsReducedMotion";
import { useGsapContext, gsap } from "@/hooks/useGsapContext";

const tones = ["#cfc8bd", "#b8c3cd", "#a6a39a", "#d9d1c7", "#9cb3c7"];

export default function DressCode() {
  const root = useRef<HTMLDivElement>(null);
  const reduced = useIsReducedMotion();

  useGsapContext(() => {
    if (!root.current) return;
    const q = gsap.utils.selector(root);
    gsap.from(q('[data-anim="chip"]'), {
      opacity: 0,
      y: 16,
      duration: 0.5,
      stagger: 0.08,
      ease: "power2.out",
      scrollTrigger: { trigger: root.current, start: "top 80%", toggleActions: "play none none reverse" },
    });

    if (!reduced) {
      const bg = q('[data-anim="parallax"]')[0];
      if (bg) {
        gsap.fromTo(
          bg,
          { yPercent: -10 },
          { yPercent: 0, ease: "none", scrollTrigger: { trigger: root.current, start: "top 80%", scrub: 0.5 } }
        );
      }
    }
  }, [reduced]);

  return (
    <section id="dresscode" ref={root} className="relative overflow-hidden bg-white">
      <div className="absolute inset-0 pointer-events-none" data-anim="parallax" aria-hidden="true">
        <div className="w-full h-full" style={{ background: "radial-gradient(1200px 400px at 80% -10%, #eef3f9, transparent)" }} />
      </div>
      <div className="relative max-w-4xl mx-auto px-6 py-20">
        <h2 className="display-font text-3xl md:text-4xl text-center mb-6">Dress code</h2>
        <p className="text-neutral-700 text-center max-w-2xl mx-auto">
          Formal — tonos neutros y terrosos. El blanco está reservado para la novia.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3 mt-6">
          {tones.map((t) => (
            <span
              key={t}
              data-anim="chip"
              className="inline-flex items-center gap-2 rounded-full border border-neutral-200 px-4 py-2 text-sm"
              style={{ backgroundColor: "#fff", color: "#111" }}
            >
              <span className="w-4 h-4 rounded-full border" style={{ backgroundColor: t }} />
              {t}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
