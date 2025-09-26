import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { ViewTransitions } from "next-view-transitions";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });

export const metadata: Metadata = {
  title: "Invitación de boda – Clarisa & José",
  description: "Invitación de boda con animaciones sutiles GSAP, detalles del evento y RSVP.",
  metadataBase: new URL("https://example.com"),
  openGraph: {
    title: "Clarisa & José — Invitación de boda",
    description:
      "Acompáñanos en nuestra celebración. Detalles, itinerario, RSVP y más.",
    url: "/",
    siteName: "Invitación Clarisa & José",
    images: [
      { url: "/assets/og-cover.svg", width: 1200, height: 630, alt: "Invitación Clarisa & José" },
    ],
    locale: "es_ES",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Clarisa & José — Invitación de boda",
    description:
      "Acompáñanos en nuestra celebración. Detalles, itinerario, RSVP y más.",
    images: ["/assets/og-cover.svg"],
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
};

export const viewport = {
  themeColor: "#0f172a",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ViewTransitions>
      <html lang="es">
        <body className={`${inter.variable} ${playfair.variable} antialiased bg-white text-neutral-900`}>
          {children}
        </body>
      </html>
    </ViewTransitions>
  );
}
