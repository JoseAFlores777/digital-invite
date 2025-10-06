"use client";

import React, { useEffect, useState, useCallback, useRef } from "react";
import Loader from "@/components/Loader";
import EnvelopeWelcome from "@/components/EnvelopeWelcome";
import InvitationContent from "@/components/InvitationContent";
import SolicitudManager from "@/components/SolicitudManager";
import MusicControls from "@/components/MusicControls";

import MusicRoot from "@/components/MusicRoot";

type InvitationGuest = { guest?: { person?: { first_name?: string; last_name?: string } } };

export default function Home() {
  const [minimumDelayPassed, setMinimumDelayPassed] = useState(false);
  const [animationFinished, setAnimationFinished] = useState(false);
  const [dataReady, setDataReady] = useState(false);
  const [showLoaderOverlay, setShowLoaderOverlay] = useState(true);
  const [fadeOutLoader, setFadeOutLoader] = useState(false);
  const [envelopeVisible, setEnvelopeVisible] = useState(true);
  const [invitationId, setInvitationId] = useState<string | null>(null);
  const [initialHash, setInitialHash] = useState<string>("");
  const [envelopeFading, setEnvelopeFading] = useState(false);
  const [invitationMounted, setInvitationMounted] = useState(false);
  const [invitationVisible, setInvitationVisible] = useState(false);
  const [showSolicitudModal, setShowSolicitudModal] = useState(false);
  const [, setDigitalGuests] = useState<any[]>([]);
  const [, setInvitations] = useState<any[]>([]);
  const [, setWedding] = useState<any | null>(null);
  const [inviteError, setInviteError] = useState<string | null>(null);
  const [inviteSender, setInviteSender] = useState<string | undefined>(undefined);
  const [inviteSubtitle, setInviteSubtitle] = useState<string | undefined>(undefined);
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
    if (!initialHash) return;
    if (envelopeVisible) {
      setEnvelopeVisible(false);
      setInvitationMounted(true);
      setInvitationVisible(true);
    }
  }, [initialHash]);

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
    if (minimumDelayPassed && animationFinished && dataReady) {
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
  }, [animationFinished, minimumDelayPassed, dataReady, showLoaderOverlay]);

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

  // Read invitationID from URL and fetch invitation details before showing EnvelopeWelcome
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const invitationID = params.get("invitationID");
    setInvitationId(invitationID);
    setInitialHash(window.location.hash || "");
    if (!invitationID) {
      setInviteError("missing_invitation_id");
      setDataReady(true);
      return;
    }
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch(`/api/invitation-by-id?id=${encodeURIComponent(invitationID)}`);
        if (!res.ok) {
          setInviteError("invitation_not_found");
          setDataReady(true);
          return;
        }
        const data = await res.json();
        const guests = (data?.invitation?.guests ?? []) as InvitationGuest[];
        const code = data.invitation?.code ?? "";
        const invitationName = code.includes("Familia") ? `La ${code}` : code;
        if (!cancelled) {
          setInviteSender(invitationName);
          setInviteSubtitle("Boda Clarisa & José | 13-dic-2025");
        }
      } catch (e) {
        if (!cancelled) setInviteError("failed_to_fetch");
      } finally {
        if (!cancelled) setDataReady(true);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  // Keep loading of supplemental data (optional) after invite validation
  useEffect(() => {
    if (inviteError) return; // skip if invalid
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
  }, [inviteError]);

  useEffect(() => {
    if (!invitationVisible) return;
    const hash = initialHash.replace('#','');
    if (!hash) return;
    const el = document.getElementById(hash) || document.querySelector(hash) as HTMLElement | null;
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [invitationVisible, initialHash]);

  // Listen for RSVP section button to open SolicitudManager modal
  useEffect(() => {
    const handler = () => setShowSolicitudModal(true);
    (window as any).addEventListener('open-solicitud-modal', handler);
    return () => (window as any).removeEventListener('open-solicitud-modal', handler);
  }, []);

  return (

    <MusicRoot>
      <div className="bg-[color:var(--color-dusty-50)] text-[color:var(--color-dusty-900)]" style={{ minHeight: "100dvh" }}>
        {inviteError ? (
          <main className="min-h-screen grid place-items-center p-6 text-center">
            <div>
              <h1 className="text-2xl font-semibold mb-2">Lo sentimos</h1>
              <p className="opacity-80 max-w-md mx-auto">
                Para ver esta invitación debes acceder con un enlace válido que incluya tu identificador de invitación.
                Por favor, abre el enlace que recibiste o contacta a los anfitriones.
              </p>
            </div>
          </main>
        ) : envelopeVisible && inviteSender ? (
          <EnvelopeWelcome
            className={envelopeFading ? "opacity-0 pointer-events-none" : "opacity-100"}
            sealSlot={<img src="/wedding_seal.png" alt="Sello de cera" className="seal-img" />}
            sender={inviteSender}
            subtitle={inviteSubtitle || "Con mucho amor"}
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
        {!inviteError && showLoaderOverlay ? (
          <Loader
            onComplete={handleLoaderComplete}
            className={fadeOutLoader ? "fade-out" : ""}
          />
        ) : null}
        {invitationId ? (
          <SolicitudManager
            solicitudId={invitationId}
            asModal
            open={showSolicitudModal}
            onClose={() => setShowSolicitudModal(false)}
          />
        ) : null}
      </div>
    </MusicRoot>
  );
}
