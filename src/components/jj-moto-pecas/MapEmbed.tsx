"use client";

import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import { UnidadeData } from "@/lib/jj-moto-pecas-data";

interface MapEmbedProps {
  unidade: UnidadeData;
}

export default function MapEmbed({ unidade }: MapEmbedProps) {
  return (
    <section className="relative w-full py-16 px-6 flex flex-col items-center">
      <div className="w-full max-w-xl">
        {/* Cabeçalho */}
        <div className="flex flex-col items-center text-center mb-10">
          <span className="text-[10px] font-black uppercase tracking-[0.25em] text-jj-blue mb-2">
            Nossa Localização
          </span>
          <h2 className="text-2xl md:text-3xl font-black tracking-tight text-jj-white uppercase">
            Como nos encontrar
          </h2>
        </div>

        {/* Mapa Embed com Moldura Glassmorphism */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="jj-glass rounded-2xl border border-white/5 p-4 flex flex-col gap-4 shadow-2xl relative"
        >
          {/* Iframe do Google Maps */}
          <div className="w-full h-[280px] rounded-xl overflow-hidden border border-white/5 relative z-10">
            <iframe
              src={unidade.embedMaps}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={`Mapa de Localização JJ Moto Peças ${unidade.unidade}`}
              className="filter brightness-[0.8] contrast-[1.1] grayscale-[0.3]"
            />
          </div>

          {/* Dados do endereço e link CTA */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-2">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-lg bg-jj-blue/15 border border-jj-blue/20 text-jj-blue shrink-0">
                <MapPin className="w-4 h-4" />
              </div>
              <div className="flex flex-col">
                <span className="text-[11px] font-black uppercase tracking-wider text-jj-white">
                  Localização da Filial
                </span>
                <span className="text-jj-silver/50 text-[10px] font-light max-w-[280px] leading-tight mt-0.5">
                  {unidade.endereco}
                </span>
              </div>
            </div>

            <a
              href={unidade.linkMaps}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto"
            >
              <button className="w-full px-6 py-3 rounded-xl bg-jj-blue text-jj-white hover:bg-blue-800 transition-all duration-300 font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 border border-jj-blue border-t-white/10 shadow-[0_4px_15px_rgba(30,45,134,0.3)]">
                Abrir no GPS
              </button>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
