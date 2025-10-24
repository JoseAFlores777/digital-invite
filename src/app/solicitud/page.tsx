import React from "react";
import type { Metadata } from "next";
import SolicitudManager from "@/components/SolicitudManager";
import WeddingHeader from "@/components/WeddingHeader";

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
  icons: {
    icon: [
      { url: "/favicon/favicon.ico" },
      { url: "/favicon/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    shortcut: [
      "/favicon/favicon.ico",
    ],
    apple: [
      { url: "/favicon/apple-icon-180x180.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      { rel: "android-chrome", url: "/favicon/android-icon-192x192.png" },
      { rel: "msapplication-TileImage", url: "/favicon/ms-icon-144x144.png" },
    ],
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

  return <>
      <WeddingHeader title="Boda Clarisa & José" />
      <SolicitudManager solicitudId={solicitudId}/>
  </>;
}
