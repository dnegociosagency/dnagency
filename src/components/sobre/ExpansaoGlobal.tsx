"use client";

import { useEffect, useRef } from "react";
import createGlobe from "cobe";
import { motion } from "framer-motion";

export default function ExpansaoGlobal() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let phi = 0;

    if (!canvasRef.current) return;

    const globe = createGlobe(canvasRef.current, {
      devicePixelRatio: 2,
      width: 1000 * 2,
      height: 1000 * 2,
      phi: 0,
      theta: 0.2,
      dark: 1,
      diffuse: 1.2,
      mapSamples: 16000,
      mapBrightness: 6,
      baseColor: [0.05, 0.05, 0.05], // Dark grey/black base
      markerColor: [0.184, 0.42, 0.396], // #2f6b65
      glowColor: [0.05, 0.1, 0.08],
      markers: [
        // Brazil
        { location: [-23.5505, -46.6333], size: 0.1 },
        // USA
        { location: [37.7749, -122.4194], size: 0.08 },
        // Europe (London)
        { location: [51.5074, -0.1278], size: 0.07 },
        // Europe (Lisbon)
        { location: [38.7223, -9.1393], size: 0.06 },
      ],
      // @ts-ignore - type definitions might be outdated
      onRender: (state: Record<string, any>) => {
        // Called on every animation frame.
        // `state` will be an empty object, return updated params.
        state.phi = phi;
        phi += 0.003;
      },
    });

    return () => {
      globe.destroy();
    };
  }, []);

  return (
    <section className="relative min-h-screen bg-black overflow-hidden flex flex-col items-center justify-center py-32">
      
      <div className="absolute inset-0 flex items-center justify-center opacity-60 mix-blend-screen pointer-events-none">
        <canvas
          ref={canvasRef}
          style={{ width: 1000, height: 1000, maxWidth: "100%", aspectRatio: 1 }}
        />
      </div>

      <div className="relative z-10 text-center max-w-4xl px-6 pointer-events-none">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <span className="px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-white/70 text-sm font-medium tracking-wide mb-8 inline-block">
            Sem Fronteiras
          </span>
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 tracking-tight">
            O fuso horário deixou <br/> de ser limite.
          </h2>
          <p className="text-xl md:text-2xl text-white/50 max-w-2xl mx-auto font-light leading-relaxed">
            Hoje operamos campanhas e geramos resultados em múltiplos continentes. Nossa tecnologia e metodologia não conhecem fronteiras.
          </p>
        </motion.div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-black to-transparent pointer-events-none"></div>
    </section>
  );
}
