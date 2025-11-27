"use client";
import { ReactLenis, useLenis } from "@studio-freight/react-lenis";
import type { PropsWithChildren } from "react";
import { useEffect } from "react";

interface LenisInstance {
  scrollTo: (
    target: number | string | HTMLElement,
    options?: { duration?: number; easing?: (t: number) => number }
  ) => void;
}

declare global {
  interface Window {
    lenis?: LenisInstance;
  }
}

export default function SmoothScroll({ children }: PropsWithChildren) {
  const lenis = useLenis();

  useEffect(() => {
    if (lenis) {
      window.lenis = lenis as LenisInstance;
    }
    return () => {
      if (window.lenis) {
        delete window.lenis;
      }
    };
  }, [lenis]);

  // Fonction easing personnalisée pour une fin très douce (ease-out cubic)
  // Évite les arrêts brusques à la fin des animations
  const easing = (t: number) => {
    return 1 - Math.pow(1 - t, 3);
  };

  return (
    <ReactLenis
      root
      options={{
        lerp: 0.15,
        duration: 1.2,
        smoothWheel: true,
        easing,
      }}
    >
      <>{children}</>
    </ReactLenis>
  );
}
