"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function FinalCinematico() {
  return (
    <section className="relative min-h-screen bg-black flex flex-col items-center justify-center py-32 overflow-hidden">
      
      {/* Intense glow center */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] md:w-[800px] md:h-[800px] bg-gradient-to-tr from-[#2f6b65]/20 to-[--color-brand-primary]/20 opacity-30 blur-[100px] rounded-full pointer-events-none"></div>

      <div className="absolute inset-0 pointer-events-none opacity-20 bg-[url('https://upload.wikimedia.org/wikipedia/commons/7/76/1k_Dissolve_Noise_Texture.png')] mix-blend-overlay"></div>

      <div className="relative z-10 text-center max-w-4xl px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="mb-16"
        >
          {/* Mock Logo or text representing D' Negócios */}
          <h2 className="text-6xl md:text-8xl lg:text-9xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-white/50 tracking-tighter">
            D' Negócios
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <h3 className="text-2xl md:text-4xl font-light text-white mb-4">
            Você não precisa de mais uma agência.
          </h3>
          <p className="text-lg md:text-2xl text-white/50 font-light mb-16">
            Precisa de alguém que entenda a sua realidade e ajude a construir o seu futuro.
          </p>

          <Link href="/contato">
            <button className="group relative inline-flex h-16 items-center justify-center overflow-hidden rounded-full bg-[--color-brand-primary] px-12 font-medium text-white transition-all duration-300 hover:bg-[#3b8780] hover:scale-105 hover:shadow-[0_0_40px_rgba(47,107,101,0.5)]">
              <span className="mr-2 text-lg">Escalar meu negócio</span>
              <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-2" />
            </button>
          </Link>
        </motion.div>
      </div>

    </section>
  );
}
