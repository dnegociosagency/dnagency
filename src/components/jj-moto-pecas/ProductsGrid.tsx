"use client";

import { motion, useMotionValue, useTransform } from "framer-motion";
import Image from "next/image";
import React, { useRef } from "react";
import { MessageCircle } from "lucide-react";
import { UnidadeData } from "@/lib/jj-moto-pecas-data";

interface Product {
  id: string;
  name: string;
  category: string;
  image: string;
  description: string;
  tag: string;
}

const PRODUCTS: Product[] = [
  {
    id: "helmet",
    name: "Capacetes Premium",
    category: "Proteção & Estilo",
    image: "/images/jj-moto-pecas/capacete.png",
    description: "Modelos esportivos em fibra de carbono com aerodinâmica e isolamento termoacústico premium.",
    tag: "Carbon Fiber"
  },
  {
    id: "exhaust",
    name: "Escapamentos Esportivos",
    category: "Performance & Ronco",
    image: "/images/jj-moto-pecas/escapamento.png",
    description: "Sistemas completos de titânio de alta vazão para ganho de potência e som incomparável.",
    tag: "Alta Performance"
  },
  {
    id: "tire",
    name: "Pneus Slick e Esportivos",
    category: "Aderência & Curva",
    image: "/images/jj-moto-pecas/pneu.png",
    description: "Compostos de pista homologados para rua com aderência extrema em todas as inclinações.",
    tag: "Racing Grip"
  },
  {
    id: "oil",
    name: "Lubrificantes Sintéticos",
    category: "Manutenção & Proteção",
    image: "/images/jj-moto-pecas/lubrificante.png",
    description: "Óleos de alta performance que garantem lubrificação ideal em rotações e temperaturas extremas.",
    tag: "Estabilidade"
  },
  {
    id: "accessories",
    name: "Acessórios Anodizados",
    category: "Customização & Ergonomia",
    image: "/images/jj-moto-pecas/acessorios.png",
    description: "Manetes articuladas, retrovisores asa de fibra de carbono e peças usinadas em CNC.",
    tag: "Custom CNC"
  },
  {
    id: "parts",
    name: "Peças Esportivas de Motor",
    category: "Força & Relação",
    image: "/images/jj-moto-pecas/pecas-motor.png",
    description: "Kits de transmissão dourada, coroas leves e peças internas forjadas para ganho mecânico.",
    tag: "Performance Total"
  }
];

interface ProductsGridProps {
  unidade: UnidadeData;
}

export default function ProductsGrid({ unidade }: ProductsGridProps) {
  return (
    <section className="relative w-full py-16 px-6 flex flex-col items-center">
      <div className="w-full max-w-5xl">
        {/* Título da Seção */}
        <div className="flex flex-col items-center text-center mb-12">
          <span className="text-[10px] font-black uppercase tracking-[0.25em] text-jj-red mb-2">
            Vitrine Exclusiva
          </span>
          <h2 className="text-2xl md:text-3xl font-black tracking-tight text-jj-white uppercase">
            Peças e Acessórios Premium
          </h2>
          <p className="text-jj-silver/50 text-xs md:text-sm mt-2 max-w-md font-light">
            Selecione uma categoria abaixo para solicitar orçamento instantâneo com nossos especialistas.
          </p>
        </div>

        {/* Grid de Cards 3D */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {PRODUCTS.map((product, idx) => (
            <ProductCard key={product.id} product={product} idx={idx} unidade={unidade} />
          ))}
        </div>
      </div>
    </section>
  );
}

interface ProductCardProps {
  product: Product;
  idx: number;
  unidade: UnidadeData;
}

function ProductCard({ product, idx, unidade }: ProductCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Mapeia o movimento do mouse para rotação 3D (máximo de 12 graus de rotação)
  const rotateX = useTransform(y, [-150, 150], [12, -12]);
  const rotateY = useTransform(x, [-150, 150], [-12, 12]);

  // Efeito de iluminação dinâmica (reflexo no vidro)
  const highlightX = useTransform(x, [-150, 150], ["0%", "100%"]);
  const highlightY = useTransform(y, [-150, 150], ["0%", "100%"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    // Calcula o deslocamento do mouse em relação ao centro do card
    const mouseX = e.clientX - rect.left - width / 2;
    const mouseY = e.clientY - rect.top - height / 2;
    
    x.set(mouseX);
    y.set(mouseY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  // Mensagem específica de orçamento de produto para WhatsApp
  const wppText = `Olá! Gostaria de consultar a disponibilidade e valores para a categoria de "${product.name}" na unidade de ${unidade.unidade}.`;
  const wppUrl = `https://wa.me/${unidade.whatsapp}?text=${encodeURIComponent(wppText)}`;

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: idx * 0.1 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className="relative jj-glass rounded-2xl border border-white/5 p-6 flex flex-col justify-between group cursor-pointer overflow-hidden transition-all duration-300 hover:border-jj-red/40 shadow-lg hover:shadow-[0_15px_35px_rgba(229,57,53,0.1)] h-[440px]"
    >
      {/* Luz Reflexo Dinâmico (Efeito 3D Holográfico) */}
      <motion.div
        style={{
          background: "radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 60%)",
          left: highlightX,
          top: highlightY,
          transform: "translate(-50%, -50%)",
        }}
        className="absolute w-60 h-60 rounded-full pointer-events-none z-10"
      />

      {/* Conteúdo Superior */}
      <div>
        <div className="flex justify-between items-start mb-4">
          <span className="text-[9px] font-black tracking-widest uppercase text-jj-red bg-jj-red/10 border border-jj-red/20 px-2.5 py-1 rounded-md">
            {product.tag}
          </span>
          <span className="text-[10px] text-jj-silver/40 font-semibold tracking-wider uppercase">
            {product.category}
          </span>
        </div>

        <h3 className="text-lg font-black text-jj-white tracking-wider uppercase mb-2 group-hover:text-jj-red transition-colors duration-300">
          {product.name}
        </h3>
        <p className="text-jj-silver/60 text-xs font-light leading-relaxed mb-4">
          {product.description}
        </p>
      </div>

      {/* Área da Imagem 3D do Produto */}
      <div className="relative w-full h-44 my-4 flex items-center justify-center" style={{ transform: "translateZ(30px)" }}>
        {/* Glow atrás do Produto */}
        <div className="absolute w-28 h-28 rounded-full bg-jj-blue/15 filter blur-2xl group-hover:bg-jj-red/15 transition-colors duration-500" />
        
        <Image
          src={product.image}
          alt={product.name}
          width={180}
          height={180}
          className="object-contain drop-shadow-[0_15px_25px_rgba(0,0,0,0.6)] group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-500 ease-out"
        />
      </div>

      {/* CTA de Orçamento */}
      <div className="mt-4 pt-4 border-t border-white/5 z-20">
        <a
          href={wppUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full"
        >
          <button className="w-full py-3 rounded-xl bg-white/5 group-hover:bg-jj-red text-jj-white transition-all duration-300 font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 border border-white/5 group-hover:border-jj-red/30">
            <MessageCircle className="w-4 h-4 fill-current" />
            Orçamento Rápido
          </button>
        </a>
      </div>
    </motion.div>
  );
}
