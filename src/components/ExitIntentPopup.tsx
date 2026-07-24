"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight, CheckCircle, Loader2, ChartBar, Target, TrendingUp } from "lucide-react";

// ─── Constantes ─────────────────────────────────────────────────────────────
const STORAGE_KEY = "dn_exit_popup_shown";
const DELAY_MS = 30_000; // fallback: mostrar depois de 30s de inatividade

// ─── Itens do diagnóstico ────────────────────────────────────────────────────
const BENEFITS = [
  { icon: ChartBar, label: "Análise do seu marketing atual" },
  { icon: Target,   label: "Identificação de oportunidades de crescimento" },
  { icon: TrendingUp, label: "Plano de ação personalizado (grátis)" },
];

// ─── Variantes de animação ───────────────────────────────────────────────────
const backdropVariants = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3 } },
  exit:    { opacity: 0, transition: { duration: 0.25 } },
};

const panelVariants = {
  hidden:  { opacity: 0, scale: 0.9, y: 30 },
  visible: { opacity: 1, scale: 1,   y: 0,  transition: { type: "spring", stiffness: 280, damping: 26 } },
  exit:    { opacity: 0, scale: 0.92, y: 20, transition: { duration: 0.22 } },
};

// ─── Tipos ───────────────────────────────────────────────────────────────────
type FormState = "idle" | "loading" | "success" | "error";

