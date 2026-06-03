"use client";

import React, { useRef, useEffect, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function cx(...parts: Array<string | undefined | false | null>): string {
  return parts.filter(Boolean).join(' ');
}

export default function HeroDashboard() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mockupRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  const [isMobile, setIsMobile] = useState(false);
  const [isDark, setIsDark] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    if (typeof window === "undefined") return;

    setIsDark(document.documentElement.classList.contains("dark"));

    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains("dark"));
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  useGSAP(() => {
    if (!isMounted || isMobile || !containerRef.current || !mockupRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=2000",
        scrub: 1,
        pin: true,
      },
    });

    gsap.set(textRef.current, { opacity: 0, y: 50 });
    gsap.set(mockupRef.current, { scale: 0.8, rotateX: 15, y: 100 });

    // Step 1: Bring mockup closer and straighten
    tl.to(mockupRef.current, {
      scale: 1,
      y: 0,
      rotateX: 0,
      duration: 2.5,
      ease: "power2.inOut",
    }, 0);

    // Step 2: Fade in side text
    tl.to(textRef.current, {
      opacity: 1,
      y: 0,
      duration: 1.5,
      ease: "power2.out",
    }, 1.5);

    // Step 3: Zoom into the mockup
    tl.to(mockupRef.current, {
      opacity: 0,
      scale: 3, 
      duration: 2.5,
      ease: "power2.in",
    }, 3.5);

  }, { scope: containerRef, dependencies: [isMobile, isMounted] });

  // Render simplificado no Mobile ou antes de montar
  if (!isMounted || isMobile) {
    return (
      <section className="relative w-full min-h-[80vh] bg-brand-dark flex flex-col items-center justify-center py-16 px-6 overflow-hidden transition-colors duration-300">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(47,107,101,0.08)_0%,transparent_70%)]" />
        
        <div className="text-center z-10 max-w-xl w-full flex flex-col items-center">
          <span className="px-4 py-1.5 rounded-full border border-[--color-brand-primary]/30 bg-[--color-brand-primary]/10 text-[--color-brand-primary] text-xs font-semibold tracking-widest mb-6 uppercase">
            Academy
          </span>
          <h1 className="text-4xl font-black text-brand-white tracking-tighter mb-6 leading-tight">
            NOT JUST A COURSE.<br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-white via-[--color-brand-primary] to-[#3b8780]">
              IT&apos;S AN ECOSYSTEM.
            </span>
          </h1>
          <p className="text-brand-white/60 text-base font-light tracking-wide mb-10 max-w-md">
            Learn the exact methodologies used by top-tier creative agencies to scale businesses predictably.
          </p>
          
          {/* Mockup de Dashboard 2D UI */}
          <div className="relative w-full max-w-[320px] aspect-[16/10] bg-brand-darker border border-brand-white/10 rounded-xl shadow-2xl p-3 flex flex-col transition-colors duration-300">
             <div className="flex gap-1.5 mb-3">
               <div className="w-2.5 h-2.5 rounded-full bg-red-500/80"></div>
               <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80"></div>
               <div className="w-2.5 h-2.5 rounded-full bg-green-500/80"></div>
             </div>
             <div className="flex-1 rounded border border-brand-white/5 bg-brand-dark/50 flex flex-col items-center justify-center p-3 text-center">
                <span className="text-[--color-brand-primary] font-mono text-xs font-bold mb-1">DN_ACADEMY_V1</span>
                <span className="text-brand-white/30 font-mono text-[9px]">Scroll to discover modules</span>
             </div>
          </div>
        </div>
      </section>
    );
  }

  // Render do Desktop (com UI 2D premium e ScrollTrigger)
  return (
    <section ref={containerRef} className="relative w-full h-screen bg-brand-dark overflow-hidden flex flex-col items-center justify-center perspective-[2000px] transition-colors duration-300">
      
      {/* Absolute Background Lighting */}
      <div 
        className={cx(
          "absolute inset-0 transition-opacity duration-500 pointer-events-none",
          isDark 
            ? "bg-[radial-gradient(circle_at_center,rgba(47,107,101,0.12)_0%,rgba(4,8,7,1)_70%)]" 
            : "bg-[radial-gradient(circle_at_center,rgba(47,107,101,0.08)_0%,rgba(240,244,244,1)_70%)]"
        )} 
      />

      {/* Intro Hero Text */}
      <div className="absolute top-20 text-center z-20 w-full px-4 pointer-events-none">
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-brand-white tracking-tighter mb-4 drop-shadow-2xl">
          NOT JUST A COURSE.<br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-white via-[--color-brand-primary] to-[#3b8780]">
            IT&apos;S AN ECOSYSTEM.
          </span>
        </h1>
        <p className="text-brand-white/50 text-lg md:text-xl font-light tracking-wide drop-shadow-lg">
          Scroll to discover the future of your business.
        </p>
      </div>

      {/* Side Text that appears later */}
      <div ref={textRef} className="absolute left-10 md:left-20 top-1/2 -translate-y-1/2 z-20 max-w-sm pointer-events-none">
        <h2 className="text-3xl md:text-5xl font-bold text-brand-white leading-tight drop-shadow-xl">
          Performance controlled<br/>
          <span className="text-[--color-brand-primary]">pixel by pixel.</span>
        </h2>
      </div>

      {/* CSS Dashboard Mockup replaces 3D MacBook */}
      <div className="absolute inset-0 z-10 w-full h-full pointer-events-none flex items-center justify-center" style={{ perspective: "1500px" }}>
         <div ref={mockupRef} className="w-[800px] h-[500px] bg-brand-darker border border-brand-white/10 rounded-2xl shadow-[0_30px_100px_-20px_rgba(47,107,101,0.4)] p-4 flex flex-col relative overflow-hidden backdrop-blur-xl">
             {/* Window Controls */}
             <div className="flex gap-2 mb-4">
               <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
               <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
               <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
             </div>
             {/* Mock Content */}
             <div className="flex-1 rounded-xl border border-brand-white/5 bg-brand-dark/80 flex overflow-hidden">
                {/* Sidebar */}
                <div className="w-48 border-r border-brand-white/5 p-4 flex flex-col gap-3">
                   <div className="h-6 rounded bg-brand-white/10 w-3/4 mb-4"></div>
                   <div className="h-4 rounded bg-brand-white/5 w-full"></div>
                   <div className="h-4 rounded bg-brand-white/5 w-5/6"></div>
                   <div className="h-4 rounded bg-brand-white/5 w-4/6"></div>
                </div>
                {/* Main Area */}
                <div className="flex-1 p-6 flex flex-col gap-4">
                   <div className="flex justify-between items-center mb-4">
                      <div className="h-8 rounded bg-brand-white/10 w-1/3"></div>
                      <div className="h-8 rounded bg-[--color-brand-primary]/20 text-[--color-brand-primary] border border-[--color-brand-primary]/30 w-24 flex items-center justify-center text-[10px] font-bold tracking-widest uppercase">Active</div>
                   </div>
                   {/* Charts Area */}
                   <div className="flex gap-4 mb-4">
                      <div className="flex-1 h-32 rounded-xl bg-gradient-to-tr from-[--color-brand-primary]/20 to-brand-white/5 border border-brand-white/5"></div>
                      <div className="flex-1 h-32 rounded-xl bg-gradient-to-tr from-[--color-brand-primary]/10 to-brand-white/5 border border-brand-white/5"></div>
                      <div className="flex-1 h-32 rounded-xl bg-gradient-to-tr from-[--color-brand-primary]/5 to-brand-white/5 border border-brand-white/5"></div>
                   </div>
                   {/* Grid Area */}
                   <div className="flex-1 rounded-xl border border-brand-white/5 bg-brand-white/5 p-4 flex flex-col gap-2">
                      <div className="h-10 rounded border border-brand-white/5 bg-brand-dark w-full"></div>
                      <div className="h-10 rounded border border-brand-white/5 bg-brand-dark w-full opacity-70"></div>
                      <div className="h-10 rounded border border-brand-white/5 bg-brand-dark w-full opacity-40"></div>
                   </div>
                </div>
             </div>
             
             {/* Glow Overlay */}
             <div className="absolute inset-0 bg-gradient-to-tr from-[--color-brand-primary]/5 to-transparent pointer-events-none" />
         </div>
      </div>

    </section>
  );
}
