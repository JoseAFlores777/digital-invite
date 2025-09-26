"use client";

import React, { useCallback, useRef, useState } from "react";
import { useGsapContext, gsap } from "@/hooks/useGsapContext";

const IBAN = "IBAN-XXXX-XXXX-XXXX-XXXX-XXXX"; // placeholder

export default function Gift() {
  const root = useRef<HTMLDivElement>(null);
  const iconRef = useRef<HTMLSpanElement>(null);
  const [copied, setCopied] = useState(false);

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

  const onCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(IBAN);
      setCopied(true);
      gsap.fromTo(
        iconRef.current,
        { y: 0, scale: 1 },
        { y: -4, scale: 1.12, duration: 0.16, yoyo: true, repeat: 1, ease: "power1.out" }
      );
      setTimeout(() => setCopied(false), 1400);
    } catch {}
  }, []);

  return (
    <section id="regalo" ref={root} className="bg-white">
      <div className="max-w-3xl mx-auto px-6 py-20 text-center">
        <h2 className="display-font text-3xl md:text-4xl mb-3">Regalo</h2>
        <p className="text-neutral-700 mb-6">
          Tu presencia es lo más importante para nosotros. Si deseas hacernos un obsequio, hemos dejado estos datos.
        </p>
        <div className="inline-flex items-center gap-3 rounded-full border border-neutral-200 px-4 py-2 bg-white/80">
          <span className="text-sm font-mono">{IBAN}</span>
          <button className="btn btn-primary" onClick={onCopy} aria-live="polite">
            <span ref={iconRef} aria-hidden="true">📋</span>
            <span className="sr-only">Copiar IBAN</span>
          </button>
        </div>
        {copied && <div className="mt-2 text-emerald-700">¡Copiado!</div>}
      </div>
    </section>
  );
}
