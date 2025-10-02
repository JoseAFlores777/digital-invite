"use client";

import React from "react";
import { MusicProvider } from "./MusicProvider";

export default function MusicRoot({ children, musicSrc = "/audio/invitee-theme.mp3" }: { children: React.ReactNode; musicSrc?: string }) {
  return (
    <MusicProvider src={musicSrc}>
      {children}
    </MusicProvider>
  );
}
