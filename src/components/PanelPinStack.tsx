'use client';

import React from 'react';
import s from './PanelPinStack.module.scss';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(useGSAP as any, ScrollTrigger);

type Props = {
  markers?: boolean;
};

export default function PanelPinStack({ markers = false }: Props) {
    const ref = React.useRef<HTMLDivElement | null>(null);

    useGSAP(() => {
        const el = ref.current;
        if (!el) return;
        if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

        const panels = gsap.utils.toArray<HTMLElement>(el.querySelectorAll('.panel'));
        if (!panels.length) return;

        gsap.set(panels, { zIndex: (i, _t, arr) => (arr as any).length - i });
        const triggerEl = el.querySelector('.pin-trigger') as HTMLElement | null;
        if (!triggerEl) return;

        const hasTransformedAncestor = (node: Element | null): boolean => {
            while (node && node !== document.body) {
                const cs = window.getComputedStyle(node as Element);
                if (
                    cs.transform !== 'none' ||
                    cs.perspective !== 'none' ||
                    cs.filter !== 'none' ||
                    (cs as any).backdropFilter && (cs as any).backdropFilter !== 'none' ||
                    cs.willChange.includes('transform') ||
                    cs.willChange.includes('perspective')
                ) {
                    return true;
                }
                node = (node as HTMLElement).parentElement;
            }
            return false;
        };

        const totalScroll = `+=${(panels.length - 1) * 100}%`;
        const pinType = hasTransformedAncestor(triggerEl) ? 'transform' : ((ScrollTrigger as any).isTouch ? 'transform' : 'fixed');

        gsap.to(panels.slice(0, -1), {
            yPercent: -100,
            ease: 'none',
            stagger: 0.5,
            scrollTrigger: {
                trigger: triggerEl,
                start: 'top top',
                end: totalScroll,
                scrub: true,
                pin: triggerEl,
                pinType,
                pinReparent: true,
                pinSpacing: 'margin',
                anticipatePin: 1,
                invalidateOnRefresh: true,
                markers,
            },
        });
    }, { scope: ref });

    return (
        <section aria-label="Layered pin panels" className="relative">
            <div ref={ref} className={s.container}>
                <div className={`pin-trigger ${s.pinTrigger}`}>
                    <div className={`${s.panel} panel ${s.description}`}>
                        <div className={s.descriptionInner}>
                            <h1>Layered pinning from bottom</h1>
                            <p>Overlapping panels reveal from the bottom while the section stays pinned.</p>
                            <div className={s.scrollDown}>Scroll down ↓</div>
                        </div>
                    </div>

                    <section className={`${s.panel} panel ${s.green}`}>
                        <h2 className={s.heading}>1</h2>
                    </section>
                    <section className={`${s.panel} panel ${s.solid}`}>
                        <h2 className={s.heading}>2</h2>
                    </section>
                    <section className={`${s.panel} panel ${s.purple}`}>
                        <h2 className={s.heading}>3</h2>
                    </section>
                </div>
            </div>
        </section>
    );
}