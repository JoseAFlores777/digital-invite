"use client";

import React from "react";
import { Icon } from "@iconify/react";
import CustomBtn from "@/components/CustomBtn";

export default function SharedAlbum() {
  const [albumUrl, setAlbumUrl] = React.useState<string | null>(null);
  const [tutorialUrl, setTutorialUrl] = React.useState<string | null>(null);
  const [loaded, setLoaded] = React.useState(false);

  React.useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const weddingId = params.get("wedding_id") || process.env.NEXT_PUBLIC_WEDDING_ID || "";
    const url = weddingId ? `/api/wedding-generalities?wedding_id=${encodeURIComponent(weddingId)}` : "/api/wedding-generalities";
    fetch(url)
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((data) => {
        const a = data?.wedding?.shared_album_url || null;
        const t = data?.wedding?.shared_album_tutorial_url || null;
        setAlbumUrl(a);
        setTutorialUrl(t);
      })
      .catch(() => void 0)
      .finally(() => setLoaded(true));
  }, []);

  if (!loaded) return null;
  if (!albumUrl && !tutorialUrl) return null;

  return (
    <section id="sharedAlbum" className="bg-white">
      <div className="max-w-5xl mx-auto px-6 py-20">
        <div className="text-center mb-10">
          <div className="inline-block mb-4">
            <div className="shrink-0 w-12 h-12 rounded-full bg-[color:var(--color-dusty-600)] shadow-md grid place-items-center">
              <Icon icon="mdi:camera-outline" className="w-7 h-7 text-white" />
            </div>
          </div>
          <h2 className="display-font text-3xl md:text-4xl mb-3">Álbum Compartido</h2>
          <p className="text-neutral-700 max-w-2xl mx-auto">
            Comparte tus fotos con nosotros. Súbelas a nuestro álbum y guarda los mejores momentos de este día tan especial.
          </p>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-center gap-4 max-w-3xl mx-auto">
          {albumUrl && (
            <CustomBtn
              key="shared-album-open"
              href={albumUrl}
              target="_blank"
              rel="noopener noreferrer"
              label="Abrir álbum de fotos"
              icon="mdi:open-in-new"
              variant="outline"
              size="md"
              className="w-full md:w-auto"
            />
          )}
          {tutorialUrl && (
            <CustomBtn
              key="shared-album-tutorial"
              href={tutorialUrl}
              target="_blank"
              rel="noopener noreferrer"
              label="Ver cómo subir fotos"
              icon="mdi:help-circle-outline"
              variant="outline"
              size="md"
              className="w-full md:w-auto"
              shine
            />
          )}
        </div>
      </div>
    </section>
  );
}
