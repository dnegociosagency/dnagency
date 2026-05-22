"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Phone, MapPin, MessageCircle } from "lucide-react";
import { UnidadeData } from "@/lib/jj-moto-pecas-data";

interface HeroSectionProps {
  unidade: UnidadeData;
}

export default function HeroSection({ unidade }: HeroSectionProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1] as const, // easeOutExpo
      },
    },
  };

  const glowVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 1.5,
        ease: "easeOut" as const,
      },
    },
  };

  return (
    <section className="relative w-full min-h-[90vh] flex flex-col items-center justify-center pt-24 pb-12 px-6 overflow-hidden">
      {/* Glow Effect atrás da Logo */}
      <motion.div
        variants={glowVariants}
        initial="hidden"
        animate="visible"
        className="absolute w-[280px] h-[280px] rounded-full bg-jj-blue/30 filter blur-[45px] z-0 pointer-events-none"
      />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-xl flex flex-col items-center text-center z-10"
      >
        {/* Logo da Marca */}
        <motion.div
          variants={itemVariants}
          className="relative w-56 h-32 mb-6 drop-shadow-[0_0_20px_rgba(30,45,134,0.3)]"
        >
          <Image
            src="/logos/logo_jj_moto_pecas.png"
            alt="JJ Moto Peças Logo"
            fill
            className="object-contain"
            priority
          />
        </motion.div>

        {/* Nome da Unidade */}
        <motion.div
          variants={itemVariants}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-jj-red/10 border border-jj-red/35 mb-4 backdrop-blur-md"
        >
          <span className="w-2 h-2 rounded-full bg-jj-red animate-pulse" />
          <span className="text-[11px] font-black uppercase tracking-[0.2em] text-jj-white">
            {unidade.unidade}
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          variants={itemVariants}
          className="text-3xl md:text-4xl font-black text-jj-white tracking-tight uppercase leading-none mb-4"
        >
          Peças, acessórios e <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-jj-red via-jj-white to-jj-blue select-none">
            performance
          </span>{" "}
          para sua moto.
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          variants={itemVariants}
          className="text-jj-silver/70 text-sm md:text-base font-light mb-8 max-w-md leading-relaxed"
        >
          {unidade.slug === "parauapebas"
            ? "A maior e mais completa loja de moto peças de Parauapebas. Encontre tudo para sua máquina com qualidade premium."
            : unidade.slug === "maraba"
            ? "Sua moto em alto nível na região de Marabá. Peças esportivas, originais e oficina parceira especializada."
            : "A referência em peças e acessórios para motocicletas em Canaã dos Carajás. Performance e confiança para rodar seguro."}
        </motion.p>

        {/* Botões CTA Premium */}
        <motion.div
          variants={itemVariants}
          className="w-full flex flex-col gap-3.5 sm:flex-row sm:justify-center"
        >
          {/* Botão WhatsApp */}
          <a
            href={`https://wa.me/${unidade.whatsapp}?text=${encodeURIComponent(
              unidade.mensagemWhatsapp
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 sm:flex-initial"
          >
            <button className="w-full sm:px-8 py-4 rounded-xl font-extrabold text-sm uppercase tracking-wider bg-jj-red text-jj-white hover:bg-red-600 transition-all duration-300 shadow-[0_4px_20px_rgba(229,57,53,0.3)] hover:shadow-[0_4px_30px_rgba(229,57,53,0.6)] flex items-center justify-center gap-2 border border-jj-red border-t-jj-white/20">
              <MessageCircle className="w-4 h-4 fill-jj-white" />
              WhatsApp
            </button>
          </a>

          {/* Botão Ligar */}
          <a href={`tel:${unidade.telefone.replace(/\D/g, "")}`} className="flex-1 sm:flex-initial">
            <button className="w-full sm:px-8 py-4 rounded-xl font-extrabold text-sm uppercase tracking-wider jj-glass text-jj-white jj-glass-hover flex items-center justify-center gap-2">
              <Phone className="w-4 h-4 text-jj-red" />
              Ligar Agora
            </button>
          </a>

          {/* Botão Localização */}
          <a
            href={unidade.linkMaps}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 sm:flex-initial"
          >
            <button className="w-full sm:px-8 py-4 rounded-xl font-extrabold text-sm uppercase tracking-wider jj-glass text-jj-white jj-glass-hover flex items-center justify-center gap-2">
              <MapPin className="w-4 h-4 text-jj-blue" />
              Como Chegar
            </button>
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
