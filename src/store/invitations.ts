"use client";

import { create } from "zustand";

type Invitation = any;

type StoreState = {
  dataById: Record<string, Invitation | undefined>;
  loadingById: Record<string, boolean>;
  errorById: Record<string, string | null>;
  promiseById: Record<string, Promise<Invitation> | undefined>;
  get: (id: string) => Promise<Invitation>;
  setInitial: (id: string, data: Invitation) => void;
  clear: (id?: string) => void;
};

async function fetchInvitationById(id: string): Promise<Invitation> {
  const res = await fetch(`/api/invitation-by-id?id=${encodeURIComponent(id)}`);
  if (!res.ok) throw new Error("failed_to_fetch_invitation");
  const json = await res.json();
  return json?.invitation ?? null;
}

export const useInvitationsStore = create<StoreState>((set, get) => ({
  dataById: {},
  loadingById: {},
  errorById: {},
  promiseById: {},

  async get(id: string) {
    const s = get();
    if (s.dataById[id]) return s.dataById[id]!;
    if (s.promiseById[id]) return s.promiseById[id]!;

    set((st) => ({
      loadingById: { ...st.loadingById, [id]: true },
      errorById: { ...st.errorById, [id]: null },
    }));

    const p = fetchInvitationById(id)
      .then((data) => {
        set((st) => ({
          dataById: { ...st.dataById, [id]: data },
          loadingById: { ...st.loadingById, [id]: false },
          errorById: { ...st.errorById, [id]: null },
          promiseById: { ...st.promiseById, [id]: undefined },
        }));
        return data;
      })
      .catch((e) => {
        set((st) => ({
          loadingById: { ...st.loadingById, [id]: false },
          errorById: { ...st.errorById, [id]: e?.message || "failed" },
          promiseById: { ...st.promiseById, [id]: undefined },
        }));
        throw e;
      });

    set((st) => ({ promiseById: { ...st.promiseById, [id]: p } }));
    return p;
  },

  setInitial(id, data) {
    set((st) => ({ dataById: { ...st.dataById, [id]: data } }));
  },

  clear(id) {
    if (!id) {
      set({ dataById: {}, loadingById: {}, errorById: {}, promiseById: {} });
    } else {
      set((st) => ({
        dataById: { ...st.dataById, [id]: undefined },
        loadingById: { ...st.loadingById, [id]: false },
        errorById: { ...st.errorById, [id]: null },
        promiseById: { ...st.promiseById, [id]: undefined },
      }));
    }
  },
}));
