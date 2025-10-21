"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { useGsapContext, gsap } from "@/hooks/useGsapContext";
import Modal from "react-modal";
import { Icon } from "@iconify/react";
import toast, { Toaster } from "react-hot-toast";

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

export default function Gift({ hideCopy = false }: { hideCopy?: boolean }) {
  const root = useRef<HTMLDivElement>(null);
  const iconRef = useRef<HTMLSpanElement>(null);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [openId, setOpenId] = useState<GiftOption["id"] | null>(null);

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

  const [options, setOptions] = useState<GiftOption[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
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
            <Icon icon="lucide:gift" className="w-12 h-12 text-[color:var(--color-dusty-600)] animate-pulse" />
          </div>
          <h2 className="display-font text-3xl md:text-4xl mb-3">Mesa de Regalos</h2>
          <p className="text-neutral-700 max-w-2xl mx-auto">
            Tu presencia es lo más importante para nosotros. Si deseas hacernos un obsequio, aquí te compartimos algunas opciones.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-5 max-w-3xl mx-auto">
          {options.map((opt) => (
            <button
              key={opt.id}
              className="text-left group rounded-2xl border border-[color:var(--color-dusty-200)] bg-white/90 hover:bg-[color:var(--color-dusty-50)]/60 shadow-sm hover:shadow-lg transition-all duration-300 p-5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-dusty-400)] hover:-translate-y-0.5"
              onClick={() => setOpenId(opt.id)}
              aria-haspopup="dialog"
              aria-controls={`gift-dialog-${opt.id}`}
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
            </button>
          ))}
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm uppercase tracking-wide text-[color:var(--color-dusty-700)] mb-2">¿Tienes dudas?</p>
          <a href="https://api.whatsapp.com/send?phone=50497683309" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm bg-[color:var(--color-dusty-600)] text-white hover:bg-[color:var(--color-dusty-700)] active:scale-[0.99] transition">Hablar con la pareja</a>
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
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-full bg-[color:var(--color-dusty-600)] grid place-items-center">
          <Icon icon={option.icon} className="w-5 h-5 text-white" />
        </div>
        <h3 className="display-font text-2xl text-[color:var(--color-dusty-900)]">{option.title}</h3>
        <button
          aria-label="Cerrar"
          onClick={onClose}
          className="ml-auto inline-flex h-9 w-9 items-center justify-center rounded-full border border-[color:var(--color-dusty-300)] text-[color:var(--color-dusty-800)] bg-white/70 hover:bg-[color:var(--color-dusty-100)] active:scale-[0.98] transition"
        >
          ×
        </button>
      </div>
      <div className="grid gap-3">
        {Object.entries(option.details).map(([label, value]) => (
          <div key={label} className="flex items-start justify-between gap-3">
            <div>
              <p className="text-sm font-medium text-[color:var(--color-dusty-900)]">{label}:</p>
              <p className="font-mono text-base text-[color:var(--color-dusty-800)] break-all">{value}</p>
            </div>
            {showCopy && (
              <button
                onClick={(e) => onCopy(label, value, (e.currentTarget.querySelector('[data-copy-icon]') as HTMLElement | null) || undefined)}
                className="self-center inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs bg-[color:var(--color-dusty-600)] text-white hover:bg-[color:var(--color-dusty-700)] active:scale-[0.99] transition"
                aria-label={`${copiedKey === label ? "Copiado" : "Copiar"} ${label}`}
              >
                <span ref={iconRef} data-copy-icon aria-hidden="true" className="inline-flex">
                  <Icon icon={copiedKey === label ? "lucide:check" : "lucide:copy"} className="w-4 h-4 text-white" />
                </span>
                {copiedKey === label ? "Copiado" : "Copiar"}
              </button>
            )}
          </div>
        ))}
      </div>
      {option.redirectBtn && option.redirectBtn.hide !== true && option.redirectBtn.url ? (
        <div className="mt-5 pt-4 border-t border-[color:var(--color-dusty-200)]">
          <a
            href={option.redirectBtn.url}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm bg-[color:var(--color-dusty-600)] text-white hover:bg-[color:var(--color-dusty-700)] active:scale-[0.99] transition"
          >
            {option.redirectBtn.icon && <Icon icon={option.redirectBtn.icon} className="w-5 h-5 text-white" />}
            {option.redirectBtn.label ?? "Abrir enlace"}
          </a>
        </div>
      ) : null}
    </Modal>
  );
}
