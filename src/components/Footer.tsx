"use client";

import * as React from "react";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { ArrowUp, MessageCircle } from "lucide-react";

// SVG inline de ícones sociais (lucide nessa versão não os inclui)
const IconInstagram = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);
const IconLinkedin = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" />
  </svg>
);
const IconYoutube = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.96-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" /><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" />
  </svg>
);


if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// ─── Estilos injetados ─────────────────────────────────────────────────────

const STYLES = `
@keyframes dn-footer-breathe {
  0%   { transform: translate(-50%, -50%) scale(1);   opacity: 0.5; }
  100% { transform: translate(-50%, -50%) scale(1.15); opacity: 0.9; }
}
@keyframes dn-footer-marquee {
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); }
}
@keyframes dn-heartbeat {
  0%, 100%  { transform: scale(1);   }
  15%, 45%  { transform: scale(1.3); }
  30%       { transform: scale(1);   }
}

.dn-footer-breathe  { animation: dn-footer-breathe  8s ease-in-out infinite alternate; }
.dn-footer-marquee  { animation: dn-footer-marquee 35s linear infinite; }
.dn-heartbeat       { animation: dn-heartbeat       2s cubic-bezier(.25,1,.5,1) infinite; }

.dn-footer-grid {
  background-size: 56px 56px;
  background-image:
    linear-gradient(to right, rgba(47,107,101,.08) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(47,107,101,.08) 1px, transparent 1px);
  mask-image: linear-gradient(to bottom, transparent, black 25%, black 75%, transparent);
  -webkit-mask-image: linear-gradient(to bottom, transparent, black 25%, black 75%, transparent);
}

.dn-glass-pill {
  background: linear-gradient(145deg, rgba(255,255,255,.04) 0%, rgba(255,255,255,.015) 100%);
  border: 1px solid rgba(255,255,255,.08);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  box-shadow: 0 8px 24px -8px rgba(0,0,0,.5), inset 0 1px 1px rgba(255,255,255,.06);
  transition: all .35s cubic-bezier(.16,1,.3,1);
}
.dn-glass-pill:hover {
  background: linear-gradient(145deg, rgba(47,107,101,.18) 0%, rgba(47,107,101,.06) 100%);
  border-color: rgba(47,107,101,.45);
  box-shadow: 0 16px 36px -10px rgba(0,0,0,.6), 0 0 18px -4px rgba(47,107,101,.25), inset 0 1px 1px rgba(255,255,255,.1);
  color: #fff;
}

.dn-giant-text {
  font-size: clamp(6rem, 24vw, 22vw);
  line-height: .78;
  font-weight: 900;
  letter-spacing: -.04em;
  color: transparent;
  -webkit-text-stroke: 1px rgba(47,107,101,.12);
  background: linear-gradient(180deg, rgba(47,107,101,.18) 0%, transparent 65%);
  -webkit-background-clip: text;
  background-clip: text;
  user-select: none;
  pointer-events: none;
  max-width: 100%;
  overflow: hidden;
}

.dn-text-glow {
  background: linear-gradient(180deg, #ffffff 0%, rgba(255,255,255,.55) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  filter: drop-shadow(0 0 22px rgba(47,107,101,.35));
}
`;

// ─── Magnetic Button ────────────────────────────────────────────────────────

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type MagneticProps = Record<string, any> & { children?: React.ReactNode };

function MagneticButton({ className, children, as: Tag = "button", ...props }: MagneticProps) {
  const localRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = localRef.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      const onMove = (e: MouseEvent) => {
        const r = el.getBoundingClientRect();
        const x = e.clientX - r.left - r.width / 2;
        const y = e.clientY - r.top - r.height / 2;
        gsap.to(el, { x: x * 0.38, y: y * 0.38, rotationX: -y * 0.12, rotationY: x * 0.12, scale: 1.06, ease: "power2.out", duration: 0.38 });
      };
      const onLeave = () => {
        gsap.to(el, { x: 0, y: 0, rotationX: 0, rotationY: 0, scale: 1, ease: "elastic.out(1,.35)", duration: 1.1 });
      };
      el.addEventListener("mousemove", onMove as EventListener);
      el.addEventListener("mouseleave", onLeave);
      return () => { el.removeEventListener("mousemove", onMove as EventListener); el.removeEventListener("mouseleave", onLeave); };
    }, el);
    return () => ctx.revert();
  }, []);

  return React.createElement(
    Tag,
    { ref: localRef, className: cn("cursor-pointer", className), ...props },
    children
  );
}

