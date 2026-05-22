"use client";

import { motion } from "framer-motion";
import React from "react";
import { MessageCircle, Shield, Flame, Circle, Droplet, Wrench, Settings } from "lucide-react";
import { UnidadeData } from "@/lib/jj-moto-pecas-data";

interface Category {
  id: string;
  name: string;
  icon: React.ComponentType<any>;
  description: string;
  color: "blue" | "red";
}

const CATEGORIES: Category[] = [
  {
    id: "helmet",
    name: "Capacetes",
    icon: Shield,
    description: "Modelos esportivos e proteção premium",
    color: "blue"
  },
  {
    id: "exhaust",
    name: "Escapamentos",
    icon: Flame,
    description: "Sistemas completos e performance",
    color: "red"
  },
  {
    id: "tire",
    name: "Pneus",
    icon: Circle,
    description: "Aderência máxima para sua segurança",
    color: "blue"
  },
  {
    id: "oil",
    name: "Lubrificantes",
    icon: Droplet,
    description: "Óleos sintéticos e fluidos especiais",
    color: "red"
  },
  {
    id: "accessories",
    name: "Acessórios",
    icon: Wrench,
    description: "Customização e acabamento em CNC",
    color: "blue"
  },
  {
    id: "parts",
    name: "Peças de Motor",
    icon: Settings,
    description: "Pistões, juntas e relação de alta performance",
    color: "red"
  }
];

interface ProductsGridProps {
  unidade: UnidadeData;
}

export default function ProductsGrid({ unidade }: ProductsGridProps) {
  return (
    <section className="relative w-full py-12 px-6 flex flex-col items-center">
      <div className="w-full max-w-4xl">
        {/* Título da Seção */}
        <div className="flex flex-col items-center text-center mb-10">
          <span className="text-[10px] font-black uppercase tracking-[0.25em] text-jj-red mb-2">
            Categorias
          </span>
          <h2 className="text-2xl md:text-3xl font-black tracking-tight text-jj-white uppercase">
            Peças e Acessórios
          </h2>
          <p className="text-jj-silver/50 text-xs md:text-sm mt-2 max-w-md font-light">
            Selecione uma das opções abaixo para falar sobre as peças diretamente no WhatsApp da unidade.
          </p>
        </div>

        {/* Grid de Botões Interativos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {CATEGORIES.map((category, idx) => {
            const Icon = category.icon;
            const wppText = `Olá! Gostaria de consultar a disponibilidade e valores para a categoria de "${category.name}" na unidade de ${unidade.unidade}.`;
            const wppUrl = `https://wa.me/${unidade.whatsapp}?text=${encodeURIComponent(wppText)}`;
            
            return (
              <motion.a
                key={category.id}
                href={wppUrl}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`relative w-full p-5 rounded-2xl jj-glass border border-white/5 flex items-center justify-between group overflow-hidden transition-all duration-300 ${
                  category.color === "red" 
                    ? "hover:border-jj-red/40 hover:shadow-[0_0_20px_rgba(229,57,53,0.15)]" 
                    : "hover:border-jj-blue/40 hover:shadow-[0_0_20px_rgba(30,45,134,0.15)]"
                }`}
              >
                {/* Efeito Glow no fundo ao passar o mouse */}
                <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 ${
                  category.color === "red" ? "bg-jj-red" : "bg-jj-blue"
                }`} />

                {/* Lado Esquerdo: Ícone + Info */}
                <div className="flex items-center gap-4 z-10">
                  <div className={`p-3 rounded-xl transition-colors duration-300 ${
                    category.color === "red" 
                      ? "bg-jj-red/10 text-jj-red group-hover:bg-jj-red group-hover:text-jj-white" 
                      : "bg-jj-blue/10 text-jj-blue group-hover:bg-jj-blue group-hover:text-jj-white"
                  }`}>
                    <Icon className="w-6 h-6 stroke-[1.5]" />
                  </div>
                  
                  <div className="flex flex-col text-left">
                    <span className="text-sm font-black text-jj-white uppercase tracking-wider group-hover:text-jj-white transition-colors duration-300">
                      {category.name}
                    </span>
                    <span className="text-[11px] text-jj-silver/45 font-light mt-0.5">
                      {category.description}
                    </span>
                  </div>
                </div>

                {/* Lado Direito: Ícone de Ação */}
                <div className="flex items-center justify-center p-2 rounded-full border border-white/5 bg-white/5 text-jj-silver/45 group-hover:text-jj-white group-hover:bg-white/10 transition-all duration-300 z-10">
                  <MessageCircle className="w-4 h-4 fill-current" />
                </div>
              </motion.a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
