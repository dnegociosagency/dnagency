"use client";

import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { useState, useEffect } from "react";
import { UnidadeData } from "@/lib/jj-moto-pecas-data";

interface FloatingWhatsappProps {
  unidade: UnidadeData;
}

export default function FloatingWhatsapp({ unidade }: FloatingWhatsappProps) {
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    // Exibe o tooltip após 4 segundos para engajar o usuário
    const timer = setTimeout(() => {
      setShowTooltip(true);
    }, 4000);

    // Oculta o tooltip automaticamente após 9 segundos
    const hideTimer = setTimeout(() => {
      setShowTooltip(false);
    }, 9000);

    return () => {
      clearTimeout(timer);
      clearTimeout(hideTimer);
    };
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
      {/* Tooltip de Engajamento */}
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, x: 20, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 10, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="jj-glass border border-white/10 rounded-2xl py-2 px-4 shadow-xl text-jj-white pointer-events-none hidden sm:block max-w-[200px]"
          >
            <div className="flex flex-col">
              <span className="text-[9px] font-black uppercase text-jj-red tracking-wider">
                Orçamento Online
              </span>
              <span className="text-[10px] text-jj-silver font-light mt-0.5 leading-tight">
                Fale com nossos especialistas agora!
              </span>
            </div>
            {/* Seta do tooltip */}
            <div className="absolute right-[-6px] top-1/2 -translate-y-1/2 w-3 h-3 rotate-45 bg-[rgba(10,10,10,0.65)] border-t border-r border-white/10" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Botão Flutuante Pulsante */}
      <motion.a
        href={`https://wa.me/${unidade.whatsapp}?text=${encodeURIComponent(unidade.mensagemWhatsapp)}`}
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="w-14 h-14 rounded-full bg-green-500 border border-green-400 hover:bg-green-600 text-jj-white flex items-center justify-center shadow-[0_4px_20px_rgba(34,197,94,0.4)] hover:shadow-[0_4px_30px_rgba(34,197,94,0.7)] cursor-pointer relative group transition-all duration-300"
        aria-label="Falar conosco no WhatsApp"
      >
        {/* Camadas de Animação de Pulsar */}
        <span className="absolute inset-0 rounded-full bg-green-500 opacity-70 animate-ping pointer-events-none" style={{ animationDuration: '2s' }} />
        
        <MessageCircle className="w-7 h-7 fill-jj-white transition-transform duration-300 group-hover:rotate-12" />
      </motion.a>
    </div>
  );
}
