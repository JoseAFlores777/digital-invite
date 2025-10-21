"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { useGsapContext, gsap } from "@/hooks/useGsapContext";
import Modal from "react-modal";
import { Icon } from "@iconify/react";
import toast, { Toaster } from "react-hot-toast";
import CustomBtn from "@/components/CustomBtn";

type GiftOption = {
  id: string | number;
  icon: string;
  title: string;
  gradient?: string;
  details: Record<string, string>;
  redirectBtn?: {
    hide?: boolean;
    url?: string;
    label?: string;
    icon?: string;
  };
};

export default function Gift({ hideCopy = false, shareHref, finalGifts }: { hideCopy?: boolean; shareHref?: string; finalGifts?: string }) {
  const root = useRef<HTMLDivElement>(null);
  const iconRef = useRef<HTMLSpanElement>(null);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [openId, setOpenId] = useState<GiftOption["id"] | null>(null);
  const [clientHref, setClientHref] = useState<string | null>(null);

  useGsapContext(() => {
    if (!root.current) return;
    gsap.from(root.current, {
      opacity: 0,
      y: 24,
      duration: 0.8,
      ease: "power2.out",
      scrollTrigger: { trigger: root.current, start: "top 80%", toggleActions: "play none none reverse" },
    });
  }, []);

  useEffect(() => {
    if (shareHref) return;
    if (typeof window === "undefined") return;
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
      const message = `¡Hola! 🙌\n\nQuiero compartirte el enlace para enviar un regalo en línea por la boda de *Clarisa y José* 💍\n\nEnlace para enviar regalo:\n${giftsUrlStr}\n\n¡Gracias de todo corazón\n\n*DIOS te bendiga*! 🙌`;
      setClientHref(`https://api.whatsapp.com/send?text=${encodeURIComponent(message)}`);
    } catch {
      const fallback = finalGifts || "/gifts";
      const message = `¡Hola! 🙌\n\nQuiero compartirte el enlace para enviar un regalo en línea por la boda de *Clarisa y José* 💍\n\nEnlace para enviar regalo:\n${fallback}\n\n¡Gracias de todo corazón\n\n*DIOS te bendiga*! 🙌`;
      setClientHref(`https://api.whatsapp.com/send?text=${encodeURIComponent(message)}`);
    }
  }, [shareHref, finalGifts]);

  const [options, setOptions] = useState<GiftOption[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const params = new URLSearchParams(window.location.search);
    const weddingId = params.get("wedding_id") || process.env.NEXT_PUBLIC_WEDDING_ID || "";
    const url = weddingId ? `/api/gift-options?wedding_id=${encodeURIComponent(weddingId)}` : "/api/gift-options";

    fetch(url)
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((data) => {
        const opts = Array.isArray(data?.options) ? data.options : [];
        const mapped: GiftOption[] = opts.map((o: any) => ({
          id: o.id,
          icon: o.icon || "lucide:gift",
          title: o.title || "",
          details: (o.details && typeof o.details === "object") ? o.details as Record<string, string> : {},
          redirectBtn: {
            hide: o.redirectBtn_hide ?? true,
            url: o.redirectBtn_url || undefined,
            label: o.redirectBtn_label || undefined,
            icon: o.redirectBtn_icon || undefined,
          },
        }));
        setOptions(mapped);
      })
      .catch(() => setOptions([]))
      .finally(() => setLoading(false));
  }, []);

  const copyText = useCallback(async (label: string, value: string, el?: HTMLElement) => {
    const animate = () => {
      if (el) {
        gsap.fromTo(
          el,
          { y: 0, scale: 1 },
          { y: -4, scale: 1.12, duration: 0.16, yoyo: true, repeat: 1, ease: "power1.out" }
        );
      }
    };
    const markCopied = () => {
      setCopiedKey(label);
      animate();
      setTimeout(() => setCopiedKey(null), 1400);
    };

    try {
      await navigator.clipboard.writeText(value);
      markCopied();
      return;
    } catch {}

    try {
      const ta = document.createElement("textarea");
      ta.value = value;
      ta.setAttribute("readonly", "");
      ta.style.position = "fixed";
      ta.style.left = "-9999px";
      document.body.appendChild(ta);
      ta.focus();
      ta.select();
      const ok = document.execCommand("copy");
      document.body.removeChild(ta);
      if (ok) {
        markCopied();
        return;
      }
    } catch {}

    try {
      await navigator.clipboard.writeText(value);
      markCopied();
      return;
    } catch {
      toast.error("No se pudo copiar. Intenta manualmente.");
    }
  }, []);

  return (
    <section id="regalo" ref={root} className="bg-white">

      <div className="max-w-5xl mx-auto px-6 py-20">
        <div className="text-center mb-10">
          <div className="inline-block mb-4">
            <Icon icon="lucide:gift" className="w-12 h-12 text-[color:var(--color-dusty-600)]" />
          </div>
          <h2 className="display-font text-3xl md:text-4xl mb-3">Mesa de Regalos</h2>
            {!( !shareHref && typeof window === "undefined" ) && (
              <div className="flex justify-center mb-6">
                <CustomBtn
                    className={"animate-pulse"}
                  key="share-info"
                  href={shareHref || clientHref || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  label="Compartir esta información"
                  icon="mdi:whatsapp"
                  variant="outline"
                />
              </div>
            )}
          <p className="text-neutral-700 max-w-2xl mx-auto">
            Tu presencia es lo más importante para nosotros. Si deseas hacernos un obsequio, aquí te compartimos algunas opciones.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-5 max-w-3xl mx-auto">
          {options.map((opt) => (
            <CustomBtn
              key={opt.id}
              onClick={() => setOpenId(opt.id)}
              className="w-full text-left group rounded-2xl border border-[color:var(--color-dusty-200)] bg-white/90 hover:bg-[color:var(--color-dusty-50)]/60 shadow-sm hover:shadow-lg transition-all duration-300 p-5 focus-visible:ring-2 focus-visible:ring-[color:var(--color-dusty-400)] hover:-translate-y-0.5 justify-start"
              variant="outline"
            >
              <div className="flex items-center gap-4">
                <div className="shrink-0 w-14 h-14 rounded-full bg-[color:var(--color-dusty-600)] shadow-md grid place-items-center">
                  <Icon icon={opt.icon} className="w-7 h-7 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="display-font text-xl text-[color:var(--color-dusty-900)] mb-1">{opt.title}</h3>
                  <span className="inline-flex items-center gap-1 text-[color:var(--color-dusty-700)]">
                    Ver detalles
                    <Icon icon="lucide:arrow-right" className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </div>
              </div>
            </CustomBtn>
          ))}
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm uppercase tracking-wide text-[color:var(--color-dusty-700)] mb-2">¿Tienes dudas?</p>
          <CustomBtn
                      key="contact-couple"
                      href="https://api.whatsapp.com/send?phone=50497683309"
                      target="_blank"
                      rel="noopener noreferrer"
                      label="Hablar con la pareja"
                      icon="mdi:whatsapp"
                      variant="outline"
                      size="md"
                    />
        </div>

        <div className="mt-10 text-center">
          <div className="inline-block rounded-2xl border border-[color:var(--color-dusty-200)] bg-[color:var(--color-dusty-50)]/60 px-5 py-4 max-w-2xl">
            <p className="text-neutral-700 mt-2">El día de la boda tendremos a disposición nuestro baúl de regalos por si tu regalo es en efectivo.</p>
          </div>
        </div>
        <div className="mt-5 text-center">
          <div className="inline-block rounded-2xl border border-[color:var(--color-dusty-200)] bg-[color:var(--color-dusty-50)]/60 px-5 py-4 max-w-2xl">
            <p className="text-neutral-700">💕 Cada gesto cuenta y lo apreciamos de corazón. Tu amor y buenos deseos son lo más valioso para nosotros.</p>
          </div>
        </div>

        {options.map((opt) => (
          <GiftDialog
            key={opt.id}
            option={opt}
            open={openId === opt.id}
            onClose={() => setOpenId(null)}
            onCopy={copyText}
            iconRef={iconRef}
            showCopy={!hideCopy}
            copiedKey={copiedKey}
          />
        ))}
      </div>
      <Toaster />
    </section>
  );
}

