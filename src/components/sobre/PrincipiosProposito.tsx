"use client";

import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function PrincipiosProposito() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Calculate opacities based on scroll progress to reveal lines one by one
  const opacity1 = useTransform(scrollYProgress, [0.2, 0.3, 0.5, 0.6], [0, 1, 1, 0.3]);
  const opacity2 = useTransform(scrollYProgress, [0.4, 0.5, 0.7, 0.8], [0, 1, 1, 0.3]);
  const opacity3 = useTransform(scrollYProgress, [0.6, 0.7, 0.9, 1.0], [0, 1, 1, 1]);

  return (
    <section ref={containerRef} className="h-[200vh] bg-[#000000] flex items-center justify-center relative">
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center w-full px-6">
        
        <div className="max-w-4xl mx-auto text-center space-y-12 md:space-y-16">
          <motion.h2 
            style={{ opacity: opacity1 }}
            className="text-3xl md:text-5xl lg:text-7xl font-light text-white tracking-wide"
          >
            "Tudo o que fizerem..."
          </motion.h2>

          <motion.h2 
            style={{ opacity: opacity2 }}
            className="text-3xl md:text-5xl lg:text-7xl font-light text-white tracking-wide"
          >
            "façam de todo o coração..."
          </motion.h2>

          <motion.h2 
            style={{ opacity: opacity3 }}
            className="text-3xl md:text-5xl lg:text-7xl font-bold text-white tracking-wide"
          >
            "como para o Senhor."
          </motion.h2>
        </div>

      </div>
    </section>
  );
}
