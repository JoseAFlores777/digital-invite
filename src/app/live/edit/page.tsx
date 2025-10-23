"use client";
import React, { useEffect, useMemo, useState } from "react";
import WeddingHeader from "@/components/WeddingHeader";
import CustomBtn from "@/components/CustomBtn";

function resolveWeddingId() {
  try {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const id = params.get("wedding_id");
      if (id) return id;
    }
  } catch {}
  return process.env.NEXT_PUBLIC_WEDDING_ID || process.env.DIRECTUS_WEDDING_ID || "";
}

export default function LiveEditPage() {
  const [authorized, setAuthorized] = useState<boolean | null>(null);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const [liveUrl, setLiveUrl] = useState("");
  const [saving, setSaving] = useState(false);
  const [saveMsg, setSaveMsg] = useState<string | null>(null);
  const [copyMsg, setCopyMsg] = useState<string | null>(null);

  const weddingId = useMemo(() => resolveWeddingId(), []);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/auth/solicitudes-admin", { cache: "no-store" })
      .then((r) => r.json())
      .then((d) => {
        if (cancelled) return;
        const ok = Boolean(d?.authorized);
        setAuthorized(ok);
      })
      .catch(() => {
        if (cancelled) return;
        setAuthorized(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    let cancelled = false;
    if (authorized) {
      fetch(`/api/wedding-generalities${weddingId ? `?wedding_id=${encodeURIComponent(weddingId)}` : ""}`)
        .then((r) => (r.ok ? r.json() : null))
        .then((d) => {
          if (cancelled || !d) return;
          const url = d?.wedding?.live_url ?? "";
          setLiveUrl(url || "");
        })
        .catch(() => {});
    }
    return () => {
      cancelled = true;
    };
  }, [authorized, weddingId]);

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

  async function onSave() {
    setSaving(true);
    setSaveMsg(null);
    try {
      const res = await fetch("/api/wedding-live", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ live_url: liveUrl, wedding_id: weddingId }),
      });
      if (!res.ok) throw new Error("failed");
      setSaveMsg("Guardado");
      setTimeout(() => setSaveMsg(null), 2000);
    } catch (e) {
      setSaveMsg("No se pudo guardar");
      setTimeout(() => setSaveMsg(null), 3000);
    } finally {
      setSaving(false);
    }
  }

  async function onCopy() {
    if (!liveUrl) return;
    try {
      await navigator.clipboard.writeText(liveUrl);
      setCopyMsg("Copiado");
      setTimeout(() => setCopyMsg(null), 2000);
    } catch (e) {
      setCopyMsg("No se pudo copiar");
      setTimeout(() => setCopyMsg(null), 3000);
    }
  }

  if (authorized === true) {
    return (
      <div className="min-h-screen flex flex-col gap-6 items-center justify-start py-8">
        <WeddingHeader title="Boda Clarisa & José" />
        <div className="w-full max-w-md space-y-4 border rounded-lg p-6 bg-white/60 backdrop-blur">
          <label className="block text-sm font-medium text-gray-700">Enlace del en vivo (live_url)</label>
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={liveUrl}
              onChange={(e) => setLiveUrl(e.target.value)}
              placeholder="https://..."
              className="flex-1 border rounded px-3 py-2"
            />
            <CustomBtn
              icon={copyMsg ? "lucide:check" : "lucide:copy"}
              onClick={onCopy}
              disabled={!liveUrl}
              variant="outline"
              size="md"
              ariaLabel="Copiar enlace"
            />
          </div>
          <CustomBtn
            onClick={onSave}
            disabled={saving}
            label={saving ? "Guardando..." : "Guardar"}
            icon={saving ? "lucide:loader" : "lucide:save"}
            variant="outline"
            size="md"
            className="w-full"
          />
          {saveMsg ? <div className="text-sm text-center text-gray-700">{saveMsg}</div> : null}
          {copyMsg ? <div className="text-sm text-center text-gray-700">{copyMsg}</div> : null}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col gap-2 items-center justify-center ">
      <WeddingHeader title="Boda Clarisa & José" />
      <form onSubmit={onSubmit} className="w-full max-w-sm space-y-4 border rounded-lg p-6 bg-white/60 backdrop-blur">
        <h1 className="text-lg font-semibold">Acceso requerido</h1>
        <p className="text-sm text-gray-600">Ingresa la contraseña para editar el enlace en vivo.</p>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border rounded px-3 py-2"
          placeholder="Contraseña"
          autoFocus
        />
        {error ? <div className="text-sm text-red-600">{error}</div> : null}
        <CustomBtn
          type="submit"
          disabled={submitting || !password}
          label={submitting ? "Verificando..." : "Entrar"}
          variant="filled"
          size="md"
          className="w-full"
        />
      </form>
    </div>
  );
}
