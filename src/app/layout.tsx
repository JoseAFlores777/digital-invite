import type { Metadata } from "next";
import { ViewTransitions } from "next-view-transitions";
import Script from "next/script";
import "./globals.scss";

export const metadata: Metadata = {
  title: "Invitación de boda – Clarisa & José",
  description: "Invitación de boda, detalles del evento y RSVP.",
  metadataBase: new URL("https://invite.joseiz.com"),
  openGraph: {
    title: "Clarisa & José — Invitación de boda",
    description:
      "Acompáñanos en nuestra celebración. Detalles, itinerario, RSVP y más.",
    url: "/",
    siteName: "Invitación Clarisa & José",
    images: [
      { url: "/images/IMG_0150.webp", width: 1200, height: 630, alt: "Invitación Clarisa & José" },
    ],
    locale: "es_ES",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Clarisa & José — Invitación de boda",
    description:
      "Acompáñanos en nuestra celebración. Detalles, itinerario, RSVP y más.",
    images: ["/images/IMG_0150.webp"],
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
            {process.env.NODE_ENV === "production" && (
                <Script
                    src="https://analytics.joseiz.com/script.js"
                    data-website-id="481224a3-5ba7-41bd-a7c1-e5e113d7ee37"
                    strategy="afterInteractive"
                />
            )}
        </head>
        <body className="bg-background text-foreground">
          {children}
        </body>
      </html>
    </ViewTransitions>
  );
}
