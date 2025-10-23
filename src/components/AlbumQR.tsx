"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { useGsapContext, gsap } from "@/hooks/useGsapContext";

const images = [
  "/images/IMG_0049.JPG",
  "/images/IMG_0051.JPG",
  "/images/IMG_0097.JPG",
  "/images/IMG_0136.JPG",
  "/images/IMG_0146.JPG",
  "/images/IMG_0049.JPG",
];

export default function AlbumQR() {
  const root = useRef<HTMLDivElement>(null);

  useGsapContext(() => {
    if (!root.current) return;
    const q = gsap.utils.selector(root);
    gsap.from(q('[data-anim="thumb"]'), {
      opacity: 0,
      y: 24,
      duration: 0.6,
      ease: "power2.out",
      stagger: 0.08,
      scrollTrigger: { trigger: root.current, start: "top 80%", toggleActions: "play none none reverse" },
    });
  }, []);

  return (
    <section id="album" ref={root} className="bg-white">
      <div className="max-w-5xl mx-auto px-6 py-16 md:py-20 lg:py-28">
        <h2 className="display-font text-3xl md:text-4xl text-center mb-10">Álbum</h2>
        <div className="grid md:grid-cols-[320px,1fr] gap-8 items-start">
          <div className="rounded-2xl border border-neutral-200 p-6 bg-white/80 text-center">
            <Image src="/assets/qr.svg" alt="Código QR para subir fotos" width={160} height={160} className="mx-auto w-40 h-40" />
            <a href="#" className="btn btn-primary mt-4" onClick={(e) => e.preventDefault()}>Subir fotos</a>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {images.map((src, i) => (
              <Image key={`${src}-${i}`} src={src} alt="Foto de la galería" width={800} height={600} data-anim="thumb" className="rounded-xl border border-neutral-200 w-full h-auto object-cover" />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
