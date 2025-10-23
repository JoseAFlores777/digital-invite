import type { Metadata } from "next";
import { ViewTransitions } from "next-view-transitions";
import "./globals.scss";

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
    icon: "/wedding-Logo.svg",
    shortcut: "/wedding-Logo.svg",
    apple: "/wedding-Logo.svg",
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
        <head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          <link href="https://fonts.googleapis.com/css2?family=Forum:wght@400&family=Pinyon+Script&family=Cormorant+Garamond:wght@300;400;500;600;700&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
        </head>
        <body className="bg-background text-foreground">
          {children}
        </body>
      </html>
    </ViewTransitions>
  );
}
