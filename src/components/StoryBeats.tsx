"use client";

import React, { useRef } from "react";

export default function StoryBeats() {
  const root = useRef<HTMLDivElement>(null);

  return (
    <section id="historia" ref={root} className="bg-white">
      <div className="max-w-4xl mx-auto px-6 py-16 md:py-20 lg:py-28">
        <h2 className="display-font text-3xl md:text-4xl text-center mb-10">Nuestra historia</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <article className="text-center space-y-2" data-anim="beat">
            <h3 className="display-font text-2xl">Primer encuentro</h3>
            <p className="text-neutral-600">Una mirada bastó para empezar a escribir este capítulo.</p>
          </article>
          <article className="text-center space-y-2" data-anim="beat">
            <h3 className="display-font text-2xl">Aventuras</h3>
            <p className="text-neutral-600">Viajes, risas y sueños compartidos nos trajeron hasta aquí.</p>
          </article>
          <article className="text-center space-y-2" data-anim="beat">
            <h3 className="display-font text-2xl">Sí, acepto</h3>
            <p className="text-neutral-600">Hoy celebramos con quienes más queremos el comienzo de nuestra vida juntos.</p>
          </article>
        </div>
      </div>
    </section>
  );
}
