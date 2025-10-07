"use client";

import React, { useMemo, useState } from "react";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Bar,
} from "recharts";

type Invitation = {
  id: string;
  code?: string | null;
  status?: string | null;
  guests?: any[];
};

type GroupOption = { id: string; name: string | null };

function StatusPie({ data }: { data: Invitation[] }) {
  const counts = useMemo(() => {
    const map: Record<string, number> = {};
    for (const inv of data) {
      const st = (inv.status || "-") as string;
      map[st] = (map[st] || 0) + 1;
    }
    const label = (s: string) =>
      s === "draft"
        ? "Borrador"
        : s === "sent"
        ? "Enviada"
        : s === "bounced"
        ? "Rebotada"
        : s === "accepted_all"
        ? "Confirmada"
        : s === "accepted_partial"
        ? "Parcial"
        : s === "declined_all"
        ? "Rechazada"
        : "Otro";
    return Object.entries(map).map(([k, v]) => ({ name: label(k), value: v, key: k }));
  }, [data]);

  const COLORS = ["#94a3b8", "#f59e0b", "#8b5cf6", "#10b981", "#0ea5e9", "#ef4444", "#64748b"];

  if (!counts.length) return null;

  return (
    <div className="h-56">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Tooltip />
          <Pie data={counts} dataKey="value" nameKey="name" outerRadius={70} innerRadius={30} paddingAngle={2}>
            {counts.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

function GuestsPerGroupBar({ data, groups }: { data: Invitation[]; groups: GroupOption[] }) {
  const groupName = useMemo(() => {
    const map = new Map<string, string>();
    groups.forEach((g) => map.set(g.id, g.name || g.id));
    return (id: string) => map.get(id) || id || "-";
  }, [groups]);

  const rows = useMemo(() => {
    const map = new Map<string, number>();
    for (const inv of data) {
      const invGuests: any[] = Array.isArray((inv as any).guests) ? (inv as any).guests : [];
      invGuests.forEach((ig: any) => {
        const gid = ig?.guest?.group || ig?.guest?.group?.id || null;
        if (!gid) return;
        map.set(gid, (map.get(gid) || 0) + 1);
      });
    }
    const list = Array.from(map.entries()).map(([gid, count]) => {
      const full = groupName(gid);
      const short = full.length > 14 ? full.slice(0, 12) + "…" : full;
      return { group: full, groupShort: short, count };
    });
    return list.sort((a, b) => b.count - a.count);
  }, [data, groupName]);

  if (!rows.length) return null;

  return (
    <div className="h-56">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={rows} margin={{ left: 4, right: 4, top: 8, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="groupShort"
            hide={rows.length > 10}
            interval={0}
            angle={-20}
            textAnchor="end"
            tick={{ fontSize: 11 }}
            height={rows.length > 10 ? 0 : 44}
          />
          <YAxis allowDecimals={false} />
          <Tooltip labelFormatter={(v) => rows.find((r) => r.groupShort === v)?.group || (v as string)} />
          <Bar dataKey="count" fill="#0ea5e9" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

function StatCards({ data }: { data: Invitation[] }) {
  const stats = useMemo(() => {
    let totalGuests = 0;
    let confirmed = 0;
    let declined = 0;
    let pending = 0;

    for (const inv of data) {
      const invGuests: any[] = Array.isArray((inv as any).guests) ? (inv as any).guests : [];
      for (const ig of invGuests) {
        totalGuests += 1;
        const s = ig?.guest?.rsvp_status || ig?.guest?.invitation_status || "unknown";
        if (s === "accepted" || s === "confirmed") confirmed += 1;
        else if (s === "declined") declined += 1;
        else pending += 1;
      }
    }

    return {
      totalGuests,
      confirmed,
      declined,
      pending,
      totalInvitations: data.length,
    };
  }, [data]);

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      <div className="rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2">
        <div className="text-xs text-emerald-800">Confirmados</div>
        <div className="text-lg font-semibold text-emerald-900">{stats.confirmed}/{stats.totalGuests}</div>
      </div>
      <div className="rounded-lg border border-sky-200 bg-sky-50 px-3 py-2">
        <div className="text-xs text-sky-800">Pendientes</div>
        <div className="text-lg font-semibold text-sky-900">{stats.pending}</div>
      </div>
      <div className="rounded-lg border border-rose-200 bg-rose-50 px-3 py-2">
        <div className="text-xs text-rose-800">Rechazados</div>
        <div className="text-lg font-semibold text-rose-900">{stats.declined}</div>
      </div>
      <div className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2">
        <div className="text-xs text-slate-700">Invitaciones</div>
        <div className="text-lg font-semibold text-slate-900">{stats.totalInvitations}</div>
      </div>
    </div>
  );
}

export default function AdminCharts({ invitations, groups }: { invitations: Invitation[]; groups: GroupOption[] }) {
  const [open, setOpen] = useState(false);

  return (
    <section className="mt-4 border rounded-2xl border-slate-200 bg-white/80">
      <div className="p-3 sm:p-4 flex items-center justify-between border-b border-slate-200">
        <div className="font-semibold text-slate-800">Gráficas</div>
        <button
          type="button"
          className="px-3 py-1.5 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 text-sm"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? "Ocultar" : "Mostrar"}
        </button>
      </div>
      <div className="p-3 sm:p-4">
        <StatCards data={invitations} />
        {open && (
          <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="border rounded-xl p-3 bg-white/70">
              <div className="text-sm font-medium mb-2 text-slate-700">Estatus de invitaciones</div>
              <StatusPie data={invitations} />
            </div>
            <div className="border rounded-xl p-3 bg-white/70 md:col-span-2">
              <div className="text-sm font-medium mb-2 text-slate-700">Invitados por grupo</div>
              <GuestsPerGroupBar data={invitations} groups={groups} />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
