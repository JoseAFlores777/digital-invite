"use client";

import React, { useMemo, useRef, useCallback, useEffect, useState } from "react";
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

  // RSVP trigger visibility logic
  const [showRsvp, setShowRsvp] = useState(false);
  useEffect(() => {
    let timeoutId: any = null;
    let seenBottom = false;

    const checkBottom = () => {
      try {
        const doc = document.documentElement;
        const winH = window.innerHeight || 0;
        const scrolled = window.scrollY || window.pageYOffset || 0;
        const full = doc.scrollHeight || 0;
        // allow a 48px threshold
        if (scrolled + winH >= full - 48) {
          seenBottom = true;
          setShowRsvp(true);
          window.removeEventListener("scroll", onScroll, { passive: true } as any);
        }
      } catch {}
    };

    const onScroll = () => checkBottom();

    // time-based reveal (4 minutes)
    timeoutId = setTimeout(() => setShowRsvp(true), 4 * 60 * 1000);

    window.addEventListener("scroll", onScroll, { passive: true } as any);
    // initial check (in case already at bottom)
    checkBottom();

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
      window.removeEventListener("scroll", onScroll as any);
    };
  }, []);

  const openSolicitudModal = useCallback(() => {
    try {
      if (typeof window !== "undefined") {
        window.dispatchEvent(new CustomEvent("open-solicitud-modal"));
      }
    } catch {}
  }, []);

  return (
    <div className={styles.container}>
      <audio ref={clickSoundRef} src="/audio/mouse-click.mp3" preload="auto" className="hidden" aria-hidden />

      {showRsvp && (
        <div style={{ position: "relative" }}>
          <button
            type="button"
            className={styles.rsvpButton}
            onClick={openSolicitudModal}
            aria-label="Confirmar asistencia"
            title="Confirmar asistencia"
          >
            <Icon icon="mdi:account-check" className={styles.svgIcon} aria-hidden />
          </button>
          <div role="tooltip" className={styles.tooltip}>Confirma asistencia</div>
        </div>
      )}

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
