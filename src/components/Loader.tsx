"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import type { DotLottie } from "@lottiefiles/dotlottie-web";

export type LoaderProps = {
  className?: string;
  onComplete?: () => void;
};

export default function Loader({ className = "", onComplete }: LoaderProps) {
  const [dotInstance, setDotInstance] = useState<DotLottie | null>(null);
  const completedRef = useRef(false);

  const handleDotInstance = useCallback((instance: DotLottie | null) => {
    setDotInstance(instance);
  }, []);

  useEffect(() => {
    if (!dotInstance) return;
    if (!onComplete) return;

    const handleComplete = () => {
      if (completedRef.current) return;
      completedRef.current = true;
      onComplete();
    };

    dotInstance.addEventListener("complete", handleComplete);

    return () => {
      dotInstance.removeEventListener("complete", handleComplete);
    };
  }, [dotInstance, onComplete]);

  useEffect(() => {
    if (!onComplete) return;
    const fallback = window.setTimeout(() => {
      if (completedRef.current) return;
      completedRef.current = true;
      onComplete();
    }, 4200);
    return () => window.clearTimeout(fallback);
  }, [onComplete]);

  return (
    <div className={`loader-overlay ${className}`} role="status" aria-live="polite">
      <span className="sr-only">Cargando invitación</span>
      <div className="loader-card" aria-hidden>
        <DotLottieReact
          src="https://lottie.host/e4b8e419-dcda-4cb2-b36b-c2510d7f9c7a/26Hso0MUE2.lottie"
          loop={false}
          autoplay
          className="loader-animation"
          dotLottieRefCallback={handleDotInstance}
        />
      </div>
    </div>
  );
}
