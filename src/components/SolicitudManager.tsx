"use client";

import React, { useEffect, useMemo, useState } from "react";
import Modal from "react-modal";
import {
    fetchInvitationById,
    patchGuestStatus,
    GuestStatus,
    fetchWeddingGeneralities,
    patchInvitationStatus,
    InvitationStatus,
    patchInvitationDeadline,
} from "@/lib/api/solicitudes";
import toast, { Toaster } from "react-hot-toast";
import CalendarAddButton from "@/components/CalendarAddButton";

export type SolicitudManagerProps = {
    solicitudId: string;
    asModal?: boolean;
    open?: boolean;
    onClose?: () => void;
    showFilters?: boolean;
    showSearch?: boolean;
    showBulkActions?: boolean;
    onChanged?: () => void;
    adminMode?: boolean;
    infoDisplay?: "tooltip" | "modal";
};

type UiGuest = {
    id: string;
    name: string;
    email?: string;
    status: GuestStatus;
};

const statusLabel: Record<GuestStatus, string> = {
    accepted: "Confirmar",
    unknown: "Pendiente",
    declined: "Rechazar",
};
const statusLabelPast: Record<GuestStatus, string> = {
    accepted: "Confirmado",
    unknown: "Pendiente",
    declined: "Rechazado",
};

const STATUS_ORDER: GuestStatus[] = ["unknown", "accepted", "declined"];
type FilterTab = "all" | GuestStatus;

/* --- Iconos inline (sin dependencias) --- */
const IconCalendar = (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...p}>
        <rect x="3" y="4.5" width="18" height="16" rx="2.5" />
        <path d="M8 3.5v3M16 3.5v3M3 9.5h18" />
    </svg>
);
const IconPin = (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...p}>
        <path d="M12 22s7-7 7-12a7 7 0 1 0-14 0c0 5 7 12 7 12Z" />
        <circle cx="12" cy="10" r="2.5" />
    </svg>
);
const IconUsers = (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...p}>
        <path d="M17 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="3" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a3 3 0 0 1 0 5.75" />
    </svg>
);
const IconCheck = (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...p}>
        <path d="M20 6 9 17l-5-5" />
    </svg>
);
const IconClock = (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...p}>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 3" />
    </svg>
);
const IconX = (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...p}>
        <path d="M18 6 6 18M6 6l12 12" />
    </svg>
);
const IconBell = (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...p}>
        <path d="M6 8a6 6 0 0 1 12 0c0 7 3 7 3 9H3c0-2 3-2 3-9Z" />
        <path d="M10.3 21a1.7 1.7 0 0 0 3.4 0" />
    </svg>
);

