"use client";

import React, { useRef, useEffect } from "react";
import { motion, useScroll, useTransform, type Variants, useMotionValue, useSpring } from "framer-motion";
import { Check, X, ArrowRight, Zap } from "lucide-react";
import MagneticButton from "@/components/ui/MagneticButton";
import { Canvas } from "@react-three/fiber";
import { ShaderPlane } from "@/components/ui/background-paper-shaders";

export default function PricingSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const yCards = useTransform(scrollYProgress, [0, 1], ["5%", "-5%"]);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 1, ease: [0.16, 1, 0.3, 1] },
    },
  };

  // Mouse position for background glow effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (window.matchMedia("(hover: none)").matches) return;
      // Normalize to -0.5 to 0.5
      mouseX.set(e.clientX / window.innerWidth - 0.5);
      mouseY.set(e.clientY / window.innerHeight - 0.5);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <section ref={containerRef} className="relative bg-[#040807] py-24 md:py-40 px-4 md:px-6 overflow-hidden">
      {/* Three.js Background Shader */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-[1] opacity-60">
        <Canvas camera={{ position: [0, 0, 5] }} gl={{ alpha: true }} dpr={[1, 1.5]}>
          <ambientLight intensity={1} />
          <ShaderPlane position={[0, 0, 0]} color1="#2f6b65" color2="#040807" scale={15} />
        </Canvas>
      </div>

      {/* Dynamic Mouse Glow */}
      <motion.div
        style={{
          x: useTransform(springX, [-0.5, 0.5], ["-20%", "20%"]),
          y: useTransform(springY, [-0.5, 0.5], ["-20%", "20%"]),
        }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vh] bg-[--color-brand-primary] rounded-full blur-[200px] opacity-[0.08] pointer-events-none z-0"
      />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="text-center mb-20 md:mb-32 relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: false }}
            className="inline-flex items-center gap-3 mb-8 px-5 py-2 rounded-full border border-[--color-brand-primary]/30 bg-[--color-brand-primary]/10 backdrop-blur-md"
          >
            <span className="w-2 h-2 rounded-full bg-[--color-brand-primary] animate-pulse shadow-[0_0_10px_#2f6b65]" />
            <span className="text-xs md:text-sm font-bold tracking-[0.2em] text-[--color-brand-primary] uppercase">
              O Fim Das Agências Genéricas
            </span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-4xl sm:text-6xl md:text-8xl font-black text-white tracking-tighter mb-8 leading-[1.1]"
          >
            Sua Empresa <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[--color-brand-primary] to-[#3b8780] drop-shadow-2xl relative inline-block">
              Merece Mais
              <Zap className="absolute -top-6 -right-10 w-8 h-8 text-[--color-brand-primary] opacity-60 animate-pulse hidden md:block" />
            </span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="text-white/50 max-w-3xl mx-auto text-lg md:text-2xl font-light leading-relaxed"
          >
            Não vendemos pacotes de posts. Nós construímos uma <strong className="text-white/90 font-medium">máquina de vendas</strong> focada exclusivamente no seu retorno financeiro.
          </motion.p>
        </div>

        {/* Cards Container */}
        <motion.div 
          style={{ y: yCards }}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.1 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-0 items-center max-w-5xl mx-auto relative"
        >
          {/* Card: Mercado Tradicional */}
          <motion.div 
            variants={itemVariants}
            className="relative lg:translate-x-6 z-0"
          >
            <div className="bg-[#070b09] rounded-[2rem] p-8 md:p-12 border border-white/[0.05] shadow-2xl opacity-80 scale-95 hover:opacity-100 hover:scale-[0.98] transition-all duration-700 ease-out grayscale hover:grayscale-0">
              <h3 className="text-2xl font-bold text-white/50 mb-10 pb-8 flex items-center justify-between border-b border-white/[0.05]">
                Agências Comuns
                <span className="text-xs font-mono tracking-widest bg-red-500/10 text-red-400 px-3 py-1 rounded-full border border-red-500/20">
                  CUSTO
                </span>
              </h3>
              
              <ul className="space-y-8">
                {[
                  "Foco em likes e métricas de vaidade que não pagam contas.",
                  "Pacotes engessados sem alinhamento comercial.",
                  "Falta de alinhamento estratégico e resultados ocultos.",
                  "Sites genéricos e lentos que espantam clientes."
                ].map((text, i) => (
                  <li key={i} className="flex items-start gap-4 group">
                    <div className="mt-1 bg-red-500/5 rounded-full p-1.5 border border-red-500/10 group-hover:bg-red-500/20 transition-colors">
                      <X className="w-4 h-4 text-red-500/70 group-hover:text-red-400 transition-colors" />
                    </div>
                    <span className="text-base md:text-lg text-white/40 leading-relaxed font-light group-hover:text-white/60 transition-colors">
                      {text}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* VS Badge */}
          <div className="hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 items-center justify-center w-16 h-16 rounded-full bg-[#040807]/90 backdrop-blur-md border border-[--color-brand-primary]/20 shadow-[0_0_30px_rgba(47,107,101,0.2)]">
            <span className="text-white/60 font-black text-xl tracking-tighter">VS</span>
          </div>

          {/* Card: Agência DN */}
          <motion.div 
            variants={itemVariants}
            className="relative z-10 lg:-translate-x-6"
          >
            {/* Animated Gradient Border Wrapper */}
            <div className="absolute -inset-[2px] rounded-[2.5rem] bg-gradient-to-b from-[--color-brand-primary] via-[--color-brand-primary]/20 to-transparent opacity-70 blur-[2px]" />
            <div className="absolute -inset-[1px] rounded-[2.5rem] bg-gradient-to-b from-[--color-brand-primary] via-[#1f4a46] to-[#040807]" />
            
            <div className="relative h-full bg-[#07110f]/95 backdrop-blur-xl rounded-[2.4rem] p-8 md:p-12 shadow-[0_0_80px_rgba(47,107,101,0.15)] hover:shadow-[0_0_120px_rgba(47,107,101,0.25)] transition-shadow duration-700">
              
              {/* Highlight Badge */}
              <div className="absolute -top-5 left-1/2 -translate-x-1/2 lg:left-12 lg:translate-x-0">
                <div className="relative flex items-center justify-center">
                  <div className="absolute inset-0 bg-[--color-brand-primary] blur-md opacity-60 animate-pulse" />
                  <div className="relative bg-[#040807] text-white px-6 py-2 rounded-full text-xs md:text-sm font-bold tracking-[0.2em] uppercase border border-[--color-brand-primary] flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[--color-brand-primary] animate-ping" />
                    Sua Escolha
                  </div>
                </div>
              </div>
              
              <h3 className="text-3xl md:text-4xl font-black text-white mb-10 pb-8 flex flex-col md:flex-row md:items-center justify-between border-b border-white/10 gap-4 mt-4 lg:mt-0">
                <span className="flex items-center gap-2">
                  Agência DN<span className="text-[--color-brand-primary]">.</span>
                </span>
                <span className="text-xs font-mono tracking-widest bg-[--color-brand-primary]/10 text-[--color-brand-primary] px-3 py-1.5 rounded-full border border-[--color-brand-primary]/30 w-fit shadow-[0_0_10px_rgba(47,107,101,0.2)]">
                  INVESTIMENTO
                </span>
              </h3>

              <ul className="space-y-8 mb-12">
                {[
                  { text: "Estratégia focada 100% em ", highlight: "conversão e ROI" },
                  { text: "Planos sob medida integrados ao seu ", highlight: "time de vendas" },
                  { text: "Dashboards de performance em ", highlight: "tempo real" },
                  { text: "Plataformas digitais premium de ", highlight: "altíssima conversão" }
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-5 group">
                    <div className="mt-1 bg-[--color-brand-primary]/10 rounded-full p-2 border border-[--color-brand-primary]/30 shadow-[0_0_15px_rgba(47,107,101,0.3)] group-hover:scale-110 group-hover:bg-[--color-brand-primary]/20 transition-all duration-300 shrink-0">
                      <Check className="w-5 h-5 text-[--color-brand-primary]" strokeWidth={3} />
                    </div>
                    <span className="text-lg md:text-xl text-white/80 leading-relaxed font-light">
                      {item.text} <strong className="text-white font-semibold drop-shadow-md">{item.highlight}</strong>.
                    </span>
                  </li>
                ))}
              </ul>
              
              <div className="flex justify-center mt-auto w-full">
                <a href="https://wa.me/558899222054" target="_blank" rel="noopener noreferrer" className="w-full block group">
                  <div className="relative w-full rounded-2xl overflow-hidden">
                    <MagneticButton className="w-full py-6 md:py-7 bg-[--color-brand-primary] text-white text-lg md:text-xl font-bold rounded-2xl relative z-10 border border-white/10 shadow-[0_10px_40px_rgba(47,107,101,0.4)] group-hover:shadow-[0_15px_60px_rgba(47,107,101,0.6)] transition-all duration-500 overflow-hidden flex items-center justify-center gap-3">
                      <span className="relative z-10">Agendar Reunião Estratégica</span>
                      <ArrowRight className="w-6 h-6 relative z-10 group-hover:translate-x-2 transition-transform duration-300" />
                      
                      {/* Sweep/Shimmer Effect */}
                      <div className="absolute inset-0 z-0">
                        <div className="absolute top-0 -left-[100%] w-[120%] h-full bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-[-20deg] group-hover:animate-sweep" />
                      </div>
                    </MagneticButton>
                  </div>
                  <p className="text-center text-white/40 text-xs mt-4 tracking-widest uppercase font-mono group-hover:text-[--color-brand-primary] transition-colors">
                    Vagas limitadas para novos projetos
                  </p>
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes sweep {
          0% { transform: translateX(0); }
          100% { transform: translateX(200%); }
        }
        .animate-sweep {
          animation: sweep 1.2s ease-in-out infinite;
        }
      `}} />
    </section>
  );
}
