"use client";

import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const team = [
  {
    id: 1,
    name: "Donis Alfredo",
    role: "CEO & Estrategista",
    image: "/team/donis.png",
  },
  {
    id: 2,
    name: "Pâmela Lavor",
    role: "CEO & Paid Traffic Specialist",
    image: "/team/pamela.png",
  },
  {
    id: 3,
    name: "Matheus Sales",
    role: "Dev Full Stack",
    image: "/team/matheus.png",
  },
  {
    id: 4,
    name: "Gabriel Henrique",
    role: "UX/UI Designer",
    image: "/team/gabriel.png",
  },
  {
    id: 5,
    name: "Cecilia",
    role: "Digital Marketing Manager",
    image: "/team/cecilia.png",
  },
  {
    id: 6,
    name: "Joana",
    role: "Paid Traffic Analyst",
    image: "/team/joana.png",
  },
];

export default function LadoHumano() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const parallaxEven = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const parallaxOdd = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Reveal Masks
      const images = gsap.utils.toArray<HTMLElement>(".team-reveal-img");
      
      images.forEach((img) => {
        gsap.fromTo(img,
          { clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)" },
          { 
            clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)", 
            duration: 1.5, 
            ease: "power4.inOut",
            force3D: true,
            scrollTrigger: {
              trigger: img,
              start: "top 85%",
            }
          }
        );
      });
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-8 lg:gap-x-24 lg:gap-y-32">
          {team.map((member, index) => {
            const isOdd = index % 2 !== 0;
            return (
              <div 
                key={member.id} 
                className={`w-full flex flex-col items-start ${isOdd ? 'md:mt-32' : ''}`}
              >
                <div className="team-reveal-img w-full aspect-[3/4] overflow-hidden rounded-sm relative will-change-[clip-path,transform]">
                  <motion.div 
                    className="absolute inset-[-10%] grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-700 will-change-transform"
                    style={{ y: isOdd ? parallaxOdd : parallaxEven }}
                  >
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </motion.div>
                </div>
                <div className="mt-8">
                  <h3 className="text-3xl font-bold text-white mb-2">{member.name}</h3>
                  <p className="text-[--color-brand-primary] tracking-widest uppercase text-sm font-medium">{member.role}</p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
