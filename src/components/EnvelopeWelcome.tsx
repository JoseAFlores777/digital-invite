"use client";

import React, { useCallback, useRef, useState } from "react";
import { SwipeableButton } from "react-swipeable-button";
import ew from "./EnvelopeWelcome.module.scss";
import { useMusic } from "./MusicProvider";

export type EnvelopeWelcomeProps = {
  sealText?: string;
  sealSlot?: React.ReactNode;
  sender?: string;
  subtitle?: string;
  buttonText?: string;
  onOpenComplete?: () => void;
  className?: string;
};

export default function EnvelopeWelcome({
  sealText = "CJ",
  sealSlot,
  sender = "De: Clari & José",
  subtitle = "Con mucho amor",
  buttonText = "Abrir Invitación",
  onOpenComplete,
  className = "",
}: EnvelopeWelcomeProps) {
  const [isOpening, setIsOpening] = useState(false);
  const didTriggerRef = useRef(false);
  const { startMusic } = useMusic();

  const handleOpen = useCallback(() => {
    if (didTriggerRef.current) return;
    didTriggerRef.current = true;
    setIsOpening(true);
    try {
      const expiry = new Date(Date.now() + 1000 * 60 * 60 * 6).toUTCString();
      document.cookie = `invite_opened=true; path=/; max-age=${60 * 60 * 6}; expires=${expiry}`;
    } catch {}
    startMusic();
    const TRANSITION_DELAY = 1900;
    window.setTimeout(() => {
      onOpenComplete?.();
    }, TRANSITION_DELAY);
  }, [onOpenComplete, startMusic]);

  return (
    <main
      className={`min-h-screen bg-[color:var(--color-dusty-50)] text-[color:var(--color-dusty-900)] overflow-hidden transition-opacity duration-500 ${className}`}
      style={{
        minHeight: "100dvh",
        paddingTop: "calc(13px + env(safe-area-inset-top))",
      }}
    >
      <div id="sobre-boda" className={`${ew.envelope} ${ew.envelopeFull} ${isOpening ? ew.opening : ""}`}>
        <div className={`${ew.body} ${ew.paperTexture}`} />
        <div className={ew.mouth} aria-hidden />
        <div className={ew.seal} aria-hidden>
          {sealSlot ? sealSlot : <span className={ew.sealText}>{sealText}</span>}
        </div>
        <div className={ew.overlay} aria-hidden={false}>
          <div className="flex flex-col justify-between items-center gap-6 min-h-[40vh] py-6 px-4">
            <div className="text-center">
              <p className="display-font text-2xl md:text-3xl tracking-wide" style={{ color: "var(--color-dusty-900)" }}>{sender}</p>
              <p className="sans-font text-sm opacity-80 mt-1" style={{ color: "var(--color-dusty-700)" }}>{subtitle}</p>
            </div>
            <div className={ew.swipeWrap}>
              <p className="display-font text-base md:text-lg mb-1 text-center opacity-70" style={{ color: "var(--color-dusty-700)" }}>
                Desliza para abrir
              </p>
              <SwipeableButton
                name="invite-swipe"
                onSuccess={handleOpen}
                text={buttonText}
                text_unlocked="¡Nos vemos adentro!"
                height={56}
                autoWidth
                background_color="#c8d6e4"
                sliderColor="#4e6984"
                sliderTextColor="#ffffff"
                sliderIconColor="#ffffff"
                textColor="#345069"
                borderRadius={32}
                disabled={isOpening}
              />
            </div>
          <div className="text-center mt-4">
            <p className="max-w-md mx-auto italic text-[13px]" style={{ color: "var(--color-dusty-800)" }}>
              Reconócelo en todos tus caminos, y él enderezará tus veredas.
              <span className="block not-italic mt-1 text-[12px]" style={{ color: "var(--color-dusty-700)" }}>
                — Proverbios 3:6 (RVR1960)
              </span>
            </p>
          </div>
          </div>
        </div>
      </div>
    </main>
  );
}
