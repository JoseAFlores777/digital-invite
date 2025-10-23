import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Solicitudes – Administración | Clarisa & José",
  description: "Panel administrativo para revisar y gestionar solicitudes de invitación.",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
    },
  },
  alternates: { canonical: "/solicitudes-admin" },
};

export default function SolicitudesAdminLayout({ children }: { children: React.ReactNode }) {
  return children;
}
