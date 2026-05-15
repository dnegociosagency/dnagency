"use client";

import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function NascimentoAgencia() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [150, -150]);

  return (
    <section ref={containerRef} className="relative py-32 bg-[#020505] overflow-hidden">
      {/* Premium Glassmorphism Grid Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:64px_64px]"></div>
        <div className="absolute left-0 right-0 top-0 -mt-8 h-32 bg-gradient-to-b from-[#020505] to-transparent z-10"></div>
        <div className="absolute left-0 right-0 bottom-0 h-32 bg-gradient-to-t from-[#020505] to-transparent z-10"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <span className="px-4 py-1.5 rounded-full border border-[--color-brand-primary]/30 bg-[--color-brand-primary]/10 text-[--color-brand-primary] text-sm font-medium tracking-wide mb-6 inline-block">
              O Método
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight">
              A arquitetura do crescimento.
            </h2>
            <p className="text-lg text-white/50 font-light leading-relaxed">
              Substituímos o achismo por engenharia de dados. Criamos processos. Padronizamos a excelência. Tudo começou a se encaixar perfeitamente.
            </p>
          </motion.div>
        </div>

        {/* Abstract interfaces flying up to represent organization */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative">
          
          <motion.div style={{ y: y1 }} className="col-span-1 md:col-span-2 lg:col-span-1">
            <div className="p-8 rounded-2xl bg-white/[0.02] border border-white/10 backdrop-blur-md hover:bg-white/[0.04] transition-colors">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500/20 to-emerald-500/5 flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Performance Pura</h3>
              <p className="text-white/40 font-light leading-relaxed">Campanhas estruturadas para conversão extrema. Sem métricas de vaidade, apenas ROI rastreável.</p>
            </div>
          </motion.div>

          <motion.div style={{ y: y2 }} className="col-span-1">
            <div className="p-8 rounded-2xl bg-white/[0.02] border border-white/10 backdrop-blur-md hover:bg-white/[0.04] transition-colors">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[--color-brand-primary]/20 to-[--color-brand-primary]/5 flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-[--color-brand-primary]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Engenharia de Dados</h3>
              <p className="text-white/40 font-light leading-relaxed">Dashboards integrados conectando cada centavo investido ao retorno real no caixa.</p>
            </div>
          </motion.div>

          <motion.div style={{ y: y1 }} className="col-span-1 md:col-span-2 lg:col-span-1">
            <div className="p-8 rounded-2xl bg-white/[0.02] border border-white/10 backdrop-blur-md hover:bg-white/[0.04] transition-colors">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-blue-500/5 flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Escala Implacável</h3>
              <p className="text-white/40 font-light leading-relaxed">Sistemas desenhados não para faturar 10k, mas para sustentar 1M+ com estabilidade.</p>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
