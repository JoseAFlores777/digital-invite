"use client";

import React, { useEffect, useState, useCallback, useRef } from "react";
import Loader from "@/components/Loader";
import EnvelopeWelcome from "@/components/EnvelopeWelcome";
import InvitationContent from "@/components/InvitationContent";
import MusicControls from "@/components/MusicControls";

import MusicRoot from "@/components/MusicRoot";

export default function Home() {
  const [minimumDelayPassed, setMinimumDelayPassed] = useState(false);
  const [animationFinished, setAnimationFinished] = useState(false);
  const [showLoaderOverlay, setShowLoaderOverlay] = useState(true);
  const [fadeOutLoader, setFadeOutLoader] = useState(false);
  const [envelopeVisible, setEnvelopeVisible] = useState(true);
  const [envelopeFading, setEnvelopeFading] = useState(false);
  const [invitationMounted, setInvitationMounted] = useState(false);
  const [invitationVisible, setInvitationVisible] = useState(false);
  const [, setDigitalGuests] = useState<any[]>([]);
  const [, setInvitations] = useState<any[]>([]);
  const [, setWedding] = useState<any | null>(null);
  const loaderFadeTimeoutRef = useRef<number | undefined>(undefined);
  const envelopeTimeoutRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    const timer = window.setTimeout(() => setMinimumDelayPassed(true), 1500);
    return () => window.clearTimeout(timer);
  }, []);

  const handleLoaderComplete = useCallback(() => {
    setAnimationFinished(true);
  }, []);

  const handleOpenComplete = useCallback(() => {
    setEnvelopeFading(true);
    if (envelopeTimeoutRef.current) {
      window.clearTimeout(envelopeTimeoutRef.current);
    }
    envelopeTimeoutRef.current = window.setTimeout(() => {
      setEnvelopeVisible(false);
      setInvitationMounted(true);
      requestAnimationFrame(() => setInvitationVisible(true));
    }, 950);
  }, []);

  useEffect(() => {
    return () => {
      if (loaderFadeTimeoutRef.current) {
        window.clearTimeout(loaderFadeTimeoutRef.current);
      }
      if (envelopeTimeoutRef.current) {
        window.clearTimeout(envelopeTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!showLoaderOverlay) return;
    if (minimumDelayPassed && animationFinished) {
      setFadeOutLoader(true);
      loaderFadeTimeoutRef.current = window.setTimeout(() => {
        setShowLoaderOverlay(false);
      }, 460);
      return () => {
        if (loaderFadeTimeoutRef.current) {
          window.clearTimeout(loaderFadeTimeoutRef.current);
        }
      };
    }
  }, [animationFinished, minimumDelayPassed, showLoaderOverlay]);

  useEffect(() => {
    const prev = document.body.style.overflow;
    if (envelopeVisible) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = prev || "";
    }
    return () => {
      document.body.style.overflow = prev;
    };
  }, [envelopeVisible]);

  useEffect(() => {
    let active = true;
    const weddingId = process.env.NEXT_PUBLIC_WEDDING_ID;
    const invitationsUrl = weddingId
      ? `/api/wedding-invitations?wedding_id=${encodeURIComponent(weddingId)}`
      : "/api/wedding-invitations";
    const weddingUrl = weddingId
      ? `/api/wedding-generalities?wedding_id=${encodeURIComponent(weddingId)}`
      : "/api/wedding-generalities";

    Promise.all([
      fetch("/api/digital-guests").then((r) => r.json()).catch(() => ({ guests: [] })),
      fetch(invitationsUrl).then((r) => r.json()).catch(() => ({ invitations: [] })),
      fetch(weddingUrl).then((r) => r.json()).catch(() => ({ wedding: null })),
    ])
      .then(([guestsRes, invitationsRes, weddingRes]) => {
        if (!active) return;
        setDigitalGuests(Array.isArray(guestsRes?.guests) ? guestsRes.guests : []);
        setInvitations(Array.isArray(invitationsRes?.invitations) ? invitationsRes.invitations : []);
        setWedding(weddingRes?.wedding ?? null);
      })
      .catch(() => {
        if (!active) return;
        setDigitalGuests([]);
        setInvitations([]);
        setWedding(null);
      });

    return () => {
      active = false;
    };
  }, []);

  return (

    <MusicRoot>
      <div className="bg-[color:var(--color-dusty-50)] text-[color:var(--color-dusty-900)]" style={{ minHeight: "100dvh" }}>
        {envelopeVisible ? (
          <EnvelopeWelcome
            className={envelopeFading ? "opacity-0 pointer-events-none" : "opacity-100"}
            sealSlot={<img src="/wedding_seal.png" alt="Sello de cera" className="seal-img" />}
            sender="Invitación especial para Familia Izaguirre Vallejo"
            subtitle="Con mucho amor"
            buttonText="Abrir invitación"
            onOpenComplete={handleOpenComplete}
          />
        ) : null}
        {invitationMounted ? (
          <div className={`transition-opacity duration-700 ${invitationVisible ? "opacity-100" : "opacity-0"}`}>
            <InvitationContent />
            {invitationVisible ? <MusicControls /> : null}
          </div>
        ) : null}
        {showLoaderOverlay ? (
          <Loader
            onComplete={handleLoaderComplete}
            className={fadeOutLoader ? "fade-out" : ""}
          />
        ) : null}
      </div>
    </MusicRoot>
  );
}
