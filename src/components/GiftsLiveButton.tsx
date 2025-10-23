"use client";

import React, { useEffect, useState } from "react";
import LiveStreamButton from "@/components/LiveStreamButton";
import { useWeddingData } from "@/store/wedding";
import { Icon } from "@iconify/react";

export default function GiftsLiveButton() {
  const [liveUrl, setLiveUrl] = useState<string>("");

  const { data } = useWeddingData();
  useEffect(() => {
    const wg: any = data;
    const live: string = (wg?.wedding?.live_url as string) || (wg?.live_url as string) || "";
    setLiveUrl(live || "");
  }, [data]);

  if (!liveUrl) return null;

  return (
    <div className="mb-6 flex items-center justify-center">
      <LiveStreamButton
        liveUrl={liveUrl}
        className="inline-flex items-center gap-3 px-6 py-3 rounded-xl border border-neutral-300 bg-white hover:bg-neutral-50 text-base"
        title="Ver transmisión en vivo"
      >
        <span className="inline-flex items-center gap-2">
          <Icon icon="mdi:youtube" className="w-5 h-5 text-red-600" />
          <span className="truncate text-base font-medium">Ver en vivo</span>
          <span className="ml-2 inline-flex items-center rounded-full bg-red-600 text-white text-xs leading-none px-2.5 py-0.5 animate-pulse">
            En vivo
          </span>
        </span>
      </LiveStreamButton>
    </div>
  );
}
