"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { fetchWeddingGeneralities } from "@/lib/api/solicitudes";

type WeddingHeaderProps = {
  title?: string;
  subtitle?: string;
  className?: string;
  logoColor?: string;
  logoSize?: number;
  backgroundVariant?: "primary" | "secondary";
  size?: "sm" | "md" | "lg";
};

export default function WeddingHeader({
  title = "Boda Clarisa y José",
  subtitle = "",
  className,
  logoColor = "var(--color-dusty-500)",
  logoSize,
  backgroundVariant = "primary",
  size = "md",
}: WeddingHeaderProps) {
  const [dateLabel, setDateLabel] = useState<string>("");
  const searchParams = useSearchParams();
  const weddingId = (searchParams?.get("wedding_id") || process.env.NEXT_PUBLIC_WEDDING_ID || process.env.DIRECTUS_WEDDING_ID || "") as string;

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const wg = await fetchWeddingGeneralities(weddingId);
        if (!active || !wg) return;
        const date: string = wg?.wedding?.date || "";
        const start: string = wg?.wedding?.start_time || "";
        const timeZone: string | undefined = wg?.wedding?.timezone || undefined;
        console.log({ date, start, timeZone})
        if (date) {
          const [h = "00", m = "00"] = (start || "00:00").split(":");
          const iso = `${date}T${h.padStart(2, "0")}:${m.padStart(2, "0")}:00`;
          const d = new Date(iso);
          const fmtDate = new Intl.DateTimeFormat("es-ES", {
            weekday: "long",
            day: "2-digit",
            month: "long",
            year: "numeric",
            ...(isValidIanaTimeZone(timeZone) ? { timeZone: timeZone as string } : {}),
          }).format(d);

          const timeParts = new Intl.DateTimeFormat("es-ES", {
            hour: "numeric",
            hour12: true,
            ...(isValidIanaTimeZone(timeZone) ? { timeZone: timeZone as string } : {}),
          }).formatToParts(d);
          const hourStr = timeParts.find(p => p.type === "hour")?.value ?? "";
          let dayPeriod = timeParts.find(p => p.type === "dayPeriod")?.value ?? "";
          dayPeriod = dayPeriod.toLowerCase();

          const tzParts = new Intl.DateTimeFormat("es-ES", {
            timeZoneName: "shortOffset",
            ...(isValidIanaTimeZone(timeZone) ? { timeZone: timeZone as string } : {}),
          }).formatToParts(d);
          const tzName = tzParts.find(p => p.type === "timeZoneName")?.value ?? "";

          const fmtTime = hourStr ? `${hourStr} ${dayPeriod}`.trim() : "";
          const label = fmtTime
            ? `${fmtDate} — ${fmtTime}${tzName ? ` ${tzName}` : ""}`
            : `${fmtDate}${tzName ? ` — ${tzName}` : ""}`;

          console.log({ label })
          setDateLabel(label);
        }
      } catch {}
    })();
    return () => {
      active = false;
    };
  }, [weddingId]);

  const isSecondary = backgroundVariant === "secondary";
  const effectiveLogoColor = isSecondary ? "#ffffff" : logoColor;

  const sizeMap: Record<NonNullable<WeddingHeaderProps["size"]>, {
    logo: number;
    title: string;
    subtitle: string;
    date: string;
    headerMargin: string;
    padding: string;
    logoMarginBottom: string;
  }> = {
    sm: {
      logo: 72,
      title: "text-2xl md:text-3xl",
      subtitle: "text-xs md:text-sm",
      date: "text-sm md:text-base",
      headerMargin: "mb-6 md:mb-8",
      padding: "p-5 md:p-6",
      logoMarginBottom: "mb-3",
    },
    md: {
      logo: 96,
      title: "text-3xl md:text-4xl",
      subtitle: "text-sm md:text-base",
      date: "text-base md:text-lg",
      headerMargin: "mb-8 md:mb-10",
      padding: "p-6 md:p-8",
      logoMarginBottom: "mb-4",
    },
    lg: {
      logo: 120,
      title: "text-4xl font-light md:text-5xl",
      subtitle: "text-base md:text-lg",
      date: "text-lg md:text-xl",
      headerMargin: "mb-10 md:mb-12",
      padding: "p-8 md:p-10",
      logoMarginBottom: "mb-5",
    },
  };

  const cfg = sizeMap[size] || sizeMap.md;
  const computedLogoSize = typeof logoSize === "number" ? logoSize : cfg.logo;
  const subtitleColor = isSecondary ? "text-white/90" : "text-[color:var(--color-dusty-800)]";
  const dateColor = isSecondary ? "text-white" : "text-[color:var(--color-dusty-800)]";
  const subtitleClass = ["mt-1", cfg.subtitle, subtitleColor].join(" ");
  const dateClass = ["mt-2", cfg.date, dateColor].join(" ");

  return (
    <header
      className={
        (
          "text-center " +
          cfg.headerMargin +
          " " +
          (isSecondary ? "text-white rounded-xl " + cfg.padding + " " : "")
        ) + (className || "")
      }
      style={isSecondary ? { backgroundColor: "var(--color-dusty-500)" } : undefined}
    >
      <div className={"mt-10 md:mt-20 flex items-center justify-center " + cfg.logoMarginBottom}>
        <span
          aria-hidden
          style={{
            width: computedLogoSize,
            height: computedLogoSize,
            backgroundColor: effectiveLogoColor,
            WebkitMaskImage: 'url(/wedding-Logo.svg)',
            maskImage: 'url(/wedding-Logo.svg)',
            WebkitMaskRepeat: 'no-repeat',
            maskRepeat: 'no-repeat',
            WebkitMaskSize: 'contain',
            maskSize: 'contain',
            WebkitMaskPosition: 'center',
            maskPosition: 'center',
            display: 'inline-block',
          }}
        />
      </div>
      <h1 className={"display-font " + cfg.title + " font-medium tracking-tight"}>{title}</h1>
      {subtitle ? (
        <p className={subtitleClass}>{subtitle}</p>
      ) : null}
      {dateLabel ? (
        <p className={dateClass}>{dateLabel}</p>
      ) : null}
    </header>
  );
}

function isValidIanaTimeZone(tz?: string) {
  if (!tz) return false;
  try {
    new Intl.DateTimeFormat("en-US", { timeZone: tz }).format();
    return true;
  } catch {
    return false;
  }
}

function capitalize(s: string) {
  if (!s) return s;
  return s.charAt(0).toUpperCase() + s.slice(1);
}
