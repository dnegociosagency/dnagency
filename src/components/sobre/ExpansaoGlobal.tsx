"use client";

import { useEffect, useRef, useState } from "react";
import createGlobe from "cobe";
import { motion, useInView as motionUseInView } from "framer-motion";

const GLOBE_MARKERS: { location: [number, number]; size: number }[] = [
  // Brazil
  { location: [-23.5505, -46.6333], size: 0.1 },
  // USA
  { location: [37.7749, -122.4194], size: 0.08 },
  // Europe (London)
  { location: [51.5074, -0.1278], size: 0.07 },
  // Europe (Lisbon)
  { location: [38.7223, -9.1393], size: 0.06 },
];

export default function ExpansaoGlobal() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLElement>(null);
  const isInView = motionUseInView(containerRef, { margin: "0px 0px 400px 0px" });

  const [isDark, setIsDark] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [webGLSupported, setWebGLSupported] = useState<boolean | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Detectar suporte a WebGL
    try {
      const canvas = document.createElement("canvas");
      const supportsWebGL = !!(
        window.WebGLRenderingContext &&
        (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))
      );
      setWebGLSupported(supportsWebGL);
      console.log(`[ExpansaoGlobal] Suporte a WebGL detectado: ${supportsWebGL}`);
    } catch (e) {
      setWebGLSupported(false);
      console.error("[ExpansaoGlobal] Erro ao detectar suporte a WebGL:", e);
    }

    setIsDark(document.documentElement.classList.contains("dark"));

    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains("dark"));
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    const checkMobile = () => {
      const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
      setIsMobile(window.innerWidth < 768 || isIOS);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  useEffect(() => {
    if (webGLSupported === false) {
      console.warn("[ExpansaoGlobal] Pulando renderização do globo devido a falta de suporte a WebGL.");
      return;
    }
    if (webGLSupported === null || !isInView) return;

    let phi = 0;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = isMobile ? 1.2 : 2;

    let globe: any;
    try {
      console.log("[ExpansaoGlobal] Inicializando createGlobe (cobe)...");
      globe = createGlobe(canvas, {
        devicePixelRatio: dpr,
        width: 1000 * (isMobile ? 1.2 : 2),
        height: 1000 * (isMobile ? 1.2 : 2),
        phi: 0,
        theta: 0.2,
        dark: isDark ? 1 : 0,
        diffuse: isDark ? 1.2 : 1.5,
        mapSamples: isMobile ? 8000 : 14000,
        mapBrightness: isDark ? 6 : 4,
        // Se for dark: base verde escuro, se for light: base verde clara suave
        baseColor: isDark ? [0.08, 0.16, 0.14] : [0.88, 0.93, 0.92],
        // Marcador verde institucional
        markerColor: [0.18, 0.42, 0.4],
        glowColor: isDark ? [0.18, 0.42, 0.4] : [0.75, 0.88, 0.86],
        markers: GLOBE_MARKERS,
        // @ts-ignore - type definitions might be outdated
        onRender: (state: Record<string, any>) => {
          state.phi = phi;
          phi += 0.003;
        },
      });
      console.log("[ExpansaoGlobal] Globo inicializado com sucesso.");
    } catch (err) {
      console.error("[ExpansaoGlobal] Falha síncrona ao instanciar createGlobe:", err);
      setWebGLSupported(false);
      return;
    }

    return () => {
      if (globe && typeof globe.destroy === "function") {
        globe.destroy();
      }
    };
  }, [isDark, isMobile, isInView, webGLSupported]);

  return (
    <section data-theme="dark" ref={containerRef} className="relative min-h-screen bg-brand-darker overflow-hidden flex flex-col items-center justify-center py-32 transition-colors duration-300">
      
      <div className="absolute inset-0 flex items-center justify-center opacity-50 dark:opacity-60 mix-blend-screen pointer-events-none">
        {webGLSupported === false ? (
          /* Globo 2.5D simulado com gradientes e anéis */
          <div 
            style={{ width: isMobile ? 350 : 600, height: isMobile ? 350 : 600, maxWidth: "100%", aspectRatio: 1 }}
            className="relative rounded-full bg-gradient-to-br from-[#2f6b65]/20 via-[#2f6b65]/5 to-transparent border border-[#2f6b65]/20 flex items-center justify-center animate-pulse"
          >
            <div className="w-[85%] h-[85%] rounded-full border border-[#2f6b65]/10 flex items-center justify-center">
              <div className="w-[80%] h-[80%] rounded-full bg-gradient-to-tr from-[#2f6b65]/35 to-[#040807]/90 flex items-center justify-center border border-white/5">
                <span className="text-[#2f6b65] font-mono text-[9px] tracking-widest uppercase opacity-75">DN GLOBAL NET</span>
              </div>
            </div>
            {/* Linhas de latitude e longitude simuladas */}
            <div className="absolute inset-0 border border-[#2f6b65]/10 rounded-full rotate-45 scale-x-50" />
            <div className="absolute inset-0 border border-[#2f6b65]/10 rounded-full -rotate-45 scale-y-50" />
            <div className="absolute inset-x-0 h-[1px] bg-[#2f6b65]/10 top-1/2 -translate-y-1/2 scale-x-95" />
            <div className="absolute inset-y-0 w-[1px] bg-[#2f6b65]/10 left-1/2 -translate-x-1/2 scale-y-95" />
          </div>
        ) : (
          <canvas
            ref={canvasRef}
            style={{ width: isMobile ? 600 : 1000, height: isMobile ? 600 : 1000, maxWidth: "100%", aspectRatio: 1 }}
          />
        )}
      </div>

      <div className="relative z-10 text-center max-w-4xl px-6 pointer-events-none">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <span className="px-4 py-1.5 rounded-full border border-brand-white/10 bg-brand-white/5 text-brand-white/70 text-sm font-medium tracking-wide mb-8 inline-block">
            Borderless
          </span>
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-bold text-brand-white mb-6 tracking-tight">
            Time zones stopped <br/>being a limit.
          </h2>
          <p className="text-xl md:text-2xl text-brand-white/50 max-w-2xl mx-auto font-light leading-relaxed">
            Today, we run campaigns and drive results across multiple continents. Our technology and methodology know no bounds.
          </p>
        </motion.div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-brand-darker to-transparent pointer-events-none"></div>
    </section>
  );
}

