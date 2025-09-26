"use client";

import React, { useRef } from "react";
import { useGsapContext, gsap } from "@/hooks/useGsapContext";

export default function MainDetails() {
  const root = useRef<HTMLDivElement>(null);

  useGsapContext(() => {
    if (!root.current) return;
    const q = gsap.utils.selector(root);
    gsap.from(q('[data-anim="card"]'), {
      opacity: 0,
      y: 40,
      duration: 0.8,
      ease: "power2.out",
      stagger: 0.12,
      scrollTrigger: {
        trigger: root.current,
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
    });
  }, []);

  return (
    <section id="detalles" ref={root} className="bg-white">
      <div className="max-w-5xl mx-auto px-6 py-16 md:py-20 lg:py-28">
        <h2 className="display-font text-3xl md:text-4xl text-center mb-10">Detalles principales</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div data-anim="card" className="rounded-2xl border border-neutral-200 p-6 bg-white/80">
            <h3 className="display-font text-2xl mb-2">Fecha y hora</h3>
            <p className="text-neutral-700">Sábado 21 de diciembre de 2025 — 4:30 PM</p>
          </div>
          <div data-anim="card" className="rounded-2xl border border-neutral-200 p-6 bg-white/80">
            <h3 className="display-font text-2xl mb-2">Ceremonia</h3>
            <p className="text-neutral-700">Parroquia Casa Blanca, Tegucigalpa</p>
            <a
              className="btn btn-ghost mt-4"
              target="_blank"
              rel="noopener noreferrer"
              href="https://maps.google.com/?q=Parroquia%20Casa%20Blanca%20Tegucigalpa"
            >
              Ver en Maps
            </a>
          </div>
          <div data-anim="card" className="rounded-2xl border border-neutral-200 p-6 bg-white/80">
            <h3 className="display-font text-2xl mb-2">Recepción</h3>
            <p className="text-neutral-700">Villa Floresta, Salón Principal</p>
            <a
              className="btn btn-ghost mt-4"
              target="_blank"
              rel="noopener noreferrer"
              href="https://maps.google.com/?q=Villa%20Floresta%20Salon%20Principal"
            >
              Ver en Maps
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
