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

export default function SolicitudesAdminLayout({ children }: { children: React.ReactNode }) {
  return children;
}
