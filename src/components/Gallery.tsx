"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import PhotoSwipeLightbox from "photoswipe/lightbox";
import "photoswipe/style.css";
import { fetchWeddingGeneralities } from "@/lib/api/solicitudes";

export default function Gallery() {
  const root = useRef<HTMLDivElement>(null);
  const [images, setImages] = useState<{
    id: string;
    largeURL: string;
    originalURL: string;
    thumbnailURL: string;
    width: number;
    height: number;
  }[]>([]);

  useEffect(() => {
    let active = true;

    const loadNaturalSize = (url: string) =>
      new Promise<{ w: number; h: number }>((resolve) => {
        const img = new Image();
        img.loading = "eager";
        img.decoding = "async" as any;
        img.onload = () => {
          const w = Math.max(1, img.naturalWidth || 0);
          const h = Math.max(1, img.naturalHeight || 0);
          resolve({ w, h });
        };
        img.onerror = () => resolve({ w: 1600, h: 1067 });
        img.src = url;
      });

    (async () => {
      try {
        const wg = await fetchWeddingGeneralities("");
        if (!active || !wg) return;
        const baseUrl: string = (wg?.directus_url as string) || process.env.NEXT_PUBLIC_DIRECTUS_URL || "";
        const list: any[] = Array.isArray(wg?.wedding?.web_photos) ? wg.wedding.web_photos : (Array.isArray(wg?.web_photos) ? wg.web_photos : []);
        const galleryList = (list || []).filter((p: any) => String(p?.type || "").toLowerCase() === "gallery");
        const ids: string[] = galleryList
          .map((p: any) => String(p?.asset || "").trim())
          .filter((id: string) => !!id);

        const prelim = ids.map((id) => {
          const originalURL = baseUrl ? `${baseUrl}/assets/${id}` : `/api/directus/assets/${id}`;
          const largeURL = baseUrl ? `${baseUrl}/assets/${id}?format=webp&quality=85&width=1600` : `/api/directus/assets/${id}?w=1600`;
          const thumbnailURL = baseUrl ? `${baseUrl}/assets/${id}?format=webp&quality=70&width=400` : `/api/directus/assets/${id}?w=400`;
          return { id, largeURL, originalURL, thumbnailURL, width: 1600, height: 1067 };
        });

        // Measure natural sizes to preserve aspect ratio in PhotoSwipe
        const measured = await Promise.all(
          prelim.map(async (it) => {
            const { w, h } = await loadNaturalSize(it.originalURL);
            return { ...it, width: w, height: h };
          })
        );

        if (active) setImages(measured);
      } catch {
        if (active) setImages([]);
      }
    })();
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (!root.current) return;
    const galleryId = "engagement-gallery";
    let lightbox = new PhotoSwipeLightbox({
      gallery: `#${galleryId}`,
      children: "a",
      pswpModule: () => import("photoswipe"),
      initialZoomLevel: 'fit',
      secondaryZoomLevel: 1,
    });
    lightbox.init();
    return () => {
      lightbox.destroy();
      // @ts-expect-error allow gc
      lightbox = null;
    };
  }, [images.length]);

  const galleryID = "engagement-gallery";

  return (
    <section id="galeria" ref={root} className="bg-white">
      <div className="max-w-6xl mx-auto px-6 py-16 md:py-20 lg:py-28">
        <div className="text-center mb-10 md:mb-14">
          <h2 className="display-font text-3xl md:text-4xl">Galería</h2>
          <div className="w-16 h-px bg-neutral-200 mx-auto mt-4"></div>
          <p className="text-neutral-700 max-w-2xl mx-auto mt-4">Fotos de nuestro compromiso</p>
        </div>

        {/* Grid inspired by PhotoMasonry.tsx (no pinned scroll; responsive masonry-like) */}
        <div id={galleryID} className="pswp-gallery grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 sm:gap-3">
          {images.map((image, index) => (
            <a
              key={`${galleryID}-${index}`}
              href={image.largeURL}
              data-pswp-width={image.width}
              data-pswp-height={image.height}
              target="_blank"
              rel="noreferrer"
              className={[
                "group relative block overflow-hidden rounded-xl border border-neutral-200 bg-white",
                // Vary spans a bit like PhotoMasonry
                index % 7 === 0 ? "col-span-2 row-span-2" : "",
                index % 9 === 0 ? "col-span-2 row-span-2" : "",
              ].join(" ")}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={image.thumbnailURL}
                alt=""
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                loading="lazy"
                decoding="async"
              />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
