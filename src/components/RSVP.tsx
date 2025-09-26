"use client";

import React, { useState, useRef } from "react";
import RSVPModal from "./RSVPModal";
import { useGsapContext, gsap } from "@/hooks/useGsapContext";

export default function RSVP() {
  const root = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);

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

  return (
    <section id="rsvp" ref={root} className="bg-white">
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-20 lg:py-28 text-center">
        <h2 className="display-font text-3xl md:text-4xl mb-3">RSVP</h2>
        <p className="text-neutral-700 mb-6">Nos encantará contar contigo. Por favor confirma tu asistencia.</p>
        <button className="btn btn-primary" onClick={() => setOpen(true)} data-anim="rsvp-btn">Confirmar asistencia</button>
      </div>
      <RSVPModal open={open} onClose={() => setOpen(false)} />
    </section>
  );
}
