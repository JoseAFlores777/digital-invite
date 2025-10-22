"use client";

import React, { useEffect, useRef, useState } from "react";
import { useCountdown } from "@/hooks/useCountdown";
import { useIsReducedMotion } from "@/hooks/useIsReducedMotion";
import { useGsapContext, gsap } from "@/hooks/useGsapContext";
import AnilloScrollSequence from "@/components/AnilloScrollSequence";
import { fetchWeddingGeneralities } from "@/lib/api/solicitudes";
import LiveStreamButton from "@/components/LiveStreamButton";
import { Icon } from "@iconify/react";

export default function Countdown() {
  const root = useRef<HTMLDivElement>(null);
  const reduced = useIsReducedMotion();
  const [targetISO, setTargetISO] = useState<string>("2025-12-21T16:30:00");
  const [liveUrl, setLiveUrl] = useState<string>("");

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const wg = await fetchWeddingGeneralities("");
        if (!active || !wg) return;
        const date: string = wg?.wedding?.date || ""; // yyyy-MM-dd
        const start: string = wg?.wedding?.start_time || ""; // HH:mm[:ss]
        const live: string = (wg?.wedding?.live_url as string) || (wg?.live_url as string) || "";
        setLiveUrl(live);
        if (date) {
          const [h = "00", m = "00"] = (start || "00:00").split(":");
          const iso = `${date}T${h.padStart(2, "0")}:${m.padStart(2, "0")}:00`;
          setTargetISO(iso);
        }
      } catch {
        // keep fallback targetISO
      }
    })();
    return () => {
      active = false;
    };
  }, []);

  const { days, hours, minutes, seconds, finished } = useCountdown(targetISO);

  useGsapContext(() => {
    if (!root.current) return;
    const q = gsap.utils.selector(root);
    gsap.from(root.current, {
      opacity: 0,
      y: 100,
      duration: 0.8,
      ease: "power2.out",
      scrollTrigger: {
        trigger: root.current,
        start: "top 100%",
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
        <span key={value} data-anim="tick" suppressHydrationWarning>{String(value).padStart(2, "0")}</span>
      </div>
      <span className="mt-2 text-xs uppercase tracking-wide text-neutral-500">{label}</span>
    </div>
  );

  return (
    <section id="cuenta" ref={root} className="bg-[color:var(--color-dusty-50)] bg-white h-[100dvh]">

        <AnilloScrollSequence
            frameCount={79}
            pixelsPerFrame={15}
            opacity={0.4}                               // 👈 opacidad
            containerClassName="w-full max-w-[500px] mx-auto" // 👈 tamaño/posicion
            canvasClassName="w-full"                    // 👈 el canvas ocupa todo el ancho del contenedor
        />

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

        {liveUrl ? (
          <div className="mt-8 flex items-center justify-center">
            <LiveStreamButton
              liveUrl={liveUrl}
              className="inline-flex items-center gap-3 px-6 py-3 rounded-xl border border-neutral-300 bg-white hover:bg-neutral-50 text-base"
              title="Ver transmisión en vivo"
            >
              <span className="inline-flex items-center gap-2">
                <Icon icon="mdi:youtube" className="w-5 h-5 text-red-600" />
                <span className="truncate text-base font-medium">Ver en vivo</span>
                <span className="ml-2 inline-flex items-center rounded-full bg-red-600 text-white text-xs leading-none px-2.5 py-0.5 animate-pulse">
                  En vivo
                </span>
              </span>
            </LiveStreamButton>
          </div>
        ) : null}

      </div>
    </section>
  );
}