// ─── Marquee ────────────────────────────────────────────────────────────────

function MarqueeItem() {
  return (
    <div className="flex items-center space-x-10 px-6 text-white/35 font-bold tracking-[.28em] text-[11px] uppercase whitespace-nowrap">
      <span>Tráfego Pago</span>
      <span className="text-[--color-brand-primary]">✦</span>
      <span>Google Ads</span>
      <span className="text-[--color-brand-primary]">✦</span>
      <span>Meta Ads</span>
      <span className="text-[--color-brand-primary]">✦</span>
      <span>Funis de Conversão</span>
      <span className="text-[--color-brand-primary]">✦</span>
      <span>Performance</span>
      <span className="text-[--color-brand-primary]">✦</span>
      <span>EUA & Canadá</span>
      <span className="text-[--color-brand-primary]">✦</span>
    </div>
  );
}

// ─── Links ──────────────────────────────────────────────────────────────────

const NAV_LINKS = [
  {
    title: "Serviços",
    items: [
      { label: "Tráfego Pago", href: "#servicos" },
      { label: "SEO & Orgânico", href: "#servicos" },
      { label: "Funis de Venda", href: "#servicos" },
      { label: "Web Design", href: "#servicos" },
    ],
  },
  {
    title: "Empresa",
    items: [
      { label: "Como Funciona", href: "#processo" },
      { label: "Mercados", href: "#global" },
      { label: "Blog", href: "/blog" },
      { label: "Contato", href: "https://wa.me/558899222054" },
    ],
  },
  {
    title: "Legal",
    items: [
      { label: "Política de Privacidade", href: "#" },
      { label: "Termos de Uso", href: "#" },
    ],
  },
];

const SOCIAL: { icon: React.ComponentType; href: string; label: string }[] = [
  { icon: IconInstagram, href: "https://www.instagram.com/agenciadnegocios/", label: "Instagram" },
  { icon: IconYoutube, href: "#", label: "YouTube" },
];

// ─── Main ───────────────────────────────────────────────────────────────────

