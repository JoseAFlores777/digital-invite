"use client";

import React, { useEffect, useRef } from "react";
import { useGsapContext, gsap } from "@/hooks/useGsapContext";

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function RSVPModal({ open, onClose }: Props) {
  const backdropRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const firstFieldRef = useRef<HTMLInputElement>(null);

  useGsapContext(() => {
    const tl = gsap.timeline({ paused: true });
    tl.fromTo(backdropRef.current, { opacity: 0 }, { opacity: 1, duration: 0.2, ease: "power1.out" })
      .fromTo(cardRef.current, { scale: 0.95, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.22, ease: "power2.out" }, "<");
    if (open) tl.play();
    else tl.reverse(0);
  }, [open]);

  useEffect(() => {
    if (open) {
      // focus management
      const prev = document.activeElement as HTMLElement | null;
      firstFieldRef.current?.focus();
      const onKey = (e: KeyboardEvent) => {
        if (e.key === "Escape") onClose();
      };
      window.addEventListener("keydown", onKey);
      return () => {
        window.removeEventListener("keydown", onKey);
        prev?.focus?.();
      };
    }
  }, [open, onClose]);

  // basic focus trap using sentinels
  const trapStart = useRef<HTMLButtonElement>(null);
  const trapEnd = useRef<HTMLButtonElement>(null);

  if (!open) return null;

  return (
    <div
      className="modal-backdrop grid place-items-center z-50"
      ref={backdropRef}
      aria-modal="true"
      role="dialog"
      aria-labelledby="rsvp-title"
    >
      <div ref={cardRef} className="modal-card w-[min(560px,92vw)] p-6 relative">
        <h3 id="rsvp-title" className="display-font text-2xl mb-3">Confirmar asistencia</h3>
        <button
          aria-label="Cerrar"
          onClick={onClose}
          className="absolute top-3 right-3 text-neutral-500 hover:text-neutral-800"
        >
          ×
        </button>
        <button className="sr-only" ref={trapStart} onFocus={() => trapEnd.current?.focus()} aria-hidden="true" />
        <form
          className="grid gap-3"
          onSubmit={(e) => {
            e.preventDefault();
            const btn = e.currentTarget.querySelector("button[type=submit]") as HTMLButtonElement | null;
            if (btn) {
              btn.disabled = true;
            }
            setTimeout(() => {
              (e.currentTarget.querySelector(".thanks") as HTMLDivElement | null)?.classList.remove("hidden");
            }, 500);
          }}
        >
          <label className="grid gap-1">
            <span className="text-sm">Nombre completo</span>
            <input ref={firstFieldRef} required type="text" className="border rounded-lg px-3 py-2" />
          </label>
          <label className="grid gap-1">
            <span className="text-sm">Email</span>
            <input required type="email" className="border rounded-lg px-3 py-2" />
          </label>
          <label className="grid gap-1">
            <span className="text-sm">Número de invitados</span>
            <input required type="number" min={1} max={8} defaultValue={1} className="border rounded-lg px-3 py-2" />
          </label>
          <label className="grid gap-1">
            <span className="text-sm">Restricciones alimentarias</span>
            <input type="text" className="border rounded-lg px-3 py-2" />
          </label>
          <label className="grid gap-1">
            <span className="text-sm">Mensaje</span>
            <textarea rows={3} className="border rounded-lg px-3 py-2" />
          </label>
          <div className="flex gap-3 justify-end mt-2">
            <button type="button" className="btn btn-ghost" onClick={onClose}>Cancelar</button>
            <button type="submit" className="btn btn-primary">Enviar RSVP</button>
          </div>
          <div className="thanks hidden text-center py-2 text-emerald-700">¡Gracias! Hemos recibido tu confirmación.</div>
        </form>
        <button className="sr-only" ref={trapEnd} onFocus={() => trapStart.current?.focus()} aria-hidden="true" />
      </div>
    </div>
  );
}
