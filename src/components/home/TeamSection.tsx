"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const team = [
  {
    id: 1,
    name: "Donis Alfredo",
    role: "CEO & Growth Strategist",
    description: "Growth architect. Transforming business vision into measurable financial outcomes.",
    image: "/team/donis.png",
    index: "01",
  },
  {
    id: 2,
    name: "Pâmela Lavor",
    role: "CEO & Paid Media Director",
    description: "Co-leads the agency with a strategic focus on scalable client acquisition. Paid media specialist, translating analytics into high-performance campaigns.",
    image: "/team/pamela.png",
    index: "02",
  },
  {
    id: 3,
    name: "Matheus Sales",
    role: "Lead Full Stack Engineer",
    description: "Architects robust, high-performance web applications with clean code and surgical precision.",
    image: "/team/matheus.png",
    index: "03",
  },
  {
    id: 4,
    name: "Gabriel Henrique",
    role: "Lead UX/UI Designer",
    description: "Crafting premium, conversion-first user experiences where fine aesthetics meet business objectives.",
    image: "/team/gabriel.png",
    index: "04",
  },
  {
    id: 5,
    name: "Cecilia",
    role: "Digital Marketing Director",
    description: "Orchestrates digital marketing campaigns focusing on market positioning and brand authority. Combines creative design with analytics to drive conversions.",
    image: "/team/cecilia.png",
    index: "05",
  },
  {
    id: 6,
    name: "Joana",
    role: "Paid Media Analyst",
    description: "Performance-driven media buyer. Creates, monitors, and optimizes search & social ad campaigns to maximize ROI.",
    image: "/team/joana.png",
    index: "06",
    position: "object-top",
  },
  {
    id: 7,
    name: "Juliana",
    role: "GROWTH PARTNER | CANADA OFFICE",
    description: "Leads international expansion by partnering closely with clients. Anticipates digital bottlenecks to deliver advanced qualified lead generation strategies, and leverages data-driven growth marketing to accelerate business scaling.",
    image: "/team/juliana.jpg",
    index: "07",
  },
  {
    id: 8,
    name: "Anabella",
    role: "GROWTH PARTNER | US OFFICE",
    description: "Leads international expansion by partnering closely with clients. Anticipates digital bottlenecks to deliver advanced qualified lead generation strategies, and leverages data-driven growth marketing to accelerate business scaling.",
    image: "/team/anabella.png",
    index: "08",
  },
];

