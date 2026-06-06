"use client";

import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const team = [
  {
    id: 1,
    name: "Donis Alfredo",
    role: "CEO & Strategist",
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
    role: "Full Stack Developer",
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
    position: "object-top",
  },
  {
    id: 7,
    name: "Juliana",
    role: "GROWTH PARTNER | CANADA OFFICE",
    image: "/team/juliana.jpg",
  },
  {
    id: 8,
    name: "Anabella",
    role: "GROWTH PARTNER | US OFFICE",
    image: "/team/anabella.png",
    position: "object-top",
  },
];

export default function LadoHumano() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section 
      ref={containerRef} 
      data-theme="light"
      className="relative py-28 md:py-36 bg-white border-y border-[#0a1211]/10 transition-colors duration-300"
    >
      {/* Glow de fundo bem suave */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[70vw] h-[70vw] rounded-full bg-[rgba(47,107,101,0.03)] blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        
        {/* Cabeçalho da Seção */}
        <div className="text-center mb-24 md:mb-32">
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full border border-[#2f6b65]/20 bg-[#2f6b65]/5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#2f6b65]" />
            <span className="text-[#2f6b65] font-semibold text-xs tracking-widest uppercase">
              Our People
            </span>
          </div>

          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl lg:text-6xl font-light text-[#0a1211] tracking-tight leading-tight"
          >
            Behind the numbers, <br/>
            <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#0a1211] to-[#2f6b65]">
              there are people.
            </span>
          </motion.h2>
        </div>

        {/* Grid do Time */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 lg:gap-x-16 lg:gap-y-20">
          {team.map((member, index) => {
            return (
              <motion.div 
                key={member.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: Math.min(index * 0.1, 0.3) }}
                className="group w-full flex flex-col items-start"
              >
                {/* Imagem do Integrante */}
                <div className="w-full aspect-[3/4] overflow-hidden rounded-2xl border border-[#0a1211]/10 bg-[#0a1211]/5 relative shadow-sm transition-all duration-500 group-hover:shadow-md group-hover:border-[#2f6b65]/20">
                  <div className="absolute inset-0 transition-transform duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-[1.03]">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className={`object-cover ${member.position || "object-center"}`}
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      priority={index < 3}
                    />
                  </div>

                  {/* Efeito suave de iluminação ao passar o mouse */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-t from-[rgba(47,107,101,0.05)] to-transparent pointer-events-none" />
                </div>

                {/* Informações do Integrante */}
                <div className="mt-6 w-full">
                  <div className="h-px w-6 bg-[#2f6b65]/40 mb-3 transition-all duration-500 group-hover:w-12 group-hover:bg-[#2f6b65]" />
                  
                  <h3 className="text-2xl font-bold text-[#0a1211] tracking-tight transition-colors duration-300 group-hover:text-[#2f6b65]">
                    {member.name}
                  </h3>
                  
                  <p className="mt-1.5 text-[#2f6b65] tracking-widest uppercase text-xs font-semibold">
                    {member.role}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
