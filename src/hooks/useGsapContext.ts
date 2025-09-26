"use client";

import { useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let registered = false;
function ensureRegistered() {
  if (!registered) {
    if (typeof window !== "undefined") {
      gsap.registerPlugin(ScrollTrigger);
    }
    registered = true;
  }
}

/**
 * Convenience wrapper for gsap.context inside a layout effect.
 * Returns a cleanup function that reverts the GSAP context.
 */
export function useGsapContext(effect: () => void | (() => void), deps: any[] = []) {
  useLayoutEffect(() => {
    ensureRegistered();
    const ctx = gsap.context(effect);
    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}

export { gsap, ScrollTrigger };
