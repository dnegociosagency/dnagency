"use client";

import { motion } from "framer-motion";
import { Users, ShieldCheck, Tag, Zap, Wrench } from "lucide-react";

interface Feature {
  id: number;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}

const FEATURES: Feature[] = [
  {
    id: 1,
    title: "Atendimento Especializado",
    description: "Equipe apaixonada por motos que entende exatamente a sua necessidade.",
    icon: Users,
    color: "text-blue-500 bg-blue-500/10 border-blue-500/25",
  },
  {
    id: 2,
    title: "Produtos Originais",
    description: "Trabalhamos apenas com marcas consagradas no mercado automotivo mundial.",
    icon: ShieldCheck,
    color: "text-green-500 bg-green-500/10 border-green-500/25",
  },
  {
    id: 3,
    title: "Melhor Preço da Região",
    description: "Condições de pagamento facilitadas e preços altamente competitivos.",
    icon: Tag,
    color: "text-amber-500 bg-amber-500/10 border-amber-500/25",
  },
  {
    id: 4,
    title: "Entrega Rápida",
    description: "Logística eficiente para você não ficar com sua máquina parada na garagem.",
    icon: Zap,
    color: "text-jj-red bg-jj-red/10 border-jj-red/25",
  },
  {
    id: 5,
    title: "Oficina Parceira",
    description: "Indicação de mecânicos altamente técnicos para montagem segura das peças.",
    icon: Wrench,
    color: "text-purple-500 bg-purple-500/10 border-purple-500/25",
  },
];

export default function FeaturesSection() {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1] as const, // easeOutExpo
      },
    },
  };

  return (
    <section className="relative w-full py-16 px-6 flex flex-col items-center">
      <div className="w-full max-w-xl">
        {/* Cabeçalho */}
        <div className="flex flex-col items-center text-center mb-12">
          <span className="text-[10px] font-black uppercase tracking-[0.25em] text-jj-blue mb-2">
            Nossos Diferenciais
          </span>
          <h2 className="text-2xl md:text-3xl font-black tracking-tight text-jj-white uppercase">
            Por que escolher a JJ?
          </h2>
          <p className="text-jj-silver/50 text-xs mt-2 max-w-md font-light">
            Qualidade, confiança e foco em performance para rodar com tranquilidade.
          </p>
        </div>

        {/* Lista de Diferenciais */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="flex flex-col gap-4"
        >
          {FEATURES.map((feat) => {
            const Icon = feat.icon;
            return (
              <motion.div
                key={feat.id}
                variants={cardVariants}
                className="jj-glass rounded-2xl border border-white/5 p-5 flex items-start gap-4 transition-all duration-300 hover:border-white/15"
              >
                {/* Ícone */}
                <div className={`p-3 rounded-xl border flex items-center justify-center shrink-0 ${feat.color}`}>
                  <Icon className="w-5 h-5" />
                </div>

                {/* Texto */}
                <div className="flex flex-col">
                  <h3 className="text-sm font-black text-jj-white uppercase tracking-wider mb-1">
                    {feat.title}
                  </h3>
                  <p className="text-jj-silver/60 text-xs font-light leading-relaxed">
                    {feat.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
