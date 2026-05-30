"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import MagneticButton from "@/components/ui/MagneticButton";
import DynamicGridBackground from "../ui/DynamicGridBackground";

export default function CTASection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const yBackground = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const scaleContent = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.9]);

  return (
    <section data-theme="light" ref={containerRef} className="relative bg-white py-20 md:py-40 px-4 md:px-6 overflow-hidden flex items-center justify-center border-t border-[#0a1211]/10">
      {/* Dynamic Background */}
      <div className="absolute inset-0 z-0">
        <DynamicGridBackground />
        <div className="absolute inset-0 bg-gradient-to-b from-white to-[#f0f4f4] opacity-95 pointer-events-none" />
        <motion.div 
          style={{ y: yBackground }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[--color-brand-primary] rounded-full blur-[200px] opacity-[0.05] pointer-events-none" 
        />
      </div>

      <motion.div 
        style={{ scale: scaleContent }}
        className="relative z-10 max-w-5xl mx-auto text-center"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-[#0a1211]/5 border border-[#0a1211]/10 rounded-[2rem] md:rounded-[3rem] p-7 sm:p-12 md:p-24 backdrop-blur-md shadow-2xl relative overflow-hidden"
        >
          {/* Inner glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#2f6b65]/20 to-transparent opacity-50 pointer-events-none" />

          <div className="relative z-10">
            <h2 className="text-3xl sm:text-5xl md:text-7xl font-bold text-[#0a1211] tracking-tighter mb-6 md:mb-8 leading-tight">
              Ready to Scale Your <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0a1211] to-[#2f6b65]">Revenue?</span>
            </h2>
            <p className="text-base md:text-xl text-[#0a1211]/70 max-w-2xl mx-auto mb-8 md:mb-12 font-medium">
              Stop losing pipeline to weak strategies. Book a free strategy session and unlock your brand's growth potential.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <a href="https://calendar.app.google/TJ85TG2Do9uLhC2K7" target="_blank" rel="noopener noreferrer">
                <MagneticButton className="px-10 py-5 bg-[#2f6b65] text-white text-lg font-bold hover:bg-[#255651] shadow-[0_0_40px_rgba(47,107,101,0.4)] hover:shadow-[0_0_60px_rgba(47,107,101,0.6)] transition-all flex items-center gap-3 border-none">
                  Book My Strategy Call
                  <ArrowRight className="w-5 h-5" />
                </MagneticButton>
              </a>
            </div>
            <p className="mt-8 text-[#0a1211]/45 text-sm">
              * Limited strategic calls slots left this month.
            </p>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
