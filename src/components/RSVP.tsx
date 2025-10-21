"use client";

import React, { useRef } from "react";
import { useGsapContext, gsap } from "@/hooks/useGsapContext";

export default function RSVP() {
  const root = useRef<HTMLDivElement>(null);

  useGsapContext(() => {
    if (!root.current) return;
    gsap.from(root.current, {
      opacity: 0,
      y: 24,
      duration: 0.8,
      ease: "power2.out",
      scrollTrigger: { trigger: root.current, start: "top 80%", toggleActions: "play none none reverse" },
    });
  }, []);

  const openSolicitudModal = () => {
    try {
      if (typeof window !== "undefined") {
        window.dispatchEvent(new CustomEvent("open-solicitud-modal"));
      }
    } catch {}
  };

  return (
    <section id="rsvp" ref={root} className="bg-[color:var(--color-dusty-500)] text-white">
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-20 lg:py-28 text-center">
        <h2 className="display-font text-3xl md:text-4xl mb-3">Confirma tu asistencia</h2>
        <p className=" mb-6">Nos encantará contar contigo. Por favor confirma tu asistencia.</p>
        <button className="btn btn-primary bg-[color:var(--color-dusty-800)]" onClick={openSolicitudModal} data-anim="rsvp-btn">Confirmar asistencia</button>
      </div>
    </section>
  );
}