export default function Footer() {
  const pathname = usePathname();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const giantRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);

  const [isJJMoto, setIsJJMoto] = React.useState(() => {
    return pathname.startsWith("/jj-moto-pecas") || pathname.includes("jjmoto");
  });

  React.useEffect(() => {
    const hostname = typeof window !== "undefined" ? window.location.hostname : "";
    if (pathname.startsWith("/jj-moto-pecas") || pathname.includes("jjmoto") || hostname.includes("jjmoto") || hostname.includes("jj-moto-pecas")) {
      setIsJJMoto(true);
    } else {
      setIsJJMoto(false);
    }
  }, [pathname]);

  const isPlatformRoute = pathname.startsWith("/dashboard") || pathname.startsWith("/login") || pathname.startsWith("/register") || isJJMoto;

  useEffect(() => {
    if (typeof window === "undefined" || !wrapperRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        giantRef.current,
        { y: "12vh", opacity: 0, scale: 0.85 },
        {
          y: "0vh", opacity: 1, scale: 1, ease: "power1.out",
          scrollTrigger: { trigger: wrapperRef.current, start: "top 85%", end: "bottom bottom", scrub: 1.2 }
        }
      );
      gsap.fromTo(
        [headingRef.current, linksRef.current],
        { y: 60, opacity: 0 },
        {
          y: 0, opacity: 1, stagger: 0.18, ease: "power3.out",
          scrollTrigger: { trigger: wrapperRef.current, start: "top 55%", end: "center center", scrub: 1 }
        }
      );
    }, wrapperRef);
    return () => ctx.revert();
  }, [isPlatformRoute]);

  if (isPlatformRoute) {
    return null;
  }

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />

      {/* Wrapper com clip-path para o efeito curtain */}
      <div
        ref={wrapperRef}
        className="relative w-full"
        style={{ clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)" }}
      >
        <footer className="relative w-full overflow-hidden bg-[--color-brand-darker] text-white">

          {/* Grid decorativo */}
          <div className="dn-footer-grid absolute inset-0 z-0 pointer-events-none" />

          {/* Aurora */}
          <div
            className="dn-footer-breathe absolute left-1/2 top-[40%] h-[50vh] w-[65vw] -translate-x-1/2 -translate-y-1/2 rounded-[50%] pointer-events-none z-0"
            style={{ background: "radial-gradient(circle, rgba(47,107,101,.22) 0%, rgba(47,107,101,.06) 50%, transparent 75%)", filter: "blur(70px)" }}
          />

          {/* Texto gigante de fundo */}
          <div
            ref={giantRef}
            className="dn-giant-text absolute -bottom-[4vh] left-1/2 -translate-x-1/2 whitespace-nowrap z-0"
          >
            DN
          </div>

          {/* Marquee diagonal */}
          <div className="relative w-full overflow-hidden border-b border-white/[.06] bg-black/20 backdrop-blur-sm py-4 -rotate-1 shadow-xl z-10">
            <div className="flex w-max dn-footer-marquee">
              <MarqueeItem />
              <MarqueeItem />
            </div>
          </div>

          {/* Conteúdo central */}
          <div className="relative z-10 mx-auto max-w-7xl px-6 pt-20 pb-8 md:px-12">

            {/* Título */}
            <h2
              ref={headingRef}
              className="dn-text-glow text-5xl font-black tracking-tighter md:text-8xl text-center mb-4"
            >
              Agência DN
            </h2>
            <p className="text-center text-white/45 text-base md:text-lg font-light mb-14 tracking-wide">
              Performance Digital · EUA & Canadá
            </p>

            {/* Links + Redes */}
            <div ref={linksRef} className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-2 md:grid-cols-4 border-t border-white/[.07] pt-14 mb-16">
              {NAV_LINKS.map((col) => (
                <div key={col.title}>
                  <h4 className="mb-4 text-[11px] font-black uppercase tracking-[.25em] text-[--color-brand-primary]">
                    {col.title}
                  </h4>
                  <ul className="flex flex-col gap-3">
                    {col.items.map((item) => (
                      <li key={item.label}>
                        <Link
                          href={item.href}
                          className="text-sm text-white/50 hover:text-white transition-colors duration-200"
                        >
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}

              {/* Coluna Redes Sociais */}
              <div>
                <h4 className="mb-4 text-[11px] font-black uppercase tracking-[.25em] text-[--color-brand-primary]">
                  Redes
                </h4>
                <div className="flex flex-col gap-3">
                  {SOCIAL.map(({ icon: Icon, href, label }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors duration-200"
                    >
                      <Icon />
                      {label}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom bar */}
            <div className="flex flex-col items-center justify-between gap-5 border-t border-white/[.06] pt-8 md:flex-row">

              {/* Copyright */}
              <p className="text-[11px] font-semibold uppercase tracking-widest text-white/30 order-2 md:order-1">
                © {new Date().getFullYear()} Agência DN · Todos os direitos reservados
              </p>

              {/* Badge "feito com ❤" */}
              <div className="dn-glass-pill flex items-center gap-2 rounded-full px-5 py-2.5 order-1 md:order-2">
                <span className="text-[10px] font-bold uppercase tracking-widest text-white/40">Desenvolvido por</span>
                <span className="text-sm font-black text-white">DN</span>
                <span className="dn-heartbeat text-[--color-brand-primary] text-base leading-none">♥</span>
              </div>

              {/* CTA WhatsApp + Voltar ao topo */}
              <div className="flex items-center gap-3 order-3">
                <MagneticButton
                  as="a"
                  href="https://wa.me/558899222054"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="dn-glass-pill flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-bold text-white/70"
                >
                  <MessageCircle className="h-4 w-4 text-[--color-brand-primary]" />
                  WhatsApp
                </MagneticButton>

                <MagneticButton
                  as="button"
                  onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                  className="dn-glass-pill flex h-10 w-10 items-center justify-center rounded-full text-white/50 hover:text-white group"
                >
                  <ArrowUp className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-1" />
                </MagneticButton>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
