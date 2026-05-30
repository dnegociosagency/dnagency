"use client";

import React from "react";
import {
  Layers,
  Smile,
  Wrench,
  Home,
  Dumbbell,
  Car,
  PaintBucket,
  Van,
  Container,
} from "lucide-react";

// ─────────────────────────────────────────────────────────────────────────────
// 👉 EDITE AQUI: adicione/remova clientes
//    - name:  nome da empresa exibido no card
//    - icon:  ícone Lucide (importe acima e referencie aqui)
//    - color: cor de destaque do ícone (opcional, padrão = brand-primary)
// ─────────────────────────────────────────────────────────────────────────────
const CLIENTS = [
  { name: "Deck Piscinas", Icon: Layers },
  { name: "Dentista para Todos", Icon: Smile },
  { name: "JJ Moto Peças", Icon: Wrench },
  { name: "Connect Imóveis", Icon: Home },
  { name: "Power Fit", Icon: Dumbbell },
  { name: "PrimeCar Veiculos", Icon: Car },
  { name: "Montarte Inox", Icon: Container },
  { name: "XStream Plumbers & Heating", Icon: Van },
  { name: "Serpa Painting", Icon: PaintBucket },
  // 👉 Adicione mais clientes aqui:
  // { name: "Cliente X", Icon: Star },
];

export default function LogoTicker() {
  // Duplica o array para criar o loop infinito sem cortes
  const items = [...CLIENTS, ...CLIENTS, ...CLIENTS];

  return (
    <section data-theme="light" className="bg-white border-y border-[#0a1211]/10 py-16 overflow-hidden">

      {/* Cabeçalho */}
      <div className="max-w-7xl mx-auto px-6 mb-12 text-center">
        <h2 className="text-2xl md:text-3xl font-black text-[#0a1211] mb-2 tracking-tight">
          Brands That Trust{" "}
          <span className="text-[#2f6b65]">Us</span>
        </h2>
        <p className="text-[#0a1211]/55 text-xs tracking-widest uppercase font-semibold">
          Accelerating growth through conversion-first design
        </p>
      </div>

      {/* Carrossel */}
      <div className="relative w-full flex overflow-hidden select-none">

        {/* Fade lateral esquerdo */}
        <div className="absolute left-0 top-0 bottom-0 w-32 z-10 bg-gradient-to-r from-white to-transparent pointer-events-none" />
        {/* Fade lateral direito */}
        <div className="absolute right-0 top-0 bottom-0 w-32 z-10 bg-gradient-to-l from-white to-transparent pointer-events-none" />

        {/* Faixa animada */}
        <div className="flex animate-scroll w-max gap-6 pr-6">
          {items.map((client, index) => (
            <div
              key={index}
              className="flex items-center gap-3 px-6 py-3 rounded-full border border-[#0a1211]/10 bg-[#0a1211]/5 hover:border-[#2f6b65]/40 hover:bg-[#2f6b65]/5 transition-all duration-300 cursor-default shrink-0"
            >
              <client.Icon
                size={18}
                className="text-[#2f6b65] shrink-0"
                strokeWidth={1.8}
              />
              <span className="text-[#0a1211]/70 hover:text-[#0a1211] transition-colors duration-300 text-sm font-semibold tracking-wide whitespace-nowrap">
                {client.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
