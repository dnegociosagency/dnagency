"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useMotionTemplate, useMotionValue } from "framer-motion";
import { TrendingUp, Filter, Rocket } from "lucide-react";

const modules = [
  {
    id: 1,
    title: "Module 1: High-Level Digital Strategy",
    description: "Deconstructing multi-million dollar businesses and applying it to your agency.",
    icon: TrendingUp,
    color: "from-blue-500/20 to-blue-500/5",
    glowColor: "rgba(59, 130, 246, 0.4)",
  },
  {
    id: 2,
    title: "Module 2: Conversion Machine",
    description: "Architecture of high-converting funnels and aggressive sales processes.",
    icon: Filter,
    color: "from-purple-500/20 to-purple-500/5",
    glowColor: "rgba(168, 85, 247, 0.4)",
  },
  {
    id: 3,
    title: "Module 3: Growth Hacking & Scale",
    description: "Turn the key from unpredictable scaling to systemic growth.",
    icon: Rocket,
    color: "from-[--color-brand-primary]/20 to-[--color-brand-primary]/5",
    glowColor: "rgba(47, 107, 101, 0.4)",
  },
];

function MagneticCard({ mod, index, isMobile }: { mod: typeof modules[0], index: number, isMobile: boolean }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    if (isMobile) return;
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 1, delay: index * 0.1, ease: "easeOut" }}
      className="relative group w-full"
      onMouseMove={handleMouseMove}
    >
      {!isMobile && (
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
      )}
      
      <div className="relative z-10 flex flex-col md:flex-row items-center gap-8 bg-brand-darker/80 backdrop-blur-2xl border border-brand-white/5 rounded-3xl p-10 md:p-14 overflow-hidden transform-gpu transition-all duration-500 hover:scale-[1.01] hover:-translate-y-1">
        {/* Subtle background gradient inside card */}
        <div className={`absolute inset-0 bg-gradient-to-br ${mod.color} opacity-40`} />

        {/* 3D Icon Simulation */}
        <div className="relative shrink-0 w-24 h-24 md:w-32 md:h-32 flex items-center justify-center rounded-2xl bg-brand-dark/50 border border-brand-white/10 shadow-[inset_0_0_20px_rgba(255,255,255,0.05)] transform-gpu rotate-y-12 rotate-x-12 group-hover:rotate-y-0 group-hover:rotate-x-0 transition-transform duration-700">
          <mod.icon className="w-12 h-12 md:w-16 md:h-16 text-brand-white drop-shadow-[0_0_15px_rgba(47,107,101,0.3)]" />
        </div>

        {/* Content */}
        <div className="relative z-10 text-center md:text-left">
          <h3 className="text-2xl md:text-4xl font-bold text-brand-white mb-4 tracking-tight">
            {mod.title}
          </h3>
          <p className="text-brand-white/60 text-lg md:text-xl font-light leading-relaxed">
            {mod.description}
          </p>
          
          <div className="mt-8">
            <span className="inline-flex items-center gap-2 text-sm uppercase tracking-[0.2em] font-medium text-brand-white/70 group-hover:text-brand-white transition-colors cursor-pointer">
              Explore Module
              <span className="w-8 h-[1px] bg-brand-white/30 group-hover:bg-brand-white group-hover:w-12 transition-all duration-300" />
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function ModulesParallax() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  return (
    <section ref={containerRef} className="relative bg-brand-dark py-32 md:py-48 px-4 md:px-8 overflow-hidden min-h-screen flex flex-col justify-center transition-colors duration-300">
      {/* Subtle Parallax Background Layer */}
      <motion.div 
        style={isMobile ? {} : { y: backgroundY }}
        className="absolute inset-0 z-0 pointer-events-none"
      >
        <div className="absolute top-1/4 left-1/4 w-[50vw] h-[50vw] bg-blue-900/5 dark:bg-blue-900/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[40vw] h-[40vw] bg-purple-900/5 dark:bg-purple-900/10 rounded-full blur-[100px]" />
      </motion.div>

      <div className="max-w-6xl mx-auto w-full relative z-10 flex flex-col gap-12 md:gap-24">
        {modules.map((mod, i) => (
          <MagneticCard key={mod.id} mod={mod} index={i} isMobile={isMobile} />
        ))}
      </div>
    </section>
  );
}

