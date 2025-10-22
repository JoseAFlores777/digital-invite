"use client";

import React, { useEffect, useMemo, useState } from "react";
import { Icon } from "@iconify/react";

type Props = {
  className?: string;
  shareHref?: string; // When provided, used as-is to ensure SSR/CSR match
  finalGifts?: string; // Optional: pass only the final /gifts URL (or fallback) and we will build the WhatsApp href
  label?: string;
  icon?: string;
};

export default function GiftsShareButton({ className = "", shareHref, finalGifts, label = "Compartir esta información", icon = "mdi:whatsapp" }: Props) {
  // If shareHref is not provided, compute it on the client after mount to avoid SSR mismatch
  const [clientHref, setClientHref] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    if (shareHref) return; // nothing to compute
    if (typeof window === "undefined") return; // SSR path safeguards

    try {
      let giftsUrlStr: string;
      if (finalGifts) {
        giftsUrlStr = finalGifts;
      } else {
        const current = new URL(window.location.href);
        const weddingId = current.searchParams.get("wedding_id") || "";
        const giftsUrl = new URL(current.origin);
        giftsUrl.pathname = "/gifts";
        if (weddingId) giftsUrl.searchParams.set("wedding_id", weddingId);
        giftsUrlStr = giftsUrl.toString();
      }
      const message = `¡Hola! 🙌\n\nQueremos compartirte el enlace para enviar un regalo en línea por nuestra boda de *Clarisa y José* 💍\n\nAquí está:\n${giftsUrlStr}\n\n¡Gracias de todo corazón\n\n*DIOS te bendiga*! 🙌`;
      setClientHref(`https://api.whatsapp.com/send?text=${encodeURIComponent(message)}`);
    } catch {
      const fallback = finalGifts || "/gifts";
      const message = `¡Hola! 🙌\n\nQueremos compartirte el enlace para enviar un regalo en línea por nuestra boda de *Clarisa y José* 💍\n\nAquí está:\n${fallback}\n\n¡Gracias de todo corazón\n\n*DIOS te bendiga*! 🙌`;
      setClientHref(`https://api.whatsapp.com/send?text=${encodeURIComponent(message)}`);
    }
  }, [shareHref, finalGifts]);

  // If no SSR-provided href, avoid rendering on the server to prevent hydration mismatch
  if (!shareHref && !mounted) return null;

  const href = (shareHref || clientHref || "#") as string;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={"Compartir enlace de regalos por WhatsApp: " + label}
      className={
        "inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-neutral-300 bg-white hover:bg-neutral-50 text-base font-medium " +
        className
      }
    >
      <Icon icon={icon} className="w-5 h-5 text-green-600" />
      <span>{label}</span>
    </a>
  );
}
