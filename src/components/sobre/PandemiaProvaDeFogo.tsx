"use client";

import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function PandemiaProvaDeFogo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.6, 1], [0, 1, 1, 0]);

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
              start: "top 80%",
              end: "bottom 60%",
              scrub: 1,
            }
          }
        );
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative min-h-[150vh] bg-black overflow-hidden flex flex-col items-center justify-center py-32">
      {/* Intense Background */}
      <motion.div 
        className="absolute inset-0 z-0 bg-gradient-to-b from-[#020505] via-[#0a1f1d] to-[#020505] opacity-50"
        style={{ y: backgroundY }}
      />
      <div className="absolute inset-0 bg-[url('https://upload.wikimedia.org/wikipedia/commons/7/76/1k_Dissolve_Noise_Texture.png')] opacity-10 mix-blend-overlay pointer-events-none"></div>

      <div className="relative z-10 w-full max-w-4xl px-6 flex flex-col gap-[30vh] text-center">
        
        <h2 className="reveal-text text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
          Enquanto empresas fechavam...
        </h2>

        <div className="reveal-text flex flex-col items-center justify-center">
          {/* Abstract growing chart effect */}
          <div className="w-full h-32 md:h-64 flex items-end justify-center gap-2 md:gap-4 mb-10 opacity-30">
            {[...Array(10)].map((_, i) => (
              <motion.div
                key={i}
                className="w-4 md:w-8 bg-gradient-to-t from-[--color-brand-primary] to-emerald-400 rounded-t-sm"
                initial={{ height: "10%" }}
                whileInView={{ height: `${Math.random() * 60 + 40}%` }}
                viewport={{ once: false, margin: "-100px" }}
                transition={{ duration: 1.5, delay: i * 0.1, ease: "easeOut" }}
              />
            ))}
          </div>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
            nós transformávamos tráfego em sobrevivência.
          </h2>
        </div>

        <h2 className="reveal-text text-3xl md:text-5xl lg:text-6xl font-light text-white/70 leading-tight pb-[20vh]">
          Foi ali que nasceu a agência que gostaríamos de ter contratado.
        </h2>

      </div>
    </section>
  );
}
