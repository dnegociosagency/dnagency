"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function PandemiaProvaDeFogo() {
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

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const texts = gsap.utils.toArray('.reveal-text');
      texts.forEach((text: any) => {
        gsap.fromTo(text, 
          { opacity: 0, y: 50 },
          { 
            opacity: 1, 
            y: 0, 
            duration: 1, 
            scrollTrigger: {
              trigger: text,
              start: "top 85%",
              end: "bottom 65%",
              scrub: 1,
            }
          }
        );
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section data-theme="dark" ref={containerRef} className="relative min-h-[150vh] bg-brand-darker overflow-hidden flex flex-col items-center justify-center py-32 transition-colors duration-300">
      {/* Intense Background */}
      <motion.div 
        className="absolute inset-0 z-0 bg-gradient-to-b from-brand-dark via-brand-light/30 dark:via-[#0a1f1d] to-brand-dark opacity-50 transition-colors duration-300"
        style={isMobile ? {} : { y: backgroundY }}
      />
      <div className="absolute inset-0 bg-[url('https://upload.wikimedia.org/wikipedia/commons/7/76/1k_Dissolve_Noise_Texture.png')] opacity-[0.05] dark:opacity-10 mix-blend-overlay pointer-events-none"></div>

      <div className="relative z-10 w-full max-w-4xl px-6 flex flex-col gap-[30vh] text-center">
        
        <h2 className="reveal-text text-4xl md:text-6xl lg:text-7xl font-bold text-brand-white leading-tight">
          While businesses were closing down...
        </h2>

        <div className="reveal-text flex flex-col items-center justify-center">
          {/* Abstract growing chart effect */}
          <div className="w-full h-32 md:h-64 flex items-end justify-center gap-2 md:gap-4 mb-10 opacity-30">
            {[...Array(10)].map((_, i) => (
              <motion.div
                key={i}
                className="w-4 md:w-8 bg-gradient-to-t from-[--color-brand-primary] to-emerald-400 rounded-t-sm"
                initial={{ height: "10%" }}
                whileInView={{ height: `${((i * 7 + 13) % 60) + 40}%` }}
                viewport={{ once: false, margin: "-100px" }}
                transition={{ duration: 1.5, delay: i * 0.1, ease: "easeOut" }}
              />
            ))}
          </div>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-brand-white leading-tight">
            we transformed traffic into pure survival.
          </h2>
        </div>

        <h2 className="reveal-text text-3xl md:text-5xl lg:text-6xl font-light text-brand-white/70 leading-tight pb-[20vh]">
          That was the exact moment the agency we always wanted to hire was born.
        </h2>

      </div>
    </section>
  );
}

