"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Slide {
  id: number;
  image: string;
  title: string;
  subtitle: string;
}

const SLIDES: Slide[] = [
  {
    id: 1,
    image: "/images/jj-moto-pecas/loja-galeria-1.png",
    title: "Nosso Showroom",
    subtitle: "Estrutura moderna e completa com peças e acessórios à sua disposição."
  },
  {
    id: 2,
    image: "/images/jj-moto-pecas/loja-galeria-2.png",
    title: "Oficina de Performance",
    subtitle: "Profissionais qualificados e maquinário de ponta para a sua moto."
  },
  {
    id: 3,
    image: "/images/jj-moto-pecas/background.png",
    title: "Potência & Emoção",
    subtitle: "Garantimos o melhor rendimento e durabilidade para todas as cilindradas."
  }
];

export default function GallerySlider() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0); // -1 para esquerda, 1 para direita

  // Auto-play de 6 segundos
  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 6000);
    return () => clearInterval(timer);
  }, [current]);

  const handleNext = () => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % SLIDES.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrent((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
  };

  // Variantes de animação para transições cinematográficas de slide
  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? "100%" : "-100%",
      opacity: 0,
      scale: 1.05,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: "spring" as const, stiffness: 300, damping: 30 },
        opacity: { duration: 0.6 },
        scale: { duration: 0.8 },
      },
    },
    exit: (dir: number) => ({
      x: dir < 0 ? "100%" : "-100%",
      opacity: 0,
      scale: 0.95,
      transition: {
        x: { type: "spring" as const, stiffness: 300, damping: 30 },
        opacity: { duration: 0.6 },
      },
    }),
  };

  return (
    <section className="relative w-full py-16 px-6 flex flex-col items-center">
      <div className="w-full max-w-4xl">
        {/* Cabeçalho */}
        <div className="flex flex-col items-center text-center mb-10">
          <span className="text-[10px] font-black uppercase tracking-[0.25em] text-jj-red mb-2">
            Galeria Premium
          </span>
          <h2 className="text-2xl md:text-3xl font-black tracking-tight text-jj-white uppercase">
            Sinta a Experiência
          </h2>
        </div>

        {/* Contêiner do Slider */}
        <div className="relative w-full h-[260px] sm:h-[400px] rounded-2xl overflow-hidden border border-white/5 shadow-2xl jj-glass">
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={current}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="absolute inset-0 w-full h-full"
            >
              {/* Imagem */}
              <Image
                src={SLIDES[current].image}
                alt={SLIDES[current].title}
                fill
                priority
                className="object-cover select-none"
              />

              {/* Camada Escura de Sobreposição */}
              <div className="absolute inset-0 bg-gradient-to-t from-jj-black/90 via-jj-black/40 to-transparent" />

              {/* Informações Textuais do Slide */}
              <div className="absolute bottom-6 left-6 right-6 sm:bottom-10 sm:left-10 sm:right-10 z-10">
                <motion.span
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-[9px] font-black text-jj-red uppercase tracking-[0.2em] mb-1.5 inline-block"
                >
                  JJ Moto Peças
                </motion.span>
                <motion.h3
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-lg sm:text-2xl font-black text-jj-white uppercase tracking-wider mb-2"
                >
                  {SLIDES[current].title}
                </motion.h3>
                <motion.p
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-jj-silver/80 text-xs sm:text-sm font-light max-w-md leading-relaxed"
                >
                  {SLIDES[current].subtitle}
                </motion.p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Setas de Controle */}
          <button
            onClick={handlePrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-jj-black/60 border border-white/5 flex items-center justify-center text-jj-white hover:bg-jj-red hover:border-jj-red/45 hover:scale-110 active:scale-95 transition-all duration-300 z-25 backdrop-blur-sm"
            aria-label="Slide anterior"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={handleNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-jj-black/60 border border-white/5 flex items-center justify-center text-jj-white hover:bg-jj-red hover:border-jj-red/45 hover:scale-110 active:scale-95 transition-all duration-300 z-25 backdrop-blur-sm"
            aria-label="Próximo slide"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Indicadores Lineares */}
          <div className="absolute top-4 right-6 z-25 flex gap-2">
            {SLIDES.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setDirection(idx > current ? 1 : -1);
                  setCurrent(idx);
                }}
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  idx === current ? "w-8 bg-jj-red" : "w-2 bg-jj-silver/30"
                }`}
                aria-label={`Ir para o slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
