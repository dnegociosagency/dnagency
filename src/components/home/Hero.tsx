"use client";

import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

export default function Hero() {
  const [titleNumber, setTitleNumber] = useState(0);
  const titles = useMemo(
    () => ["Performance", "Growth", "Acquisition", "Conversions", "Scaling"],
    []
  );

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (titleNumber === titles.length - 1) {
        setTitleNumber(0);
      } else {
        setTitleNumber(titleNumber + 1);
      }
    }, 2000);
    return () => clearTimeout(timeoutId);
  }, [titleNumber, titles]);

  return (
    <div data-theme="dark" className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-[--background] pt-28 md:pt-36">
      {/* Ambient background glows */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[70vh] rounded-full bg-[rgba(47,107,101,0.08)] blur-[160px] pointer-events-none" />
        <div className="absolute top-1/3 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] rounded-full bg-[#3b8780] blur-[150px] opacity-[0.04] pointer-events-none" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 py-16 flex flex-col items-center justify-center text-center">
        
        {/* Top Premium Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="inline-flex items-center gap-2 mb-8 px-4 py-1.5 rounded-full border border-[#2f6b65]/30 bg-[#2f6b65]/5 backdrop-blur-md"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#2f6b65]" />
          <span className="text-[#2f6b65] font-semibold text-xs tracking-widest uppercase">
            Premium Growth Studio
          </span>
        </motion.div>

        {/* Main Centered Heading with Vertical Scrolling Word Loop */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black mb-8 tracking-tighter leading-[1.1] text-center max-w-5xl mx-auto"
        >
          <span className="text-white block mb-2">
            High-End Web Design.
          </span>
          <span className="relative flex flex-col sm:flex-row items-center justify-center overflow-hidden text-center pt-1 pb-1">
            <span className="bg-gradient-to-r from-[#5eead4] via-[#3b8780] to-[#2f6b65] bg-clip-text text-transparent mr-0 sm:mr-4 shrink-0 font-black">
              Radical
            </span>
            <span className="relative flex h-[1.2em] w-full sm:w-[320px] md:w-[420px] lg:w-[480px] xl:w-[540px] justify-center sm:justify-start overflow-hidden">
              {titles.map((title, index) => (
                <motion.span
                  key={index}
                  className="absolute left-0 right-0 sm:right-auto sm:left-0 bg-gradient-to-r from-[#5eead4] via-[#3b8780] to-[#2f6b65] bg-clip-text text-transparent text-center sm:text-left whitespace-nowrap font-black"
                  initial={{ opacity: 0, y: -60 }}
                  transition={{ type: "spring", stiffness: 60, damping: 15 }}
                  animate={
                    titleNumber === index
                      ? {
                          y: 0,
                          opacity: 1,
                        }
                      : {
                          y: titleNumber > index ? -80 : 80,
                          opacity: 0,
                        }
                  }
                >
                  {title}
                </motion.span>
              ))}
            </span>
          </span>
        </motion.h1>

        {/* Description Text */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.3 }}
          className="text-base sm:text-lg md:text-xl text-white/70 max-w-3xl mb-12 font-normal leading-relaxed tracking-wide"
        >
          We build custom, high-converting websites and scale paid search &amp; social campaigns to drive hyper-growth for businesses across the US &amp; Canada.
        </motion.p>

        {/* Action CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.5 }}
          className="flex flex-col sm:flex-row gap-4 items-center justify-center w-full sm:w-auto z-10"
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
              hover:bg-white/5 text-white border border-white/15 hover:border-white/35 rounded-full transition-all duration-300"
            >
              Explore Our Services
            </Button>
          </a>
        </motion.div>

      </div>

      {/* Scroll Down Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 pointer-events-none hidden sm:flex"
      >
        <span className="text-white/40 text-[10px] font-bold tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          className="w-[1.5px] h-8 bg-gradient-to-b from-white/40 to-transparent"
        />
      </motion.div>
    </div>
  );
}
