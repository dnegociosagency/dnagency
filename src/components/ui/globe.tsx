"use client";

import createGlobe, { COBEOptions } from "cobe";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

// Marcadores focados em EUA, Canadá e Brasil + mercados globais
const DEFAULT_MARKERS: { location: [number, number]; size: number }[] = [
  // EUA (destaque máximo)
  { location: [40.7128, -74.006],   size: 0.12 },
  { location: [34.0522, -118.2437], size: 0.10 },
  { location: [41.8781, -87.6298],  size: 0.09 },
  { location: [29.7604, -95.3698],  size: 0.08 },
  { location: [25.7617, -80.1918],  size: 0.08 },
  { location: [47.6062, -122.3321], size: 0.07 },
  // Canadá (destaque alto)
  { location: [43.6510, -79.3470],  size: 0.10 },
  { location: [45.5017, -73.5673],  size: 0.09 },
  { location: [49.2827, -123.1207], size: 0.07 },
  { location: [51.0447, -114.0719], size: 0.06 },
  // Brasil
  { location: [-23.5505, -46.6333], size: 0.11 },
  { location: [-15.7801, -47.9292], size: 0.07 },
  { location: [-3.7327,  -38.5270], size: 0.06 },
  // Europa & Latam
  { location: [51.5074,  -0.1278],  size: 0.06 },
  { location: [48.8566,   2.3522],  size: 0.06 },
  { location: [19.4326, -99.1332],  size: 0.07 },
];

export function Globe({
  className,
}: {
  className?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointerInteracting = useRef<number | null>(null);
  const pointerMovement = useRef(0);
  
  const [opacity, setOpacity] = useState(0);
  const [isDark, setIsDark] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [webGLSupported, setWebGLSupported] = useState<boolean | null>(null);

  // Monitora alterações no Light/Dark mode, tamanho da tela e suporte a WebGL
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
      console.log(`[Globe] Suporte a WebGL detectado: ${supportsWebGL}`);
    } catch (e) {
      setWebGLSupported(false);
      console.error("[Globe] Erro ao detectar suporte a WebGL:", e);
    }

    // Detecta o estado inicial de tema
    setIsDark(document.documentElement.classList.contains("dark"));

    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains("dark"));
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
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
      console.warn("[Globe] Pulando renderização do globo 3D devido a falta de suporte a WebGL.");
      return;
    }
    if (webGLSupported === null) return;

    let phi = 0.6;
    let rafId: number;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const width = canvas.offsetWidth;

    // Configuração adaptativa com base no tema e dispositivo
    const config: COBEOptions = {
      width: width * (isMobile ? 1.5 : 2),
      height: width * (isMobile ? 1.5 : 2),
      devicePixelRatio: isMobile ? 1.2 : 2,
      phi,
      theta: 0.25,
      dark: isDark ? 1 : 0,
      diffuse: isDark ? 0.5 : 1.2,
      mapSamples: isMobile ? 8000 : 14000,
      mapBrightness: isDark ? 1.4 : 1.1,
      // Se for dark: base verde escuro, se for light: base verde clara suave
      baseColor: isDark ? [0.08, 0.16, 0.14] : [0.88, 0.93, 0.92],
      // Marcadores verdes institucionais em ambos
      markerColor: [0.18, 0.42, 0.4],
      glowColor: isDark ? [0.18, 0.42, 0.4] : [0.75, 0.88, 0.86],
      markers: DEFAULT_MARKERS,
    };

    let globe: any;
    try {
      console.log("[Globe] Inicializando createGlobe (cobe)...");
      globe = createGlobe(canvas, config);
      setOpacity(1);
    } catch (err) {
      console.error("[Globe] Erro síncrono ao instanciar createGlobe:", err);
      setWebGLSupported(false);
      return;
    }

    const animate = () => {
      if (pointerInteracting.current === null) {
        phi += 0.003;
      }
      if (globe && typeof globe.update === "function") {
        globe.update({ phi: phi + pointerMovement.current / 200 });
      }
      rafId = requestAnimationFrame(animate);
    };

    animate();

    const onResize = () => {
      if (canvas && globe && typeof globe.update === "function") {
        const w = canvas.offsetWidth;
        globe.update({ 
          width: w * (isMobile ? 1.5 : 2), 
          height: w * (isMobile ? 1.5 : 2) 
        });
      }
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(rafId);
      if (globe && typeof globe.destroy === "function") {
        globe.destroy();
      }
      window.removeEventListener("resize", onResize);
    };
  }, [isDark, isMobile, webGLSupported]);

  // Se WebGL não for suportado, exibe fallback visual premium
  if (webGLSupported === false) {
    return (
      <div className={cn("absolute inset-0 mx-auto aspect-square w-full max-w-[600px] flex items-center justify-center pointer-events-none", className)}>
        {/* Globo 2.5D simulado com gradientes e anéis */}
        <div className="relative w-[75%] h-[75%] rounded-full bg-gradient-to-br from-[#2f6b65]/20 via-[#2f6b65]/5 to-transparent border border-[#2f6b65]/20 flex items-center justify-center animate-pulse">
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
      </div>
    );
  }

  // Previne oscilação visual antes da hidratação
  if (webGLSupported === null) {
    return <div className={cn("absolute inset-0 mx-auto aspect-square w-full max-w-[600px]", className)} />;
  }

  return (
    <div className={cn("absolute inset-0 mx-auto aspect-square w-full max-w-[600px]", className)}>
      <canvas
        className="size-full [contain:layout_paint_size] cursor-grab active:cursor-grabbing"
        style={{ opacity, transition: "opacity 700ms" }}
        ref={canvasRef}
        onPointerDown={(e) => {
          pointerInteracting.current = e.clientX - pointerMovement.current;
        }}
        onPointerUp={() => {
          pointerInteracting.current = null;
        }}
        onPointerOut={() => {
          pointerInteracting.current = null;
        }}
        onMouseMove={(e) => {
          if (pointerInteracting.current !== null) {
            pointerMovement.current = e.clientX - pointerInteracting.current;
          }
        }}
        onTouchMove={(e) => {
          if (e.touches[0] && pointerInteracting.current !== null) {
            pointerMovement.current = e.touches[0].clientX - pointerInteracting.current;
          }
        }}
      />
    </div>
  );
}

