"use client";

import { motion } from "framer-motion";
import { Phone, MapPin, Clock, Mail } from "lucide-react";
import { UnidadeData } from "@/lib/jj-moto-pecas-data";

interface ContactAreaProps {
  unidade: UnidadeData;
}

export default function ContactArea({ unidade }: ContactAreaProps) {
  const contacts = [
    {
      id: "address",
      title: "Endereço",
      value: unidade.endereco,
      icon: MapPin,
      color: "text-jj-blue bg-jj-blue/10 border-jj-blue/20",
      action: {
        label: "Traçar Rota",
        href: unidade.linkMaps,
        external: true,
      },
    },
    {
      id: "phone",
      title: "Telefones & WhatsApp",
      value: unidade.telefonesExtras && unidade.telefonesExtras.length > 0
        ? unidade.telefonesExtras.map(t => t.label ? `${t.label}: ${t.numero}` : t.numero).join('\n')
        : `${unidade.telefone}`,
      icon: Phone,
      color: "text-jj-red bg-jj-red/10 border-jj-red/20",
      action: {
        label: "Ligar agora",
        href: `tel:${unidade.telefone.replace(/\D/g, "")}`,
        external: false,
      },
    },
    {
      id: "hours",
      title: "Horário de Funcionamento",
      value: `Segunda a Sexta: ${unidade.horarioSemana} \n Sábado: ${unidade.horarioSabado}`,
      icon: Clock,
      color: "text-amber-500 bg-amber-500/10 border-amber-500/20",
    },
    {
      id: "email",
      title: "E-mail de Contato",
      value: unidade.email,
      icon: Mail,
      color: "text-purple-500 bg-purple-500/10 border-purple-500/20",
      action: {
        label: "Enviar e-mail",
        href: `mailto:${unidade.email}`,
        external: false,
      },
    },
  ];

  return (
    <section className="relative w-full py-16 px-6 flex flex-col items-center">
      <div className="w-full max-w-xl">
        {/* Cabeçalho */}
        <div className="flex flex-col items-center text-center mb-12">
          <span className="text-[10px] font-black uppercase tracking-[0.25em] text-jj-red mb-2">
            Fale Conosco
          </span>
          <h2 className="text-2xl md:text-3xl font-black tracking-tight text-jj-white uppercase">
            Canais de Atendimento
          </h2>
        </div>

        {/* Cards de Contato */}
        <div className="flex flex-col gap-6">
          {contacts.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                className="jj-glass rounded-2xl border border-white/5 p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all duration-300 hover:border-white/10"
              >
                <div className="flex items-start gap-4">
                  {/* Ícone */}
                  <div className={`p-3 rounded-xl border flex items-center justify-center shrink-0 ${item.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>

                  {/* Detalhes */}
                  <div className="flex flex-col">
                    <h3 className="text-sm font-black text-jj-white uppercase tracking-wider mb-1">
                      {item.title}
                    </h3>
                    <p className="text-jj-silver/70 text-xs font-light leading-relaxed whitespace-pre-line">
                      {item.value}
                    </p>
                  </div>
                </div>

                {/* Botão de Ação do Card */}
                {item.action && (
                  <div className="shrink-0 mt-2 sm:mt-0">
                    <a
                      href={item.action.href}
                      target={item.action.external ? "_blank" : undefined}
                      rel={item.action.external ? "noopener noreferrer" : undefined}
                    >
                      <button className="px-5 py-2.5 rounded-xl bg-white/5 border border-white/5 hover:bg-jj-red hover:border-jj-red/30 text-jj-white font-extrabold text-[11px] uppercase tracking-wider transition-all duration-300 w-full sm:w-auto shadow-md">
                        {item.action.label}
                      </button>
                    </a>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
