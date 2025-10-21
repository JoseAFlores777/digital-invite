"use client";

import React from "react";
import { Icon } from "@iconify/react";

export type LiveStreamButtonProps = {
  liveUrl: string;
  className?: string;
  disabled?: boolean;
  title?: string;
  children?: React.ReactNode;
} & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onClick" | "disabled" | "className" | "title">;

export default function LiveStreamButton({
  liveUrl,
  className,
  disabled,
  title,
  children,
  ...rest
}: LiveStreamButtonProps) {
  function handleClick() {
    try {
      if (!liveUrl) return;
      window.open(liveUrl, "_blank", "noopener,noreferrer");
    } catch {}
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className={className}
      disabled={disabled || !liveUrl}
      title={title || "Ver transmisión en vivo"}
      {...rest}
    >
      {children ?? (
        <span className="inline-flex items-center gap-2">
          <Icon icon="mdi:youtube" className="w-4 h-4 text-red-600" />
          <span className="truncate">Ver en vivo</span>
          <span className="ml-1 inline-flex items-center rounded-full bg-red-600 text-white text-[10px] leading-none px-2 py-0.5 animate-pulse">
            En vivo
          </span>
        </span>
      )}
    </button>
  );
}
