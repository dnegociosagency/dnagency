"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Loader2, ArrowRight } from "lucide-react";
import MagneticButton from "@/components/ui/MagneticButton";

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const contentType = res.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error("Erro de comunicação com o servidor.");
      }

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || data.message || "Erro ao fazer login");
      }

      router.push("/dashboard");
      router.refresh();
    } catch (err: any) {
      if (err.name === 'TypeError' && err.message === 'Failed to fetch') {
        setError("Erro de conexão. Verifique sua internet.");
      } else {
        setError(err.message || "Email ou senha inválidos");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold text-white tracking-tight mb-2">Bem-vindo de volta</h2>
        <p className="text-sm text-white/50">
          Acesse sua conta para continuar sua jornada.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <div className="p-3 text-sm bg-red-500/10 border border-red-500/20 text-red-400 rounded-lg text-center">
            {error}
          </div>
        )}

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-white/70 mb-1.5" htmlFor="email">
              E-mail corporativo
            </label>
            <input
              id="email"
              type="email"
              required
              className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-xl text-white placeholder-white/20 focus:outline-none focus:border-[--color-brand-primary] focus:ring-1 focus:ring-[--color-brand-primary] transition-all"
              placeholder="seu@email.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-sm font-medium text-white/70" htmlFor="password">
                Senha
              </label>
              <Link href="#" className="text-xs font-medium text-[--color-brand-primary] hover:text-[#3b8780] transition-colors">
                Esqueceu a senha?
              </Link>
            </div>
            <input
              id="password"
              type="password"
              required
              className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-xl text-white placeholder-white/20 focus:outline-none focus:border-[--color-brand-primary] focus:ring-1 focus:ring-[--color-brand-primary] transition-all"
              placeholder="••••••••"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full relative group block"
        >
          <div className="absolute -inset-1 bg-gradient-to-r from-[--color-brand-primary] to-[#1a4a44] rounded-xl blur opacity-30 group-hover:opacity-60 transition duration-500"></div>
          <div className="relative w-full py-3.5 bg-[--color-brand-primary] hover:bg-[#3b8780] text-white font-bold rounded-xl shadow-[0_0_20px_rgba(47,107,101,0.3)] transition-all overflow-hidden flex items-center justify-center gap-2">
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Entrar na Plataforma"}
            {!loading && <ArrowRight className="w-4 h-4" />}
          </div>
        </button>
      </form>

      <div className="mt-8 text-center">
        <p className="text-sm text-white/50">
          Ainda não é aluno?{" "}
          <Link href="/academy" className="font-medium text-[--color-brand-primary] hover:text-white transition-colors">
            Conheça os planos
          </Link>
        </p>
      </div>
    </div>
  );
}
