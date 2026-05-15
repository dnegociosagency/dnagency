"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Search, Filter, MoreVertical, Lock, Unlock, Mail, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function UsersManagementPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  const fetchUsers = async () => {
    try {
      const res = await fetch("/api/admin/users");
      if (res.ok) {
        const data = await res.json();
        setUsers(data.users);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleToggleBlock = async (userId: string) => {
    setActionLoading(userId);
    try {
      const res = await fetch(`/api/admin/users/${userId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "toggle_block" })
      });
      if (res.ok) {
        await fetchUsers(); // Recarrega os status atualizados
      } else {
        const err = await res.json();
        alert(err.message || "Erro ao atualizar usuário");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setActionLoading(null);
    }
  };

  return (
    <div className="space-y-8 p-4">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">
            Gestão de Alunos
          </h1>
          <p className="text-sm text-white/50 mt-1">Gerencie acessos, progresso e segurança dos usuários.</p>
        </div>
      </div>

      <div className="premium-card p-6">
        {/* Toolbar */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
            <input 
              type="text" 
              placeholder="Pesquisar por nome ou email..." 
              className="w-full bg-black/20 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[--color-brand-primary] transition-colors"
            />
          </div>
          <Button variant="outline" className="border-white/10 text-white hover:bg-white/5">
            <Filter className="w-4 h-4 mr-2" /> Filtrar
          </Button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/5">
                <th className="py-3 px-4 text-xs font-semibold text-white/40 uppercase tracking-wider">Usuário</th>
                <th className="py-3 px-4 text-xs font-semibold text-white/40 uppercase tracking-wider">Papel</th>
                <th className="py-3 px-4 text-xs font-semibold text-white/40 uppercase tracking-wider">Status</th>
                <th className="py-3 px-4 text-xs font-semibold text-white/40 uppercase tracking-wider">Progresso Médio</th>
                <th className="py-3 px-4 text-xs font-semibold text-white/40 uppercase tracking-wider">Último Acesso</th>
                <th className="py-3 px-4 text-xs font-semibold text-white/40 uppercase tracking-wider text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {loading ? (
                <tr>
                  <td colSpan={6} className="py-20 text-center">
                    <Loader2 className="w-8 h-8 text-[--color-brand-primary] animate-spin mx-auto" />
                  </td>
                </tr>
              ) : users.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-20 text-center text-white/50">
                    Nenhum aluno encontrado.
                  </td>
                </tr>
              ) : (
                users.map((user, i) => (
                  <motion.tr 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    key={user.id} 
                    className="hover:bg-white/[0.02] transition-colors group"
                  >
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[--color-brand-primary] to-emerald-600 flex items-center justify-center text-white font-bold text-xs">
                          {user.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <div className="text-sm font-medium text-white">{user.name}</div>
                          <div className="text-xs text-white/40">{user.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className="text-xs font-medium px-2 py-1 bg-white/5 rounded text-white/70">
                        {user.role}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <span className={`text-xs font-bold px-2 py-1 rounded-md ${
                        user.status === 'Ativo' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'
                      }`}>
                        {user.status}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden max-w-[80px]">
                          <div className="h-full bg-[--color-brand-primary]" style={{ width: user.progress }} />
                        </div>
                        <span className="text-xs text-white/60">{user.progress}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-sm text-white/50">
                      {user.lastLogin}
                    </td>
                    <td className="py-4 px-4 text-right">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-white/40 hover:text-white" title="Enviar e-mail">
                          <Mail className="w-4 h-4" />
                        </Button>
                        <Button 
                          onClick={() => handleToggleBlock(user.id)}
                          disabled={actionLoading === user.id}
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8 text-white/40 hover:text-rose-400"
                          title={user.status === 'Ativo' ? "Bloquear Aluno" : "Desbloquear Aluno"}
                        >
                          {actionLoading === user.id ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                          ) : user.status === 'Ativo' ? (
                            <Lock className="w-4 h-4" />
                          ) : (
                            <Unlock className="w-4 h-4" />
                          )}
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-white/40 hover:text-white">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </motion.tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
