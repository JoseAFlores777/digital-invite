import React from "react";
import type { Metadata } from "next";
import SolicitudManager from "@/components/SolicitudManager";

export const metadata: Metadata = {
  title: "Confirmar invitación – Clarisa & José",
  description: "Gestiona y confirma tu asistencia a la boda de Clarisa y José.",
  alternates: { canonical: "/solicitud" },
  openGraph: {
    title: "Confirmar invitación – Clarisa & José",
    description: "Gestiona y confirma tu asistencia a la boda.",
    url: "/solicitud",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Confirmar invitación – Clarisa & José",
    description: "Confirma tu invitación a la boda.",
  },
};

export default async function SolicitudPage({
  searchParams,
}: {
  searchParams: Promise<{ solicitudId?: string; invitationID?: string }>;
}) {
  const params = await searchParams;
  const solicitudId = params?.solicitudId || params?.invitationID || null;

  if (!solicitudId) {
    return (
      <main className="min-h-screen grid place-items-center  text-center">
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
