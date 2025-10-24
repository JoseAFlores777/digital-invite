import React from "react";
import type { Metadata } from "next";
import Hero from "@/components/Hero";
import Countdown from "@/components/Countdown";
import Gift from "@/components/Gift";
import Gallery from "@/components/Gallery";
import Footer from "@/components/Footer";
import SharedAlbum from "@/components/SharedAlbum";

export const metadata: Metadata = {
  title: "Boda en vivo – Clarisa & José",
  description: "Sigue la transmisión en vivo, cuenta regresiva, galería y álbum compartido de la boda.",
  alternates: { canonical: "/live" },
  openGraph: {
    title: "Boda en vivo – Clarisa & José",
    description: "Sigue la transmisión en vivo, cuenta regresiva, galería y álbum compartido de la boda.",
    url: "/live",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Boda en vivo – Clarisa & José",
    description: "Transmisión en vivo y momentos especiales de la boda.",
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

export default function LivePage() {
  return (
    <div className="bg-white text-[color:var(--color-dusty-900)]" style={{ minHeight: "100dvh" }}>
      <Hero />
      <Countdown />
      <Gift />
      <SharedAlbum />
      <Gallery />
      <Footer />
    </div>
  );
}
