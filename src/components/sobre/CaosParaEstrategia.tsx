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
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-[#0a1211] mb-6 leading-tight">The Clothing Store.</h2>
          <p className="text-[#0a1211]/65 text-lg md:text-xl font-light leading-relaxed">
            It all started with a local business. But with the global pandemic, chaos ensued and the only way out was the internet. That&apos;s when paid traffic stopped being an option and became absolute survival.
          </p>
        </div>

        {/* Timeline item 2 */}
        <div className={cx("flex-shrink-0", isMobile ? "w-full" : "w-[80vw] md:w-[45vw]")}>
          <p className="text-[#2f6b65] text-sm md:text-base font-bold tracking-[0.2em] uppercase mb-4">The Turning Point</p>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-[#0a1211] mb-6 leading-tight">From frustrated <br/>to specialists.</h2>
          <p className="text-[#0a1211]/65 text-lg md:text-xl font-light leading-relaxed">
            We bought every course. Tested every strategy. Spent money we didn&apos;t have trying to crack the algorithm. And then, our methodology began to take shape, and the red charts finally turned green.
          </p>
        </div>

        {/* Timeline item 3 */}
        <div className={cx("flex-shrink-0", isMobile ? "w-full pb-10" : "w-[80vw] md:w-[45vw] pr-[10vw]")}>
          <p className="text-[#2f6b65] text-sm md:text-base font-bold tracking-[0.2em] uppercase mb-4">The Birth</p>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-[#0a1211] mb-6 leading-tight">The agency we wanted to hire.</h2>
          <p className="text-[#0a1211]/65 text-lg md:text-xl font-light leading-relaxed">
            Friends started asking for help. Results scaled rapidly. We realized the market was flooded with generic agencies, but completely empty of true strategic partners. We decided to become that partnership.
          </p>
        </div>

      </div>
    </section>
  );
}

