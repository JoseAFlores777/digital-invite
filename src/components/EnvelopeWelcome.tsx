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
      className={`min-h-screen bg-violet-50 text-violet-900 transition-opacity duration-500 ${className}`}
      style={{
        minHeight: "100dvh",
        paddingBottom: "calc(32px + env(safe-area-inset-bottom))",
        paddingTop: "calc(16px + env(safe-area-inset-top))",
      }}
    >
      <div id="sobre-boda" className={`${ew.envelope} ${ew.envelopeFull} ${isOpening ? ew.opening : ""}`}>
        <div className={`${ew.body} ${ew.paperTexture}`} />
        <div className={ew.mouth} aria-hidden />
        <div className={ew.seal} aria-hidden>
          {sealSlot ? sealSlot : <span className={ew.sealText}>{sealText}</span>}
        </div>
        <div className={ew.overlay} aria-hidden={false}>
          <div className="flex flex-col items-center gap-3">
            <p className="text-xl text-violet-700/90 font-serif drop-shadow-[0_1px_1px_rgba(255,255,255,0.6)]">{sender}</p>
            <p className="text-sm text-violet-600/80 drop-shadow-[0_1px_1px_rgba(255,255,255,0.6)]">{subtitle}</p>
            <div className={ew.swipeWrap}>
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
          </div>
        </div>
      </div>
    </main>
  );
}
