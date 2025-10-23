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
