import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Editar enlace en vivo | Clarisa & José",
  description: "Editar el enlace de transmisión en vivo (live_url) de la boda.",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: { index: false, follow: false, noimageindex: true },
  },
  alternates: { canonical: "/live/edit" },
  icons: { icon: "/wedding-Logo.svg", shortcut: "/wedding-Logo.svg", apple: "/wedding-Logo.svg" },
};

export default function LiveEditLayout({ children }: { children: React.ReactNode }) {
  return children;
}
