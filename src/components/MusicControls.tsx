"use client";

import React, { useMemo, useRef, useCallback } from "react";
import { Icon } from "@iconify/react";
import { useMusic } from "./MusicProvider";
import styles from "./MusicControls.module.scss";

export default function MusicControls() {
  const { isPlaying, everStarted, toggleMusic } = useMusic();
  const clickSoundRef = useRef<HTMLAudioElement | null>(null);

  const { label, icon } = useMemo(() => {
    if (isPlaying) {
      return { label: "Silenciar música", icon: "mdi:music-off" };
    }
    if (everStarted) {
      return { label: "Reanudar música", icon: "mdi:music" };
    }
    return { label: "Activar música", icon: "mdi:music" };
  }, [everStarted, isPlaying]);

  const handleToggle = useCallback(() => {
    const clickSound = clickSoundRef.current;
    if (clickSound) {
      try {
        clickSound.currentTime = 0;
        void clickSound.play();
      } catch (err) {
        console.warn("No se pudo reproducir el sonido de click", err);
      }
    }
    toggleMusic();
  }, [toggleMusic]);

  return (
    <div className={styles.container}>
      <audio ref={clickSoundRef} src="/audio/mouse-click.mp3" preload="auto" className="hidden" aria-hidden />
      <button
        type="button"
        className={styles.button}
        onClick={handleToggle}
        aria-pressed={isPlaying}
        title={label}
      >
        <Icon icon={icon} className={styles.svgIcon} aria-hidden />
        <span className="sr-only">{label}</span>
      </button>
    </div>
  );
}
