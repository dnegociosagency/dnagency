"use client";

import React, { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ─── Modal de Captura de Leads ─────────────────────────────────────────
function EbookModal({ onClose }: { onClose: () => void }) {
  const [form, setForm] = useState({ name: "", email: "", phone: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const overlayRef = useRef<HTMLDivElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("/api/ebook", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        throw new Error("Falha no servidor");
      }

      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  // Fecha ao clicar no overlay
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === overlayRef.current) onClose();
  };

  return (
    <div
      ref={overlayRef}
      onClick={handleOverlayClick}
      className="fixed inset-0 z-[9999] flex items-center justify-center px-4"
      style={{ background: "rgba(2, 6, 5, 0.85)", backdropFilter: "blur(12px)" }}
    >
      <div
        className="relative w-full max-w-md rounded-2xl border border-white/10 overflow-hidden"
        style={{
          background: "linear-gradient(145deg, #0c1f1d 0%, #071412 100%)",
          boxShadow: "0 0 60px rgba(47,107,101,0.25), 0 24px 60px rgba(0,0,0,0.6)",
        }}
      >
        {/* Glow topo */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px"
          style={{ background: "linear-gradient(90deg, transparent, #2f6b65, transparent)" }}
        />

        {/* Botão fechar */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-all z-10"
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M1 1l10 10M11 1L1 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>

        <div className="p-8 md:p-10">
          {status === "success" ? (
            /* ── Tela de sucesso ── */
            <div className="text-center py-6 flex flex-col items-center gap-4">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center mb-2"
                style={{ background: "rgba(47,107,101,0.2)", border: "1px solid rgba(47,107,101,0.5)" }}
              >
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#2f6b65" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white tracking-tight">E-book Enviado!</h3>
              <p className="text-white/60 text-sm leading-relaxed">
                Verifique sua caixa de entrada — o <strong className="text-white/80">Manual do Crescimento Exponencial</strong> está a caminho.
              </p>
              <button
                onClick={onClose}
                className="mt-4 px-6 py-2.5 rounded-full bg-[#2f6b65] text-white text-sm font-semibold hover:bg-[#3b8780] transition-colors"
              >
                Fechar
              </button>
            </div>
          ) : (
            /* ── Formulário ── */
            <>
              {/* Header */}
              <div className="mb-8">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#2f6b65]/30 bg-[#2f6b65]/10 mb-4">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#2f6b65] animate-pulse" />
                  <span className="text-[#2f6b65] text-xs font-semibold tracking-widest uppercase">Material Gratuito</span>
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-white tracking-tight leading-snug">
                  Receba o e-book <br />
                  <span
                    className="text-transparent bg-clip-text"
                    style={{ backgroundImage: "linear-gradient(135deg, #2f6b65, #3b8780)" }}
                  >
                    no seu e-mail
                  </span>
                </h3>
                <p className="mt-2 text-white/50 text-sm">
                  Preencha os dados abaixo e enviaremos o PDF completo.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                {/* Nome */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-white/60 text-xs font-semibold tracking-wider uppercase">Nome completo</label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Seu nome"
                    className="w-full px-4 py-3 rounded-xl text-sm text-white placeholder-white/25 outline-none transition-all"
                    style={{
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(255,255,255,0.08)",
                    }}
                    onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(47,107,101,0.5)")}
                    onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)")}
                  />
                </div>

                {/* E-mail */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-white/60 text-xs font-semibold tracking-wider uppercase">E-mail</label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    placeholder="seu@email.com"
                    className="w-full px-4 py-3 rounded-xl text-sm text-white placeholder-white/25 outline-none transition-all"
                    style={{
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(255,255,255,0.08)",
                    }}
                    onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(47,107,101,0.5)")}
                    onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)")}
                  />
                </div>

                {/* Telefone */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-white/60 text-xs font-semibold tracking-wider uppercase">Telefone / WhatsApp</label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="(00) 00000-0000"
                    className="w-full px-4 py-3 rounded-xl text-sm text-white placeholder-white/25 outline-none transition-all"
                    style={{
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(255,255,255,0.08)",
                    }}
                    onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(47,107,101,0.5)")}
                    onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)")}
                  />
                </div>

                {status === "error" && (
                  <div className="flex items-center gap-3 px-4 py-3 rounded-xl border border-red-500/30 bg-red-500/10">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
                    </svg>
                    <p className="text-red-400 text-sm">Erro ao enviar. Verifique sua conexão e tente novamente.</p>
                  </div>
                )}

                {/* Botão submit */}
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="relative mt-2 w-full py-4 rounded-xl font-bold text-sm tracking-wide text-white overflow-hidden transition-all hover:scale-[1.02] hover:shadow-[0_0_24px_rgba(47,107,101,0.4)] disabled:opacity-60 disabled:cursor-not-allowed"
                  style={{ background: "linear-gradient(135deg, #2f6b65 0%, #3b8780 100%)" }}
                >
                  {status === "loading" ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
                      </svg>
                      Enviando...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      Quero meu e-book grátis
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                        <polyline points="7 10 12 15 17 10" />
                        <line x1="12" x2="12" y1="15" y2="3" />
                      </svg>
                    </span>
                  )}
                </button>

                <p className="text-white/25 text-xs text-center mt-1">
                  Sem spam. Seus dados estão seguros.
                </p>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Seção principal ────────────────────────────────────────────────────
export default function EbookSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [modalOpen, setModalOpen] = useState(false);

  useGSAP(() => {
    if (!containerRef.current) return;

    gsap.fromTo(
      ".ebook-content > *",
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
        },
      }
    );

    gsap.fromTo(
      ".ebook-visual",
      { opacity: 0, scale: 0.9, rotateY: 15 },
      {
        opacity: 1,
        scale: 1,
        rotateY: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
        },
      }
    );

    gsap.to(".ebook-visual", {
      y: -15,
      duration: 3,
      yoyo: true,
      repeat: -1,
      ease: "sine.inOut",
    });
  }, { scope: containerRef });

  return (
    <>
      {/* Modal */}
      {modalOpen && <EbookModal onClose={() => setModalOpen(false)} />}

      <section ref={containerRef} className="py-24 md:py-32 bg-[--color-brand-darker] relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-[--color-brand-primary] opacity-[0.03] blur-[150px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-1/3 h-1/2 bg-[--color-brand-primary] opacity-[0.02] blur-[100px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">

            {/* Content */}
            <div className="ebook-content flex flex-col gap-6 md:pr-10">
              <div className="inline-block px-4 py-2 rounded-full border border-[--color-brand-primary]/30 bg-[--color-brand-primary]/10 backdrop-blur-md w-fit">
                <span className="text-[--color-brand-primary] font-bold text-xs md:text-sm uppercase tracking-widest flex items-center gap-2">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" x2="12" y1="15" y2="3" />
                  </svg>
                  Material Gratuito
                </span>
              </div>

              <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
                Acesse o mapa para o crescimento exponencial.
              </h2>

              <p className="text-lg text-white/70 leading-relaxed font-light">
                Baixe nosso e-book gratuito e descubra os bastidores das estratégias de growth e performance que utilizamos para escalar empresas e dominar o mercado digital.
              </p>

              <ul className="flex flex-col gap-4 mt-2 text-white/80 font-light">
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-[--color-brand-primary] shadow-[0_0_8px_rgba(47,107,101,0.8)]" />
                  <span className="opacity-90">Estratégias avançadas de tráfego pago e aquisição</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-[--color-brand-primary] shadow-[0_0_8px_rgba(47,107,101,0.8)]" />
                  <span className="opacity-90">Como estruturar funis de altíssima conversão</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-[--color-brand-primary] shadow-[0_0_8px_rgba(47,107,101,0.8)]" />
                  <span className="opacity-90">O segredo do design e branding focados em vendas</span>
                </li>
              </ul>

              <div className="pt-6">
                {/* Botão agora abre o modal */}
                <button
                  onClick={() => setModalOpen(true)}
                  className="group relative inline-flex items-center gap-3 px-8 py-4 bg-[--color-brand-primary] text-white font-bold rounded-full overflow-hidden transition-all hover:scale-105 hover:shadow-[0_0_20px_rgba(47,107,101,0.4)]"
                >
                  <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                  <span className="relative z-10">Baixar E-book Grátis</span>
                  <svg className="relative z-10 group-hover:translate-x-1 transition-transform" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" x2="12" y1="15" y2="3" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Visual/Mockup */}
            <div className="ebook-visual perspective-[1000px] flex justify-center mt-8 md:mt-0">
              <div
                className="relative w-full max-w-[340px] md:max-w-[380px] aspect-[1/1.4] rounded-r-2xl rounded-l-md bg-gradient-to-br from-[--color-brand-primary] to-[#122c2a] shadow-[20px_20px_40px_rgba(0,0,0,0.5)] overflow-hidden border border-white/10 flex flex-col justify-between p-10 transform-gpu transition-all duration-700"
                style={{ transformStyle: "preserve-3d", transform: "rotateY(-5deg)" }}
              >
                <div className="absolute left-0 top-0 w-8 h-full bg-gradient-to-r from-black/60 to-transparent z-10" />
                <div className="absolute left-[8px] top-0 w-[1px] h-full bg-white/20 z-20" />
                <div className="absolute right-0 top-0 w-1/2 h-full bg-gradient-to-l from-black/40 to-transparent z-10 pointer-events-none" />

                <div className="relative z-20 flex flex-col items-start gap-4">
                  <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center backdrop-blur-md border border-white/20 shadow-lg">
                    <span className="text-white font-black text-xl tracking-tighter">DN</span>
                  </div>
                  <div className="text-white/60 text-xs font-mono tracking-widest mt-8 uppercase">Agência DN</div>
                  <h3 className="text-3xl font-bold text-white leading-tight mt-2 drop-shadow-lg">
                    O Manual do <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/60">
                      Crescimento Exponencial
                    </span>
                  </h3>
                </div>

                <div className="relative z-20 w-full flex justify-between items-end pb-2">
                  <div className="text-white/50 text-[10px] tracking-widest uppercase">Estratégias de Elite</div>
                  <div className="w-8 h-[2px] bg-white/30 rounded-full" />
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
