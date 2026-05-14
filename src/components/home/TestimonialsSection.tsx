"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, Variants } from "framer-motion";
import { Quote, Star } from "lucide-react";

const testimonials = [
  {
    name: "Pércio",
    role: "CEO, JJ Moto Peças",
    content: "A Agência DN transformou nossa captação. Saímos de um Custo Por Lead altíssimo para uma máquina previsível e lucrativa em apenas 3 meses.",
    rating: 5
  },
  {
    name: "Rhenan Veres",
    role: "CEO, Dentista Para todos",
    content: "O design do nosso novo site junto com a estratégia de tráfego dobrou nossas vendas online. O nível de profissionalismo e proximidade deles é incomparável.",
    rating: 5
  },
  {
    name: "Laís",
    role: "CEO, Connect Imoveis Litoral",
    content: "Não é apenas uma agência, são parceiros de negócio. Eles entendem de métricas que importam: faturamento e lucro no bolso.",
    rating: 5
  }
];

export default function TestimonialsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const yBackground = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    },
  };

  return (
    <section ref={containerRef} className="relative bg-[--color-brand-dark] py-32 px-6 overflow-hidden">
      {/* Background Glows */}
      <motion.div
        style={{ y: yBackground }}
        className="absolute top-10 left-1/2 -translate-x-1/2 w-full max-w-3xl h-96 bg-[--color-brand-primary] rounded-full blur-[180px] opacity-10 pointer-events-none"
      />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-block mb-6 px-4 py-1.5 rounded-full border border-[--color-brand-primary]/30 bg-[--color-brand-primary]/5 backdrop-blur-sm"
          >
            <span className="text-sm font-semibold tracking-wider text-[--color-brand-primary] uppercase">Resultados Comprovados</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl font-bold text-white tracking-tighter mb-6"
          >
            Não acredite apenas em nós. <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-[--color-brand-primary]">Ouça nossos clientes.</span>
          </motion.h2>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {testimonials.map((testimonial, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-sm hover:bg-white/10 hover:border-[--color-brand-primary]/50 transition-all duration-300 relative group"
            >
              <Quote className="absolute top-8 right-8 w-10 h-10 text-[--color-brand-primary] opacity-20 group-hover:opacity-40 transition-opacity" />

              <div className="flex gap-1 mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-[--color-brand-primary] text-[--color-brand-primary]" />
                ))}
              </div>

              <p className="text-white/80 text-lg mb-8 leading-relaxed font-medium">
                &quot;{testimonial.content}&quot;
              </p>

              <div className="flex items-center gap-4 mt-auto">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[--color-brand-primary] to-black flex items-center justify-center border border-white/20 text-white font-bold text-xl">
                  {testimonial.name.charAt(0)}
                </div>
                <div>
                  <h4 className="text-white font-semibold">{testimonial.name}</h4>
                  <p className="text-white/50 text-sm">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
