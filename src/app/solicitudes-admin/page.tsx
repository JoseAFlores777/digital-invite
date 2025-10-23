"use client";
import React, { useEffect, useState } from "react";
import AdminInvitationsList from "@/components/AdminInvitationsList";
import WeddingHeader from "@/components/WeddingHeader";

export default function SolicitudesAdminPage() {
  const [authorized, setAuthorized] = useState<boolean | null>(null);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/auth/solicitudes-admin", { cache: "no-store" })
      .then((r) => r.json())
      .then((d) => {
        if (cancelled) return;
        setAuthorized(Boolean(d?.authorized));
      })
      .catch(() => {
        if (cancelled) return;
        setAuthorized(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      const res = await fetch("/api/auth/solicitudes-admin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (!res.ok) {
        setError("Contraseña incorrecta");
        setAuthorized(false);
        return;
      }
      const d = await res.json();
      setAuthorized(Boolean(d?.authorized));
    } catch (_) {
      setError("Error de red");
      setAuthorized(false);
    } finally {
      setSubmitting(false);
      setPassword("");
    }
  };

  if (authorized === true) return <AdminInvitationsList />;

  return (
    <div className="min-h-screen flex flex-col gap-2 items-center justify-center ">
        <WeddingHeader title="Boda Clarisa & José" />
      <form onSubmit={onSubmit} className="w-full max-w-sm space-y-4 border rounded-lg p-6 bg-white/60 backdrop-blur">
        <h1 className="text-lg font-semibold">Acceso requerido</h1>
        <p className="text-sm text-gray-600">Ingresa la contraseña para ver solicitudes.</p>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border rounded px-3 py-2"
          placeholder="Contraseña"
          autoFocus
        />
        {error ? <div className="text-sm text-red-600">{error}</div> : null}
        <button
          type="submit"
          disabled={submitting || !password}
          className="w-full bg-black text-white rounded px-3 py-2 disabled:opacity-50"
        >
          {submitting ? "Verificando..." : "Entrar"}
        </button>
      </form>
    </div>
  );
}
