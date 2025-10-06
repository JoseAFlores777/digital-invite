"use client";

import React from "react";
import SolicitudManager from "@/components/SolicitudManager";

export default function SolicitudPage() {
  const params = new URLSearchParams(typeof window !== "undefined" ? window.location.search : "");
  const solicitudId = params.get("solicitudId") || params.get("invitationID");

  if (!solicitudId) {
    return (
      <main className="min-h-screen grid place-items-center p-6 text-center">
        <div>
          <h1 className="text-2xl font-semibold mb-2">Falta el identificador de la solicitud</h1>
          <p className="opacity-80 max-w-md mx-auto">
            Por favor abre esta página con el parámetro solicitudId en la URL.
          </p>
        </div>
      </main>
    );
  }

  return <SolicitudManager solicitudId={solicitudId} />;
}
