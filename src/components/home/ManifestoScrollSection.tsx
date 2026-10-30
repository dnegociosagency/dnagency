"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { LineChart, Search, Zap, RotateCw } from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Auditoria Profunda & Plano",
    description: "Não trabalhamos no achismo. Analisamos seus concorrentes, auditamos o seu rastreamento atual e desenhamos uma estratégia à prova de falhas para reduzir seu CAC e captar tráfego qualificado.",
    icon: <Search className="w-6 h-6 text-[#2f6b65]" />,
  },
  {
    number: "02",
    title: "Engenharia de Conversão",
    description: "Tráfego não serve para nada se não converte. Criamos landing pages e funis rápidos e persuasivos, feitos para transformar cliques em reuniões agendadas e vendas.",
    icon: <Zap className="w-6 h-6 text-[#2f6b65]" />,
  },
  {
    number: "03",
    title: "Escala Agressiva de Mídia",
    description: "Com o funil ajustado, lançamos campanhas altamente segmentadas no Google e no Meta. Testamos criativos e públicos de forma agressiva para encontrar os mais lucrativos.",
    icon: <LineChart className="w-6 h-6 text-[#2f6b65]" />,
  },
  {
    number: "04",
    title: "Otimização Contínua",
    description: "O mercado muda todos os dias. Monitoramos suas campanhas em tempo real, pausando os anúncios que não performam, escalando os vencedores e ajustando a landing page para o máximo de retorno.",
    icon: <RotateCw className="w-6 h-6 text-[#2f6b65]" />,
  }
];

export default function ManifestoScrollSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const yTransform = useTransform(scrollYProgress, [0, 1], [50, -50]);

  return (
    <section id="metodo" className="py-24 md:py-40 bg-white relative overflow-hidden" ref={containerRef}>
      
      {/* Background Decorators */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#2f6b65]/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-emerald-500/5 rounded-full blur-[120px] translate-y-1/3 -translate-x-1/3 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-20 md:mb-32">
          <span className="text-[#2f6b65] font-bold tracking-widest uppercase text-sm bg-[#2f6b65]/10 px-4 py-1.5 rounded-full mb-6">
            O Protocolo de Crescimento
          </span>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-black text-gray-900 tracking-tighter leading-[1.1] max-w-4xl">
            Foco implacável em <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2f6b65] to-emerald-500">otimização & entrega.</span>
          </h2>
          <p className="mt-6 text-gray-500 text-lg md:text-xl font-light max-w-2xl leading-relaxed">
            Esqueça métricas de vaidade. Criamos um método de 4 etapas pensado inteiramente para gerar receita, conquistar participação de mercado e superar seus concorrentes.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 relative">
          
          {/* Connector Line (Desktop) */}
          <div className="hidden lg:block absolute top-[4.5rem] left-[10%] right-[10%] h-[2px] bg-gray-100 z-0">
            <motion.div 
              className="h-full bg-gradient-to-r from-[#2f6b65] to-emerald-400 origin-left"
              style={{ scaleX: scrollYProgress }}
            />
          </div>

          {steps.map((step, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ delay: index * 0.15, duration: 0.6 }}
              className="relative z-10 flex flex-col items-center lg:items-start text-center lg:text-left"
            >
              <div className="w-20 h-20 bg-white rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-100 flex items-center justify-center mb-8 relative group hover:-translate-y-2 transition-transform duration-300">
                <div className="absolute inset-0 bg-[#2f6b65]/5 rounded-2xl scale-0 group-hover:scale-100 transition-transform duration-300 origin-center" />
                <span className="absolute -top-3 -right-3 text-sm font-black text-white bg-gray-900 w-8 h-8 flex items-center justify-center rounded-full border-4 border-white">
                  {step.number}
                </span>
                {step.icon}
              </div>
              
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                {step.title}
              </h3>
              
              <p className="text-gray-500 font-light leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}

        </div>

        {/* Bottom CTA Block */}
        <motion.div 
          style={{ y: yTransform }}
          className="mt-32 md:mt-40 bg-gray-900 rounded-[2rem] md:rounded-[3rem] p-8 md:p-16 flex flex-col md:flex-row items-center justify-between gap-10 overflow-hidden relative shadow-2xl"
        >
          {/* Internal gradient effect */}
          <div className="absolute top-[-50%] right-[-10%] w-[80%] h-[200%] bg-gradient-to-l from-[#2f6b65]/40 to-transparent blur-[80px] rounded-full pointer-events-none transform rotate-12" />
          
          <div className="relative z-10 max-w-2xl text-center md:text-left">
            <h3 className="text-3xl md:text-5xl font-black text-white mb-6 tracking-tight">
              Pronto para escalar seus resultados?
            </h3>
            <p className="text-gray-300 text-lg font-light">
              Pare de tentar adivinhar. Deixe nosso time implementar o mesmo método de crescimento que usamos para gerar um ROI enorme para nossos parceiros.
            </p>
          </div>
          
          <div className="relative z-10 shrink-0">
            <a href="https://calendar.app.google/TJ85TG2Do9uLhC2K7" target="_blank" rel="noopener noreferrer">
              <button className="px-8 py-5 text-lg font-bold bg-white text-gray-900 hover:bg-[#2f6b65] hover:text-white rounded-full shadow-xl hover:shadow-[0_10px_40px_rgba(47,107,101,0.4)] transition-all duration-300 hover:scale-105 active:scale-95">
                Comece Sua Auditoria
              </button>
            </a>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
