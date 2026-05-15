"use client";

import { motion } from "framer-motion";
import { Users, BookOpen, Award, TrendingUp, Clock, Activity } from "lucide-react";

export default function AdminDashboardPage() {
  const metrics = [
    { label: "Total de Alunos", value: "1,248", icon: Users, color: "text-blue-400" },
    { label: "Cursos Ativos", value: "12", icon: BookOpen, color: "text-purple-400" },
    { label: "Certificados Emitidos", value: "3,421", icon: Award, color: "text-amber-400" },
    { label: "Receita (Mês)", value: "R$ 45.2K", icon: TrendingUp, color: "text-emerald-400" },
    { label: "Horas Assistidas", value: "8.4k", icon: Clock, color: "text-rose-400" },
    { label: "Alunos Online", value: "142", icon: Activity, color: "text-[--color-brand-primary]" },
  ];

  return (
    <div className="space-y-8 p-4">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">
            Dashboard
          </h1>
          <p className="text-sm text-white/50 mt-1">Visão geral da sua plataforma de ensino.</p>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {metrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
              className="premium-card p-6 flex flex-col justify-between"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-medium text-white/60">{metric.label}</span>
                <div className={`p-2 rounded-full bg-white/5 ${metric.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
              </div>
              <div>
                <h3 className="text-3xl font-bold text-white tracking-tight">{metric.value}</h3>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Charts & Recent Activity Placeholder */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Gráfico principal */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.4 }}
          className="premium-card p-6 lg:col-span-2 min-h-[300px] flex flex-col"
        >
          <h3 className="text-lg font-semibold text-white mb-6">Crescimento de Alunos</h3>
          <div className="flex-1 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center relative overflow-hidden">
            {/* Placeholder Visual for Chart */}
            <div className="absolute inset-0 bg-gradient-to-t from-[--color-brand-primary]/20 to-transparent opacity-50" />
            <span className="text-white/30 text-sm font-medium z-10 flex flex-col items-center gap-2">
              <TrendingUp className="w-8 h-8 opacity-50" />
              Gráfico Interativo (Implementação Futura via Recharts)
            </span>
          </div>
        </motion.div>

        {/* Últimos Acessos */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.4 }}
          className="premium-card p-6 min-h-[300px] flex flex-col"
        >
          <h3 className="text-lg font-semibold text-white mb-6">Últimos Acessos</h3>
          <div className="flex-1 space-y-4">
            {[
              { name: "Carlos Silva", time: "Há 2 min", course: "Tráfego Pago PRO" },
              { name: "Ana Beatriz", time: "Há 15 min", course: "Funis de Alta Conversão" },
              { name: "Lucas Mendes", time: "Há 42 min", course: "Tráfego Pago PRO" },
              { name: "Mariana Souza", time: "Há 1 hora", course: "Mentoria Elite" },
            ].map((activity, i) => (
              <div key={i} className="flex items-center gap-4 p-3 rounded-lg hover:bg-white/5 transition-colors cursor-pointer border border-transparent hover:border-white/5">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[--color-brand-primary] to-emerald-600 flex items-center justify-center text-white font-bold text-sm">
                  {activity.name.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white truncate">{activity.name}</p>
                  <p className="text-xs text-white/40 truncate">{activity.course}</p>
                </div>
                <div className="text-xs text-white/30 whitespace-nowrap">{activity.time}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
