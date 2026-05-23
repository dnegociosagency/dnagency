"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useState } from "react";

export default function BackgroundEffects() {
  const { scrollY } = useScroll();
  const yBg = useTransform(scrollY, [0, 1000], [0, -150]);
  const yNeonBlue = useTransform(scrollY, [0, 1000], [0, -50]);
  const yNeonRed = useTransform(scrollY, [0, 1000], [0, -100]);

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden bg-jj-black select-none pointer-events-none">
      {/* Imagem de Fundo (Motos Desfocadas com Efeito Parallax) */}
      <motion.div
        style={{
          y: yBg,
          x: mousePosition.x * 0.5,
          backgroundImage: "url('/images/jj-moto-pecas/background.png')",
        }}
        className="absolute inset-0 w-full h-[120%] bg-cover bg-center opacity-35 scale-105 filter blur-[2px]"
      />

      {/* Degradê Escuro de Profundidade */}
      <div className="absolute inset-0 bg-gradient-to-t from-jj-black via-jj-black/80 to-transparent" />
      <div className="absolute inset-0 bg-radial-gradient(circle at center, transparent 30%, rgba(10, 10, 10, 0.9) 100%)" />

      {/* Glow Neon Azul (Superior Esquerdo) */}
      <motion.div
        style={{
          y: yNeonBlue,
          x: mousePosition.x * 0.8,
        }}
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.45, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -top-[10%] -left-[10%] w-[60vw] h-[60vw] rounded-full bg-jj-blue/35 filter blur-[100px]"
      />

      {/* Glow Neon Vermelho (Inferior Direito) */}
      <motion.div
        style={{
          y: yNeonRed,
          x: mousePosition.x * -0.8,
        }}
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.25, 0.4, 0.25],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
        className="absolute -bottom-[10%] -right-[10%] w-[70vw] h-[70vw] rounded-full bg-jj-red/25 filter blur-[120px]"
      />

      {/* Luz Neon Linear de Alta Velocidade (Detalhe futurista) */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-jj-red to-transparent opacity-40 shadow-[0_0_10px_#E53935]" />
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-jj-blue to-transparent opacity-40 shadow-[0_0_10px_#1E2D86]" />

      {/* Partículas de Poeira Flutuantes */}
      <div className="absolute inset-0 opacity-20">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            initial={{
              x: ((i * 47 + 13) % 100) + "%",
              y: ((i * 59 + 29) % 100) + "%",
              scale: ((i * 17 + 5) % 50) / 100 + 0.5,
              opacity: ((i * 23 + 7) % 50) / 100 + 0.3,
            }}
            animate={{
              y: ["0%", "-30%", "0%"],
              x: ["0%", (((i * 31 + 11) % 10) - 5) + "%", "0%"],
            }}
            transition={{
              duration: 15 + ((i * 13 + 3) % 10),
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute w-1.5 h-1.5 rounded-full bg-jj-white filter blur-[0.5px]"
            style={{
              left: ((i * 67 + 41) % 100) + "%",
              top: ((i * 73 + 17) % 100) + "%",
            }}
          />
        ))}
      </div>
    </div>
  );
}
