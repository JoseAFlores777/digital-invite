"use client";

import React, { useCallback, useRef, useState } from "react";
import { SwipeableButton } from "react-swipeable-button";
import ew from "./EnvelopeWelcome.module.scss";
import { useMusic } from "./MusicProvider";
import CustomBtn from "@/components/CustomBtn";
import WeddingHeader from "@/components/WeddingHeader";
import SwipeRightHintOverlay from "@/components/SwipeRightHintOverlay";

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
  const [finalGifts, setFinalGifts] = useState<string | null>(null);
  const [shareHref, setShareHref] = useState<string | null>(null);
  const [confirmHref, setConfirmHref] = useState<string | null>(null);

  React.useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const current = new URL(window.location.href);
      const weddingId = current.searchParams.get("wedding_id") || process.env.NEXT_PUBLIC_WEDDING_ID || "";
      const giftsUrl = new URL(current.origin);
      giftsUrl.pathname = "/gifts";
      if (weddingId) giftsUrl.searchParams.set("wedding_id", weddingId);
      const final = giftsUrl.toString();
      setShareHref(final);

      const invitationID = current.searchParams.get("invitationID");
      if (invitationID) {
        const confirm = new URL("https://invite.joseiz.com/solicitud/");
        confirm.searchParams.set("invitationID", invitationID);
        setConfirmHref(confirm.toString());
      } else {
        setConfirmHref(null);
      }
    } catch {
      const fallback = "/gifts";
      setShareHref(fallback);
      setConfirmHref(null);
    }
  }, []);


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
      <SwipeRightHintOverlay
          delaysMs={[20000, 6000]}   // aparece a los 3s, la siguiente vez a los 6s
          size="sm"
          enableOnDesktop          // importante si pruebas en desktop
          suppressWhenModal={false} // ponlo en true si quieres que el “modal” lo suprima
      >
      <main
        className={`min-h-screen bg-white text-[color:var(--color-dusty-800)] overflow-x-hidden overflow-y-auto transition-opacity duration-500 ${className}`}
        style={{
          minHeight: "100dvh",
        }}
      >
        <div id="sobre-boda" className={`${ew.envelope} ${ew.envelopeFull} ${isOpening ? ew.opening : ""}`}>
          {/*<div className={`${ew.body} ${ew.paperTexture}`} />*/}
          {/*<div className={ew.mouth} aria-hidden />*/}
          {/*<div className={ew.seal} aria-hidden>*/}
          {/*  {sealSlot ? sealSlot : <span className={ew.sealText}>{sealText}</span>}*/}
          {/*</div>*/}
          <div className={"flex flex-col justify-between items-center"} aria-hidden={false}>
            <WeddingHeader title="Boda Clarisa & José" size={"lg"}/>
            <div className="flex flex-col justify-between items-center gap-15 min-h-[40vh] py-6 px-4">
              <div className="text-center">
                <p className="sans-font text-base font-semibold tracking-wide" style={{ color: "var(--color-dusty-900)" }}>Invitación Especial para</p>
                <p className="display-font text-2xl md:text-3xl tracking-wide mt-1" style={{ color: "var(--color-dusty-900)" }}>{sender}</p>
                <p className="sans-font text-base opacity-80 mt-2" style={{ color: "var(--color-dusty-700)" }}>{subtitle}</p>
              </div>
              <div className={ew.swipeWrap}>
                <p className="display-font text-base md:text-lg mb-1 text-center opacity-70" style={{ color: "var(--color-dusty-700)" }}>
                  Desliza para abrir
                </p>
                <SwipeableButton
                  name="invite-swipe"
                  onSuccess={handleOpen}
                  text={buttonText}
                  text_unlocked="¡Bienvenido!"
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
              <div aria-hidden={isOpening} className={`mt-4 flex justify-center gap-3 flex-wrap transition-opacity duration-500 ${isOpening ? "opacity-0 pointer-events-none" : "opacity-100"}`}>
                {shareHref ? (
                  <CustomBtn
                    key="envelope-gifts-link"
                    href={shareHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    label="Ir a mesa de regalos"
                    icon="mingcute:gift-line"
                    variant="outline"
                    ariaLabel="Compartir enlace de regalos por WhatsApp: Mesa de regalos"
                    size={"lg"}
                    className={"animate-pulse"}
                    shine
                  />
                ) : null}
                {confirmHref ? (
                  <CustomBtn
                    key="envelope-confirm-link"
                    href={confirmHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    label="Confirmar invitación"
                    icon="material-symbols:fact-check-outline-rounded"
                    variant="outline"
                    ariaLabel="Confirmar asistencia a la invitación"
                    size={"lg"}
                  />
                ) : null}
              </div>
            <div className="text-center pb-3">
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
    </SwipeRightHintOverlay>
  );
}
