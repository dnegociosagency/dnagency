"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useMotionTemplate, useMotionValue } from "framer-motion";
import { TrendingUp, Filter, Rocket, Target, Crown, Handshake } from "lucide-react";

const courses = [
  {
    id: 1,
    title: "Estratégia Digital de Alto Nível",
    description: "Desconstruindo negócios multimilionários e aplicando na sua agência.",
    icon: TrendingUp,
    color: "from-blue-500/20 to-blue-500/5",
    glowColor: "rgba(59, 130, 246, 0.4)",
    badge: "Módulo 1",
  },
  {
    id: 2,
    title: "Máquina de Conversão",
    description: "Arquitetura de funis magnéticos e processos comerciais agressivos.",
    icon: Filter,
    color: "from-purple-500/20 to-purple-500/5",
    glowColor: "rgba(168, 85, 247, 0.4)",
    badge: "Módulo 2",
  },
  {
    id: 3,
    title: "Growth Hacking e Escala",
    description: "Vire a chave da escala imprevisível para o crescimento sistêmico.",
    icon: Rocket,
    color: "from-[--color-brand-primary]/20 to-[--color-brand-primary]/5",
    glowColor: "rgba(47, 107, 101, 0.4)",
    badge: "Módulo 3",
  },
  {
    id: 4,
    title: "Dominando Tráfego Pago",
    description: "Estratégias avançadas de aquisição que maximizam o seu ROI.",
    icon: Target,
    color: "from-red-500/20 to-red-500/5",
    glowColor: "rgba(239, 68, 68, 0.4)",
    badge: "Módulo 4",
  },
  {
    id: 5,
    title: "Branding Premium",
    description: "Como posicionar sua marca para cobrar 10x mais pelos mesmos serviços.",
    icon: Crown,
    color: "from-amber-500/20 to-amber-500/5",
    glowColor: "rgba(245, 158, 11, 0.4)",
    badge: "Módulo 5",
  },
  {
    id: 6,
    title: "Fechamento High-Ticket",
    description: "Roteiros persuasivos e quebra de objeções para fechar contratos altos.",
    icon: Handshake,
    color: "from-emerald-500/20 to-emerald-500/5",
    glowColor: "rgba(16, 185, 129, 0.4)",
    badge: "Módulo 6",
  },
];

function MagneticCourseCard({ course, index }: { course: typeof courses[0], index: number }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: "easeOut" }}
      className="relative group h-full"
      onMouseMove={handleMouseMove}
    >
      <motion.div
        className="absolute inset-0 z-0 transition-opacity duration-500 opacity-0 group-hover:opacity-100 rounded-3xl"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              400px circle at ${mouseX}px ${mouseY}px,
              ${course.glowColor},
              transparent 80%
            )
          `,
        }}
      />
      
      <div className={`relative z-10 flex flex-col h-full bg-[#0a0a0a]/80 backdrop-blur-2xl border border-white/5 rounded-3xl p-8 overflow-hidden transform-gpu transition-transform duration-500 hover:-translate-y-2`}>
        {/* Subtle background gradient inside card */}
        <div className={`absolute inset-0 bg-gradient-to-br ${course.color} opacity-30`} />

        {/* Top section: Badge and Icon */}
        <div className="flex items-start justify-between mb-8 relative z-10">
          <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs font-semibold tracking-widest uppercase text-white/70">
            {course.badge}
          </span>
          <div className="relative w-16 h-16 flex items-center justify-center rounded-xl bg-black/50 border border-white/10 shadow-[inset_0_0_20px_rgba(255,255,255,0.05)] transform-gpu rotate-y-12 rotate-x-12 group-hover:rotate-y-0 group-hover:rotate-x-0 transition-transform duration-700">
            <course.icon className="w-8 h-8 text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]" />
          </div>
        </div>

        {/* Content */}
        <div className="relative z-10 flex-grow">
          <h3 className="text-2xl font-bold text-white mb-3 tracking-tight">
            {course.title}
          </h3>
          <p className="text-white/50 text-base font-light leading-relaxed mb-8">
            {course.description}
          </p>
        </div>
        
        {/* Footer CTA */}
        <div className="relative z-10 mt-auto pt-4 border-t border-white/5">
          <span className="inline-flex items-center gap-2 text-sm uppercase tracking-[0.1em] font-medium text-[--color-brand-primary] group-hover:text-white transition-colors cursor-pointer">
            Saber Mais
            <span className="w-6 h-[1px] bg-[--color-brand-primary] group-hover:bg-white group-hover:w-10 transition-all duration-300" />
          </span>
        </div>
      </div>
    </motion.div>
  );
}

export default function CoursesShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  return (
    <section id="courses-showcase" ref={containerRef} className="relative bg-[var(--color-brand-dark)] py-32 px-4 md:px-8 overflow-hidden min-h-screen">
      {/* Subtle Parallax Background Layer */}
      <motion.div 
        style={{ y: backgroundY }}
        className="absolute inset-0 z-0 pointer-events-none"
      >
        <div className="absolute top-1/4 left-1/4 w-[50vw] h-[50vw] bg-[--color-brand-primary] opacity-[0.03] rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[40vw] h-[40vw] bg-[#2f6b65] opacity-10 rounded-full blur-[100px]" />
      </motion.div>

      <div className="max-w-7xl mx-auto w-full relative z-10">
        
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-black text-white tracking-tight mb-4">
            Uma plataforma. <span className="text-[--color-brand-primary]">Múltiplos arsenais.</span>
          </h2>
          <p className="text-white/50 text-xl font-light max-w-2xl mx-auto">
            Escolha o curso ideal para o momento da sua agência e destrave o seu próximo nível de faturamento.
          </p>
        </div>

        {/* 3-Column Grid for Courses */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course, i) => (
            <MagneticCourseCard key={course.id} course={course} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
