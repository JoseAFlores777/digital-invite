"use client";

import { useEffect, useRef, useState } from "react";

export type CountdownParts = { days: number; hours: number; minutes: number; seconds: number };

function diffParts(target: number): CountdownParts {
  const now = Date.now();
  let diff = Math.max(0, Math.floor((target - now) / 1000));
  const days = Math.floor(diff / 86400);
  diff -= days * 86400;
  const hours = Math.floor(diff / 3600);
  diff -= hours * 3600;
  const minutes = Math.floor(diff / 60);
  diff -= minutes * 60;
  const seconds = diff;
  return { days, hours, minutes, seconds };
}

/**
 * Countdown hook updating every second. Returns time parts and a boolean finished flag.
 */
export function useCountdown(targetISO: string) {
  const targetRef = useRef<number>(new Date(targetISO).getTime());
  const [parts, setParts] = useState<CountdownParts>(() => diffParts(targetRef.current));
  const [finished, setFinished] = useState<boolean>(Date.now() >= targetRef.current);

  useEffect(() => {
    targetRef.current = new Date(targetISO).getTime();
    setParts(diffParts(targetRef.current));
  }, [targetISO]);

  useEffect(() => {
    let raf = 0;
    let lastTick = 0;
    const loop = (t: number) => {
      if (t - lastTick >= 1000) {
        lastTick = t;
        const p = diffParts(targetRef.current);
        setParts(p);
        setFinished(Date.now() >= targetRef.current);
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  return { ...parts, finished };
}
