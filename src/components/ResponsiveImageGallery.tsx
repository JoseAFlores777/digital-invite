"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import CustomBtn from "@/components/CustomBtn";

export type GalleryImage = {
  src: string;
  alt?: string;
  width?: number;
  height?: number;
};

export type ResponsiveImageGalleryProps = {
  images: GalleryImage[];
  className?: string;
  maxCollapsedHeight?: number; // px
  rounded?: string; // tailwind rounded class, e.g., "rounded-lg"
  gap?: string; // tailwind gap class, e.g., "gap-2"
  columns?: string; // tailwind grid cols classes, e.g., "grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
  fadeHeight?: number; // px height of the fade overlay when collapsed
  seeMoreLabel?: string;
  seeLessLabel?: string;
};

/**
 * ResponsiveImageGallery
 * - Collapses to a max height with a subtle gradient fade if content overflows
 * - Smooth expand/collapse animation
 * - Accessible toggle button with aria-expanded
 * - Clean grid layout, responsive and modern
 */
export default function ResponsiveImageGallery({
  images,
  className = "",
  maxCollapsedHeight = 400,
  rounded = "rounded-lg",
  gap = "gap-2",
  columns = "grid-cols-2 md:grid-cols-3 lg:grid-cols-4",
  fadeHeight = 56,
  seeMoreLabel = "Ver más",
  seeLessLabel = "Ver menos",
}: ResponsiveImageGalleryProps) {
  const [expanded, setExpanded] = useState(false);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const [maxHeight, setMaxHeight] = useState<number>(maxCollapsedHeight);
  const contentRef = useRef<HTMLDivElement | null>(null);

  // Determine if the content overflows the collapsed height
  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;

    const checkOverflow = () => {
      const overflows = el.scrollHeight > maxCollapsedHeight + 4; // a small tolerance
      setIsOverflowing(overflows);
      setMaxHeight(expanded ? el.scrollHeight : maxCollapsedHeight);
    };

    checkOverflow();

    const ro = new ResizeObserver(() => checkOverflow());
    ro.observe(el);

    // Images load progressively; ensure we re-measure
    const imgs = Array.from(el.querySelectorAll("img"));
    const handlers: Array<() => void> = [];
    imgs.forEach((img) => {
      const handler = () => checkOverflow();
      if (!img.complete) {
        img.addEventListener("load", handler, { once: true });
        img.addEventListener("error", handler, { once: true });
        handlers.push(() => {
          img.removeEventListener("load", handler);
          img.removeEventListener("error", handler);
        });
      }
    });

    return () => {
      ro.disconnect();
      handlers.forEach((fn) => fn());
    };
  }, [expanded, maxCollapsedHeight]);

  // For smooth open/close using max-height transition
  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;
    // When expanding, set to scrollHeight, then after transition we could set to "none"
    if (expanded) {
      setMaxHeight(el.scrollHeight);
    } else {
      setMaxHeight(maxCollapsedHeight);
    }
  }, [expanded, maxCollapsedHeight]);

  const containerStyles = useMemo<React.CSSProperties>(() => ({
    maxHeight: `${maxHeight}px`,
    transition: "max-height 400ms ease",
    overflow: "hidden",
  }), [maxHeight]);

  const showFade = isOverflowing && !expanded;

  return (
    <div className={className}>
      <div className="relative">
        <div
          ref={contentRef}
          style={containerStyles}
          aria-hidden={false}
        >
          <div className={`grid ${columns} ${gap}`}>
            {images.map((img, idx) => (
              <div key={idx} className={`relative aspect-[4/3] ${rounded} overflow-hidden bg-neutral-100`}>
                <Image
                  src={img.src}
                  alt={img.alt ?? ""}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  className="object-cover"
                  priority={idx < 6}
                />
              </div>
            ))}
          </div>
        </div>

        {showFade && (
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 bottom-0"
            style={{
              height: `${fadeHeight}px`,
              background: "linear-gradient(to bottom, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 80%)",
            }}
          />
        )}
      </div>

      {isOverflowing && (
        <div className="mt-3 flex w-full justify-center">
          <CustomBtn
            onClick={() => setExpanded((v) => !v)}
            ariaExpanded={expanded}
            variant="filled"
            size="md"
            label={expanded ? seeLessLabel : seeMoreLabel}
          />
        </div>
      )}
    </div>
  );
}
