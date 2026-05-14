"use client";

import { useEffect } from "react";
import Lenis from "@studio-freight/lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({
      duration: 1.0,                                          // ligeiramente menor = mais rápido e fluido
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // exponential ease out
      touchMultiplier: 2,
      infinite: false,
    });

    // Sincroniza Lenis com ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);

    // GSAP ticker dá tempo em SEGUNDOS → Lenis.raf() espera MILISSEGUNDOS
    const rafCallback = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(rafCallback);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(rafCallback);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
