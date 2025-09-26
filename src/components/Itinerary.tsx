"use client";

import React, { useRef } from "react";
import { Icon } from "@iconify/react";
import { useGsapContext, gsap } from "@/hooks/useGsapContext";

const steps = [
  { time: "4:30 PM", title: "Ceremonia", icon: "solar:church-bold" },
  { time: "6:00 PM", title: "Recepción", icon: "solar:cup-bold" },
  { time: "7:30 PM", title: "Banquete", icon: "solar:fork-spoon-bold" },
  { time: "9:00 PM", title: "Fiesta", icon: "solar:music-note-2-bold" },
];

export default function Itinerary() {
  const root = useRef<HTMLDivElement>(null);

  useGsapContext(() => {
    if (!root.current) return;
    const q = gsap.utils.selector(root);
    gsap.from(q('[data-anim="step"]'), {
      opacity: 0,
      y: 24,
      duration: 0.6,
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
    <section id="itinerario" ref={root} className="bg-white">
      <div className="max-w-4xl mx-auto px-6 py-16 md:py-20 lg:py-28">
        <h2 className="display-font text-3xl md:text-4xl text-center mb-10">Programa</h2>
        <ul className="grid md:grid-cols-4 gap-6">
          {steps.map((s) => (
            <li key={s.title} data-anim="step" className="rounded-2xl border border-neutral-200 p-6 text-center bg-white/80">
              <Icon icon={s.icon} className="mx-auto text-3xl text-neutral-800" aria-hidden="true" />
              <div className="display-font text-xl mt-3">{s.title}</div>
              <div className="text-neutral-600 mt-1">{s.time}</div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
