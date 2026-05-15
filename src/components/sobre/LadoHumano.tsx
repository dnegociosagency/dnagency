"use client";

import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function LadoHumano() {
  const containerRef = useRef<HTMLDivElement>(null);
  const img1Ref = useRef<HTMLDivElement>(null);
  const img2Ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const parallax1 = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const parallax2 = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Reveal Masks
      gsap.fromTo(img1Ref.current,
        { clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)" },
        { 
          clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)", 
          duration: 1.5, 
          ease: "power4.inOut",
          scrollTrigger: {
            trigger: img1Ref.current,
            start: "top 80%",
          }
        }
      );

      gsap.fromTo(img2Ref.current,
        { clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)" },
        { 
          clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)", 
          duration: 1.5, 
          ease: "power4.inOut",
          scrollTrigger: {
            trigger: img2Ref.current,
            start: "top 80%",
          }
        }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative py-32 bg-black">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="text-center mb-32">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl lg:text-6xl font-light text-white tracking-tight"
          >
            Por trás dos números, <br/>
            <span className="font-bold">existem pessoas.</span>
          </motion.h2>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-16 md:gap-8 lg:gap-24">
          
          {/* Member 1 */}
          <div className="w-full md:w-1/2 flex flex-col items-start">
            <div ref={img1Ref} className="w-full aspect-[3/4] overflow-hidden rounded-sm relative">
              <motion.div 
                className="absolute inset-[-10%] bg-[url('https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&q=80')] bg-cover bg-center grayscale opacity-80"
                style={{ y: parallax1 }}
              />
            </div>
            <div className="mt-8">
              <h3 className="text-3xl font-bold text-white mb-2">Matheus Sales</h3>
              <p className="text-[--color-brand-primary] tracking-widest uppercase text-sm font-medium">CEO & Estrategista Chefe</p>
            </div>
          </div>

          {/* Member 2 */}
          <div className="w-full md:w-1/2 flex flex-col items-start mt-0 md:mt-32">
            <div ref={img2Ref} className="w-full aspect-[3/4] overflow-hidden rounded-sm relative">
              <motion.div 
                className="absolute inset-[-10%] bg-[url('https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80')] bg-cover bg-center grayscale opacity-80"
                style={{ y: parallax2 }}
              />
            </div>
            <div className="mt-8">
              <h3 className="text-3xl font-bold text-white mb-2">João Pedro</h3>
              <p className="text-[--color-brand-primary] tracking-widest uppercase text-sm font-medium">COO & Head de Operações</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
