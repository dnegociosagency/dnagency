"use client";

import React, { useRef, useEffect } from "react";
import { motion, useScroll, useTransform, useMotionTemplate, useMotionValue } from "framer-motion";
import { TrendingUp, Filter, Rocket } from "lucide-react";

const modules = [
  {
    id: 1,
    title: "Módulo 1: Estratégia Digital de Alto Nível",
    description: "Desconstruindo negócios multimilionários e aplicando na sua agência.",
    icon: TrendingUp,
    color: "from-blue-500/20 to-blue-500/5",
    glowColor: "rgba(59, 130, 246, 0.5)",
  },
  {
    id: 2,
    title: "Módulo 2: Máquina de Conversão",
    description: "Arquitetura de funis magnéticos e processos comerciais agressivos.",
    icon: Filter,
    color: "from-purple-500/20 to-purple-500/5",
    glowColor: "rgba(168, 85, 247, 0.5)",
  },
  {
    id: 3,
    title: "Módulo 3: Growth Hacking e Escala",
    description: "Vire a chave da escala imprevisível para o crescimento sistêmico.",
    icon: Rocket,
    color: "from-[--color-brand-primary]/20 to-[--color-brand-primary]/5",
    glowColor: "rgba(47, 107, 101, 0.5)",
  },
];

function MagneticCard({ mod, index }: { mod: typeof modules[0], index: number }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.3 }}
      transition={{ duration: 1, delay: index * 0.2, ease: "easeOut" }}
      className="relative group w-full"
      onMouseMove={handleMouseMove}
    >
      <motion.div
        className="absolute inset-0 z-0 transition-opacity duration-500 opacity-0 group-hover:opacity-100 rounded-3xl"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              400px circle at ${mouseX}px ${mouseY}px,
              ${mod.glowColor},
              transparent 80%
            )
          `,
        }}
      />
      
      <div className={`relative z-10 flex flex-col md:flex-row items-center gap-8 bg-[#0a0a0a]/80 backdrop-blur-2xl border border-white/5 rounded-3xl p-10 md:p-14 overflow-hidden transform-gpu transition-transform duration-500 hover:scale-[1.02] hover:-translate-y-2`}>
        {/* Subtle background gradient inside card */}
        <div className={`absolute inset-0 bg-gradient-to-br ${mod.color} opacity-50`} />

        {/* 3D Icon Simulation */}
        <div className="relative shrink-0 w-24 h-24 md:w-32 md:h-32 flex items-center justify-center rounded-2xl bg-black/50 border border-white/10 shadow-[inset_0_0_20px_rgba(255,255,255,0.05)] transform-gpu rotate-y-12 rotate-x-12 group-hover:rotate-y-0 group-hover:rotate-x-0 transition-transform duration-700">
          <mod.icon className="w-12 h-12 md:w-16 md:h-16 text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]" />
        </div>

        {/* Content */}
        <div className="relative z-10 text-center md:text-left">
          <h3 className="text-2xl md:text-4xl font-bold text-white mb-4 tracking-tight">
            {mod.title}
          </h3>
          <p className="text-white/50 text-lg md:text-xl font-light leading-relaxed">
            {mod.description}
          </p>
          
          <div className="mt-8">
            <span className="inline-flex items-center gap-2 text-sm uppercase tracking-[0.2em] font-medium text-white/70 group-hover:text-white transition-colors cursor-pointer">
              Explorar Módulo
              <span className="w-8 h-[1px] bg-white/30 group-hover:bg-white group-hover:w-12 transition-all duration-300" />
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function ModulesParallax() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  return (
    <section ref={containerRef} className="relative bg-[#000000] py-32 md:py-48 px-4 md:px-8 overflow-hidden min-h-screen flex flex-col justify-center">
      {/* Subtle Parallax Background Layer */}
      <motion.div 
        style={{ y: backgroundY }}
        className="absolute inset-0 z-0 pointer-events-none"
      >
        <div className="absolute top-1/4 left-1/4 w-[50vw] h-[50vw] bg-blue-900/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[40vw] h-[40vw] bg-purple-900/10 rounded-full blur-[100px]" />
      </motion.div>

      <div className="max-w-6xl mx-auto w-full relative z-10 flex flex-col gap-12 md:gap-24">
        {modules.map((mod, i) => (
          <MagneticCard key={mod.id} mod={mod} index={i} />
        ))}
      </div>
    </section>
  );
}
