"use client";

import React from "react";
import Hero from "./Hero";
import StoryBeats from "./StoryBeats";
import MainDetails from "./MainDetails";
import Countdown from "./Countdown";
import Itinerary from "./Itinerary";
import DressCode from "./DressCode";
import RSVP from "./RSVP";
import Lodging from "./Lodging";
import Gift from "./Gift";
import AlbumQR from "./AlbumQR";
import MapEmbed from "./MapEmbed";
import Footer from "./Footer";

export default function InvitationContent() {
  return (
    <main className="bg-[color:var(--color-dusty-50)] text-neutral-900">
      {/* 1. Hero */}
      <Hero />
      {/* 2. Cuenta regresiva */}
      <Countdown />
      {/* 3. Nuestra historia */}
      <StoryBeats />
      {/* 4. Detalles principales */}
      <MainDetails />
      {/* 5. Programa */}
      <Itinerary />
      {/* 6. Dress code */}
      <DressCode />
      {/* 7. RSVP */}
      <RSVP />
      {/* 8. Alojamientos / Transporte */}
      <Lodging />
      {/* 9. Regalo */}
      <Gift />
      {/* 10. Álbum / QR */}
      <AlbumQR />
      {/* 11. Mapa embebido */}
      <MapEmbed />
      {/* 12. Cierre */}
      <Footer />
    </main>
  );
}
