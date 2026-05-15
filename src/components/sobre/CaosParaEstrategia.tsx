"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function CaosParaEstrategia() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!scrollContainerRef.current) return;
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
  }, []);

  return (
    <section ref={containerRef} className="relative h-screen bg-[#020505] overflow-hidden flex items-center">
      {/* Background Grids */}
      <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

      <div ref={scrollContainerRef} className="flex h-full items-center gap-20 px-[10vw] relative z-10">
        
        {/* Timeline item 1 */}
        <div className="w-[80vw] md:w-[45vw] flex-shrink-0">
          <p className="text-[--color-brand-primary] text-sm md:text-base font-bold tracking-[0.2em] uppercase mb-4">2020</p>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">A Loja de Roupas.</h2>
          <p className="text-white/50 text-lg md:text-xl font-light leading-relaxed">
            Tudo começou com um negócio local. Mas com a pandemia global, o caos se instalou e a única saída era a internet. Foi aí que o tráfego pago deixou de ser uma opção e virou sobrevivência absoluta.
          </p>
        </div>

        {/* Timeline item 2 */}
        <div className="w-[80vw] md:w-[45vw] flex-shrink-0">
          <p className="text-[--color-brand-primary] text-sm md:text-base font-bold tracking-[0.2em] uppercase mb-4">A Virada</p>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">De frustrados a <br/>especialistas.</h2>
          <p className="text-white/50 text-lg md:text-xl font-light leading-relaxed">
            Compramos todos os cursos. Testamos todas as estratégias. Gastamos o dinheiro que não tínhamos tentando entender o algoritmo. E então, o método começou a se formar e os gráficos vermelhos ficaram verdes.
          </p>
        </div>

        {/* Timeline item 3 */}
        <div className="w-[80vw] md:w-[45vw] flex-shrink-0 pr-[10vw]">
          <p className="text-[--color-brand-primary] text-sm md:text-base font-bold tracking-[0.2em] uppercase mb-4">O Nascimento</p>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">A agência que queríamos contratar.</h2>
          <p className="text-white/50 text-lg md:text-xl font-light leading-relaxed">
            Amigos começaram a pedir ajuda. Os resultados escalaram absurdamente. Percebemos que o mercado estava cheio de agências genéricas, mas completamente vazio de parceiros estratégicos reais. Decidimos ser essa parceria.
          </p>
        </div>

      </div>
    </section>
  );
}
