"use client";

import React, { useRef, useEffect, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function ConversionWhite() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const authorRef = useRef<HTMLParagraphElement>(null);

  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    if (typeof window === "undefined") return;

    setIsDark(document.documentElement.classList.contains("dark"));

    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains("dark"));
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  useGSAP(() => {
    if (!containerRef.current || !textRef.current || !authorRef.current) return;

    // Ajusta as cores iniciais baseadas no tema
    const initialBg = isDark ? "transparent" : "var(--theme-darker)";
    const initialColor = isDark ? "#FFFFFF" : "var(--theme-white)";

    // TransiÃ§Ã£o de cores baseada no scroll
    const colorTween = gsap.fromTo(
      containerRef.current,
      { backgroundColor: initialBg, color: initialColor },
      {
        backgroundColor: "#FFFFFF",
        color: "#000000",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
          end: "top 30%",
          scrub: 1,
        },
      }
    );

    // AnimaÃ§Ã£o de revelaÃ§Ã£o de texto
    const textTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top center",
        toggleActions: "play none none reverse",
      },
    });

    textTimeline.fromTo(
      textRef.current,
      { opacity: 0, y: 50, scale: 0.95 },
      { opacity: 1, y: 0, scale: 1, duration: 1.5, ease: "power3.out" }
    ).fromTo(
      authorRef.current,
      { opacity: 0, x: -20 },
      { opacity: 1, x: 0, duration: 1, ease: "power2.out" },
      "-=0.5"
    );

    return () => {
      colorTween.scrollTrigger?.kill();
      textTimeline.scrollTrigger?.kill();
    };
  }, { scope: containerRef, dependencies: [isDark] });

  return (
    <section ref={containerRef} className="relative min-h-[100vh] py-32 px-4 md:px-12 flex flex-col items-center justify-center overflow-hidden transition-colors duration-1000">
      
      <div className="max-w-5xl mx-auto text-center relative z-10">
        <h2 ref={textRef} className="text-4xl md:text-6xl lg:text-8xl font-medium tracking-tight leading-[1.1] mb-12 text-current">
          &ldquo;My agency generated <br className="hidden md:block" />
          <span className="font-black">5x more revenue</span> in 3 months.&rdquo;
        </h2>
        
        <p ref={authorRef} className="text-xl md:text-2xl font-light italic text-current opacity-70">
          â€” Marcos S.
        </p>
      </div>

      {/* Sticky Bottom Right CTA */}
      <div className="fixed bottom-6 right-6 md:bottom-12 md:right-12 z-[100] group">
        <a 
          href="https://calendar.app.google/TJ85TG2Do9uLhC2K7" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="relative inline-flex items-center justify-center p-[2px] rounded-full overflow-hidden transition-transform duration-300 hover:scale-105 active:scale-95"
        >
          
          <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,transparent_0%,#2f6b65_50%,transparent_100%)]" />
          
          <span className="relative inline-flex items-center gap-3 h-full w-full px-6 py-4 md:px-8 md:py-5 bg-black text-white rounded-full font-bold uppercase tracking-widest text-sm md:text-base backdrop-blur-3xl group-hover:bg-[#111111] transition-colors">
            Claim my spot now
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </span>
          
          <div className="absolute inset-0 rounded-full bg-[#2f6b65] blur-xl opacity-40 animate-pulse -z-10" />
        </a>
      </div>
      
    </section>
  );
}

