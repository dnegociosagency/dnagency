"use client";

import React, { useRef, useEffect, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CheckCircle2, ShieldCheck, Zap } from "lucide-react";
import MagneticButton from "@/components/ui/MagneticButton";

gsap.registerPlugin(ScrollTrigger);

// Auxiliar de junÃ§Ã£o de classes
function cx(...parts: Array<string | undefined | false | null>): string {
  return parts.filter(Boolean).join(' ');
}

export default function AcademyCheckout() {
  const containerRef = useRef<HTMLDivElement>(null);
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

  useGSAP(() => {
    if (!containerRef.current) return;

    gsap.fromTo(
      ".checkout-card",
      { opacity: 0, y: 100, scale: 0.95 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
        },
      }
    );
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative py-32 px-4 md:px-8 bg-brand-darker overflow-hidden flex flex-col items-center justify-center border-t border-brand-white/5 transition-colors duration-300">
      
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] md:w-[40vw] md:h-[40vw] bg-[#2f6b65] opacity-[0.06] dark:opacity-10 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-4xl mx-auto w-full relative z-10 text-center mb-16">
        <h2 className="text-4xl md:text-6xl font-black text-brand-white mb-6 tracking-tight">
          Your agency at the <span className="text-[--color-brand-primary]">next level.</span>
        </h2>
        <p className="text-xl text-brand-white/60 font-light max-w-2xl mx-auto">
          Get immediate access to all modules, validated processes, and the complete scaling ecosystem.
        </p>
      </div>

      <div className="checkout-card relative w-full max-w-5xl bg-brand-dark border border-brand-white/10 rounded-[2rem] md:rounded-[3rem] p-8 md:p-16 flex flex-col lg:flex-row gap-12 lg:gap-20 items-center shadow-[0_30px_100px_rgba(0,0,0,0.08)] dark:shadow-[0_30px_100px_rgba(0,0,0,0.5)] transition-all duration-300">
        
        {/* Animated Inner Border Glow */}
        <div className="absolute inset-0 rounded-[2rem] md:rounded-[3rem] border border-transparent [background:linear-gradient(45deg,transparent,rgba(47,107,101,0.3),transparent)_border-box] [mask:linear-gradient(#fff_0_0)_padding-box,linear-gradient(#fff_0_0)] mask-composite-exclude pointer-events-none" />

        {/* Benefits List */}
        <div className="w-full lg:w-1/2 flex flex-col gap-6 relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[--color-brand-primary]/10 border border-[--color-brand-primary]/30 rounded-full w-fit mb-2">
            <Zap className="w-4 h-4 text-[--color-brand-primary] animate-pulse" />
            <span className="text-sm font-bold text-[--color-brand-primary] tracking-widest uppercase">
              Special Offer
            </span>
          </div>
          
          <h3 className="text-3xl font-bold text-brand-white tracking-tight">What you get today:</h3>
          
          <ul className="flex flex-col gap-5 mt-2">
            {[
              { text: "Access to all 6 Modules", value: "$1,997" },
              { text: "Documented processes (SOPs)", value: "$997" },
              { text: "Sales Scripts & Templates", value: "$497" },
              { text: "VIP Networking Community", value: "$997" },
              { text: "Technical & strategic support", value: "Bonus" },
            ].map((item, i) => (
              <li key={i} className="flex items-center justify-between gap-4 text-brand-white/80 group">
                <div className="flex items-start gap-4">
                  <CheckCircle2 className="w-6 h-6 text-[--color-brand-primary] shrink-0" />
                  <span className="text-lg font-light group-hover:text-brand-white transition-colors">{item.text}</span>
                </div>
                <span className="text-sm font-medium text-brand-white/30 line-through hidden md:block">{item.value}</span>
              </li>
            ))}
          </ul>

          <div className="mt-4 p-5 rounded-2xl bg-brand-white/5 border border-brand-white/10 flex items-center justify-between transition-colors">
            <span className="text-brand-white/60 font-medium">Total Value of Items:</span>
            <span className="text-xl font-bold text-brand-white/30 line-through">$4,488.00</span>
          </div>
        </div>

        {/* Pricing / CTA */}
        <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-8 md:p-12 bg-gradient-to-b from-brand-dark to-brand-darker dark:from-[#0a1514] dark:to-black border border-[--color-brand-primary]/30 rounded-3xl relative z-10 backdrop-blur-xl shadow-[0_0_60px_rgba(47,107,101,0.06)] dark:shadow-[0_0_60px_rgba(47,107,101,0.15)] mt-4 lg:mt-0 transition-all duration-300">
          
          {/* Urgency Badge */}
          <div className="absolute -top-4 bg-brand-dark border border-red-500/50 text-red-500 dark:text-red-400 px-5 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase flex items-center gap-2 z-20 shadow-[0_0_15px_rgba(239,68,68,0.15)] transition-colors">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse shadow-[0_0_8px_rgba(239,68,68,0.8)]"></span>
            Only 3 spots left
          </div>

          <p className="text-brand-white/50 text-sm font-medium tracking-widest uppercase mb-2 mt-4">Full Annual Access</p>
          
          {/* Price Anchoring */}
          <div className="flex items-center gap-3 mb-2">
            <span className="text-brand-white/40 line-through text-lg">Was $2,497</span>
            <span className="bg-[--color-brand-primary]/20 text-[--color-brand-primary] text-xs font-bold px-2 py-1 rounded-md">-60% OFF</span>
          </div>

          {/* Installment Pricing */}
          <div className="flex flex-col items-center text-brand-white mb-2 relative">
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-medium text-[--color-brand-primary]">12x</span>
              <span className="text-4xl font-medium text-brand-white/50 ml-1">$</span>
              <span className="text-7xl md:text-8xl font-black tracking-tighter text-brand-white">19</span>
              <span className="text-3xl font-black text-brand-white">.70</span>
            </div>
            <span className="text-sm text-brand-white/40 mt-1">or $197/year at checkout</span>
          </div>
          
          {/* Value comparison */}
          <p className="text-[--color-brand-primary]/80 text-sm font-medium mb-8 bg-[--color-brand-primary]/10 px-4 py-2 rounded-full">
            Less than $0.60 a day
          </p>

          <a href="https://calendar.app.google/TJ85TG2Do9uLhC2K7" target="_blank" rel="noopener noreferrer" className="w-full relative group block">
            <div className="absolute -inset-1 bg-gradient-to-r from-[--color-brand-primary] to-[#1a4a44] rounded-xl blur opacity-40 group-hover:opacity-80 transition duration-500"></div>
            <MagneticButton className="relative w-full py-5 bg-[--color-brand-primary] hover:bg-[#3b8780] text-white font-bold text-lg rounded-xl shadow-[0_0_30px_rgba(47,107,101,0.5)] transition-all overflow-hidden flex items-center justify-center">
              Secure My Spot Now
            </MagneticButton>
          </a>

          {/* Guarantees */}
          <div className="flex flex-col items-center gap-3 mt-8 pt-6 border-t border-brand-white/5 w-full">
            <div className="flex items-center gap-2 text-brand-white/70 text-sm font-medium">
              <ShieldCheck className="w-5 h-5 text-green-500 dark:text-green-400" />
              <span>7-Day Unconditional Guarantee</span>
            </div>
            <div className="flex items-center gap-2 text-brand-white/40 text-xs text-center">
              <span>Immediate access & 100% secure payment</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

