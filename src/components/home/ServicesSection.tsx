"use client";

import React, { useRef, useState } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, BarChart3, Globe, PenTool, Search } from "lucide-react";
import MagneticButton from "@/components/ui/MagneticButton";

// Efeito de Spotlight Card (Estilo Premium Hover Glow)
function SpotlightCard({ children, className = "" }: { children: React.ReactNode, className?: string }) {
  const divRef = useRef<HTMLDivElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);
  const rectCache = useRef<DOMRect | null>(null);
  const rafId = useRef<number | null>(null);

  // Cache rect on mouseenter — layout is stable, no forced reflow
  const handleMouseEnter = () => {
    if (divRef.current) rectCache.current = divRef.current.getBoundingClientRect();
    setOpacity(1);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current || isFocused) return;
    if (rafId.current) cancelAnimationFrame(rafId.current);
    const { clientX, clientY } = e;
    rafId.current = requestAnimationFrame(() => {
      const rect = rectCache.current ?? divRef.current?.getBoundingClientRect();
      if (!rect) return;
      setPosition({ x: clientX - rect.left, y: clientY - rect.top });
    });
  };

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);
  const handleMouseLeave = () => {
    if (rafId.current) cancelAnimationFrame(rafId.current);
    setOpacity(0);
  };

  return (
    <div
      ref={divRef}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onMouseLeave={handleMouseLeave}
      className={`relative rounded-3xl border border-black/5 dark:border-white/5 bg-black/5 dark:bg-white/[0.02] overflow-hidden ${className}`}
    >
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300 ease-in-out"
        style={{
          opacity,
          background: `radial-gradient(800px circle at ${position.x}px ${position.y}px, rgba(47,107,101,0.15), transparent 40%)`,
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

  // Parallax para o header
  const headerY = useTransform(scrollYProgress, [0, 0.5], [80, 0]);

  const containerVariants: import("framer-motion").Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants: import("framer-motion").Variants = {
    hidden: { opacity: 0, y: 80, rotateX: 15, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      rotateX: 0, 
      scale: 1,
      transition: { 
        type: "spring",
        stiffness: 80,
        damping: 15,
        duration: 0.8 
      } 
    },
  };

  const services = [
    {
      title: "Paid Media & Performance",
      desc: "Advanced media management on Meta Ads, Google Ads, and TikTok Ads laser-focused on ROAS and CAC reduction.",
      icon: <BarChart3 className="w-8 h-8 text-[--color-brand-primary]" />,
      color: "from-blue-500/10 to-transparent border-blue-500/20"
    },
    {
      title: "Conversion-First Web Development",
      desc: "High-performance websites and landing pages optimized to convert visitors into customers with premium UX/UI.",
      icon: <Globe className="w-8 h-8 text-[--color-brand-primary]" />,
      color: "from-emerald-500/10 to-transparent border-emerald-500/20"
    },
    {
      title: "Organic SEO & Growth Strategy",
      desc: "Dominating organic search results. Technical audits, high-intent keywords, and content optimization.",
      icon: <Search className="w-8 h-8 text-[--color-brand-primary]" />,
      color: "from-amber-500/10 to-transparent border-amber-500/20"
    },
    {
      title: "Branding & Premium Design",
      desc: "Building memorable visual identities, high-end layouts, and ad creatives designed to command higher prices.",
      icon: <PenTool className="w-8 h-8 text-[--color-brand-primary]" />,
      color: "from-purple-500/10 to-transparent border-purple-500/20"
    }
  ];

  return (
    <section data-theme="dark" ref={sectionRef} id="servicos" className="relative bg-[--color-brand-dark] py-20 md:py-40 px-4 md:px-6 overflow-hidden perspective-[1000px]">
      
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div 
           className="absolute top-[-20%] right-[-10%] w-[50%] h-[50%] bg-[--color-brand-primary] blur-[150px] opacity-[0.03] rounded-full"
           animate={{ 
             scale: [1, 1.2, 1],
             opacity: [0.03, 0.05, 0.03]
           }}
           transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
           className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-white blur-[150px] opacity-[0.02] rounded-full"
           animate={{ 
             scale: [1, 1.5, 1],
             opacity: [0.02, 0.04, 0.02]
           }}
           transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto z-10">
        <motion.div 
          style={{ y: headerY }}
          className="mb-10 md:mb-20 flex flex-col md:flex-row justify-between items-end gap-4 md:gap-6 border-b border-white/10 pb-8 md:pb-10"
        >
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-[--foreground] tracking-tighter">
              Our <span className="text-[--color-brand-primary]">Services</span>
            </h2>
          </div>
          <p className="text-[--foreground]/60 max-w-sm text-right hidden md:block text-lg">
            Integrated growth solutions engineered to scale your revenue.
          </p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {services.map((service, index) => (
            <motion.div key={index} variants={itemVariants} className="h-full">
              <SpotlightCard className="h-full p-6 md:p-10 flex flex-col justify-between min-h-[260px] md:min-h-[340px] group transition-transform duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)]">
                <div className="relative z-10">
                  <div className={`mb-8 w-16 h-16 rounded-2xl flex items-center justify-center bg-gradient-to-br ${service.color} border border-black/10 dark:border-white/10 group-hover:scale-110 group-hover:border-[--color-brand-primary]/50 transition-all duration-500`}>
                    {service.icon}
                  </div>
                  
                  <h3 className="text-2xl font-bold text-[--foreground] mb-4 group-hover:text-[--color-brand-primary] transition-colors duration-300">{service.title}</h3>
                  <p className="text-[--foreground]/60 leading-relaxed mb-8 text-lg">{service.desc}</p>
                </div>

                <div className="relative z-10 flex justify-between items-center mt-auto">
                  <span className="text-sm font-bold text-[--color-brand-primary] uppercase tracking-wider opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                    Learn more
                  </span>
                  <div className="w-12 h-12 rounded-full bg-transparent border border-black/10 dark:border-white/10 text-[--foreground]/40 flex items-center justify-center group-hover:bg-[--color-brand-primary] group-hover:text-white group-hover:border-[--color-brand-primary] transition-all duration-500 group-hover:rotate-45">
                    <ArrowUpRight className="w-5 h-5" />
                  </div>
                </div>
              </SpotlightCard>
            </motion.div>
          ))}
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="mt-20 flex justify-center"
        >
          <a href="https://calendar.app.google/TJ85TG2Do9uLhC2K7" target="_blank" rel="noopener noreferrer">
            <MagneticButton className="px-8 py-4 bg-[--color-brand-primary] text-white hover:bg-[#255651] shadow-lg">
              Book a Strategy Call
            </MagneticButton>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
