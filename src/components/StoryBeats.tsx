"use client";

import React, { useRef } from "react";
import { useIsReducedMotion } from "@/hooks/useIsReducedMotion";
import { useGsapContext, gsap } from "@/hooks/useGsapContext";

export default function StoryBeats() {
  const root = useRef<HTMLDivElement>(null);
  const reduced = useIsReducedMotion();

  useGsapContext(() => {
    if (!root.current) return;
    const q = gsap.utils.selector(root);

    gsap.from(q('[data-anim="beat"]'), {
      opacity: 0,
      y: 30,
      stagger: 0.2,
      duration: 0.8,
      ease: "power2.out",
      scrollTrigger: {
        trigger: root.current,
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
    });

    if (!reduced) {
      // Soft pin/scrub storytelling
      gsap.to(root.current, {
        scrollTrigger: {
          trigger: root.current,
          start: "top top+=80",
          end: "+=120%",
          pin: true,
          scrub: 0.4,
        },
      });
    }
  }, [reduced]);

  return (
    <section id="historia" ref={root} className="bg-white">
      <div className="max-w-4xl mx-auto px-6 py-16 md:py-20 lg:py-28">
        <h2 className="display-font text-3xl md:text-4xl text-center mb-10">Nuestra historia</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <article className="text-center space-y-2" data-anim="beat">
            <h3 className="display-font text-2xl">Primer encuentro</h3>
            <p className="text-neutral-600">Una mirada bastó para empezar a escribir este capítulo.</p>
          </article>
          <article className="text-center space-y-2" data-anim="beat">
            <h3 className="display-font text-2xl">Aventuras</h3>
            <p className="text-neutral-600">Viajes, risas y sueños compartidos nos trajeron hasta aquí.</p>
          </article>
          <article className="text-center space-y-2" data-anim="beat">
            <h3 className="display-font text-2xl">Sí, acepto</h3>
            <p className="text-neutral-600">Hoy celebramos con quienes más queremos el comienzo de nuestra vida juntos.</p>
          </article>
        </div>
      </div>
    </section>
  );
}
