"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, type Variants, useMotionValue, useSpring } from "framer-motion";
import { Check, X, ArrowRight, Zap } from "lucide-react";
import MagneticButton from "@/components/ui/MagneticButton";

export default function PricingSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);
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
    <section data-theme="dark" ref={containerRef} className="relative bg-[#040807] py-24 md:py-40 px-4 md:px-6 overflow-hidden border-y border-white/5 transition-colors duration-300">
      {/* Dynamic Mouse Glow */}
      <motion.div
        style={{
          x: useTransform(springX, [-0.5, 0.5], ["-20%", "20%"]),
          y: useTransform(springY, [-0.5, 0.5], ["-20%", "20%"]),
        }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vh] bg-[--color-brand-primary] rounded-full blur-[200px] opacity-[0.12] pointer-events-none z-0"
      />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="text-center mb-20 md:mb-28 relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: false }}
            className="inline-flex items-center gap-3 mb-8 px-5 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md"
          >
            <span className="w-2 h-2 rounded-full bg-[#2f6b65] animate-pulse" />
            <span className="w-2 h-2 rounded-full bg-[#2f6b65] animate-pulse" />
            <span className="text-xs md:text-sm font-bold tracking-[0.2em] text-[#2f6b65] uppercase">
              The End of Generic Agencies
            </span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-4xl sm:text-6xl md:text-8xl font-black text-white tracking-tighter mb-8 leading-[1.1]"
          >
            Your Business <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white/90 to-[#2f6b65] drop-shadow-sm relative inline-block">
              Deserves More
              <Zap className="absolute -top-6 -right-10 w-8 h-8 text-[#2f6b65] opacity-60 animate-pulse hidden md:block" />
            </span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="text-white/60 max-w-3xl mx-auto text-lg md:text-2xl font-light leading-relaxed"
          >
            We don't sell 'post packages'. We engineer a <strong className="text-white font-medium">customer acquisition machine</strong> focused entirely on your financial return.
          </motion.p>
        </div>

        {/* Cards Grid - 3 Columns */}
        <motion.div 
          style={{ y: yCards }}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch max-w-7xl mx-auto relative mt-16"
        >
          {/* Card 1: Mercado Tradicional */}
          <motion.div 
            variants={itemVariants}
            className="relative flex"
          >
            <div className="bg-white/5 rounded-[2rem] p-8 md:p-10 border border-white/10 shadow-lg hover:bg-white/[0.07] transition-all duration-700 ease-out flex flex-col justify-between w-full">
              <div>
                <h3 className="text-xl font-bold text-white/40 mb-8 pb-6 flex items-center justify-between border-b border-white/10">
                  Traditional Agencies
                  <span className="text-[10px] font-mono tracking-widest bg-red-500/10 text-red-400 px-3 py-1 rounded-full border border-red-500/20">
                    WASTED BUDGET
                  </span>
                </h3>
                
                <ul className="space-y-6">
                  {[
                    "Focus on likes and vanity metrics that don't drive cash flow.",
                    "Rigid packages with zero alignment to your actual sales goals.",
                    "Lack of strategic integration and hidden performance metrics.",
                    "Slow, template-based websites that drive prospects away."
                  ].map((text, i) => (
                    <li key={i} className="flex items-start gap-4 group">
                      <div className="mt-1 bg-red-500/5 rounded-full p-1.5 border border-red-500/10 group-hover:bg-red-500/10 transition-colors">
                        <X className="w-3.5 h-3.5 text-red-500/70 group-hover:text-red-500 transition-colors" />
                      </div>
                      <span className="text-sm md:text-base text-white/50 leading-relaxed font-light group-hover:text-white/70 transition-colors">
                        {text}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-8 pt-6 border-t border-white/5 text-center">
                <span className="text-[10px] text-white/20 tracking-wider uppercase font-mono">Paying for curiosity, not calls</span>
              </div>
            </div>
          </motion.div>

          {/* Card 2: AgÃªncia DN (Destaque Principal) */}
          <motion.div 
            variants={itemVariants}
            className="relative z-10 flex"
          >
            {/* Animated Gradient Border Wrapper */}
            <div className="absolute -inset-[2px] rounded-[2.5rem] bg-gradient-to-b from-[#2f6b65] via-[#2f6b65]/20 to-transparent opacity-75 blur-[1px]" />
            <div className="absolute -inset-[1px] rounded-[2.5rem] bg-gradient-to-b from-[#2f6b65] via-[#1f4a46] to-[#040807]" />
            
            <div className="relative h-full bg-[#040807]/95 backdrop-blur-xl rounded-[2.4rem] p-8 md:p-10 shadow-2xl hover:shadow-[0_0_80px_rgba(47,107,101,0.25)] transition-shadow duration-700 flex flex-col justify-between w-full">
              
              {/* Highlight Badge */}
              <div className="absolute -top-5 left-1/2 -translate-x-1/2">
                <div className="relative flex items-center justify-center">
                  <div className="absolute inset-0 bg-[#2f6b65] blur-md opacity-60 animate-pulse" />
                  <div className="relative bg-[#040807] text-white px-6 py-2 rounded-full text-xs font-bold tracking-[0.2em] uppercase border border-[#2f6b65] flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#2f6b65] animate-ping" />
                    Our Focus
                  </div>
                </div>
              </div>
              
              <div className="mt-4">
                <h3 className="text-2xl md:text-3xl font-black text-white mb-8 pb-6 flex items-center justify-between border-b border-white/10">
                  <span className="flex items-center gap-1.5">
                    DN Agency<span className="text-[#2f6b65]">.</span>
                  </span>
                  <span className="text-[10px] font-mono tracking-widest bg-[#2f6b65]/15 text-[#2f6b65] px-3 py-1.5 rounded-full border border-[#2f6b65]/30">
                    EXPERT GROWTH
                  </span>
                </h3>

                <ul className="space-y-6 mb-8">
                  {[
                    { text: "Strategy focused 100% on ", highlight: "conversion and ROI" },
                    { text: "Bespoke roadmaps integrated with your ", highlight: "sales pipeline" },
                    { text: "Real-time performance dashboards showing ", highlight: "every conversion" },
                    { text: "Custom premium web designs with ", highlight: "radical performance" }
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-4 group">
                      <div className="mt-0.5 bg-[#2f6b65]/10 rounded-full p-1.5 border border-[#2f6b65]/30 shadow-[0_0_15px_rgba(47,107,101,0.3)] shrink-0">
                        <Check className="w-4 h-4 text-[#2f6b65]" strokeWidth={3} />
                      </div>
                      <span className="text-sm md:text-base text-white/80 leading-relaxed font-light">
                        {item.text} <strong className="text-white font-semibold drop-shadow-md">{item.highlight}</strong>.
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="flex flex-col justify-end w-full mt-auto">
                <a href="https://calendar.app.google/TJ85TG2Do9uLhC2K7" target="_blank" rel="noopener noreferrer" className="w-full block group">
                  <div className="relative w-full rounded-2xl overflow-hidden">
                    <MagneticButton className="w-full py-5 bg-[--color-brand-primary] text-white text-base md:text-lg font-bold rounded-2xl relative z-10 border border-white/10 shadow-[0_10px_30px_rgba(47,107,101,0.4)] group-hover:shadow-[0_15px_50px_rgba(47,107,101,0.6)] transition-all duration-500 overflow-hidden flex items-center justify-center gap-2">
                      <span className="relative z-10">Book a Strategy Session</span>
                      <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1.5 transition-transform duration-300" />
                      
                      {/* Sweep/Shimmer Effect */}
                      <div className="absolute inset-0 z-0">
                        <div className="absolute top-0 -left-[100%] w-[120%] h-full bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-[-20deg] group-hover:animate-sweep" />
                      </div>
                    </MagneticButton>
                  </div>
                  <p className="text-center text-white/40 text-[10px] mt-3 tracking-widest uppercase font-mono group-hover:text-[--color-brand-primary] transition-colors">
                    Limited client intake slots this month
                  </p>
                </a>
              </div>
            </div>
          </motion.div>

          {/* Card 3: Contractor Guarantees (Novidades IrresistÃ­veis) */}
          <motion.div 
            variants={itemVariants}
            className="relative flex"
          >
            <div className="bg-white/5 border border-white/10 rounded-[2rem] p-8 md:p-10 shadow-lg hover:bg-white/[0.07] transition-all duration-700 ease-out flex flex-col justify-between w-full">
              <div>
                <h3 className="text-xl font-bold text-white/40 mb-8 pb-6 flex items-center justify-between border-b border-white/10">
                  Performance Perks
                  <span className="text-[10px] font-mono tracking-widest bg-[#2f6b65]/15 text-[#2f6b65] px-3 py-1 rounded-full border border-[#2f6b65]/20">
                    ZERO RISK
                  </span>
                </h3>
                
                <div className="space-y-6">
                  {[
                    { title: "100% Exclusive Calls", desc: "No shared directory leads. When your phone rings, the client is exclusively yours." },
                    { title: "Pay Per Lead, Not Clicks", desc: "If they don't call, you don't pay. Stop paying for curiosity in search grids." },
                    { title: "Spam & Bot Shielding", desc: "We dispute and get refunds from Google for wrong numbers or spam robocalls." },
                    { title: "Verification Support", desc: "We coordinate license verification, insurance submission, and background check gates." }
                  ].map((item, index) => (
                    <div key={index} className="flex gap-4 items-start group">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#2f6b65] mt-2 shrink-0 animate-pulse" />
                      <div>
                        <h4 className="font-bold text-white text-sm md:text-base">{item.title}</h4>
                        <p className="text-white/40 text-xs md:text-sm leading-relaxed mt-1">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="mt-8 pt-6 border-t border-white/5 text-center">
                <span className="text-[10px] text-white/20 tracking-wider uppercase font-mono">Engineered for North American Subcontractors</span>
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
