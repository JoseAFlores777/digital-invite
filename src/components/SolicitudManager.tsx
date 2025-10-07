"use client";

import React, { useEffect, useMemo, useState } from "react";
import Modal from "react-modal";
import {
    fetchInvitationById,
    patchGuestStatus,
    GuestStatus,
    fetchWeddingGeneralities,
} from "@/lib/api/solicitudes";
import toast, { Toaster } from "react-hot-toast";

export type SolicitudManagerProps = {
    solicitudId: string;
    asModal?: boolean;
    open?: boolean;
    onClose?: () => void;
    showFilters?: boolean;
    showSearch?: boolean;
    showBulkActions?: boolean;
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

export default function SolicitudManager({
    solicitudId,
    asModal = false,
    open = true,
    onClose,
    showFilters = false,
    showSearch = false,
    showBulkActions = true,
}: SolicitudManagerProps) {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [title, setTitle] = useState<string>("Invitación");
    const [dateTime, setDateTime] = useState<string>("");
    const [location, setLocation] = useState<string>("");
    const [weddingId, setWeddingId] = useState<string | null>(null);
    const [guests, setGuests] = useState<UiGuest[]>([]);
    const [saving, setSaving] = useState<string | null>(null); // guestId | "all" | null
    const [filter, setFilter] = useState<FilterTab>("all");
    const [query, setQuery] = useState("");
    const [reloadKey, setReloadKey] = useState(0);
    const [deadlineMs, setDeadlineMs] = useState<number | null>(null);
    const [nowMs, setNowMs] = useState<number>(Date.now());

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

                if (wId) {
                    try {
                        const wg = await fetchWeddingGeneralities(wId);
                        const date = wg?.wedding?.date || null;
                        const time = wg?.wedding?.start_time || null;
                        const tz = wg?.wedding?.timezone || null;
                        const locName = wg?.location?.venue_name || "";
                        const locAddr = wg?.location?.address || "";
                        const dt = [date, time].filter(Boolean).join(" • ");
                        setDateTime(dt + (tz ? ` (${tz})` : ""));
                        setLocation([locName, locAddr].filter(Boolean).join(", "));

                        // Compute RSVP deadline: 3 weeks before event date/time
                        try {
                            if (date) {
                                const timePart = typeof time === "string" && time ? time : "00:00:00";
                                const iso = `${date}T${timePart}`; // local time parsing
                                const eventMs = Date.parse(iso);
                                if (!Number.isNaN(eventMs)) {
                                    const threeWeeksMs = 21 * 24 * 60 * 60 * 1000;
                                    setDeadlineMs(eventMs - threeWeeksMs);
                                }
                            }
                        } catch {}
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

    const updateGuestStatus = async (guestId: string, status: GuestStatus) => {
        if (isClosed) return;
        const prev = guests.find((g) => g.id === guestId)?.status ?? "unknown";
        if (prev === status) return;
        setSaving(guestId);
        setGuests((curr) => curr.map((g) => (g.id === guestId ? { ...g, status } : g)));
        try {
            await patchGuestStatus(guestId, status);
            const msg = status === "accepted" ? "Confirmado" : status === "declined" ? "Rechazado" : "Pendiente";
            toast.success(`${msg}`);
        } catch {
            setGuests((curr) => curr.map((g) => (g.id === guestId ? { ...g, status: prev } : g)));
            toast.error("No se pudo guardar el cambio de estado");
        } finally {
            setSaving(null);
        }
    };

    const updateAllGuestsStatus = async (status: Exclude<GuestStatus, "unknown">) => {
        if (isClosed) return;
        setSaving("all");
        setGuests((curr) => curr.map((g) => ({ ...g, status })));
        try {
            const ids = guests.map((g) => g.id);
            await Promise.all(ids.map((id) => patchGuestStatus(id, status)));
            const msg = status === "accepted" ? "Confirmados" : "Rechazados";
            toast.success(`${ids.length} ${msg}`);
        } catch {
            toast.error("No se pudieron guardar los cambios masivos");
        } finally {
            setSaving(null);
        }
    };

    const FilterPill = ({ value, label, count }: { value: FilterTab; label: string; count?: number }) => (
        <button
            type="button"
            onClick={() => setFilter(value)}
            aria-pressed={filter === value}
            className={`px-3 py-1.5 rounded-full border text-sm transition-all select-none
        ${filter === value ? "bg-blue-600 text-white border-blue-600 shadow" : "bg-white text-slate-700 border-slate-300 hover:bg-slate-50"}`}
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
            <div className="px-4 sm:px-6 md:px-8 pt-6 pb-4 border-b border-slate-200">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-slate-800 break-words">{title}</h2>
                        {(dateTime || location) && (
                            <div className="mt-2 text-sm md:text-[15px] text-slate-600 space-y-1.5">
                                {dateTime && (
                                    <div className="inline-flex items-center gap-2">
                                        <IconCalendar className="h-4 w-4" />
                                        <span>{dateTime}</span>
                                    </div>
                                )}
                                {location && (
                                    <div className="inline-flex items-center gap-2 block">
                                        <IconPin className="h-4 w-4" />
                                        <span>{location}</span>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>

                {/* Countdown / Notice */}
                {deadlineMs && (
                    <div className="mt-3">
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
                    </div>
                )}

                {/* Controles opcionales */}
                <div className="mt-4 grid grid-cols-1 gap-3 sm:flex sm:flex-row sm:items-center sm:justify-between">
                    {/* Filters */}
                    {showFilters && (
                        <div className="flex flex-wrap items-center gap-2 order-1">
                            <FilterPill value="all" label="Todos" count={counts.total} />
                            <FilterPill value="unknown" label="Pendientes" count={counts.unknown} />
                            <FilterPill value="accepted" label="Confirmados" count={counts.accepted} />
                            <FilterPill value="declined" label="Rechazados" count={counts.declined} />
                        </div>
                    )}

                    {/* Search and bulk actions */}
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-center order-2 sm:order-2">
                        {showSearch && (
                            <input
                                type="search"
                                placeholder="Buscar por nombre o email…"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                className="w-full sm:w-[min(300px,60vw)] rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-400"
                                aria-label="Buscar invitados"
                            />
                        )}
                        {!asModal && showBulkActions && (
                            <div className="flex flex-row gap-2 flex-wrap">
                                <button
                                    type="button"
                                    disabled={saving === "all" || guests.length === 0 || isClosed}
                                    onClick={() => updateAllGuestsStatus("accepted") }
                                    className="inline-flex items-center gap-2 px-3 py-2 rounded-lg text-sm border border-emerald-300 text-emerald-700 bg-emerald-50 hover:bg-emerald-100 active:scale-[0.98] disabled:opacity-50 whitespace-nowrap"
                                >
                                    <IconCheck className="h-4 w-4" /> Confirmar todos
                                </button>
                                <button
                                    type="button"
                                    disabled={saving === "all" || guests.length === 0 || isClosed}
                                    onClick={() => updateAllGuestsStatus("declined")}
                                    className="inline-flex items-center gap-2 px-3 py-2 rounded-lg text-sm border border-rose-300 text-rose-700 bg-rose-50 hover:bg-rose-100 active:scale-[0.98] disabled:opacity-50 whitespace-nowrap"
                                >
                                    <IconX className="h-4 w-4" /> Rechazar todos
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Lista */}
            <div className="px-4 sm:px-6 md:px-8 py-5">
                <div className="mb-3 md:mb-4">
                    <h3 className="text-base md:text-lg font-semibold text-slate-800 inline-flex items-center gap-2">
                        Lista de Invitados {attendeesBadge}
                    </h3>
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

                            <div className="flex flex-wrap items-center gap-2">
                                {(STATUS_ORDER as GuestStatus[]).map((st) => {
                                    const selected = guest.status === st;
                                    const base =
                                        "px-3 py-1.5 md:py-2 rounded-full text-sm border inline-flex items-center gap-2 transition active:scale-[0.98] focus:outline-none focus:ring-2";
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
                                            disabled={saving === guest.id || isClosed}
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
                className="outline-none w-full max-w-full sm:max-w-2xl md:max-w-4xl mx-auto my-4 sm:my-6 bg-white border border-slate-200 rounded-2xl shadow-2xl max-h-[85vh] overflow-hidden"
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
                <div className="max-h-[calc(85vh-0px)] overflow-y-auto overscroll-contain px-4 sm:px-6 md:px-8 py-3">
                    <Toaster position="top-right" />
                    {card}
                </div>
            </Modal>
        );
    }

    return (
        <>
            <Toaster position="top-right" />
            <div className="min-h-screen bg-slate-50/60 flex items-center justify-center p-3 sm:p-6">
                {card}
            </div>
        </>
    );
}