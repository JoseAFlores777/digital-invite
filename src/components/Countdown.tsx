"use client";

import React, { useEffect, useRef } from "react";
import { useCountdown } from "@/hooks/useCountdown";
import { useIsReducedMotion } from "@/hooks/useIsReducedMotion";
import { useGsapContext, gsap } from "@/hooks/useGsapContext";

export default function Countdown() {
  const root = useRef<HTMLDivElement>(null);
  const reduced = useIsReducedMotion();
  const { days, hours, minutes, seconds, finished } = useCountdown("2025-12-21T16:30:00-06:00");

  useGsapContext(() => {
    if (!root.current) return;
    const q = gsap.utils.selector(root);
    gsap.from(root.current, {
      opacity: 0,
      y: 24,
      duration: 0.8,
      ease: "power2.out",
      scrollTrigger: {
        trigger: root.current,
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
    });

    // tick animation on updates
    const animateTick = (el: Element) => {
      if (reduced) {
        gsap.fromTo(el, { opacity: 0 }, { opacity: 1, duration: 0.2 });
      } else {
        gsap.fromTo(el, { scale: 0.95, opacity: 0.6 }, { scale: 1, opacity: 1, duration: 0.22, ease: "power2.out" });
      }
    };

    const observer = new MutationObserver((muts) => {
      muts.forEach((m) => {
        if (m.type === "childList") {
          m.addedNodes.forEach((n) => n instanceof HTMLElement && animateTick(n));
        }
      });
    });
    q('[data-anim="tick-container"]').forEach((el) => observer.observe(el, { childList: true }));

    return () => observer.disconnect();
  }, [reduced]);

  const renderUnit = (value: number, label: string) => (
    <div className="flex flex-col items-center">
      <div
        data-anim="tick-container"
        className="relative min-w-16 h-16 rounded-xl bg-white border border-neutral-200 shadow-sm grid place-items-center text-2xl display-font"
        aria-live="polite"
        aria-atomic="true"
      >
        <span key={value} data-anim="tick">{String(value).padStart(2, "0")}</span>
      </div>
      <span className="mt-2 text-xs uppercase tracking-wide text-neutral-500">{label}</span>
    </div>
  );

  return (
    <section id="cuenta" ref={root} className="bg-[color:var(--color-dusty-50)]">
      <div className="max-w-5xl mx-auto px-6 py-16 md:py-20 lg:py-28 text-center">
        <h2 className="display-font text-3xl md:text-4xl mb-8">Cuenta regresiva</h2>
        {finished ? (
          <p className="text-neutral-700">¡Es hoy! Nos vemos muy pronto.</p>
        ) : (
          <div className="flex items-center justify-center gap-4 md:gap-8">
            {renderUnit(days, "Días")}
            {renderUnit(hours, "Horas")}
            {renderUnit(minutes, "Minutos")}
            {renderUnit(seconds, "Segundos")}
          </div>
        )}
      </div>
    </section>
  );
}
