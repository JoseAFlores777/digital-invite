'use client';

import { useLayoutEffect, useRef } from 'react';
import Image from 'next/image';
import s from './PhotoMasonry.module.scss';

import type { ScrollTrigger as ScrollTriggerType } from 'gsap/ScrollTrigger';

type Props = {
  images: string[];
  rows?: number;
  cell?: number;
  gap?: number;
  markers?: boolean;
};

export default function PhotoMasonry({
  images,
  rows = 6,
  cell = 160,
  gap = 2,
  markers = false,
}: Props) {
  const pinRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    let st: ScrollTriggerType | undefined;
    let ro: ResizeObserver | undefined;
    let detachWindow: (() => void) | undefined;
    let detachImgs: (() => void) | undefined;

    (async () => {
      const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
      if (mql.matches) return;

      const gsapModule = await import('gsap');
      const gsap = gsapModule.default;
      // Ensure cross-browser pin strategy (iOS/Android prefer transform; desktop prefers fixed)
      // We'll decide pinType after registering plugin
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);

      const wrap = pinRef.current!;
      const track = trackRef.current!;

      const hasTransformedAncestor = (el: Element | null): boolean => {
        while (el && el !== document.body) {
          const cs = window.getComputedStyle(el as Element);
          if (
            cs.transform !== 'none' ||
            cs.perspective !== 'none' ||
            cs.filter !== 'none' ||
            (cs as CSSStyleDeclaration & { backdropFilter?: string }).backdropFilter && (cs as CSSStyleDeclaration & { backdropFilter?: string }).backdropFilter !== 'none' ||
            cs.willChange.includes('transform') ||
            cs.willChange.includes('perspective')
          ) {
            return true;
          }
          el = (el as HTMLElement).parentElement;
        }
        return false;
      };

      let widthDelta = 0;
      const recalc = (): void => {
        widthDelta = Math.max(0, track.scrollWidth - wrap.clientWidth);
      };

      const dist = () => widthDelta;

      // Hint GPU acceleration for smoothness
      track.style.willChange = 'transform';
      // Prime transform to prevent first-frame flicker while scrolling down (Safari/iOS)
      gsap.set(track, { x: 0, force3D: true });
      recalc();

      // Drive transform manually based on scroll progress; avoids invalidation quirks on some browsers
      const setX = (p: number) => {
        gsap.set(track, { x: -p * dist(), force3D: true });
      };
      // Initialize position
      setX(0);

      // Choose pinType: if any ancestor has transform/perspective/filter, use 'transform' to avoid fixed-position bugs
      const pinType = hasTransformedAncestor(wrap) ? 'transform' : ((ScrollTrigger as unknown as { isTouch?: boolean }).isTouch ? 'transform' : 'fixed');

      st = ScrollTrigger.create({
        trigger: wrap,
        pin: wrap,
        pinType,
        pinReparent: true,
        start: 'top top',
        end: () => '+=' + Math.max(1, dist()),
        scrub: true,
        anticipatePin: 1,
        pinSpacing: 'margin',
        invalidateOnRefresh: true,
        onUpdate: (self) => setX(self.progress),
        markers,
      });

      // Ensure distance is correct when ST is about to refresh and right after
      ScrollTrigger.addEventListener('refreshInit', recalc);
      ScrollTrigger.addEventListener('refresh', () => {
        recalc();
        setX(st!.progress);
      });

      const onResize = () => ScrollTrigger.refresh();
      // Some browsers fire resize rapidly; batch via rAF
      let rafId: number | null = null;
      const onResizeBatched = () => {
        if (rafId != null) return;
        rafId = requestAnimationFrame(() => {
          rafId = null;
          recalc();
          onResize();
        });
      };
      window.addEventListener('resize', onResizeBatched);
      window.addEventListener('orientationchange', onResizeBatched);
      detachWindow = () => {
        window.removeEventListener('resize', onResizeBatched);
        window.removeEventListener('orientationchange', onResizeBatched);
      };

      const RZ = (window as Window & { ResizeObserver?: typeof ResizeObserver }).ResizeObserver;
      if (typeof RZ === 'function') {
        ro = new RZ(() => { recalc(); ScrollTrigger.refresh(); });
        if (ro) {
          ro.observe(wrap);
          ro.observe(track);
        }
      } else {
        // Fallback when ResizeObserver is unavailable
        const onInterval = () => ScrollTrigger.refresh();
        const id = window.setInterval(onInterval, 500);
        detachWindow = ((prevDetach) => () => {
          prevDetach?.();
          window.clearInterval(id);
        })(detachWindow);
      }

      const imgs = Array.from(track.querySelectorAll('img')) as HTMLImageElement[];
      const unsubList = imgs.map((img) => {
        if (img.complete) return () => {};
        const fn = () => { recalc(); ScrollTrigger.refresh(); };
        img.addEventListener('load', fn, { once: true, passive: true });
        return () => img.removeEventListener('load', fn);
      });
      detachImgs = () => unsubList.forEach((fn) => fn());
    })();

    return () => {
      detachWindow?.();
      detachImgs?.();
      ro?.disconnect();
      st?.kill?.();
      if (trackRef.current) {
        trackRef.current.style.willChange = '';
      }
    };
  }, [markers, rows, cell, gap, images]);

  const gridStyle: React.CSSProperties = {
    gridTemplateRows: `repeat(${rows}, ${cell}px)`,
    // Important: fixed auto-columns ensures the grid extends horizontally
    gridAutoColumns: `${cell}px`,
    gap,
  };

  return (
    <>
      <div className="h-[40vh]" />
      <div ref={pinRef} className={s.pinWrapper} style={{ overflow: 'hidden' }}>
        <div
          ref={trackRef}
          className={`${s.gridWrapper} inline-grid pr-16 bg-transparent`}
          style={{ ...gridStyle, willChange: 'transform', width: 'max-content', display: 'grid', gridAutoFlow: 'column' }}
        >
          {images.map((src, i) => (
            <figure
              key={i}
              className={`${s.box} ${s.feather} relative overflow-hidden col-span-3 row-span-3 ${i % 7 === 0 ? 'col-span-4 row-span-2' : ''} ${i % 9 === 0 ? 'col-span-2 row-span-2' : ''}`}
            >
              <Image
                src={src}
                alt={`photo-${i}`}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                className="object-cover"
                loading="lazy"
              />
            </figure>
          ))}
        </div>
      </div>
      <div className="h-[40vh]" />
    </>
  );
}
