"use client";

import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
type Howl = {
  playing(): boolean;
  stop(): void;
  volume(v?: number): number;
  fade(from: number, to: number, duration: number): void;
  on(event: "fade", handler: () => void): void;
  off(event: "fade", handler: () => void): void;
};
import useSound from "use-sound";

type MusicContextValue = {
  isPlaying: boolean;
  everStarted: boolean;
  startMusic: () => void;
  stopMusic: () => void;
  toggleMusic: () => void;
};

const MusicContext = createContext<MusicContextValue | null>(null);

export function MusicProvider({ children, src = "/audio/invite-theme.mp3" }: { children: React.ReactNode; src?: string }) {
  const [everStarted, setEverStarted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const baseVolumeRef = useRef(0.7);
  const soundRef = useRef<Howl | null>(null);
  const fadeTimeoutRef = useRef<number>(0);

  const [play, { sound, stop: stopImmediate }] = useSound(src, {
    volume: baseVolumeRef.current,
    loop: true,
    interrupt: true,
    html5: true,
  });

  useEffect(() => {
    soundRef.current = sound ?? null;
  }, [sound]);

  useEffect(() => {
    return () => {
      window.clearTimeout(fadeTimeoutRef.current);
      const howl = soundRef.current;
      if (howl && howl.playing()) {
        howl.stop();
      }
    };
  }, []);

  const startMusic = useCallback(() => {
    setEverStarted(true);
    const existing = soundRef.current;
    if (existing && existing.playing()) {
      existing.fade(existing.volume(), baseVolumeRef.current, 400);
      setIsPlaying(true);
      return;
    }
    play();
    setIsPlaying(true);
    window.clearTimeout(fadeTimeoutRef.current);
    fadeTimeoutRef.current = window.setTimeout(() => {
      const howl = soundRef.current;
      if (!howl) return;
      howl.volume(0);
      howl.fade(0, baseVolumeRef.current, 1200);
    }, 40);
  }, [play]);

  const stopMusic = useCallback(() => {
    const howl = soundRef.current;
    if (!howl) {
      stopImmediate();
      setIsPlaying(false);
      return;
    }
    window.clearTimeout(fadeTimeoutRef.current);
    if (!howl.playing()) {
      howl.stop();
      setIsPlaying(false);
      return;
    }
    const current = howl.volume();
    if (current <= 0.05) {
      howl.stop();
      setIsPlaying(false);
      return;
    }
    const handleFade = () => {
      howl.off("fade", handleFade);
      howl.stop();
      setIsPlaying(false);
    };
    howl.on("fade", handleFade);
    howl.fade(current, 0, 650);
    fadeTimeoutRef.current = window.setTimeout(() => {
      howl.off("fade", handleFade);
      howl.stop();
      setIsPlaying(false);
    }, 760);
  }, [stopImmediate]);

  const toggleMusic = useCallback(() => {
    if (isPlaying) {
      stopMusic();
    } else {
      startMusic();
    }
  }, [isPlaying, startMusic, stopMusic]);

  const value = useMemo<MusicContextValue>(() => ({
    isPlaying,
    everStarted,
    startMusic,
    stopMusic,
    toggleMusic,
  }), [everStarted, isPlaying, startMusic, stopMusic, toggleMusic]);

  return <MusicContext.Provider value={value}>{children}</MusicContext.Provider>;
}

export function useMusic() {
  const ctx = useContext(MusicContext);
  if (!ctx) {
    throw new Error("useMusic debe usarse dentro de MusicProvider");
  }
  return ctx;
}
