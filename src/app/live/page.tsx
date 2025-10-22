import React from "react";
import Hero from "@/components/Hero";
import Countdown from "@/components/Countdown";
import Gift from "@/components/Gift";
import Gallery from "@/components/Gallery";
import Footer from "@/components/Footer";
import SharedAlbum from "@/components/SharedAlbum";

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
