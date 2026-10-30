"use client";

import React, { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { motion } from "framer-motion";
import DynamicGridBackground from "../ui/DynamicGridBackground";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ProcessSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  
  const steps = [
    { 
      number: "01", 
      title: "Auditoria & Plano de Crescimento", 
      desc: "Analisamos seu funil digital atual, identificamos os gargalos de conversão e definimos metas claras de ROI com um plano personalizado." 
    },
    { 
      number: "02", 
      title: "Estruturação de Funil & Criativos", 
      desc: "Construímos suas landing pages, configuramos rastreamento avançado (pixels & APIs) e criamos criativos personalizados que prendem a atenção." 
    },
    { 
      number: "03", 
      title: "Lançamento & Aquisição", 
      desc: "Colocamos as campanhas no ar para captar tráfego qualificado. O acompanhamento diário garante a saúde das campanhas, a estabilidade do CTR e a qualidade dos leads." 
    },
    { 
      number: "04", 
      title: "Escala & Crescimento de Receita", 
      desc: "Com dados confiáveis em mãos, cortamos o que não performa e direcionamos a verba para as campanhas vencedoras, escalando sua receita de forma previsível." 
    },
  ];

  useGSAP(() => {
    if (!containerRef.current || !scrollRef.current) return;
    
    const scrollContainer = scrollRef.current;
    
    const tween = gsap.to(scrollContainer, {
      x: () => -(scrollContainer.scrollWidth - window.innerWidth),
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        pin: true,
        scrub: 1,
        end: () => `+=${scrollContainer.scrollWidth - window.innerWidth}`,
        invalidateOnRefresh: true,
      }
    });

    return () => {
      tween.kill();
    };
  }, { scope: containerRef });

  return (
    <section data-theme="dark" id="metodo" className="bg-[--color-brand-darker] relative overflow-hidden" ref={containerRef}>
      <DynamicGridBackground />
      {/* Background Cinematic Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[--color-brand-primary] rounded-full blur-[250px] opacity-[0.1] pointer-events-none z-0" />

      <div className="h-screen flex items-center pt-16 md:pt-24 relative z-10">
        <div ref={scrollRef} className="flex h-full items-center px-5 md:px-20 gap-8 md:gap-16 lg:gap-32 w-max">
          
          {/* Title Section as the first item in the horizontal scroll */}
          <div className="w-[85vw] md:w-[600px] flex-shrink-0">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-block mb-6 px-4 py-1.5 rounded-full border border-[--color-brand-primary]/30 bg-[--color-brand-primary]/5 backdrop-blur-sm"
            >
              <span className="text-sm font-semibold tracking-wider text-[--color-brand-primary] uppercase">Nosso Método</span>
            </motion.div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-6xl font-bold text-white tracking-tighter mb-6"
            >
              Engenharia de <br/><span className="text-[--color-brand-primary]">Receita</span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-white/70 text-lg md:text-xl font-medium max-w-lg"
            >
              Um processo estruturado com precisão para transformar cliques em clientes. Role a página para conhecer nosso método.
            </motion.p>
          </div>

          {/* Steps */}
          {steps.map((item, index) => (
            <div key={index} className="w-[85vw] md:w-[450px] flex-shrink-0 group relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-[--color-brand-primary]/20 to-transparent rounded-[2rem] blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              
              <div className="bg-white/5 p-10 md:p-12 rounded-[2rem] border border-white/10 hover:border-[--color-brand-primary]/50 transition-all duration-500 shadow-xl backdrop-blur-md relative h-full flex flex-col justify-between">
                <div className="text-7xl font-black text-transparent bg-clip-text bg-gradient-to-br from-white/20 to-white/5 mb-8 select-none">
                  {item.number}
                </div>
                
                <div>
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 leading-tight">{item.title}</h3>
                  <p className="text-white/60 leading-relaxed text-base font-medium">{item.desc}</p>
                </div>
                
                <div className="h-1 w-0 group-hover:w-full bg-[--color-brand-primary] transition-all duration-500 mt-8 rounded-full" />
              </div>
            </div>
          ))}
          
          <div className="w-[10vw] flex-shrink-0" /> {/* Buffer at the end */}
        </div>
      </div>
    </section>
  );
}
