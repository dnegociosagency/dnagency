"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function NascimentoAgencia() {
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
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const y2 = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <section data-theme="light" ref={containerRef} className="relative py-32 bg-white overflow-hidden border-y border-[#0a1211]/10 transition-colors duration-300">
      {/* Premium Grid Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(10,18,17,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(10,18,17,0.04)_1px,transparent_1px)] bg-[size:64px_64px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <span className="px-4 py-1.5 rounded-full border border-[#2f6b65]/30 bg-[#2f6b65]/5 text-[#2f6b65] text-sm font-semibold tracking-wider mb-6 inline-block">
              The Method
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#0a1211] mb-6 tracking-tight">
              The growth architecture.
            </h2>
            <p className="text-lg text-[#0a1211]/60 font-light leading-relaxed">
              We replaced guesswork with data engineering. Created processes. Standardized excellence. Everything fell perfectly into place.
            </p>
          </motion.div>
        </div>

        {/* Cards com tema light */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative">
          
          <motion.div 
            style={isMobile ? {} : { y: y1 }} 
            className="col-span-1 md:col-span-2 lg:col-span-1"
          >
            <div className="p-8 rounded-2xl bg-white border border-[#0a1211]/10 shadow-sm hover:shadow-md hover:border-[#2f6b65]/20 transition-all duration-300 hover:scale-[1.02]">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500/15 to-emerald-500/5 border border-emerald-500/10 flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
              </div>
              <h3 className="text-xl font-bold text-[#0a1211] mb-3">Pure Performance</h3>
              <p className="text-[#0a1211]/60 font-light leading-relaxed">Campaigns built for extreme conversion. No vanity metrics, just traceable ROI.</p>
            </div>
          </motion.div>

          <motion.div 
            style={isMobile ? {} : { y: y2 }} 
            className="col-span-1"
          >
            <div className="p-8 rounded-2xl bg-white border border-[#0a1211]/10 shadow-sm hover:shadow-md hover:border-[#2f6b65]/20 transition-all duration-300 hover:scale-[1.02]">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#2f6b65]/15 to-[#2f6b65]/5 border border-[#2f6b65]/10 flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-[#2f6b65]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2m0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
              </div>
              <h3 className="text-xl font-bold text-[#0a1211] mb-3">Data Engineering</h3>
              <p className="text-[#0a1211]/60 font-light leading-relaxed">Integrated dashboards connecting every single cent invested to actual sales revenue.</p>
            </div>
          </motion.div>

          <motion.div 
            style={isMobile ? {} : { y: y1 }} 
            className="col-span-1 md:col-span-2 lg:col-span-1"
          >
            <div className="p-8 rounded-2xl bg-white border border-[#0a1211]/10 shadow-sm hover:shadow-md hover:border-[#2f6b65]/20 transition-all duration-300 hover:scale-[1.02]">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/15 to-blue-500/5 border border-blue-500/10 flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
              </div>
              <h3 className="text-xl font-bold text-[#0a1211] mb-3">Relentless Scale</h3>
              <p className="text-[#0a1211]/60 font-light leading-relaxed">Systems designed not to generate $10k, but to sustain $1M+ with high stability.</p>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
