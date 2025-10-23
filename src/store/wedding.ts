"use client";

import { create } from "zustand";
import { useEffect } from "react";

export type WeddingGeneralities = any;

function resolveWeddingId(): string {
  try {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const id = params.get("wedding_id");
      if (id) return id;
    }
  } catch {}
  return process.env.NEXT_PUBLIC_WEDDING_ID || process.env.DIRECTUS_WEDDING_ID || "";
}

async function fetchWedding(weddingId: string): Promise<WeddingGeneralities> {
  const params = new URLSearchParams();
  if (weddingId) params.set("wedding_id", weddingId);
  const qs = params.toString();
  const url = `/api/wedding-generalities${qs ? `?${qs}` : ""}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("failed_to_fetch_wedding");
  return await res.json();
}

type StoreState = {
  dataById: Record<string, WeddingGeneralities | undefined>;
  loadingById: Record<string, boolean>;
  errorById: Record<string, string | null>;
  promiseById: Record<string, Promise<WeddingGeneralities> | undefined>;
  get: (weddingId?: string) => Promise<WeddingGeneralities>;
  refresh: (weddingId?: string) => Promise<WeddingGeneralities>;
  setInitial: (data: WeddingGeneralities, weddingId?: string) => void;
};

export const useWeddingStore = create<StoreState>((set, get) => ({
  dataById: {},
  loadingById: {},
  errorById: {},
  promiseById: {},

  async get(weddingId?: string) {
    const id = (weddingId ?? resolveWeddingId()) || "default";
    const state = get();
    if (state.dataById[id]) return state.dataById[id]!;
    if (state.promiseById[id]) return state.promiseById[id]!;

    set((s) => ({ loadingById: { ...s.loadingById, [id]: true }, errorById: { ...s.errorById, [id]: null } }));
    const p = fetchWedding(id)
      .then((data) => {
        set((s) => ({
          dataById: { ...s.dataById, [id]: data },
          loadingById: { ...s.loadingById, [id]: false },
          errorById: { ...s.errorById, [id]: null },
          promiseById: { ...s.promiseById, [id]: undefined },
        }));
        return data;
      })
      .catch((e) => {
        set((s) => ({
          loadingById: { ...s.loadingById, [id]: false },
          errorById: { ...s.errorById, [id]: e?.message || "failed" },
          promiseById: { ...s.promiseById, [id]: undefined },
        }));
        throw e;
      });

    set((s) => ({ promiseById: { ...s.promiseById, [id]: p } }));
    return p;
  },

  async refresh(weddingId?: string) {
    const id = (weddingId ?? resolveWeddingId()) || "default";
    set((s) => ({ loadingById: { ...s.loadingById, [id]: true }, errorById: { ...s.errorById, [id]: null } }));
    const data = await fetchWedding(id).finally(() => set((s) => ({ loadingById: { ...s.loadingById, [id]: false } })));
    set((s) => ({ dataById: { ...s.dataById, [id]: data } }));
    return data;
  },

  setInitial(data, weddingId) {
    const id = (weddingId ?? resolveWeddingId()) || "default";
    set((s) => ({ dataById: { ...s.dataById, [id]: data } }));
  },
}));

export function useWeddingData(weddingId?: string) {
  const id = (weddingId ?? resolveWeddingId()) || "default";
  const data = useWeddingStore((s) => s.dataById[id] ?? null);
  const loading = useWeddingStore((s) => !!s.loadingById[id]);
  const error = useWeddingStore((s) => s.errorById[id] ?? null);
  const refresh = () => useWeddingStore.getState().get(id);
  useEffect(() => {
    if (!data && !loading) {
      void useWeddingStore.getState().get(id);
    }
  }, [id, data, loading]);
  return { data, loading, error, refresh };
}
