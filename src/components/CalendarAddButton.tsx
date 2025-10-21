"use client";

import React from "react";
import {AnimatedShinyText} from "@/components/ui/animated-shiny-text";

export type CalendarAddButtonProps = {
  date: string; // yyyy-MM-dd
  startTime?: string | null; // HH:mm or HH:mm:ss
  endTime?: string | null; // HH:mm or HH:mm:ss
  timezone?: string | null;
  title?: string | null; // Summary override
  coupleName?: string | null; // Used if title not provided: "Boda {coupleName}"
  location?: string | null; // Full location string
  venueName?: string | null; // If location not provided, will join venueName + address
  address?: string | null;
  googleMapsLink?: string | null;
  wazeLink?: string | null;
  uidPrefix?: string | null; // e.g., solicitudId
  confirmUrl?: string | null; // Optional URL property in ICS
  fileName?: string | null; // Optional custom filename
  className?: string;
  disabled?: boolean;
  children?: React.ReactNode; // Content of the button (icon + label)
} & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onClick" | "disabled" | "className">;

function normalizeTz(input?: string | null) {
  if (!input) return "";
  const v = String(input).trim();
  if (/^[a-z\/_-]+$/i.test(v)) return v;
  return "";
}

function icsEscape(input: string) {
  return input
    .replace(/\\/g, "\\\\")
    .replace(/,/g, "\\,")
    .replace(/;/g, "\\;")
    .replace(/\r?\n/g, "\\n");
}

function sanitizeFileName(name: string) {
  return name.replace(/[\/:*?"<>|]+/g, "-");
}

export default function CalendarAddButton({
  date,
  startTime,
  endTime,
  timezone,
  title,
  coupleName,
  location,
  venueName,
  address,
  googleMapsLink,
  wazeLink,
  uidPrefix,
  confirmUrl,
  fileName,
  className,
  disabled,
  children,
  ...rest
}: CalendarAddButtonProps) {
  function handleClick() {
    try {
      if (!date) return;
      const startPart = startTime || "00:00:00";
      const endPart = endTime || "";
      const [sh = "0", sm = "0"] = String(startPart).split(":");
      const [yy, mm, dd] = String(date).split("-").map(Number);
      const pad = (n: number) => String(n).padStart(2, "0");
      const DTSTART_LOCAL = `${yy}${pad(mm)}${pad(dd)}T${pad(Number(sh))}${pad(Number(sm))}00`;

      let DTEND_LOCAL = "";
      if (endPart) {
        const [eh = "0", em = "0"] = String(endPart).split(":");
        DTEND_LOCAL = `${yy}${pad(mm)}${pad(dd)}T${pad(Number(eh))}${pad(Number(em))}00`;
      }

      const tzid = normalizeTz(timezone || "");
      const hasWaze = !!wazeLink;
      const hasGmaps = !!googleMapsLink;

      const resolvedSummary = (title && title.trim())
        ? title.trim()
        : (coupleName && coupleName.trim())
          ? `Boda ${coupleName.trim()}`
          : "Boda";

      const resolvedLocation = location && location.trim()
        ? location.trim()
        : [venueName, address].filter(Boolean).join(", ");

      let descriptionText = "";
      if (hasWaze && hasGmaps) {
        descriptionText = `Maneja con Waze -> ${wazeLink}\nAbrir en Google Maps -> ${googleMapsLink}`;
      } else if (hasWaze) {
        descriptionText = `Maneja con Waze -> ${wazeLink}`;
      } else if (hasGmaps) {
        descriptionText = `Abrir en Google Maps -> ${googleMapsLink}`;
      } else if (resolvedLocation) {
        descriptionText = `Ubicación: ${resolvedLocation}`;
      }

      const now = new Date();
      const pad2 = (n: number) => String(n).padStart(2, "0");
      const dtstamp = `${now.getUTCFullYear()}${pad2(now.getUTCMonth() + 1)}${pad2(now.getUTCDate())}T${pad2(now.getUTCHours())}${pad2(now.getUTCMinutes())}${pad2(now.getUTCSeconds())}Z`;

      const lines = [
        "BEGIN:VCALENDAR",
        "VERSION:2.0",
        "PRODID:-//digital-invite//CalendarAddButton//ES",
        "CALSCALE:GREGORIAN",
        "METHOD:PUBLISH",
        "BEGIN:VEVENT",
        tzid ? `DTSTART;TZID=${tzid}:${DTSTART_LOCAL}` : `DTSTART:${DTSTART_LOCAL}`,
        (DTEND_LOCAL && tzid) ? `DTEND;TZID=${tzid}:${DTEND_LOCAL}` : (DTEND_LOCAL ? `DTEND:${DTEND_LOCAL}` : ""),
        `DTSTAMP:${dtstamp}`,
        `UID:${uidPrefix ? uidPrefix + "-" : ""}${Date.now()}@digital-invite`,
        `SUMMARY:${icsEscape(resolvedSummary)}`,
        resolvedLocation ? `LOCATION:${icsEscape(resolvedLocation)}` : "",
        confirmUrl ? `URL:${confirmUrl}` : "",
        descriptionText ? `DESCRIPTION:${icsEscape(descriptionText)}` : "",
        "END:VEVENT",
        "END:VCALENDAR",
      ].filter(Boolean);

      const blob = new Blob([lines.join("\r\n")], { type: "text/calendar;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      const safeName = sanitizeFileName((fileName && fileName.trim()) || `${resolvedSummary}.ics`);
      a.download = safeName.endsWith(".ics") ? safeName : `${safeName}.ics`;
      document.body.appendChild(a);
      a.click();
      setTimeout(() => { URL.revokeObjectURL(url); a.remove(); }, 0);
    } catch {
      // swallow
    }
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className={className}
      disabled={disabled}
      {...rest}
    >
      {children ?? <span>Añadir al calendario</span>}
    </button>
  );
}