type DialogProps = {
  option: GiftOption;
  open: boolean;
  onClose: () => void;
  onCopy: (label: string, value: string, el?: HTMLElement) => void;
  iconRef: React.RefObject<HTMLSpanElement>;
  showCopy?: boolean;
  copiedKey?: string | null;
};

function GiftDialog({ option, open, onClose, onCopy, iconRef, showCopy = true, copiedKey }: DialogProps) {
  React.useEffect(() => {
    try {
      if (typeof window !== "undefined") {
        const el = document.getElementById("__next") || document.body;
        if (el) Modal.setAppElement(el as HTMLElement);
      }
    } catch {}
  }, []);

  React.useEffect(() => {
    if (typeof window === "undefined") return;
    const { body, documentElement } = document;
    const prevBodyOverflow = body.style.overflow;
    const prevDocOverflow = documentElement.style.overflow;
    const prevBodyTouch = body.style.touchAction;
    if (open) {
      body.style.overflow = "hidden";
      documentElement.style.overflow = "hidden";
      body.style.touchAction = "none";
    }
    return () => {
      body.style.overflow = prevBodyOverflow;
      documentElement.style.overflow = prevDocOverflow;
      body.style.touchAction = prevBodyTouch;
    };
  }, [open]);

  return (
    <Modal
      isOpen={open}
      onRequestClose={onClose}
      shouldCloseOnOverlayClick
      shouldCloseOnEsc
      overlayClassName="fixed inset-0 z-50 bg-black/40 backdrop-blur-[1px]"
      className="outline-none w-[min(520px,92vw)] mx-auto my-12 bg-white/95 border border-[color:var(--color-dusty-300)] rounded-2xl shadow-xl p-6"
      contentLabel={option.title}
      ariaHideApp={false}
      id={`gift-dialog-${option.id}`}
    >
      <div className="flex items-center gap-3 mb-4 w-full">
        <div className="w-10 h-10 rounded-full bg-[color:var(--color-dusty-600)] grid place-items-center">
          <Icon icon={option.icon} className="w-5 h-5 text-white" />
        </div>
        <h3 className="display-font text-2xl text-[color:var(--color-dusty-900)] flex-1">{option.title}</h3>
        <CustomBtn
          key={`close-${option.id}`}
          onClick={onClose}
          ariaLabel="Cerrar"
          className="ml-auto inline-flex h-9 w-9 items-center justify-center rounded-full !px-0 !py-0 shrink-0"
          variant="outline"
          size="sm"
        >
          ×
        </CustomBtn>
      </div>
      <div className="grid gap-3">
        {Object.entries(option.details).map(([label, value]) => (
          <div key={label} className="flex items-start justify-between gap-3">
            <div>
              <p className="text-sm font-medium text-[color:var(--color-dusty-900)]">{label}:</p>
              <p className="font-mono text-sm text-[color:var(--color-dusty-800)] break-all">{value}</p>
            </div>
            {showCopy && (
              <CustomBtn
                key={`copy-${label}`}
                onClick={(e) => onCopy(label, value, (e.currentTarget.querySelector('[data-copy-icon]') as HTMLElement | null) || undefined)}
                ariaLabel={`${copiedKey === label ? "Copiado" : "Copiar"} ${label}`}
                className="self-center inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs !px-3.5 !py-1.5"
                variant="outline"
                icon={copiedKey === label ? "lucide:check" : "lucide:copy"}
                size="sm"
              >
              </CustomBtn>
            )}
          </div>
        ))}
      </div>
      {option.redirectBtn && option.redirectBtn.hide !== true && option.redirectBtn.url ? (
        <div className="mt-5 pt-4 border-t border-[color:var(--color-dusty-200)]">
          <CustomBtn
            key={`redirect-${option.id}`}
            href={option.redirectBtn.url}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full"
            label={option.redirectBtn.label ?? "Abrir enlace"}
            icon={option.redirectBtn.icon}
            variant="outline"
            size="md"
            shine={true}
          />
        </div>
      ) : null}
    </Modal>
  );
}