export default function ExitIntentPopup() {
  const [isVisible, setIsVisible] = useState(false);
  const [name,  setName]  = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [formState, setFormState] = useState<FormState>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const hasTriggered = useRef(false);

  // ── Lógica de trigger ──────────────────────────────────────────────────────
  const triggerPopup = useCallback(() => {
    if (hasTriggered.current) return;
    // Não exibir se já foi mostrado nessa sessão
    if (sessionStorage.getItem(STORAGE_KEY)) return;
    hasTriggered.current = true;
    setIsVisible(true);
    sessionStorage.setItem(STORAGE_KEY, "1");
  }, []);

  useEffect(() => {
    // Exit-intent via movimento do mouse saindo pelo topo
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 5) triggerPopup();
    };

    // Fallback: mostrar após DELAY_MS sem interação
    const fallbackTimer = setTimeout(triggerPopup, DELAY_MS);

    document.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      document.removeEventListener("mouseleave", handleMouseLeave);
      clearTimeout(fallbackTimer);
    };
  }, [triggerPopup]);

  // ── Fechar com ESC ─────────────────────────────────────────────────────────
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsVisible(false);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  // ── Submit ──────────────────────────────────────────────────────────────────
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/diagnostico", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Erro ao enviar. Tente novamente.");
      }

      setFormState("success");
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Erro desconhecido.";
      setErrorMsg(message);
      setFormState("error");
    }
  };

  // ── Phone mask ──────────────────────────────────────────────────────────────
  const formatPhone = (val: string) => {
    const digits = val.replace(/\D/g, "").slice(0, 11);
    if (digits.length <= 2)  return digits;
    if (digits.length <= 7)  return `(${digits.slice(0,2)}) ${digits.slice(2)}`;
    return `(${digits.slice(0,2)}) ${digits.slice(2,7)}-${digits.slice(7)}`;
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="exit-popup-backdrop"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="fixed inset-0 z-[9999] flex items-center justify-center px-4"
          style={{ background: "rgba(4, 8, 7, 0.80)", backdropFilter: "blur(6px)" }}
          onClick={() => setIsVisible(false)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="popup-title"
        >
          <motion.div
            key="exit-popup-panel"
            variants={panelVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-lg overflow-hidden rounded-3xl border border-white/10 shadow-2xl"
            style={{
              background: "linear-gradient(145deg, #0c1f1d 0%, #071410 100%)",
              boxShadow: "0 0 80px rgba(47,107,101,0.25), 0 25px 50px rgba(0,0,0,0.5)",
            }}
          >
            {/* ── Glow decorativo topo ── */}
            <div
              className="pointer-events-none absolute -top-16 left-1/2 -translate-x-1/2 w-64 h-32 rounded-full blur-3xl"
              style={{ background: "rgba(47,107,101,0.4)" }}
            />

            {/* ── Botão fechar ── */}
            <button
              onClick={() => setIsVisible(false)}
              className="absolute top-4 right-4 z-10 flex items-center justify-center w-9 h-9 rounded-full text-white/40 hover:text-white hover:bg-white/10 transition-all duration-200"
              aria-label="Fechar popup"
            >
              <X className="w-5 h-5" />
            </button>

            {/* ── Conteúdo ── */}
            <div className="relative z-10 p-8 md:p-10">
              {formState !== "success" ? (
                <>
                  {/* Badge */}
                  <div className="inline-flex items-center gap-2 mb-5 px-3 py-1.5 rounded-full border border-[#2f6b65]/40 bg-[#2f6b65]/10 text-[#3b8780] text-xs font-semibold tracking-widest uppercase">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#2f6b65] animate-pulse" />
                    Oferta exclusiva · Grátis
                  </div>

                  {/* Headline */}
                  <h2
                    id="popup-title"
                    className="text-2xl md:text-3xl font-extrabold text-white leading-tight tracking-tight mb-2"
                  >
                    Antes de ir embora…{" "}
                    <span
                      className="text-transparent bg-clip-text"
                      style={{ backgroundImage: "linear-gradient(90deg, #2f6b65, #3b8780)" }}
                    >
                      Diagnóstico Gratuito
                    </span>
                  </h2>
                  <p className="text-white/55 text-sm leading-relaxed mb-6">
                    Descubra em minutos o que está travando o crescimento do seu negócio no digital. Nossa equipe analisa seus canais e entrega um plano de ação sem custo algum.
                  </p>

                  {/* Benefits */}
                  <ul className="flex flex-col gap-2 mb-7">
                    {BENEFITS.map(({ icon: Icon, label }) => (
                      <li key={label} className="flex items-center gap-3 text-white/70 text-sm">
                        <span
                          className="flex items-center justify-center w-7 h-7 rounded-lg flex-shrink-0"
                          style={{ background: "rgba(47,107,101,0.15)", border: "1px solid rgba(47,107,101,0.3)" }}
                        >
                          <Icon className="w-3.5 h-3.5 text-[#2f6b65]" />
                        </span>
                        {label}
                      </li>
                    ))}
                  </ul>

                  {/* Divider */}
                  <div className="w-full h-px mb-6" style={{ background: "rgba(255,255,255,0.06)" }} />

                  {/* Form */}
                  <form onSubmit={handleSubmit} className="flex flex-col gap-3" noValidate>
                    <input
                      id="popup-name"
                      type="text"
                      required
                      placeholder="Seu nome completo"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl text-sm text-white placeholder-white/30 outline-none transition-all duration-200"
                      style={{
                        background: "rgba(255,255,255,0.05)",
                        border: "1px solid rgba(255,255,255,0.1)",
                      }}
                      onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(47,107,101,0.6)")}
                      onBlur={(e)  => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)")}
                    />
                    <input
                      id="popup-email"
                      type="email"
                      required
                      placeholder="Seu melhor e-mail"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl text-sm text-white placeholder-white/30 outline-none transition-all duration-200"
                      style={{
                        background: "rgba(255,255,255,0.05)",
                        border: "1px solid rgba(255,255,255,0.1)",
                      }}
                      onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(47,107,101,0.6)")}
                      onBlur={(e)  => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)")}
                    />
                    <input
                      id="popup-phone"
                      type="tel"
                      required
                      placeholder="WhatsApp / Telefone"
                      value={phone}
                      onChange={(e) => setPhone(formatPhone(e.target.value))}
                      className="w-full px-4 py-3 rounded-xl text-sm text-white placeholder-white/30 outline-none transition-all duration-200"
                      style={{
                        background: "rgba(255,255,255,0.05)",
                        border: "1px solid rgba(255,255,255,0.1)",
                      }}
                      onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(47,107,101,0.6)")}
                      onBlur={(e)  => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)")}
                    />

                    {formState === "error" && (
                      <p className="text-red-400 text-xs mt-1">{errorMsg}</p>
                    )}

                    <button
                      type="submit"
                      disabled={formState === "loading"}
                      className="mt-1 w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold text-sm text-white transition-all duration-200 disabled:opacity-60"
                      style={{
                        background: "linear-gradient(135deg, #2f6b65, #3b8780)",
                        boxShadow: "0 0 30px rgba(47,107,101,0.35)",
                      }}
                    >
                      {formState === "loading" ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Enviando…
                        </>
                      ) : (
                        <>
                          Quero meu diagnóstico gratuito
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </form>

                  <p className="mt-4 text-center text-white/25 text-xs">
                    Sem spam. Seus dados estão seguros conosco.
                  </p>
                </>
              ) : (
                /* ── Tela de sucesso ── */
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col items-center text-center py-4"
                >
                  <div
                    className="flex items-center justify-center w-16 h-16 rounded-full mb-5"
                    style={{ background: "rgba(47,107,101,0.15)", border: "1px solid rgba(47,107,101,0.4)" }}
                  >
                    <CheckCircle className="w-8 h-8 text-[#2f6b65]" />
                  </div>
                  <h3 className="text-2xl font-extrabold text-white mb-2 tracking-tight">
                    Solicitação recebida! 🎉
                  </h3>
                  <p className="text-white/55 text-sm leading-relaxed max-w-xs">
                    Nossa equipe entrará em contato em breve com o seu diagnóstico personalizado. Fique de olho no seu e-mail e WhatsApp!
                  </p>
                  <button
                    onClick={() => setIsVisible(false)}
                    className="mt-7 px-8 py-3 rounded-xl text-sm font-semibold text-white/70 hover:text-white border border-white/10 hover:border-white/20 transition-all duration-200"
                  >
                    Fechar
                  </button>
                </motion.div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