export default function SolicitudManager({
    solicitudId,
    asModal = false,
    open = true,
    onClose,
    showFilters = false,
    showSearch = false,
    showBulkActions = true,
    onChanged,
    adminMode = false,
    infoDisplay = "tooltip",
}: SolicitudManagerProps) {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [title, setTitle] = useState<string>("Invitación");
    const [dateTime, setDateTime] = useState<string>("");
    const [location, setLocation] = useState<string>("");
    const [eventDateStr, setEventDateStr] = useState<string>("");
    const [eventStartTimeStr, setEventStartTimeStr] = useState<string>("");
    const [eventEndTimeStr, setEventEndTimeStr] = useState<string>("");
    const [eventTz, setEventTz] = useState<string>("");
    const [eventLat, setEventLat] = useState<number | null>(null);
    const [eventLng, setEventLng] = useState<number | null>(null);
    const [eventWazeLink, setEventWazeLink] = useState<string>("");
    const [eventGoogleMapsLink, setEventGoogleMapsLink] = useState<string>("");
    const [coupleName, setCoupleName] = useState<string>("");
    const [weddingId, setWeddingId] = useState<string | null>(null);
    const [guests, setGuests] = useState<UiGuest[]>([]);
    const [saving, setSaving] = useState<string | null>(null); // guestId | "all" | null
    const [filter, setFilter] = useState<FilterTab>("all");
    const [query, setQuery] = useState("");
    const [reloadKey, setReloadKey] = useState(0);
    const [deadlineMs, setDeadlineMs] = useState<number | null>(null);
    const [nowMs, setNowMs] = useState<number>(Date.now());
    const [deadlineIso, setDeadlineIso] = useState<string | null>(null);
    const [editedDeadlineLocal, setEditedDeadlineLocal] = useState<string>("");
    const [savingDeadline, setSavingDeadline] = useState(false);
    const [showDeadlineTip, setShowDeadlineTip] = useState(false);
    const [showInfoModal, setShowInfoModal] = useState(false);
    const tipRef = React.useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        let active = true;
        setLoading(true);
        setError(null);

        fetchInvitationById(solicitudId)
            .then(async (inv: any) => {
                if (!active) return;
                const g = Array.isArray(inv?.guests) ? inv.guests : [];
                const mapped: UiGuest[] = g
                    .map((rel: any) => {
                        const person = rel?.guest?.person;
                        const guestId = rel?.guest?.id;
                        if (!guestId) return null;
                        const rawStatus = (rel?.guest?.rsvp_status || rel?.guest?.invitation_status || "unknown") as string;
                        let status: GuestStatus;
                        if (rawStatus === "accepted" || rawStatus === "declined" || rawStatus === "unknown") {
                            status = rawStatus as GuestStatus;
                        } else if (rawStatus === "confirmed") {
                            status = "accepted";
                        } else if (rawStatus === "pending") {
                            status = "unknown";
                        } else {
                            status = "unknown";
                        }
                        const name = [person?.first_name, person?.last_name].filter(Boolean).join(" ") || "Invitado";
                        const email = person?.email;
                        return { id: guestId, name, email, status } as UiGuest;
                    })
                    .filter(Boolean) as UiGuest[];

                setGuests(mapped);
                setTitle(inv?.code || "Invitación");
                const wId = inv?.wedding || null;
                setWeddingId(wId);

                // Prefer RSVP deadline from invitation if provided (ISO datetime)
                try {
                    const invDeadline: unknown = inv?.rsvp_deadline;
                    if (typeof invDeadline === "string" && invDeadline) {
                        const ms = Date.parse(invDeadline);
                        if (!Number.isNaN(ms)) {
                            setDeadlineMs(ms);
                            setDeadlineIso(invDeadline);
                            // format to yyyy-MM-ddTHH:mm in local time
                            const d = new Date(invDeadline);
                            const pad = (n: number) => String(n).padStart(2, "0");
                            const local = `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
                            setEditedDeadlineLocal(local);
                        }
                    } else {
                        setDeadlineIso(null);
                        setEditedDeadlineLocal("");
                    }
                } catch {}

                if (wId) {
                    try {
                        const { useWeddingStore } = await import("@/store/wedding");
                        const wg = await useWeddingStore.getState().get(wId);
                        const date = wg?.wedding?.date || null;
                        const start_time = wg?.wedding?.start_time || null;
                        const end_time = wg?.wedding?.end_time || null;
                        const tz = wg?.wedding?.timezone || null;
                        const couple = wg?.wedding?.couple?.name || "";
                        const locName = wg?.location?.venue_name || "";
                        const locAddr = wg?.location?.address || "";
                        const lat = Number(wg?.location?.latitude);
                        const lng = Number(wg?.location?.longitude);
                        const waze = wg?.location?.waze_link || "";
                        const gmaps = wg?.location?.google_maps_link || "";

                        // Save raw for ICS
                        setEventDateStr(date || "");
                        setEventStartTimeStr(typeof start_time === "string" ? start_time : "");
                        setEventEndTimeStr(typeof end_time === "string" ? end_time : "");
                        setEventTz(typeof tz === "string" ? tz : "");
                        setCoupleName(typeof couple === "string" ? couple : "");
                        setEventLat(Number.isFinite(lat) ? lat : null);
                        setEventLng(Number.isFinite(lng) ? lng : null);
                        setEventWazeLink(typeof waze === "string" ? waze : "");
                        setEventGoogleMapsLink(typeof gmaps === "string" ? gmaps : "");

                        // Format date/time in Spanish: "13 de diciembre del 2025 a las 3:00 p. m."
                        try {
                            if (date) {
                                const timePart = typeof start_time === "string" && start_time ? start_time : "00:00:00";
                                const [h, m] = timePart.split(":");
                                const d = new Date();
                                const [yy, mm, dd] = String(date).split("-").map(Number);
                                d.setFullYear(yy || d.getFullYear());
                                d.setMonth((mm || 1) - 1);
                                d.setDate(dd || d.getDate());
                                d.setHours(Number(h || 0), Number(m || 0), 0, 0);
                                const fmtDate = d.toLocaleDateString("es-ES", { day: "numeric", month: "long", year: "numeric" });
                                const hour12 = d.toLocaleTimeString("es-ES", { hour: "numeric", minute: "2-digit", hour12: true }).toLowerCase();
                                // Ensure "p. m." spacing
                                const hourPretty = hour12.replace("am", "a. m.").replace("a. m.", "a. m.").replace("pm", "p. m.").replace("p. m.", "p. m.");
                                setDateTime(`${fmtDate} a las ${hourPretty}`);
                            } else {
                                setDateTime("");
                            }
                        } catch {
                            const dt = [date, start_time].filter(Boolean).join(" • ");
                            setDateTime(dt + (tz ? ` (${tz})` : ""));
                        }
                        setLocation([locName, locAddr].filter(Boolean).join(", "));

                    } catch {}
                }
            })
            .catch(() => active && setError("No se pudo cargar la invitación"))
            .finally(() => active && setLoading(false));

        return () => {
            active = false;
        };
    }, [solicitudId, reloadKey]);

    // Tick for countdown
    useEffect(() => {
        if (!deadlineMs) return;
        const id = setInterval(() => setNowMs(Date.now()), 1000);
        return () => clearInterval(id);
    }, [deadlineMs]);

    const timeLeft = useMemo(() => {
        if (!deadlineMs) return null;
        const diff = Math.max(0, deadlineMs - nowMs);
        const days = Math.floor(diff / (24 * 60 * 60 * 1000));
        const hours = Math.floor((diff % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
        const minutes = Math.floor((diff % (60 * 60 * 1000)) / (60 * 1000));
        const seconds = Math.floor((diff % (60 * 1000)) / 1000);
        return { diff, days, hours, minutes, seconds };
    }, [deadlineMs, nowMs]);

    const isClosed = useMemo(() => {
        if (!deadlineMs) return false;
        return nowMs >= deadlineMs;
    }, [deadlineMs, nowMs]);

    useEffect(() => {
        const onDown = (e: MouseEvent) => {
            const t = tipRef.current;
            if (t && e.target instanceof Node && !t.contains(e.target)) {
                setShowDeadlineTip(false);
            }
        };
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") setShowDeadlineTip(false);
        };
        if (typeof document !== "undefined") {
            document.addEventListener("mousedown", onDown);
            document.addEventListener("keydown", onKey);
        }
        return () => {
            if (typeof document !== "undefined") {
                document.removeEventListener("mousedown", onDown);
                document.removeEventListener("keydown", onKey);
            }
        };
    }, []);

    const canEdit = useMemo(() => adminMode || !isClosed, [adminMode, isClosed]);

    const counts = useMemo(() => {
        return guests.reduce(
            (acc, g) => {
                acc.total += 1;
                acc[g.status] += 1;
                return acc;
            },
            { total: 0, accepted: 0, unknown: 0, declined: 0 } as Record<"total" | GuestStatus, number>
        );
    }, [guests]);

    const filteredGuests = useMemo(() => {
        const q = query.trim().toLowerCase();
        let arr = guests;
        if (filter !== "all") arr = arr.filter((g) => g.status === filter);
        if (q)
            arr = arr.filter(
                (g) => g.name.toLowerCase().includes(q) || (g.email ? g.email.toLowerCase().includes(q) : false)
            );
        return [...arr].sort((a, b) => a.name.localeCompare(b.name, undefined, { sensitivity: "base" }));
    }, [guests, filter, query]);

    function computeAggregateStatus(list: UiGuest[]): InvitationStatus | null {
        const total = list.length;
        if (total === 0) return null;
        let acc = 0, dec = 0, unk = 0;
        for (const g of list) {
            if (g.status === "accepted") acc++;
            else if (g.status === "declined") dec++;
            else unk++;
        }
        if (acc === total) return "accepted_all";
        if (dec === total) return "declined_all";
        if (acc > 0) return "accepted_partial";
        if (unk > 0) return "sent";
        return null;
    }

    async function maybePatchInvitationStatus(nextGuests: UiGuest[]) {
        const agg = computeAggregateStatus(nextGuests);
        if (!agg) return;
        try {
            await patchInvitationStatus(solicitudId, agg);
        } catch (e) {
            // non-blocking; keep silent to avoid noise
            console.warn("Failed to auto-update invitation status", e);
        }
    }

    const updateGuestStatus = async (guestId: string, status: GuestStatus) => {
        if (!canEdit) return;
        const prev = guests.find((g) => g.id === guestId)?.status ?? "unknown";
        if (prev === status) return;
        setSaving(guestId);
        const optimistic = guests.map((g) => (g.id === guestId ? { ...g, status } : g));
        setGuests(optimistic);
        try {
            await patchGuestStatus(guestId, status);
            const guestName = guests.find((g) => g.id === guestId)?.name || "Invitado";
            const statusText = status === "accepted" ? "Confirmado" : status === "declined" ? "Rechazado" : "Pendiente";
            toast.success(`Marcado ${guestName} como ${statusText}`);
            await maybePatchInvitationStatus(optimistic);
            try { onChanged && onChanged(); } catch {}
        } catch {
            setGuests((curr) => curr.map((g) => (g.id === guestId ? { ...g, status: prev } : g)));
            toast.error("No se pudo guardar el cambio de estado");
        } finally {
            setSaving(null);
        }
    };

    const updateAllGuestsStatus = async (status: Exclude<GuestStatus, "unknown">) => {
        if (!canEdit) return;
        setSaving("all");
        const optimistic = guests.map((g) => ({ ...g, status }));
        setGuests(optimistic);
        try {
            const ids = guests.map((g) => g.id);
            await Promise.all(ids.map((id) => patchGuestStatus(id, status)));
            const msg = status === "accepted" ? "Confirmados" : "Rechazados";
            toast.success(`${ids.length} ${msg}`);
            await maybePatchInvitationStatus(optimistic);
            try { onChanged && onChanged(); } catch {}
        } catch {
            toast.error("No se pudieron guardar los cambios masivos");
        } finally {
            setSaving(null);
        }
    };

    const FilterPill = ({ value, label, count }: { value: FilterTab; label: string; count?: number }) => (
        <button
            type="button"
            disabled={!canEdit}
            onClick={() => { if (canEdit) setFilter(value); }}
            aria-pressed={filter === value}
            className={`px-3 py-1.5 rounded-full border text-sm transition-all select-none disabled:opacity-50
        ${filter === value ? " bg-sky-50 text-sky-800 border-sky-200 shadow" : "bg-white text-slate-700 border-slate-300 hover:bg-slate-50"}`}
        >
      <span className="inline-flex items-center gap-2">
        <span>{label}</span>
          {typeof count === "number" && (
              <span className="inline-flex min-w-6 justify-center rounded-full px-1.5 py-0.5 text-[11px] border bg-white text-slate-700">
            {count}
          </span>
          )}
      </span>
        </button>
    );

    if (loading) {
        return (
            <div className="min-h-[60vh] grid place-items-center p-6">
                <div className="w-full max-w-3xl space-y-4 animate-pulse">
                    <div className="h-10 rounded-xl bg-slate-200/80" />
                    <div className="h-24 rounded-xl bg-slate-200/60" />
                    <div className="h-24 rounded-xl bg-slate-200/60" />
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-[60vh] grid place-items-center p-6">
                <div className="text-center space-y-4">
                    <p className="text-rose-700">{error}</p>
                    <button
                        onClick={() => setReloadKey((k) => k + 1)}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 active:scale-[0.98]"
                    >
                        Reintentar
                    </button>
                </div>
            </div>
        );
    }

    const attendeesBadge = (
        <span className="inline-flex items-center gap-2 text-sm px-3 py-1 rounded-full bg-slate-100 text-slate-800 border border-slate-200">
      <IconUsers className="h-4 w-4" />
            {`${guests.filter((g) => g.status === "accepted").length}/${guests.length}`}
    </span>
    );


    const card = (
        <div className={`w-full max-w-full sm:max-w-2xl md:max-w-4xl ${asModal ? "" : "shadow-xl border border-slate-200 rounded-2xl bg-white"}`}>
            {/* Header */}
            <div className="px-4 sm:px-6 md:px-8 pt-6 pb-4">
                <div className="flex flex-col gap-2">
                    <div className="min-w-0 flex items-center gap-3">
                        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-slate-800 break-words">{title}</h2>
                    </div>
                    {(dateTime || location) && (
                        <div className="mt-1 text-sm md:text-[15px] text-slate-600">
                            <div className="flex flex-wrap items-center gap-3">
                                {dateTime && (
                                    <span className="inline-flex items-center gap-2 min-w-0">
                                        <IconCalendar className="h-4 w-4 shrink-0" />
                                        <span className="min-w-0 break-words md:truncate">{dateTime}</span>
                                    </span>
                                )}
                                {location && (
                                    <span className="inline-flex items-center gap-2 min-w-0">
                                        <IconPin className="h-4 w-4 shrink-0" />
                                        <span className="min-w-0 break-words md:truncate">{location}</span>
                                    </span>
                                )}
                            </div>
                        </div>
                    )}
                </div>

                {/* Countdown / Notice */}
                {deadlineMs && (
                    <div className="mt-3">
                        <div className="inline-flex items-center gap-2">
                            {!isClosed && timeLeft ? (
                                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-sky-200 bg-sky-50 text-sky-800 text-sm">
                                    <IconClock className="h-4 w-4" />
                                    <span>Tiempo para confirmar:</span>
                                    <span className="font-medium tabular-nums">
                                        {timeLeft.days}d {String(timeLeft.hours).padStart(2, '0')}h {String(timeLeft.minutes).padStart(2, '0')}m {String(timeLeft.seconds).padStart(2, '0')}s
                                    </span>
                                </div>
                            ) : (
                                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-rose-200 bg-rose-50 text-rose-700 text-sm">
                                    <IconX className="h-4 w-4" />
                                    <span>Ya no se puede confirmar: el tiempo ha finalizado.</span>
                                </div>
                            )}

                            <div className="relative" ref={tipRef}>
                                <button
                                    type="button"
                                    aria-label="¿Cómo funciona el tiempo de confirmación?"
                                    aria-expanded={infoDisplay === "tooltip" ? showDeadlineTip : showInfoModal}
                                    aria-controls={infoDisplay === "tooltip" ? "deadline-tip" : undefined}
                                    onClick={() => {
                                        if (infoDisplay === "modal") {
                                            setShowInfoModal(true);
                                        } else {
                                            setShowDeadlineTip((v) => !v);
                                        }
                                    }}
                                    className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 active:scale-[0.98] transition focus:outline-none focus:ring-2 focus:ring-sky-200 animate-pulse"
                                    title="Más información"
                                >
                                    <span className="text-[13px] leading-none">?</span>
                                </button>
                                {infoDisplay === "tooltip" && showDeadlineTip && (
                                    <div
                                        id="deadline-tip"
                                        role="tooltip"
                                        className="absolute z-20 mt-2 w-64 max-w-[80vw] right-0 sm:left-1/2 sm:-translate-x-1/2 rounded-lg border border-slate-200 bg-white shadow-lg p-3 text-sm text-slate-700"
                                    >
                                        Confirma tu asistencia antes de que el contador llegue a cero.
                                        Al terminar, solo se registrarán como confirmados quienes respondieron a tiempo; los demás se considerarán ausentes.
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {/* Toolbar: calendario a la izquierda; acciones masivas a la derecha */}
                <div className="mt-4 flex items-center gap-2 flex-wrap">
                    <CalendarAddButton
                        date={eventDateStr}
                        startTime={eventStartTimeStr}
                        endTime={eventEndTimeStr}
                        timezone={eventTz}
                        coupleName={coupleName}
                        location={location}
                        googleMapsLink={eventGoogleMapsLink}
                        wazeLink={eventWazeLink}
                        uidPrefix={solicitudId}
                        confirmUrl={typeof window !== "undefined" ? `${window.location.origin}/solicitud?invitationID=${solicitudId}` : ""}
                        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 text-sm disabled:opacity-50"
                        title="Añadir al calendario"
                        disabled={!canEdit}
                    >
                        <IconCalendar className="h-4 w-4" />
                        <span className="whitespace-nowrap">Añadir evento al calendario</span>
                    </CalendarAddButton>

                    {deadlineIso && (
                        <button
                            type="button"
                            disabled={!canEdit}
                            onClick={() => {
                                try {
                                    const d = new Date(deadlineIso);
                                    if (Number.isNaN(d.getTime())) return;
                                    const pad = (n: number) => String(n).padStart(2, "0");
                                    const DTSTART_LOCAL = `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}T${pad(d.getHours())}${pad(d.getMinutes())}${pad(d.getSeconds())}`;
                                    const now = new Date();
                                    const dtstamp = `${now.getUTCFullYear()}${pad(now.getUTCMonth() + 1)}${pad(now.getUTCDate())}T${pad(now.getUTCHours())}${pad(now.getUTCMinutes())}${pad(now.getUTCSeconds())}Z`;
                                    const confirmUrl = (typeof window !== "undefined") ? `${window.location.origin}/solicitud?invitationID=${solicitudId}` : "";
                                    const summary = "Recordatorio: Confirmar asistencia a la Boda de Clarisa y José";
                                    const description = confirmUrl ? `Abre el enlace para confirmar tu asistencia: ${confirmUrl}` : "Confirma tu asistencia desde el enlace de la invitación.";
                                    const uid = `${solicitudId}-rsvp-${Date.now()}@digital-invite`;
                                    const lines = [
                                        "BEGIN:VCALENDAR",
                                        "VERSION:2.0",
                                        "PRODID:-//digital-invite//RSVP-Reminder//ES",
                                        "CALSCALE:GREGORIAN",
                                        "METHOD:PUBLISH",
                                        "BEGIN:VEVENT",
                                        `DTSTART:${DTSTART_LOCAL}`,
                                        `DTSTAMP:${dtstamp}`,
                                        `UID:${uid}`,
                                        `SUMMARY:${summary}`,
                                        confirmUrl ? `URL:${confirmUrl}` : "",
                                        `DESCRIPTION:${description}`,
                                        "END:VEVENT",
                                        "END:VCALENDAR",
                                    ].filter(Boolean);
                                    const blob = new Blob([lines.join("\r\n")], { type: "text/calendar;charset=utf-8" });
                                    const url = URL.createObjectURL(blob);
                                    const a = document.createElement("a");
                                    a.href = url;
                                    a.download = `Recordatorio-Confirmar-${solicitudId}.ics`;
                                    document.body.appendChild(a);
                                    a.click();
                                    setTimeout(() => { URL.revokeObjectURL(url); a.remove(); }, 0);
                                } catch {}
                            }}
                            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 text-sm disabled:opacity-50"
                            title="Agregar recordatorio de confirmación"
                        >
                            <IconBell className="h-4 w-4" />
                            <span className="whitespace-nowrap">Crear recordatorio para confirmar</span>
                        </button>
                    )}

                    {adminMode && (
                        <div className="inline-flex items-center gap-2 flex-wrap">
                            <input
                                type="datetime-local"
                                className="border border-slate-300 rounded-lg px-2 py-1 text-sm"
                                value={editedDeadlineLocal}
                                onChange={(e) => setEditedDeadlineLocal(e.target.value)}
                                aria-label="Fecha límite RSVP"
                            />
                            <button
                                type="button"
                                disabled={savingDeadline}
                                onClick={async () => {
                                    try {
                                        setSavingDeadline(true);
                                        const localStr = editedDeadlineLocal
                                            ? (editedDeadlineLocal.length === 16
                                                ? `${editedDeadlineLocal}:00`
                                                : editedDeadlineLocal)
                                            : null;
                                        await patchInvitationDeadline(solicitudId, localStr);
                                        if (localStr) {
                                            setDeadlineIso(localStr);
                                            const ms = Date.parse(localStr);
                                            if (!Number.isNaN(ms)) setDeadlineMs(ms);
                                        } else {
                                            setDeadlineIso(null);
                                            setDeadlineMs(null);
                                        }
                                        toast.success("Fecha límite actualizada");
                                    } catch {
                                        toast.error("No se pudo actualizar la fecha límite");
                                    } finally {
                                        setSavingDeadline(false);
                                    }
                                }}
                                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 text-sm disabled:opacity-50"
                            >
                                Guardar deadline
                            </button>
                        </div>
                    )}

                    {/* Bulk actions moved to the guest list title row */}
                </div>

                {/* Búsqueda opcional debajo del toolbar */}
                {showSearch && (
                    <div className="mt-3">
                        <input
                            type="search"
                            placeholder="Buscar por nombre"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            className="w-full border border-slate-300 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-200"
                            aria-label="Buscar invitados"
                        />
                    </div>
                )}
                {showFilters && (
                    <div className="mt-3 flex flex-wrap items-center gap-2">
                        <FilterPill value="all" label="Todos" count={counts.total} />
                        <FilterPill value="unknown" label="Pendientes" count={counts.unknown} />
                        <FilterPill value="accepted" label="Confirmados" count={counts.accepted} />
                        <FilterPill value="declined" label="Rechazados" count={counts.declined} />
                    </div>
                )}
                </div>
            <div className="border-b border-slate-200"></div>

            {/* Lista */}
            <div className="px-4 sm:px-6 md:px-8 py-5">
                <div className="mb-3 md:mb-4">
                    <div className="flex items-center gap-5 flex-wrap sm:gap-2">
                        <h3 className="text-base md:text-lg font-semibold text-slate-800 inline-flex items-center gap-2">
                            Lista de Invitados {attendeesBadge}
                        </h3>
                        {(showBulkActions ) && (
                            <div className="ml-auto flex items-center justify-center gap-2 w-full sm:w-auto sm:justify-end">
                                <button
                                    type="button"
                                    disabled={saving === "all" || guests.length === 0 || !canEdit}
                                    onClick={() => updateAllGuestsStatus("accepted") }
                                    className="w-full sm:w-auto inline-flex items-center gap-2 px-3 py-2 rounded-lg text-sm border border-emerald-300 text-emerald-700 bg-emerald-50 hover:bg-emerald-100 active:scale-[0.98] disabled:opacity-50 whitespace-nowrap"
                                >
                                    <IconCheck className="h-4 w-4" /> Confirmar todos
                                </button>
                                <button
                                    type="button"
                                    disabled={saving === "all" || guests.length === 0 || !canEdit}
                                    onClick={() => updateAllGuestsStatus("declined")}
                                    className="w-full sm:w-auto inline-flex items-center gap-2 px-3 py-2 rounded-lg text-sm border border-rose-300 text-rose-700 bg-rose-50 hover:bg-rose-100 active:scale-[0.98] disabled:opacity-50 whitespace-nowrap"
                                >
                                    <IconX className="h-4 w-4" /> Rechazar todos
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                <div className="space-y-2 md:space-y-3">
                    {filteredGuests.map((guest) => (
                        <div
                            key={guest.id}
                            className="flex flex-col gap-2 md:gap-0 sm:flex-row sm:items-center sm:justify-between p-4 md:p-5 rounded-xl border border-slate-200 bg-white shadow-sm"
                        >
                            <div>
                                <p className="font-medium text-slate-900 text-sm md:text-base">{guest.name}</p>
                                {guest.email && <p className="text-xs text-slate-600 mt-0.5 break-all">{guest.email}</p>}
                            </div>

                            <div className="flex flex-col items-end gap-1">
                                {(isClosed && !adminMode) ? (
                                    (() => {
                                        const st = guest.status as GuestStatus;
                                        const base = "px-3 py-1.5 md:py-2 rounded-full text-sm border inline-flex items-center gap-2";
                                        const variants: Record<GuestStatus, string> = {
                                            accepted: "bg-emerald-50 text-emerald-700 border-emerald-200",
                                            unknown: "bg-blue-50 text-blue-700 border-blue-200",
                                            declined: "bg-rose-50 text-rose-700 border-rose-200",
                                        };
                                        const labelMap: Record<GuestStatus, string> = {
                                            accepted: "Ha aceptado la invitación",
                                            declined: "Ha rechazado la invitación",
                                            unknown: "Ha rechazado la invitación",
                                        };
                                        const variantKey: GuestStatus = st === "unknown" ? "declined" : st;
                                        return (
                                            <span className={`${base} ${variants[variantKey]}`} aria-label={labelMap[st]}>
                                                {st === "accepted" && <IconCheck className="h-4 w-4" />}
                                                {(st === "unknown" || st === "declined") && <IconX className="h-4 w-4" />}
                                                <span className="whitespace-nowrap">{labelMap[st]}</span>
                                            </span>
                                        );
                                    })()
                                ) : (
                                    <>
                                        <div className="flex flex-wrap items-center gap-2 pt-2">
                                            {(STATUS_ORDER as GuestStatus[]).map((st) => {
                                                const selected = guest.status === st;
                                                const base =
                                                    "px-3 py-1.5 md:py-2 rounded-full text-sm border inline-flex items-center gap-2 transition active:scale-[0.98] focus:outline-none focus:ring-2 disabled:opacity-60 disabled:cursor-not-allowed";
                                                const variants: Record<GuestStatus, string> = {
                                                    accepted: selected
                                                        ? "bg-emerald-50 text-emerald-700 border-emerald-200 focus:ring-emerald-300"
                                                        : "bg-white text-slate-700 border-slate-300 hover:bg-slate-50",
                                                    unknown: selected
                                                        ? "bg-blue-50 text-blue-700 border-blue-200 focus:ring-blue-300"
                                                        : "bg-white text-slate-700 border-slate-300 hover:bg-slate-50",
                                                    declined: selected
                                                        ? "bg-rose-50 text-rose-700 border-rose-200 focus:ring-rose-300"
                                                        : "bg-white text-slate-700 border-slate-300 hover:bg-slate-50",
                                                };
                                                return (
                                                    <button
                                                        key={st}
                                                        disabled={saving === guest.id || !canEdit}
                                                        onClick={() => updateGuestStatus(guest.id, st)}
                                                        aria-pressed={selected}
                                                        className={`${base} ${variants[st]}`}
                                                        title={(selected ? statusLabelPast[st] : statusLabel[st])}
                                                    >
                                                        {st === "accepted" && <IconCheck className="h-4 w-4" />}
                                                        {st === "unknown" && <IconClock className="h-4 w-4" />}
                                                        {st === "declined" && <IconX className="h-4 w-4" />}
                                                        <span className="hidden xs:inline">{selected ? statusLabelPast[st] : statusLabel[st]}</span>
                                                        <span className="inline xs:hidden">{(selected ? statusLabelPast[st] : statusLabel[st]).charAt(0)}</span>
                                                    </button>
                                                );
                                            })}
                                        </div>
                                        <div className="w-full text-right text-[11px] md:text-xs text-slate-500">Haz clic en cualquiera de estas opciones</div>
                                    </>
                                )}
                            </div>
                        </div>
                    ))}

                    {filteredGuests.length === 0 && (
                        <div className="grid place-items-center py-10 md:py-12 text-center">
                            <div className="space-y-2">
                                <p className="text-sm text-slate-600">No hay invitados que coincidan con el filtro/búsqueda.</p>
                                {guests.length === 0 && (
                                    <p className="text-xs text-slate-500">No hay invitados asociados a esta invitación.</p>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {saving && <div className="px-4 sm:px-6 md:px-8 pb-3 text-xs text-slate-600">Guardando cambios…</div>}
        </div>
    );

    const infoModal = infoDisplay === "modal" && showInfoModal ? (
        <Modal
            isOpen={showInfoModal}
            onRequestClose={() => setShowInfoModal(false)}
            shouldCloseOnOverlayClick
            shouldCloseOnEsc
            preventScroll
            overlayClassName="fixed inset-0 z-[70] bg-black/40 backdrop-blur-[1px]"
            className="outline-none w-[92vw] max-w-md mx-auto my-[10vh] rounded-2xl bg-white border border-slate-200 shadow-2xl p-4"
            contentLabel="Información sobre el tiempo de confirmación"
            ariaHideApp={false}
        >
            <div className="flex items-start justify-between gap-3">
                <h3 className="text-lg font-semibold text-slate-800">¿Cómo funciona el tiempo de confirmación?</h3>
                <button
                    onClick={() => setShowInfoModal(false)}
                    className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-slate-300 text-slate-700 bg-white hover:bg-slate-50"
                    aria-label="Cerrar"
                >
                    ×
                </button>
            </div>
            <div className="mt-3 text-sm text-slate-700">
                Confirma tu asistencia antes de que el contador llegue a cero. Al terminar, solo se registrarán como confirmados quienes respondieron a tiempo; los demás se considerarán ausentes.
            </div>
        </Modal>
    ) : null;

    if (asModal) {
        if (open === false) return null;
        try {
            if (typeof window !== "undefined") {
                const el = document.getElementById("__next") || document.body;
                if (el) Modal.setAppElement(el as HTMLElement);
            }
        } catch {}

        return (
            <Modal
                isOpen={!!open}
                onRequestClose={onClose}
                shouldCloseOnOverlayClick
                shouldCloseOnEsc
                preventScroll
                bodyOpenClassName="overflow-hidden"
                onAfterOpen={() => {
                    try {
                        if (typeof window !== "undefined") {
                            const docEl = document.documentElement;
                            const scrollBarWidth = window.innerWidth - docEl.clientWidth;
                            if (scrollBarWidth > 0) {
                                document.body.style.paddingRight = `${scrollBarWidth}px`;
                            }
                        }
                    } catch {}
                }}
                onAfterClose={() => {
                    try {
                        if (typeof document !== "undefined") {
                            document.body.classList.remove("overflow-hidden");
                            (document.body.style as any).overflow = "";
                            (document.body.style as any).paddingRight = "";
                        }
                    } catch {}
                }}
                overlayClassName="fixed inset-0 z-[60] bg-black/40 backdrop-blur-[1px]"
                className="outline-none w-screen h-screen max-w-none max-h-none m-0 rounded-none sm:w-fit sm:h-auto sm:max-w-[95vw] sm:max-h-[90vh] sm:mx-auto sm:my-12 sm:rounded-2xl bg-white border border-slate-200 shadow-2xl overflow-hidden"
                contentLabel="Gestión de invitados"
                ariaHideApp={false}
            >
                <div className="relative">
                    <button
                        onClick={onClose}
                        className="absolute top-3 right-3 inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-300 text-slate-700 bg-white hover:bg-slate-50 active:scale-[0.98] transition"
                        aria-label="Cerrar"
                    >
                        ×
                    </button>
                </div>
                <div className="h-[100vh] overflow-y-auto overscroll-contain px-4 sm:px-6 md:px-8 py-3 sm:h-auto sm:w-auto sm:max-h-[80vh]">
                    <Toaster position="top-right" />
                    {card}
                    {infoModal}
                </div>
            </Modal>
        );
    }

    return (
        <>
            <Toaster position="top-right" />
            {infoModal}
            <div className="min-h-screen bg-slate-50/60 flex items-center justify-center p-3 sm:p-6">
                {card}
            </div>
        </>
    );
}