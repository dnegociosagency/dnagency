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
      title: "Audit & Growth Roadmap", 
      desc: "We analyze your current digital funnel, identify conversions bottlenecks, and map out clear ROI targets with a custom roadmap." 
    },
    { 
      number: "02", 
      title: "Funnel & Creative Setup", 
      desc: "We build out your landing pages, configure advanced tracking (pixels & APIs), and design custom scroll-stopping creatives." 
    },
    { 
      number: "03", 
      title: "Launch & Acquisition", 
      desc: "We push campaigns live to capture high-intent traffic. Daily oversight ensures campaign health, CTR stability, and lead quality." 
    },
    { 
      number: "04", 
      title: "Scale & Revenue Growth", 
      desc: "Armed with clean data, we cut underperforming angles and shift budgets to winning campaigns to scale your revenue predictably." 
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
              <span className="text-sm font-semibold tracking-wider text-[--color-brand-primary] uppercase">Our Method</span>
            </motion.div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-6xl font-bold text-white tracking-tighter mb-6"
            >
              Revenue <br/><span className="text-[--color-brand-primary]">Engineering</span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-white/70 text-lg md:text-xl font-medium max-w-lg"
            >
              A mathematically structured workflow engineered to turn clicks into customers. Scroll to explore our process.
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
