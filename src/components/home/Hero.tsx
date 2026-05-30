"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Globe } from "@/components/ui/globe";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  const title = "High-End Web Design. Radical Performance.";
  const words = title.split(" ");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024); // Ocultar globo em telas menores (tablet/celular)
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <div data-theme="dark" className="relative min-h-screen w-full flex items-center overflow-hidden bg-[--background] pt-24 md:pt-28">
      {/* Glow de fundo sutil */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-[--color-brand-primary] blur-[180px] opacity-[0.06] dark:opacity-[0.09]" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Coluna Esquerda: ConteÃºdo de Texto e CTAs */}
          <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full border border-[#2f6b65]/30 bg-[#2f6b65]/5 backdrop-blur-md"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#2f6b65] animate-pulse" />
              <span className="text-[#2f6b65] font-semibold text-xs tracking-widest uppercase">
                Premium Growth Studio
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-black mb-6 tracking-tighter leading-[1.05]"
            >
              <span className="text-[#ffffff] block lg:inline mr-2">
                High-End Web Design.
              </span>
              <span className="bg-gradient-to-r from-[#5eead4] via-[#3b8780] to-[#2f6b65] bg-clip-text text-transparent block lg:inline">
                Radical Performance.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
              className="text-base sm:text-lg md:text-xl text-[--foreground]/65 max-w-2xl mb-8 font-normal leading-relaxed"
            >
              We build custom, high-converting websites and scale paid search & social campaigns to drive hyper-growth for businesses across the US & Canada.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.55 }}
              className="flex flex-col sm:flex-row gap-4 items-center w-full sm:w-auto"
            >
              <a
                href="https://calendar.app.google/TJ85TG2Do9uLhC2K7"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto"
              >
                <Button
                  className="w-full sm:w-auto rounded-full px-8 py-6 text-base font-bold 
                  bg-[#2f6b65] hover:bg-[#255651] text-white transition-all duration-300
                  hover:shadow-[0_0_35px_rgba(47,107,101,0.35)] flex items-center justify-center gap-2"
                >
                  <span>Book a Strategy Call</span>
                  <ArrowRight size={18} />
                </Button>
              </a>

              <a href="#servicos" className="w-full sm:w-auto">
                <Button
                  variant="outline"
                  className="w-full sm:w-auto px-8 py-6 text-base font-bold bg-transparent 
                  hover:bg-[--foreground]/5 text-[--foreground] border border-[--foreground]/15 hover:border-[--foreground]/35 rounded-full transition-all duration-300"
                >
                  Explore Our Services
                </Button>
              </a>
            </motion.div>
          </div>

          {/* Coluna Direita: Globo 3D (Apenas Desktop) */}
          <div className="lg:col-span-5 flex items-center justify-center min-h-[350px] sm:min-h-[450px] lg:min-h-[550px] w-full relative">
            {!isMobile && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="w-full h-full absolute inset-0 flex items-center justify-center"
              >
                <Globe className="relative z-10" />
                {/* Glow sutil atrÃ¡s do Globo */}
                <div className="absolute w-[80%] h-[80%] rounded-full bg-[--color-brand-primary] blur-[150px] opacity-[0.05] pointer-events-none" />
              </motion.div>
            )}
          </div>

        </div>
      </div>

      {/* Indicador de Rolagem */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.8 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 pointer-events-none hidden sm:flex"
      >
        <span className="text-[--foreground]/40 text-[10px] font-bold tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          className="w-[1.5px] h-8 bg-gradient-to-b from-[--foreground]/40 to-transparent"
        />
      </motion.div>
    </div>
  );
}
