import React from "react";
import { getCurrentUser } from "@/lib/session";
import { redirect } from "next/navigation";
import { PlayCircle, Clock, Trophy, BookOpen } from "lucide-react";

export default async function DashboardPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="space-y-10">
      {/* Header Greeting */}
      <div>
        <h1 className="text-3xl font-black text-white tracking-tight">
          Olá, {user.name.split(" ")[0]} 👋
        </h1>
        <p className="text-white/50 mt-2">
          Bem-vindo de volta à plataforma. Aqui está o seu progresso.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[--color-brand-primary] opacity-10 rounded-full blur-2xl group-hover:opacity-20 transition-opacity" />
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-[--color-brand-primary]/20 text-[--color-brand-primary] rounded-xl">
              <BookOpen className="w-6 h-6" />
            </div>
            <p className="text-sm font-medium text-white/50">Cursos Ativos</p>
          </div>
          <p className="text-3xl font-black text-white">2</p>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500 opacity-10 rounded-full blur-2xl group-hover:opacity-20 transition-opacity" />
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-blue-500/20 text-blue-400 rounded-xl">
              <Clock className="w-6 h-6" />
            </div>
            <p className="text-sm font-medium text-white/50">Horas Assistidas</p>
          </div>
          <p className="text-3xl font-black text-white">12<span className="text-lg text-white/30 font-medium">h</span></p>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500 opacity-10 rounded-full blur-2xl group-hover:opacity-20 transition-opacity" />
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-emerald-500/20 text-emerald-400 rounded-xl">
              <PlayCircle className="w-6 h-6" />
            </div>
            <p className="text-sm font-medium text-white/50">Aulas Concluídas</p>
          </div>
          <p className="text-3xl font-black text-white">24</p>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500 opacity-10 rounded-full blur-2xl group-hover:opacity-20 transition-opacity" />
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-amber-500/20 text-amber-400 rounded-xl">
              <Trophy className="w-6 h-6" />
            </div>
            <p className="text-sm font-medium text-white/50">Certificados</p>
          </div>
          <p className="text-3xl font-black text-white">0</p>
        </div>
      </div>

      {/* Continue Watching Section */}
      <div>
        <h2 className="text-xl font-bold text-white mb-6">Continue de onde parou</h2>
        <div className="bg-gradient-to-r from-[#0a1211] to-[#040807] border border-[--color-brand-primary]/20 rounded-3xl p-8 flex flex-col md:flex-row items-center gap-8 relative overflow-hidden">
          <div className="absolute -left-20 -top-20 w-64 h-64 bg-[--color-brand-primary] opacity-10 rounded-full blur-3xl" />
          
          <div className="w-full md:w-1/3 aspect-video bg-black/50 rounded-2xl border border-white/5 flex items-center justify-center relative group cursor-pointer overflow-hidden">
            {/* Placeholder for video thumbnail */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" />
            <PlayCircle className="w-12 h-12 text-white/70 group-hover:text-white group-hover:scale-110 transition-all z-20 relative" />
          </div>

          <div className="flex-1 w-full">
            <div className="inline-block px-3 py-1 bg-[--color-brand-primary]/10 border border-[--color-brand-primary]/20 text-[--color-brand-primary] text-xs font-bold uppercase tracking-widest rounded-full mb-4">
              Módulo 2 • Aula 3
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">
              Arquitetura de Conversão
            </h3>
            <p className="text-white/50 text-sm mb-6 max-w-lg">
              Aprenda a estruturar landing pages que convertem visitantes frios em clientes utilizando a metodologia DN.
            </p>
            
            <div className="w-full max-w-md">
              <div className="flex justify-between text-xs font-medium mb-2 text-white/70">
                <span>Progresso da aula</span>
                <span>45%</span>
              </div>
              <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-[--color-brand-primary] to-emerald-400 w-[45%] rounded-full" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
