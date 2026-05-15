import React from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Zap, BookOpen, Award, Settings, Building2, LogOut, Users } from "lucide-react";
import { getCurrentUser } from "@/lib/session";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-[#040807] flex text-white font-sans">
      {/* Sidebar */}
      <aside className="w-64 border-r border-white/5 bg-[#070d0c] hidden md:flex flex-col flex-shrink-0">
        <div className="h-20 flex items-center px-8 border-b border-white/5">
          <Link href="/dashboard" className="flex items-center gap-2 group">
            <Zap className="w-6 h-6 text-[--color-brand-primary] group-hover:scale-110 transition-transform" />
            <span className="text-xl font-black tracking-tight">DN Academy</span>
          </Link>
        </div>

        <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-1">
          <Link href="/dashboard" className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/5 text-white font-medium">
            <Zap className="w-5 h-5 text-[--color-brand-primary]" />
            Visão Geral
          </Link>
          <Link href="/dashboard/courses" className="flex items-center gap-3 px-4 py-3 rounded-xl text-white/50 hover:text-white hover:bg-white/5 transition-all font-medium">
            <BookOpen className="w-5 h-5" />
            Meus Cursos
          </Link>
          <Link href="/dashboard/certificates" className="flex items-center gap-3 px-4 py-3 rounded-xl text-white/50 hover:text-white hover:bg-white/5 transition-all font-medium">
            <Award className="w-5 h-5" />
            Certificados
          </Link>

          {(user.role === "COMPANY_ADMIN" || user.role === "ADMIN") && (
            <>
              <div className="pt-6 pb-2 px-4 text-xs font-bold text-white/30 uppercase tracking-widest">
                Corporativo
              </div>
              <Link href="/dashboard/company" className="flex items-center gap-3 px-4 py-3 rounded-xl text-white/50 hover:text-white hover:bg-white/5 transition-all font-medium">
                <Building2 className="w-5 h-5" />
                Painel da Empresa
              </Link>
            </>
          )}

          {(user.role === "ADMIN" || user.role === "MODERATOR") && (
            <>
              <div className="pt-6 pb-2 px-4 text-xs font-bold text-white/30 uppercase tracking-widest">
                Administração
              </div>
              <Link href="/dashboard/admin" className="flex items-center gap-3 px-4 py-3 rounded-xl text-white/50 hover:text-white hover:bg-white/5 transition-all font-medium">
                <Settings className="w-5 h-5" />
                Painel Geral
              </Link>
              <Link href="/dashboard/admin/courses" className="flex items-center gap-3 px-4 py-3 rounded-xl text-white/50 hover:text-white hover:bg-white/5 transition-all font-medium">
                <BookOpen className="w-5 h-5" />
                Course Builder
              </Link>
              <Link href="/dashboard/admin/users" className="flex items-center gap-3 px-4 py-3 rounded-xl text-white/50 hover:text-white hover:bg-white/5 transition-all font-medium">
                <Users className="w-5 h-5" />
                Gestão de Alunos
              </Link>
            </>
          )}

          <div className="pt-6 pb-2 px-4 text-xs font-bold text-white/30 uppercase tracking-widest">
            Minha Conta
          </div>
          <Link href="/dashboard/settings" className="flex items-center gap-3 px-4 py-3 rounded-xl text-white/50 hover:text-white hover:bg-white/5 transition-all font-medium">
            <Settings className="w-5 h-5" />
            Configurações
          </Link>
        </nav>

        <div className="p-4 border-t border-white/5">
          <div className="flex items-center gap-3 px-4 py-3">
            <div className="w-10 h-10 rounded-full bg-[--color-brand-primary]/20 flex items-center justify-center text-[--color-brand-primary] font-bold">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1 overflow-hidden">
              <p className="text-sm font-bold truncate">{user.name}</p>
              <p className="text-xs text-white/30 truncate">{user.email}</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        {/* Topbar for mobile + background effects */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[--color-brand-primary] opacity-[0.03] rounded-full blur-[100px] pointer-events-none" />
        
        <header className="h-20 border-b border-white/5 flex items-center justify-between px-6 md:px-10 z-10 bg-[#040807]/80 backdrop-blur-md sticky top-0">
          <div className="md:hidden flex items-center gap-2">
            <Zap className="w-6 h-6 text-[--color-brand-primary]" />
            <span className="font-bold">DN</span>
          </div>
          <div className="flex-1" />
          <div className="flex items-center gap-4">
             {/* Logout action would go here typically as a client component */}
             <form action="/api/auth/logout" method="POST">
               <button type="submit" className="text-sm font-medium text-white/50 hover:text-white flex items-center gap-2 transition-colors">
                 Sair <LogOut className="w-4 h-4" />
               </button>
             </form>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-6 md:p-10 z-10">
          {children}
        </div>
      </main>
    </div>
  );
}
