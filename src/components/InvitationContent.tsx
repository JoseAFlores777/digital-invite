"use client";

import React from "react";

export default function InvitationContent() {
  return (
    <main
      className="w-full bg-violet-50 text-violet-900 flex items-center justify-center p-6"
      style={{
        minHeight: "100dvh",
        paddingBottom: "calc(24px + env(safe-area-inset-bottom))",
        paddingTop: "calc(24px + env(safe-area-inset-top))",
      }}
    >
      <section className="w-full max-w-2xl text-center space-y-5">
        <h1 className="text-3xl font-serif tracking-wide">Clarissa &amp; José</h1>
        <p className="text-base leading-relaxed opacity-85">
          Aquí irá el contenido de la invitación (detalles del evento, horarios, mapa, RSVP, etc.).
        </p>
        <p className="text-xs opacity-60">Ruta especial eliminada – todo vive en esta página.</p>
      </section>
    </main>
  );
}
