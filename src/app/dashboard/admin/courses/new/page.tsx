"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ChevronLeft, Loader2, Save } from "lucide-react";

export default function NewCoursePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    thumbnail: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/admin/courses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Erro ao criar curso");
      }

      router.push("/dashboard/admin/courses");
      router.refresh();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 pb-12">
      <div className="flex items-center gap-4">
        <Link 
          href="/dashboard/admin/courses" 
          className="p-2 bg-white/5 hover:bg-white/10 rounded-xl transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-3xl font-black text-white tracking-tight">Criar Novo Curso</h1>
          <p className="text-white/50 text-sm">Configure as informações básicas do treinamento.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {error && (
          <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl">
            {error}
          </div>
        )}

        <div className="bg-[#070d0c] border border-white/5 p-8 rounded-3xl space-y-6 shadow-xl">
          <div>
            <label className="block text-sm font-bold text-white/80 mb-2">Título do Curso</label>
            <input
              type="text"
              required
              className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-xl text-white placeholder-white/20 focus:outline-none focus:border-[--color-brand-primary] transition-colors"
              placeholder="Ex: Método Escala de Vendas B2B"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-white/80 mb-2">Descrição Curta</label>
            <textarea
              required
              rows={4}
              className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-xl text-white placeholder-white/20 focus:outline-none focus:border-[--color-brand-primary] transition-colors resize-none"
              placeholder="Descreva o que o aluno vai aprender neste curso..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-white/80 mb-2">URL da Thumbnail (Opcional)</label>
            <input
              type="url"
              className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-xl text-white placeholder-white/20 focus:outline-none focus:border-[--color-brand-primary] transition-colors"
              placeholder="https://..."
              value={formData.thumbnail}
              onChange={(e) => setFormData({ ...formData, thumbnail: e.target.value })}
            />
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="flex items-center gap-2 px-8 py-4 bg-[--color-brand-primary] hover:bg-[#3b8780] text-white font-bold rounded-xl transition-all shadow-[0_0_20px_rgba(47,107,101,0.3)]"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
            Salvar e Continuar
          </button>
        </div>
      </form>
    </div>
  );
}
