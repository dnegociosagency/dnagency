"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Auxiliar de junção de classes
function cx(...parts: Array<string | undefined | false | null>): string {
  return parts.filter(Boolean).join(' ');
}

export default function CaosParaEstrategia() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile || !scrollContainerRef.current) return;
    
    const scrollWidth = scrollContainerRef.current.scrollWidth - window.innerWidth;

    const ctx = gsap.context(() => {
      gsap.to(scrollContainerRef.current, {
        x: -scrollWidth,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          scrub: 1,
          end: () => `+=${scrollWidth}`,
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, [isMobile]);

  return (
    <section 
      data-theme="light"
      ref={containerRef} 
      className={cx(
        "relative bg-white border-y border-[#0a1211]/10 overflow-hidden flex items-center transition-colors duration-300",
        isMobile ? "min-h-screen py-16" : "h-screen"
      )}
    >
      {/* Background Grids */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(10,18,17,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(10,18,17,0.04)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>

      <div 
        ref={scrollContainerRef} 
        className={cx(
          "relative z-10 flex",
          isMobile ? "flex-col gap-16 px-6 w-full" : "flex-row items-center gap-20 px-[10vw]"
        )}
      >
        
        {/* Timeline item 1 */}
        <div className={cx("flex-shrink-0", isMobile ? "w-full" : "w-[80vw] md:w-[45vw]")}>
          <p className="text-[#2f6b65] text-sm md:text-base font-bold tracking-[0.2em] uppercase mb-4">2020</p>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-[#0a1211] mb-6 leading-tight">A Loja de Roupas.</h2>
          <p className="text-[#0a1211]/65 text-lg md:text-xl font-light leading-relaxed">
            Tudo começou com um negócio local. Mas, com a pandemia, veio o caos e a única saída era a internet. Foi aí que o tráfego pago deixou de ser uma opção e virou questão de sobrevivência.
          </p>
        </div>

        {/* Timeline item 2 */}
        <div className={cx("flex-shrink-0", isMobile ? "w-full" : "w-[80vw] md:w-[45vw]")}>
          <p className="text-[#2f6b65] text-sm md:text-base font-bold tracking-[0.2em] uppercase mb-4">A Virada</p>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-[#0a1211] mb-6 leading-tight">De frustrados <br/>a especialistas.</h2>
          <p className="text-[#0a1211]/65 text-lg md:text-xl font-light leading-relaxed">
            Compramos todos os cursos. Testamos todas as estratégias. Gastamos o dinheiro que não tínhamos tentando decifrar o algoritmo. E então nossa metodologia começou a tomar forma, e os gráficos vermelhos finalmente ficaram verdes.
          </p>
        </div>

        {/* Timeline item 3 */}
        <div className={cx("flex-shrink-0", isMobile ? "w-full pb-10" : "w-[80vw] md:w-[45vw] pr-[10vw]")}>
          <p className="text-[#2f6b65] text-sm md:text-base font-bold tracking-[0.2em] uppercase mb-4">O Nascimento</p>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-[#0a1211] mb-6 leading-tight">A agência que queríamos contratar.</h2>
          <p className="text-[#0a1211]/65 text-lg md:text-xl font-light leading-relaxed">
            Amigos começaram a pedir ajuda. Os resultados escalaram rápido. Percebemos que o mercado estava cheio de agências genéricas, mas vazio de verdadeiros parceiros estratégicos. Decidimos ser essa parceria.
          </p>
        </div>

      </div>
    </section>
  );
}

