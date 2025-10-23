"use client";

import React from "react";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-neutral-200">
      <div className="max-w-5xl mx-auto px-6 py-12 text-center">
        <p className="display-font text-2xl">Boda Clarisa & José</p>
        <p className="text-neutral-600 mt-1">13 de diciembre de 2025</p>
      </div>
        <div className="text-center pb-10">
            <p className="max-w-md mx-auto italic text-[13px]" style={{ color: "var(--color-dusty-800)" }}>
                Reconócelo en todos tus caminos, y él enderezará tus veredas.
                <span className="block not-italic mt-1 text-[12px]" style={{ color: "var(--color-dusty-700)" }}>
                — Proverbios 3:6 (RVR1960)
              </span>
            </p>
        </div>
    </footer>
  );
}