export default function TeamSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  // Mouse parallax no glow ambiente
  useEffect(() => {
    const section = sectionRef.current;
    const glow = glowRef.current;
    if (!section || !glow) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (window.matchMedia("(hover: none)").matches) return;
      const rect = section.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 60;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 40;
      gsap.to(glow, {
        x,
        y,
        duration: 1.8,
        ease: "power2.out",
      });
    };

    section.addEventListener("mousemove", handleMouseMove);
    return () => {
      section.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  useGSAP(() => {
    if (!sectionRef.current) return;

    // Configura a perspectiva no container dos cards para o efeito 3D
    gsap.set(cardsRef.current, { perspective: 1500, transformStyle: "preserve-3d" });

    // Título 3D reveal
    gsap.fromTo(
      titleRef.current,
      { opacity: 0, y: 80, rotationX: -40, z: -100, transformOrigin: "top center" },
      {
        opacity: 1,
        y: 0,
        rotationX: 0,
        z: 0,
        duration: 1.4,
        ease: "power3.out",
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      }
    );

    // Animação 3D dos Cards (Entrada + Scroll Imersivo)
    const cards = gsap.utils.toArray<HTMLElement>(".team-card");
    cards.forEach((card, i) => {
      gsap.set(card, { transformOrigin: "center center", transformStyle: "preserve-3d" });

      // 1. Reveal de opacidade e escala
      gsap.fromTo(
        card,
        { opacity: 0, scale: 0.85 },
        {
          opacity: 1,
          scale: 1,
          duration: 1.2,
          delay: (i % 3) * 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // 2. 3D Scroll Scrub
      const isEven = i % 2 === 0;
      gsap.fromTo(
        card,
        {
          y: 120,
          rotationX: -15,
          rotationY: isEven ? 8 : -8,
          z: -150
        },
        {
          y: -40,
          rotationX: 10,
          rotationY: isEven ? -4 : 4,
          z: 50,
          ease: "none",
          scrollTrigger: {
            trigger: card,
            start: "top 100%",
            end: "bottom 0%",
            scrub: 1.2,
          },
        }
      );

      // 3. Immersive Image Parallax
      const parallaxContainer = card.querySelector(".team-parallax-container");
      if (parallaxContainer) {
        gsap.fromTo(
          parallaxContainer,
          { yPercent: -15 },
          {
            yPercent: 0,
            ease: "none",
            scrollTrigger: {
              trigger: card,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.5,
            },
          }
        );
      }
    });
  }, { scope: sectionRef });

  return (
    <section
      data-theme="light"
      id="time"
      ref={sectionRef}
      className="relative bg-white overflow-hidden py-28 md:py-40 border-y border-[#0a1211]/10"
    >
      {/* Ambient glow dinâmico */}
      <div
        ref={glowRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[70vh] rounded-full pointer-events-none z-0"
        style={{
          background: "radial-gradient(ellipse at center, rgba(47,107,101,0.06) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      {/* Linha decorativa topo */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-transparent via-[#2f6b65]/60 to-transparent z-[2]" />

      <div className="relative z-10 max-w-7xl mx-auto px-5 md:px-10">

        {/* Header da seção */}
        <div ref={titleRef} className="mb-20 md:mb-28 text-center">
          <div className="inline-flex items-center gap-3 mb-6 px-5 py-2 rounded-full border border-[#2f6b65]/35 bg-[#2f6b65]/5 backdrop-blur-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-[#2f6b65] animate-pulse" />
            <span className="text-xs font-semibold tracking-[0.25em] text-[#2f6b65] uppercase">
              The minds behind the performance
            </span>
          </div>

          <h2 className="text-5xl md:text-7xl lg:text-8xl font-bold text-[#0a1211] tracking-tighter leading-none">
            Our{" "}
            <span
              className="text-transparent bg-clip-text"
              style={{
                backgroundImage: "linear-gradient(135deg, #0a1211 0%, #2f6b65 50%, #3b8780 100%)",
              }}
            >
              Team
            </span>
          </h2>

          <p className="mt-6 text-[#0a1211]/60 text-base md:text-lg max-w-lg mx-auto font-light tracking-wide">
            Growth strategists, designers, and engineers obsessed with performance.
          </p>

          <div className="mt-10 flex items-center justify-center gap-4">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-[#2f6b65]/50" />
            <div className="w-1.5 h-1.5 rounded-full bg-[#2f6b65]/50" />
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-[#2f6b65]/50" />
          </div>
        </div>

        {/* Grid de cards */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6"
        >
          {team.map((member, i) => (
            <div
              key={member.id}
              className={`team-card group relative overflow-hidden rounded-2xl border border-[#0a1211]/10 bg-[#0a1211]/5 backdrop-blur-sm cursor-pointer p-4
                transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]
                hover:border-[#2f6b65]/40 hover:bg-[#0a1211]/10
                ${i === 4 ? "sm:col-span-2 lg:col-span-1" : ""}
              `}
            >
              {/* Glow hover no card */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-[1]"
                style={{
                  background: "radial-gradient(ellipse at 50% 0%, rgba(47,107,101,0.12) 0%, transparent 60%)",
                }}
              />

              {/* Borda superior iluminada */}
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#2f6b65]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-[2]" />

              {/* Foto com Container Parallax arredondada e sem gradiente branco */}
              <div className="team-img-wrap relative w-full overflow-hidden rounded-xl" style={{ height: "290px" }}>
                <div className="team-parallax-container absolute top-0 left-0 w-full h-[120%]">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className={`object-cover transition-transform duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-105 ${member.position || "object-center"}`}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>

                {/* Rim light no hover */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                  style={{
                    background: "linear-gradient(135deg, rgba(47,107,101,0.12) 0%, transparent 50%)",
                  }}
                />

                {/* Índice do membro */}
                <div className="absolute top-4 left-4 z-[3]">
                  <span className="font-mono text-[10px] font-bold tracking-[0.2em] text-[#2f6b65] bg-white/90 backdrop-blur-md px-2 py-0.5 rounded shadow-sm">
                    {member.index}
                  </span>
                </div>
              </div>

              {/* Info */}
              <div className="relative z-[3] px-2 pt-5 pb-3">
                <div className="h-px w-8 bg-[#2f6b65] mb-4 transition-all duration-500 group-hover:w-16" />

                <h3 className="text-xl md:text-2xl font-bold text-[#0a1211] tracking-tight leading-tight">
                  {member.name}
                </h3>

                <p className="mt-1 text-[#2f6b65] text-sm font-semibold tracking-widest uppercase">
                  {member.role}
                </p>

                <p className="mt-3 text-[#0a1211]/65 text-sm leading-relaxed font-light line-clamp-3">
                  {member.description}
                </p>

                {/* CTA micro linha */}
                <div className="mt-5 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
                  <span className="text-[#2f6b65] text-xs tracking-wider uppercase font-semibold">View profile</span>
                  <svg width="14" height="10" viewBox="0 0 14 10" fill="none" className="text-[#2f6b65]">
                    <path d="M1 5h12M9 1l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Rodapé da seção */}
        <div className="mt-20 text-center">
          <p className="text-[#0a1211]/40 text-sm tracking-widest uppercase font-light">
            One squad. One vision. Radical performance.
          </p>
        </div>
      </div>

      {/* Linha decorativa base */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-t from-transparent via-[#2f6b65]/40 to-transparent z-[2]" />
    </section>
  );
}
