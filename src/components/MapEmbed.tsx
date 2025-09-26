"use client";

import React, { useRef } from "react";
import { useGsapContext, gsap } from "@/hooks/useGsapContext";

export default function MapEmbed() {
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

  return (
    <section id="mapa" ref={root} className="bg-white">
      <div className="max-w-5xl mx-auto px-6 py-20">
        <h2 className="display-font text-3xl md:text-4xl text-center mb-6">Cómo llegar</h2>
        <div className="rounded-2xl overflow-hidden border border-neutral-200 shadow-sm">
          <iframe
            title="Mapa de ubicación"
            className="w-full aspect-video"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3877.0847965581634!2d-87.206!3d14.072!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTTCsDA0JzE5LjIiTiA4N8KwMTInMjEuNiJX!5e0!3m2!1ses!2shn!4v1689720000000"
            allowFullScreen
          />
        </div>
      </div>
    </section>
  );
}
