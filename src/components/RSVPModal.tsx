"use client";

import React, { useEffect, useRef } from "react";
import Modal from "react-modal";

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function RSVPModal({ open, onClose }: Props) {
  const firstFieldRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    try {
      if (typeof window !== "undefined") {
        const el = document.getElementById("__next") || document.body;
        if (el) Modal.setAppElement(el as HTMLElement);
      }
    } catch {}
  }, []);

  useEffect(() => {
    if (open) {
      const prev = document.activeElement as HTMLElement | null;
      // focus first field shortly after open
      setTimeout(() => firstFieldRef.current?.focus(), 0);
      return () => prev?.focus?.();
    }
  }, [open]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const { body, documentElement } = document;
    const prevBodyOverflow = body.style.overflow;
    const prevDocOverflow = documentElement.style.overflow;
    const prevBodyTouch = body.style.touchAction;
    if (open) {
      body.style.overflow = "hidden";
      documentElement.style.overflow = "hidden";
      body.style.touchAction = "none";
    }
    return () => {
      body.style.overflow = prevBodyOverflow;
      documentElement.style.overflow = prevDocOverflow;
      body.style.touchAction = prevBodyTouch;
    };
  }, [open]);

  return (
    <Modal
      isOpen={open}
      onRequestClose={onClose}
      shouldCloseOnOverlayClick
      shouldCloseOnEsc
      overlayClassName="fixed inset-0 z-50 bg-black/40 backdrop-blur-[1px]"
      className="outline-none w-[min(560px,92vw)] mx-auto my-12 bg-white/95 border border-[color:var(--color-dusty-300)] rounded-2xl shadow-xl p-6 focus-visible:ring-2 focus-visible:ring-[color:var(--color-dusty-500)]"
      contentLabel="Confirmar asistencia"
      ariaHideApp={false}
    >
      <div className="relative">
        <h3 id="rsvp-title" className="display-font text-2xl mb-3 text-[color:var(--color-dusty-900)]">Confirmar asistencia</h3>
        <button
          aria-label="Cerrar"
          onClick={onClose}
          className="absolute top-2 right-2 inline-flex h-9 w-9 items-center justify-center rounded-full border border-[color:var(--color-dusty-300)] text-[color:var(--color-dusty-800)] bg-white/70 hover:bg-[color:var(--color-dusty-100)] active:scale-[0.98] transition"
        >
          ×
        </button>
      </div>
      <form
        className="grid gap-3"
        onSubmit={(e) => {
          e.preventDefault();
          const btn = e.currentTarget.querySelector("button[type=submit]") as HTMLButtonElement | null;
          if (btn) btn.disabled = true;
          setTimeout(() => {
            (e.currentTarget.querySelector(".thanks") as HTMLDivElement | null)?.classList.remove("hidden");
          }, 500);
        }}
      >
        <label className="grid gap-1">
          <span className="text-sm text-[color:var(--color-dusty-800)]">Nombre completo</span>
          <input ref={firstFieldRef} required type="text" className="border border-[color:var(--color-dusty-300)] rounded-lg px-3 py-2 bg-white/70 focus:outline-none focus:ring-2 focus:ring-[color:var(--color-dusty-400)]" />
        </label>
        <label className="grid gap-1">
          <span className="text-sm text-[color:var(--color-dusty-800)]">Email</span>
          <input required type="email" className="border border-[color:var(--color-dusty-300)] rounded-lg px-3 py-2 bg-white/70 focus:outline-none focus:ring-2 focus:ring-[color:var(--color-dusty-400)]" />
        </label>
        <label className="grid gap-1">
          <span className="text-sm text-[color:var(--color-dusty-800)]">Número de invitados</span>
          <input required type="number" min={1} max={8} defaultValue={1} className="border border-[color:var(--color-dusty-300)] rounded-lg px-3 py-2 bg-white/70 focus:outline-none focus:ring-2 focus:ring-[color:var(--color-dusty-400)]" />
        </label>
        <label className="grid gap-1">
          <span className="text-sm text-[color:var(--color-dusty-800)]">Restricciones alimentarias</span>
          <input type="text" className="border border-[color:var(--color-dusty-300)] rounded-lg px-3 py-2 bg-white/70 focus:outline-none focus:ring-2 focus:ring-[color:var(--color-dusty-400)]" />
        </label>
        <label className="grid gap-1">
          <span className="text-sm text-[color:var(--color-dusty-800)]">Mensaje</span>
          <textarea rows={3} className="border border-[color:var(--color-dusty-300)] rounded-lg px-3 py-2 bg-white/70 focus:outline-none focus:ring-2 focus:ring-[color:var(--color-dusty-400)]" />
        </label>
        <div className="flex gap-3 justify-end mt-2">
          <button type="button" className="inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm border border-[color:var(--color-dusty-300)] text-[color:var(--color-dusty-900)] bg-white/70 hover:bg-[color:var(--color-dusty-100)] active:scale-[0.99] transition" onClick={onClose}>Cerrar</button>
          <button type="submit" className="inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm bg-[color:var(--color-dusty-600)] text-white hover:bg-[color:var(--color-dusty-700)] active:scale-[0.99] transition">Enviar RSVP</button>
        </div>
        <div className="thanks hidden text-center py-2 text-[color:var(--color-dusty-800)]">¡Gracias! Hemos recibido tu confirmación.</div>
      </form>
    </Modal>
  );
}
