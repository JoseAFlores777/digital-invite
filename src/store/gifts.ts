"use client";

import { create } from "zustand";

type GiftOption = any;

type StoreState = {
  optionsByWedding: Record<string, GiftOption[] | undefined>;
  loadingByWedding: Record<string, boolean>;
  errorByWedding: Record<string, string | null>;
  promiseByWedding: Record<string, Promise<GiftOption[]> | undefined>;
  get: (weddingId?: string) => Promise<GiftOption[]>;
};

function resolveWeddingId(): string {
  try {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const id = params.get("wedding_id");
      if (id) return id;
    }
  } catch {}
  return process.env.NEXT_PUBLIC_WEDDING_ID || process.env.DIRECTUS_WEDDING_ID || "default";
}

async function fetchGiftOptions(weddingId?: string): Promise<GiftOption[]> {
  const wId = weddingId ?? resolveWeddingId();
  const url = wId ? `/api/gift-options?wedding_id=${encodeURIComponent(wId)}` : "/api/gift-options";
  const res = await fetch(url);
  if (!res.ok) throw new Error("failed_to_fetch_gift_options");
  const json = await res.json();
  return Array.isArray(json?.options) ? json.options : [];
}

export const useGiftsStore = create<StoreState>((set, get) => ({
  optionsByWedding: {},
  loadingByWedding: {},
  errorByWedding: {},
  promiseByWedding: {},

  async get(weddingId?: string) {
    const id = (weddingId ?? resolveWeddingId()) || "default";
    const s = get();
    if (s.optionsByWedding[id]) return s.optionsByWedding[id]!;
    if (s.promiseByWedding[id]) return s.promiseByWedding[id]!;

    set((st) => ({
      loadingByWedding: { ...st.loadingByWedding, [id]: true },
      errorByWedding: { ...st.errorByWedding, [id]: null },
    }));

    const p = fetchGiftOptions(id)
      .then((opts) => {
        set((st) => ({
          optionsByWedding: { ...st.optionsByWedding, [id]: opts },
          loadingByWedding: { ...st.loadingByWedding, [id]: false },
          errorByWedding: { ...st.errorByWedding, [id]: null },
          promiseByWedding: { ...st.promiseByWedding, [id]: undefined },
        }));
        return opts;
      })
      .catch((e) => {
        set((st) => ({
          loadingByWedding: { ...st.loadingByWedding, [id]: false },
          errorByWedding: { ...st.errorByWedding, [id]: e?.message || "failed" },
          promiseByWedding: { ...st.promiseByWedding, [id]: undefined },
        }));
        throw e;
      });

    set((st) => ({ promiseByWedding: { ...st.promiseByWedding, [id]: p } }));
    return p;
  },
}));
