"use client";

import React, { useRef, useState } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, Target, Globe, BarChart3, Fingerprint, Search } from "lucide-react";
import MagneticButton from "@/components/ui/MagneticButton";

// Premium Bento Card with soft gradients and hover effects
function BentoCard({ children, className = "", spotlightColor = "rgba(47,107,101,0.08)" }: { children: React.ReactNode, className?: string, spotlightColor?: string }) {
  const divRef = useRef<HTMLDivElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current || isFocused) return;
    const rect = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <div
      ref={divRef}
      onMouseEnter={() => setOpacity(1)}
      onMouseMove={handleMouseMove}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      onMouseLeave={() => setOpacity(0)}
      className={`relative rounded-[2rem] border border-gray-200 bg-white shadow-sm overflow-hidden group transition-all duration-500 hover:shadow-2xl hover:-translate-y-1 ${className}`}
    >
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-500 ease-in-out"
        style={{
          opacity,
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, ${spotlightColor}, transparent 40%)`,
        }}
      />
      {children}
    </div>
  );
}

export default function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: false, margin: "-10%" });
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const headerY = useTransform(scrollYProgress, [0, 0.5], [80, 0]);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { 
        type: "spring",
        stiffness: 80,
        damping: 20,
        duration: 0.8 
      } 
    },
  };

  return (
    <section data-theme="light" ref={sectionRef} id="servicos" className="relative bg-[#f4f6f8] py-24 md:py-40 px-4 md:px-6 overflow-hidden">
      
      {/* Premium Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[60%] h-[60%] bg-gradient-to-br from-[#2f6b65]/5 to-transparent blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[50%] h-[50%] bg-gradient-to-tr from-[#2f6b65]/5 to-transparent blur-[120px] rounded-full" />
      </div>

      <div className="relative max-w-[1400px] mx-auto z-10">
        <motion.div 
          style={{ y: headerY }}
          className="mb-16 md:mb-24 flex flex-col md:flex-row items-center md:items-end justify-between gap-8 border-b border-gray-200 pb-12"
        >
          <div className="max-w-2xl text-center md:text-left">
            <h2 className="text-5xl md:text-7xl font-black text-gray-900 tracking-tighter leading-[1.1]">
              Engineered for <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2f6b65] to-[#43968e]">Market Dominance.</span>
            </h2>
          </div>
          <p className="text-gray-500 max-w-sm text-center md:text-right text-lg md:text-xl font-light">
            We don't just build websites. We create hyper-optimized revenue ecosystems.
          </p>
        </motion.div>

        {/* Bento Grid Layout */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6"
        >
          {/* Card 1: Large Featured (Spans 2 columns, 2 rows on large screens) */}
          <motion.div variants={itemVariants} className="md:col-span-2 lg:col-span-2 lg:row-span-2 h-full">
            <BentoCard className="h-full min-h-[400px] lg:min-h-[600px] p-8 md:p-12 flex flex-col justify-between bg-gradient-to-br from-white to-gray-50 border-none shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
              <div className="relative z-10">
                <div className="w-16 h-16 rounded-[1.2rem] bg-[#2f6b65]/10 flex items-center justify-center mb-8">
                  <Target className="w-8 h-8 text-[#2f6b65]" />
                </div>
                <h3 className="text-3xl md:text-5xl font-black text-gray-900 tracking-tight leading-tight mb-6">
                  Paid Media & <br/> Performance
                </h3>
                <p className="text-gray-500 text-lg md:text-xl font-light leading-relaxed max-w-md">
                  Aggressive, data-driven ad campaigns on Meta, Google, and TikTok. We relentlessly optimize for lower CAC and maximum ROAS, scaling your customer acquisition automatically.
                </p>
              </div>
              <div className="relative z-10 flex items-center gap-4 mt-12">
                <div className="w-12 h-12 rounded-full bg-gray-900 text-white flex items-center justify-center group-hover:bg-[#2f6b65] group-hover:rotate-45 transition-all duration-500">
                  <ArrowUpRight className="w-6 h-6" />
                </div>
                <span className="text-sm font-bold text-gray-900 uppercase tracking-widest group-hover:text-[#2f6b65] transition-colors duration-300">
                  Explore Performance
                </span>
              </div>
            </BentoCard>
          </motion.div>

          {/* Card 2: Medium (Spans 2 columns, 1 row) */}
          <motion.div variants={itemVariants} className="md:col-span-1 lg:col-span-2 h-full">
            <BentoCard className="h-full p-8 md:p-10 flex flex-col justify-between bg-white">
              <div className="flex flex-col md:flex-row gap-6 md:gap-10 items-start md:items-center relative z-10 h-full">
                <div className="flex-1">
                  <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 flex items-center justify-center mb-6">
                    <Globe className="w-7 h-7 text-emerald-600" />
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                    Conversion-First Web Dev
                  </h3>
                  <p className="text-gray-500 text-lg font-light">
                    Premium, blazing-fast landing pages engineered with consumer psychology to turn clicks into high-ticket clients.
                  </p>
                </div>
              </div>
            </BentoCard>
          </motion.div>

          {/* Card 3: Small Square */}
          <motion.div variants={itemVariants} className="h-full">
            <BentoCard className="h-full p-8 flex flex-col justify-between bg-white min-h-[300px]">
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center mb-6">
                  <Search className="w-6 h-6 text-amber-600" />
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">
                  Organic SEO
                </h3>
                <p className="text-gray-500 font-light">
                  Dominate search results and capture high-intent traffic without paying for every click.
                </p>
              </div>
            </BentoCard>
          </motion.div>

          {/* Card 4: Small Square */}
          <motion.div variants={itemVariants} className="h-full">
            <BentoCard className="h-full p-8 flex flex-col justify-between bg-white min-h-[300px]">
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center mb-6">
                  <Fingerprint className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">
                  Premium Branding
                </h3>
                <p className="text-gray-500 font-light">
                  Elevate your perception. Command higher prices with world-class visual identities and creatives.
                </p>
              </div>
            </BentoCard>
          </motion.div>
        </motion.div>
        
        {/* Final CTA */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mt-16 flex justify-center"
        >
          <a href="https://calendar.app.google/TJ85TG2Do9uLhC2K7" target="_blank" rel="noopener noreferrer">
            <MagneticButton className="px-10 py-5 text-lg font-bold bg-gray-900 text-white hover:bg-[#2f6b65] rounded-[2rem] shadow-xl hover:shadow-[0_10px_40px_rgba(47,107,101,0.3)] transition-all duration-500">
              Transform Your Business
            </MagneticButton>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
