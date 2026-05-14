import React from "react";
import { getCurrentUser } from "@/lib/session";
import { redirect } from "next/navigation";
import { Building2, Users, TrendingUp, MailPlus } from "lucide-react";
import { prisma } from "@/lib/prisma";

export default async function CompanyDashboardPage() {
  const user = await getCurrentUser();

  // Only users with COMPANY_ADMIN or general ADMIN role can access
  if (!user || (user.role !== "COMPANY_ADMIN" && user.role !== "ADMIN")) {
    redirect("/dashboard");
  }

  // Fetch company details if linked
  let companyName = "Sua Empresa";
  let employees: any[] = [];
  
  if (user.companyId) {
    const company = await prisma.company.findUnique({
      where: { id: user.companyId },
      include: {
        users: {
          select: { id: true, name: true, email: true, createdAt: true }
        }
      }
    });
    
    if (company) {
      companyName = company.name;
      employees = company.users;
    }
  }

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-white tracking-tight flex items-center gap-3">
            <Building2 className="w-8 h-8 text-[--color-brand-primary]" />
            Portal B2B: {companyName}
          </h1>
          <p className="text-white/50 mt-1">
            Gerencie os acessos da sua equipe e acompanhe o engajamento.
          </p>
        </div>
        
        <button className="flex items-center justify-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold rounded-xl transition-all">
          <MailPlus className="w-5 h-5 text-[--color-brand-primary]" />
          Convidar Colaborador
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[#070d0c] border border-white/5 rounded-2xl p-6">
          <p className="text-sm font-medium text-white/50 mb-2">Colaboradores Ativos</p>
          <p className="text-4xl font-black text-white">{employees.length || 1}</p>
        </div>
        <div className="bg-[#070d0c] border border-white/5 rounded-2xl p-6">
          <p className="text-sm font-medium text-white/50 mb-2">Engajamento Médio</p>
          <p className="text-4xl font-black text-emerald-400">78%</p>
        </div>
        <div className="bg-[#070d0c] border border-white/5 rounded-2xl p-6">
          <p className="text-sm font-medium text-white/50 mb-2">Licenças Disponíveis</p>
          <p className="text-4xl font-black text-white">4 <span className="text-lg text-white/30 font-medium">/ 10</span></p>
        </div>
      </div>

      <div className="bg-[#070d0c] border border-white/5 rounded-3xl overflow-hidden shadow-2xl mt-8">
        <div className="p-6 border-b border-white/5">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Users className="w-5 h-5 text-[--color-brand-primary]" /> Equipe
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-white/70">
            <thead className="bg-white/5 text-xs uppercase text-white/50 font-bold border-b border-white/5">
              <tr>
                <th className="px-6 py-4">Colaborador</th>
                <th className="px-6 py-4">Status de Treinamento</th>
                <th className="px-6 py-4">Data de Ingresso</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {employees.length === 0 ? (
                <tr className="hover:bg-white/[0.02] transition-colors">
                  <td className="px-6 py-4 font-bold text-white flex items-center gap-3">
                    <div className="w-8 h-8 bg-white/5 rounded-full flex items-center justify-center text-[--color-brand-primary]">
                      {user.name.charAt(0)}
                    </div>
                    <div>
                      <p>{user.name} <span className="text-xs text-[--color-brand-primary] font-normal px-2 py-0.5 bg-[--color-brand-primary]/10 rounded-full ml-2">Você (Admin)</span></p>
                      <p className="text-xs text-white/40 font-normal">{user.email}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-24 h-1.5 bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-500 w-[60%] rounded-full"></div>
                      </div>
                      <span className="text-xs font-bold text-emerald-400">60%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">Hoje</td>
                </tr>
              ) : (
                employees.map((emp) => (
                  <tr key={emp.id} className="hover:bg-white/[0.02] transition-colors">
                     <td className="px-6 py-4 font-bold text-white flex items-center gap-3">
                      <div className="w-8 h-8 bg-white/5 rounded-full flex items-center justify-center text-[--color-brand-primary]">
                        {emp.name.charAt(0)}
                      </div>
                      <div>
                        <p>{emp.name}</p>
                        <p className="text-xs text-white/40 font-normal">{emp.email}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-24 h-1.5 bg-white/10 rounded-full overflow-hidden">
                          <div className="h-full bg-[--color-brand-primary] w-[0%] rounded-full"></div>
                        </div>
                        <span className="text-xs font-bold text-white/30">0%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                       {new Date(emp.createdAt).toLocaleDateString("pt-BR")}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
