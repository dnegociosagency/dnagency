"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function HeroCinematico() {
  const containerRef = useRef<HTMLDivElement>(null);
  const text1Ref = useRef<HTMLHeadingElement>(null);
  const text2Ref = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Intro animation
      gsap.fromTo(text1Ref.current, 
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1.5, ease: "power3.out", delay: 0.5 }
      );
      gsap.fromTo(text2Ref.current, 
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1.5, ease: "power3.out", delay: 1 }
      );

      // Scroll out animation
      gsap.to(containerRef.current, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
        y: 100,
        opacity: 0,
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section data-theme="dark" ref={containerRef} className="relative min-h-screen flex items-center justify-center overflow-hidden bg-brand-dark transition-colors duration-300">
      {/* Cinematic Grain/Noise */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.08] dark:opacity-[0.15] bg-[url('https://upload.wikimedia.org/wikipedia/commons/7/76/1k_Dissolve_Noise_Texture.png')] mix-blend-overlay"></div>
      
      {/* Particles/Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] md:w-[600px] md:h-[600px] bg-[--color-brand-primary] opacity-[0.04] dark:opacity-[0.07] blur-[150px] rounded-full pointer-events-none"></div>

      {/* Floating abstract elements representing chaos */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-brand-white/5 border border-brand-white/10 rounded-xl backdrop-blur-sm"
            style={{
              width: ((i * 37 + 11) % 200) + 100,
              height: ((i * 43 + 23) % 100) + 50,
              left: `${((i * 59 + 17) % 90) + 5}%`,
              top: `${((i * 67 + 31) % 80) + 10}%`,
              rotate: ((i * 73 + 41) % 45) - 22.5,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: ((i * 29 + 13) % 5) + 5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      <div className="relative z-10 text-center max-w-5xl px-6">
        <h1 ref={text1Ref} className="text-4xl md:text-6xl lg:text-7xl font-bold text-brand-white tracking-tight mb-6 leading-tight">
          Before DN Agency existed... <br/>
          <span className="text-brand-white/30 dark:text-brand-white/40">we were the frustrated client.</span>
        </h1>
        <p ref={text2Ref} className="text-lg md:text-2xl text-brand-white/60 max-w-3xl mx-auto font-light leading-relaxed">
          We know exactly what it&apos;s like to invest in marketing without clarity, without proximity, and without results. We felt first-hand what we strive to solve today.
        </p>
      </div>

      {/* Scroll indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-xs uppercase tracking-[0.2em] text-brand-white/30">Discover</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-brand-white/30 to-transparent"></div>
      </motion.div>
    </section>
  );
}

