"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import SolicitudManager from "@/components/SolicitudManager";
import AdminCharts from "@/components/AdminCharts";
import type { Invitations, Guests } from "@/lib/directus-interfaces";

// Tipos basados en las interfaces de Directus, con compatibilidad hacia los datos de los endpoints actuales
type Invitation = Pick<Invitations, "id" | "code" | "status" | "guests"> & { guests?: any[] };

type DigitalGuest = Partial<Guests> & {
  id: string;
  // Campos auxiliares presentes en /api/digital-guests
  role?: string | null;
  type?: string | null;
  group?: string | null;
  person?: { first_name?: string; last_name?: string } | null;
  invitation_id?: string | null;
};

export default function AdminInvitationsList() {
  const [invitations, setInvitations] = useState<Invitation[]>([]);
  const [guests, setGuests] = useState<DigitalGuest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [search, setSearch] = useState("");
  const [group, setGroup] = useState<string>("");
  const [invStatus, setInvStatus] = useState<string>("");

  const [activeId, setActiveId] = useState<string | null>(null);
  const [menuOpenFor, setMenuOpenFor] = useState<string | null>(null);
  const [sendInviteFor, setSendInviteFor] = useState<string | null>(null);
  const [sendMode, setSendMode] = useState<"invite" | "reminder">("invite");
  const [selectedGuestId, setSelectedGuestId] = useState<string>("");
  const [selectedInvStatus, setSelectedInvStatus] = useState<string>("");
  const [sendInviteGuests, setSendInviteGuests] = useState<Array<{ id: string; person: { first_name?: string; last_name?: string; WhatsApp?: string } | null; status?: string }>>([]);

  const cardRef = useRef<HTMLDivElement>(null);
  const [listShouldScroll, setListShouldScroll] = useState(false);

  // Origen para construir URL de confirmación
  const [origin, setOrigin] = useState("");
  const [copiedUrl, setCopiedUrl] = useState(false);
  useEffect(() => {
    try {
      if (typeof window !== "undefined") {
        setOrigin(window.location.origin);
      }
    } catch {}
  }, []);

  useEffect(() => {
    let active = true;
    setLoading(true);
    setError(null);
    const weddingId = process.env.NEXT_PUBLIC_WEDDING_ID;
    const invitationsUrl = weddingId
      ? `/api/wedding-invitations?wedding_id=${encodeURIComponent(weddingId)}`
      : "/api/wedding-invitations";

    Promise.all([
      fetch(invitationsUrl).then((r) => r.json()),
      fetch("/api/digital-guests").then((r) => r.json()),
    ])
      .then(([invRes, guestsRes]) => {
        if (!active) return;
        setInvitations(Array.isArray(invRes?.invitations) ? (invRes.invitations as Invitation[]) : []);
        setGuests(Array.isArray(guestsRes?.guests) ? (guestsRes.guests as DigitalGuest[]) : []);
      })
      .catch(() => {
        if (!active) return;
        setError("failed_to_fetch");
        setInvitations([]);
        setGuests([]);
      })
      .finally(() => {
        if (!active) return;
        setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  // Grupo options from Directus (guest_groups). Fallback to compute from guests if API fails.
  const [groupOptions, setGroupOptions] = useState<Array<{ id: string; name: string | null; type: string | null }>>([]);
  const groupsAvailable = useMemo(() => {
    if (groupOptions.length) return groupOptions.map((g) => ({ id: g.id, name: g.name || g.id }));
    // Fallback: derive from invitations' nested groups IDs
    const map = new Map<string, string>();
    invitations.forEach((inv) => {
      const invGuests: any[] = Array.isArray((inv as any).guests) ? (inv as any).guests : [];
      invGuests.forEach((ig: any) => {
        const gid = ig?.guest?.group || ig?.guest?.group?.id || null;
        if (gid && !map.has(gid)) map.set(gid, gid);
      });
    });
    return Array.from(map.entries()).map(([id, name]) => ({ id, name }));
  }, [groupOptions, invitations]);


  useEffect(() => {
    let cancelled = false;
    const weddingId = process.env.NEXT_PUBLIC_WEDDING_ID;
    const url = weddingId ? `/api/guest-groups?wedding_id=${encodeURIComponent(weddingId)}` : "/api/guest-groups";
    fetch(url)
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((data) => {
        if (cancelled) return;
        const groups = Array.isArray(data?.groups) ? data.groups : [];
        setGroupOptions(groups.map((g: any) => ({ id: g.id, name: g.name ?? null, type: g.type ?? null })));
      })
      .catch(() => {
        if (cancelled) return;
        setGroupOptions([]); // fallback handled by groupsAvailable memo
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const filtered = useMemo(() => {
    const searchTerm = search.trim().toLowerCase();

    return invitations.filter((inv) => {
      if (invStatus && (inv.status || "") !== invStatus) return false;

      const invGuests: any[] = Array.isArray((inv as any).guests) ? (inv as any).guests : [];

      if (group) {
        const selectedId = group;
        const matchGroup = invGuests.some((ig: any) => {
          const gid = ig?.guest?.group || ig?.guest?.group?.id || "";
          return gid === selectedId;
        });
        if (!matchGroup) return false;
      }

      if (searchTerm) {
        const matches = invGuests.some((ig: any) => {
          const fn = ig?.guest?.person?.first_name || "";
          const ln = ig?.guest?.person?.last_name || "";
          const full = `${fn} ${ln}`.toLowerCase();
          return full.includes(searchTerm);
        });
        if (!matches) return false;
      }
      return true;
    });
  }, [invitations, search, group, invStatus]);

  const guestsByInvitation = useMemo(() => {
    return guests.reduce<Record<string, DigitalGuest[]>>((acc, g) => {
      const key = g.invitation_id || "";
      if (!acc[key]) acc[key] = [];
      acc[key].push(g);
      return acc;
    }, {});
  }, [guests]);

  const invitationById = useMemo(() => {
    const map = new Map<string, Invitation>();
    invitations.forEach((i) => map.set(i.id, i));
    return map;
  }, [invitations]);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      if (!sendInviteFor) return;
      try {
        // Carga detallada desde Directus: invitation → invitations_guests → guest → person
        const res = await fetch(`/api/invitation-by-id?id=${encodeURIComponent(sendInviteFor)}`);
        if (!res.ok) throw new Error("failed_to_fetch_invitation");
        const data = await res.json();
        const inv = data?.invitation || {};
        const invGuests = Array.isArray(inv?.guests) ? inv.guests : [];
        const mapped = invGuests
          .map((ig: any) => ({
            id: (ig?.guest && (ig.guest.id || ig.guest)) || ig?.id || "",
            person: ig?.guest?.person || null,
            status: ig?.guest?.rsvp_status || ig?.guest?.invitation_status || "unknown",
          }))
          .filter((g: any) => g.id);
        if (!cancelled) {
          setSendInviteGuests(mapped);
          setSelectedGuestId(mapped[0]?.id || "");
          setSelectedInvStatus((inv?.status as string) || "");
        }
      } catch (e) {
        if (!cancelled) {
          setSendInviteGuests([]);
        }
      }
    }
    setSendInviteGuests([]);
    setSelectedGuestId("");
    load();
    return () => {
      cancelled = true;
    };
  }, [sendInviteFor]);

  function buildWhatsAppUrlFromPerson(
    person: { WhatsApp?: string; first_name?: string } | null | undefined,
    invitationId: string,
    totalGuestsInInvitation?: number
  ) {
    if (!person) return "#";
    const isSingle = (totalGuestsInInvitation ?? 2) <= 1;
    let base = (person?.WhatsApp as string | undefined) || "https://wa.me/";
    const sep = base.includes("?") ? "&" : "?";

    const pluralMsg = `🩵 ¡Hola ${person?.first_name || ""} y familia! 🤍\n\n🙏🏼 DIOS les bendiga grandemente. Con mucha alegría queremos invitarles a compartir con nosotros un día lleno de amor, fe y promesas eternas: 💍 *nuestra boda*.\n\n🌿 Será una bendición tenerles presentes en esta hermosa ceremonia de unión y gratitud a DIOS. ✨\n\n🔗 *Este enlace es único para ti y tu familia*, por favor confirma tu asistencia aquí:\n👉 https://invite.joseiz.com/?invitationID=${invitationId}\n\n💬 Además, *únete a nuestro canal de WhatsApp* para recibir información especial sobre la boda, recordatorios y detalles importantes:\n👉 https://whatsapp.com/channel/0029Vb7DVvRG3R3fKzbINE0C\n\n📖 *Proverbios 3:6*\n"Reconócelo en todos tus caminos, y ÉL enderezará tus veredas."\n\n🕊️ Con todo nuestro cariño y gratitud,\nClarisa y José 💐💙`;

    const singularMsg = `🩵 ¡Hola ${person?.first_name || ""}! 🤍\n\n🙏🏼 DIOS le bendiga grandemente. Con mucha alegría queremos invitarle a compartir con nosotros un día lleno de amor, fe y promesas eternas: 💍 *nuestra boda*.\n\n🌿 Será una bendición tenerle presente en esta hermosa ceremonia de unión y gratitud a DIOS. ✨\n\n🔗 *Este enlace es único para usted*, por favor confirme su asistencia aquí:\n👉 https://invite.joseiz.com/?invitationID=${invitationId}\n\n💬 Además, *únete a nuestro canal de WhatsApp* para recibir información especial sobre la boda, recordatorios y detalles importantes:\n👉 https://whatsapp.com/channel/0029Vb7DVvRG3R3fKzbINE0C\n\n📖 *Proverbios 3:6*\n"Reconócelo en todos tus caminos, y ÉL enderezará tus veredas."\n\n🕊️ Con todo nuestro cariño y gratitud,\nClarisa y José 💐💙`;

    const message = isSingle ? singularMsg : pluralMsg;
    const textTemplate = encodeURIComponent(message);
    return `${base}${sep}text=${textTemplate}`;
  }

  function buildWhatsAppReminderUrlFromPerson(
    person: { WhatsApp?: string; first_name?: string } | null | undefined,
    invitationId: string,
    invitationGuests?: Array<{ person: { first_name?: string; last_name?: string; WhatsApp?: string } | null; status?: string }>
  ) {
    if (!person) return "#";
    const totalGuestsInInvitation = Array.isArray(invitationGuests) ? invitationGuests.length : undefined;
    const isSingle = (totalGuestsInInvitation ?? 2) <= 1;

    let base = (person?.WhatsApp as string | undefined) || "https://wa.me/";
    const sep = base.includes("?") ? "&" : "?";

    if (isSingle) {
      const singularMsg = `🩵 ¡Hola ${person?.first_name || ""}! 🤍\n\n🙏🏼 DIOS te bendiga grandemente. Queríamos recordarte con mucho cariño que ya falta muy poco para nuestra boda 💍, un día para celebrar el amor, la fe y la fidelidad de DIOS. 💒\n\n🌿 Nos haría muy feliz contar con tu presencia en este momento tan especial.\n\n🔗 *Este enlace es único para ti*, por favor confirma tu asistencia aquí:\n👉 https://invite.joseiz.com/solicitud/?invitationID=${invitationId}\n\n🕊️ *Atentamente,*\nClarisa y José 💐💙`;
      return `${base}${sep}text=${encodeURIComponent(singularMsg)}`;
    }

    const pending = (invitationGuests || [])
      .filter((g) => {
        const s = (g?.status || "unknown").toLowerCase();
        return !(s === "accepted" || s === "confirmed" || s === "declined");
      })
      .map((g) => (g?.person?.first_name || "").trim())
      .filter(Boolean);

    const pendingBlock = pending.length
      ? `\n\n📋 *Aún falta por confirmar de tu familia:*\n${pending.map((n) => `• ${n}`).join("\n")}`
      : "";

    const pluralMsg = `🩵 ¡Hola ${person?.first_name || ""} y familia! 🤍\n\n🙏🏼 DIOS les bendiga grandemente. Queríamos recordarles con mucho cariño que ya falta muy poco para nuestra boda 💍, un día para celebrar el amor, la fe y la fidelidad de DIOS. 💒\n\n🌿 Nos haría muy felices contar con su presencia en este momento tan especial.\n\n🔗 *Este enlace es único para ti y tu familia*, por favor confirmen su asistencia aquí:\n👉 https://invite.joseiz.com/solicitud/?invitationID=${invitationId}${pendingBlock}\n\n🕊️ *Atentamente,*\nClarisa y José 💐💙`;

    return `${base}${sep}text=${encodeURIComponent(pluralMsg)}`;
  }

  const header = (
    <div className="px-4 sm:px-6 md:px-8 pt-6 pb-4 border-b border-slate-200">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-slate-800">Solicitudes — Admin</h2>
          <p className="mt-1 text-sm text-slate-600">Gestiona las invitaciones, aplica filtros y abre el detalle para administrar invitados.</p>
        </div>
      </div>
            <AdminCharts invitations={filtered as any} groups={groupsAvailable} />
      <div className="mt-4 grid gap-3 md:grid-cols-3">
        <input
          className="border border-slate-300 rounded-lg px-3 py-2 md:col-span-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-200"
          placeholder="Buscar por nombre de invitado"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select className="border border-slate-300 rounded-lg px-3 py-2 bg-white" value={group} onChange={(e) => setGroup(e.target.value)}>
          <option value="">Grupo</option>
          {groupsAvailable.map((g) => (
            <option key={g.id} value={g.id}>
              {g.name}
            </option>
          ))}
        </select>
      </div>
      <div className="mt-3 flex flex-wrap items-center gap-2">
        {(() => {
          // Compute counts based on current search/group filters (without status)
          const base = invitations.filter((inv) => {
            const invGuests: any[] = Array.isArray((inv as any).guests) ? (inv as any).guests : [];
            if (group) {
              const selectedId = group;
              const matchGroup = invGuests.some((ig: any) => {
                const gid = ig?.guest?.group || ig?.guest?.group?.id || "";
                return gid === selectedId;
              });
              if (!matchGroup) return false;
            }
            if (search.trim()) {
              const term = search.trim().toLowerCase();
              const matches = invGuests.some((ig: any) => {
                const fn = ig?.guest?.person?.first_name || "";
                const ln = ig?.guest?.person?.last_name || "";
                const full = `${fn} ${ln}`.toLowerCase();
                return full.includes(term);
              });
              if (!matches) return false;
            }
            return true;
          });
          const countAll = base.length;
          const countDraft = base.filter((i) => (i as any).status === "draft").length;
          const countSent = base.filter((i) => (i as any).status === "sent").length;
          const countBounced = base.filter((i) => (i as any).status === "bounced").length;
          const countAccAll = base.filter((i) => (i as any).status === "accepted_all").length;
          const countAccPartial = base.filter((i) => (i as any).status === "accepted_partial").length;
          const countDeclAll = base.filter((i) => (i as any).status === "declined_all").length;
          const tabs = [
            { value: "", label: "Todos", count: countAll },
            { value: "draft", label: "Borrador", count: countDraft },
            { value: "sent", label: "Enviada", count: countSent },
            { value: "bounced", label: "Rebotada", count: countBounced },
            { value: "accepted_all", label: "Confirmada", count: countAccAll },
            { value: "accepted_partial", label: "Parcial", count: countAccPartial },
            { value: "declined_all", label: "Rechazada", count: countDeclAll },
          ];
          return tabs.map((tab) => (
            <button
              key={tab.value || "all"}
              type="button"
              onClick={() => setInvStatus(tab.value)}
              aria-pressed={invStatus === tab.value}
              className={`px-3 py-1.5 rounded-full border text-sm transition-all select-none ${
                invStatus === tab.value
                  ? " bg-sky-50 text-sky-800 border-sky-200 shadow"
                  : "bg-white text-slate-700 border-slate-300 hover:bg-slate-50"
              }`}
            >
              <span className="inline-flex items-center gap-2">
                <span>{tab.label}</span>
                <span className="inline-flex min-w-6 justify-center rounded-full px-1.5 py-0.5 text-[11px] border bg-white text-slate-700">{tab.count}</span>
              </span>
            </button>
          ));
        })()}
      </div>
    </div>
  );

  useEffect(() => {
    if (typeof window === "undefined") return;
    const check = () => {
      const h = cardRef.current?.offsetHeight ?? 0;
      const vh = window.innerHeight ?? 0;
      setListShouldScroll(h >= vh);
    };
    check();
    let ro: ResizeObserver | null = null;
    if (typeof window !== "undefined" && (window as any).ResizeObserver && cardRef.current) {
      ro = new ResizeObserver(check);
      try { ro.observe(cardRef.current); } catch {}
    }
    window.addEventListener("resize", check);
    return () => {
      window.removeEventListener("resize", check);
      if (ro) ro.disconnect();
    };
  }, [filtered, loading, group, invStatus, search]);

  const reloadInvitations = async () => {
    try {
      const weddingId = process.env.NEXT_PUBLIC_WEDDING_ID;
      const invitationsUrl = weddingId
        ? `/api/wedding-invitations?wedding_id=${encodeURIComponent(weddingId)}`
        : "/api/wedding-invitations";
      const r = await fetch(invitationsUrl);
      if (!r.ok) throw new Error("failed");
      const data = await r.json();
      setInvitations(Array.isArray(data?.invitations) ? (data.invitations as Invitation[]) : []);
    } catch (e) {
      // mantener filtros, solo no actualizar invitaciones si falla
    }
  };

  return (
    <main className="min-h-screen p-4 sm:p-6 md:p-8 bg-[color:var(--color-dusty-50)] text-[color:var(--color-dusty-900)]">
      <div className="w-full max-w-full sm:max-w-3xl md:max-w-5xl mx-auto shadow-xl border border-slate-200 rounded-2xl bg-white overflow-visible" ref={cardRef}>
        {header}

        <div className="p-4 sm:p-6">
          {loading ? (
            <div className="min-h-[20vh] grid place-items-center">
              <div className="opacity-70">Cargando…</div>
            </div>
          ) : error ? (
            <div className="min-h-[20vh] grid place-items-center">
              <div className="text-rose-700">No se pudo cargar la información.</div>
            </div>
          ) : (
            <>

              <ul className={`mt-4 divide-y rounded-xl border border-slate-200 bg-white ${listShouldScroll ? "max-h-[60vh] overflow-y-auto" : ""}`}>
              {filtered.map((inv) => {
                const invGuests: any[] = Array.isArray((inv as any).guests) ? (inv as any).guests : [];
                const counts = invGuests.reduce(
                  (acc, ig: any) => {
                    const s = ig?.guest?.rsvp_status || ig?.guest?.invitation_status || "unknown";
                    if (s === "accepted" || s === "confirmed") acc.accepted += 1;
                    else if (s === "declined") acc.declined += 1;
                    else acc.unknown += 1;
                    acc.total += 1;
                    return acc;
                  },
                  { total: 0, accepted: 0, declined: 0, unknown: 0 }
                );
                const st = (inv as any).status as string | undefined;
                const stLabel =
                  st === "draft" ? "Borrador" :
                  st === "sent" ? "Enviada" :
                  st === "bounced" ? "Rebotada" :
                  st === "accepted_all" ? "Confirmada" :
                  st === "accepted_partial" ? "Parcial" :
                  st === "declined_all" ? "Rechazada" : "-";
                const stColor =
                  st === "draft" ? "bg-slate-100 text-slate-800 border-slate-200" :
                  st === "sent" ? "bg-amber-100 text-amber-800 border-amber-200" :
                  st === "bounced" ? "bg-violet-100 text-violet-800 border-violet-200" :
                  st === "accepted_all" ? "bg-emerald-100 text-emerald-800 border-emerald-200" :
                  st === "accepted_partial" ? "bg-sky-100 text-sky-800 border-sky-200" :
                  st === "declined_all" ? "bg-rose-100 text-rose-800 border-rose-200" :
                  "bg-slate-100 text-slate-700 border-slate-200";
                return (
                  <li key={inv.id} className="p-4 flex items-center justify-between gap-3 relative border-slate-200">
                    <div className="min-w-0">
                      <div className="font-medium text-slate-800 truncate">{(inv as any).code || inv.id}</div>
                      <div className="mt-1 flex flex-wrap items-center gap-2 text-sm">
                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full border ${stColor}`}>
                          {stLabel}
                        </span>
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full border bg-emerald-50 text-emerald-800 border-emerald-200">Confirmados: {counts.accepted}</span>
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full border bg-rose-50 text-rose-800 border-rose-200">Rechazados: {counts.declined}</span>
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full border bg-sky-50 text-sky-800 border-sky-200">Pendientes: {counts.unknown}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="relative">
                        <button
                          className="px-3 py-1.5 rounded-lg border border-slate-300 bg-white hover:bg-slate-50"
                          onClick={() => setMenuOpenFor((m) => (m === inv.id ? null : inv.id))}
                        >
                          Acciones ▾
                        </button>
                        {menuOpenFor === inv.id && (
                          <div className="absolute right-0 mt-2 w-48 rounded-lg border border-slate-200 bg-white shadow-lg z-50">
                            <button
                              className="w-full text-left px-3 py-2 hover:bg-slate-50"
                              onClick={() => {
                                setActiveId(inv.id);
                                setMenuOpenFor(null);
                              }}
                            >
                              Gestionar
                            </button>
                            <button
                              className="w-full text-left px-3 py-2 hover:bg-slate-50"
                              onClick={() => {
                                setSendMode("invite");
                                setSendInviteFor(inv.id);
                                setMenuOpenFor(null);
                              }}
                            >
                              Enviar invitación
                            </button>
                            <button
                              className="w-full text-left px-3 py-2 hover:bg-slate-50"
                              onClick={() => {
                                setSendMode("reminder");
                                setSendInviteFor(inv.id);
                                setMenuOpenFor(null);
                              }}
                            >
                              Enviar recordatorio
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </li>
                );
              })}
              {!filtered.length && (
                <li className="p-4 text-sm text-slate-600">No hay invitaciones que coincidan con los filtros.</li>
              )}
            </ul>
            </>
          )}
        </div>
      </div>

      {activeId && (
        <SolicitudManager
          solicitudId={activeId}
          asModal
          open={true}
          onClose={() => setActiveId(null)}
          showFilters
          showSearch
          showBulkActions
          onChanged={reloadInvitations}
          adminMode
        />
      )}

      {/* Modal de Enviar invitación */}
      {sendInviteFor && (
        <div className="fixed inset-0 z-20">
          <div className="absolute inset-0 bg-black/40" onClick={() => setSendInviteFor(null)} />
          <div className="absolute inset-0 flex items-center justify-center p-4">
            <div className="w-full max-w-lg rounded-2xl bg-white shadow-xl border border-slate-200">
              <div className="px-5 py-4 border-b border-slate-200 flex items-center justify-between">
                <h3 className="text-lg font-semibold text-slate-800">{sendMode === "reminder" ? "Enviar recordatorio" : "Enviar invitación"}</h3>
                <button
                  className="px-2 py-1 rounded-lg border border-slate-300 bg-white hover:bg-slate-50"
                  onClick={() => setSendInviteFor(null)}
                >
                  Cerrar
                </button>
              </div>
              <div className="px-5 py-4 space-y-4">
                <div>
                  <label className="block text-sm text-slate-600 mb-1">Invitado</label>
                  <select
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 bg-white"
                    value={selectedGuestId}
                    onChange={(e) => setSelectedGuestId(e.target.value)}
                  >
                    {sendInviteGuests.map((g) => (
                      <option key={g.id} value={g.id}>
                        {(g.person?.first_name || "")} {(g.person?.last_name || "")}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-slate-600 mb-1">Estado de la invitación</label>
                  <select
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 bg-white"
                    value={selectedInvStatus}
                    onChange={async (e) => {
                      const newStatus = e.target.value;
                      setSelectedInvStatus(newStatus);
                      if (sendInviteFor && newStatus) {
                        try {
                          const { patchInvitationStatus } = await import("@/lib/api/solicitudes");
                          await patchInvitationStatus(sendInviteFor, newStatus);
                          setInvitations((prev) => prev.map((i) => (i.id === sendInviteFor ? { ...i, status: newStatus } as any : i)));
                        } catch (err) {
                          // simple fallback UI, mantener minimalismo
                          console.error("Failed to update invitation status", err);
                          alert("No se pudo actualizar el estado de la invitación.");
                        }
                      }
                    }}
                  >
                    <option value="">Sin cambio</option>
                    <option value="draft">Borrador</option>
                    <option value="sent">Enviada</option>
                    <option value="bounced">Rebotada</option>
                    <option value="accepted_all">Confirmada</option>
                    <option value="accepted_partial">Parcial</option>
                    <option value="declined_all">Rechazada</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-slate-600 mb-1">Direccion URL</label>
                  <div className="flex gap-2">
                    <input
                      className="w-full border border-slate-300 rounded-lg px-3 py-2 bg-white"
                      readOnly
                      value={`${origin}/solicitud?invitationID=${sendInviteFor || ""}`}
                    />
                    <button
                      type="button"
                      className="px-3 py-2 rounded-lg border border-slate-300 bg-white hover:bg-slate-50"
                      onClick={() => {
                        try {
                          const val = `${origin}/solicitud?invitationID=${sendInviteFor || ""}`;
                          navigator.clipboard.writeText(val).then(() => setCopiedUrl(true)).catch(() => setCopiedUrl(false));
                          setTimeout(() => setCopiedUrl(false), 1500);
                        } catch {}
                      }}
                    >{copiedUrl ? "Copiado" : "Copiar"}</button>
                  </div>
                </div>
                <div className="pt-2 flex items-center justify-between">
                  <div className="text-sm text-slate-600">El botón abrirá WhatsApp con el texto prellenado.</div>
                  <a
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-500 active:scale-[0.98]"
                    target="_blank"
                    rel="noopener noreferrer"
                    href={
                      sendMode === "reminder"
                        ? buildWhatsAppReminderUrlFromPerson(
                            sendInviteGuests.find((g) => g.id === selectedGuestId)?.person,
                            sendInviteFor,
                            sendInviteGuests
                          )
                        : buildWhatsAppUrlFromPerson(
                            sendInviteGuests.find((g) => g.id === selectedGuestId)?.person,
                            sendInviteFor,
                            sendInviteGuests.length
                          )
                    }
                  >
                    {sendMode === "reminder" ? "Enviar recordatorio" : "Enviar invitación"}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
