import React from "react";
import { getCurrentUser } from "@/lib/session";
import { redirect } from "next/navigation";
import { Plus, Settings, Video, Users, MoreVertical } from "lucide-react";
import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function AdminCoursesPage() {
  const user = await getCurrentUser();

  if (!user || (user.role !== "ADMIN" && user.role !== "INSTRUCTOR")) {
    redirect("/dashboard");
  }

  const courses = await prisma.course.findMany({
    include: {
      _count: {
        select: { modules: true, enrollments: true }
      }
    },
    orderBy: { createdAt: "desc" }
  });

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-white tracking-tight">
            Gestão de Cursos
          </h1>
          <p className="text-white/50 mt-1">
            Administre seus cursos, módulos e aulas.
          </p>
        </div>
        
        <Link 
          href="/dashboard/admin/courses/new" 
          className="flex items-center justify-center gap-2 px-6 py-3 bg-[--color-brand-primary] hover:bg-[#3b8780] text-white font-bold rounded-xl transition-all shadow-[0_0_20px_rgba(47,107,101,0.3)]"
        >
          <Plus className="w-5 h-5" />
          Novo Curso
        </Link>
      </div>

      <div className="bg-[#070d0c] border border-white/5 rounded-3xl overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-white/70">
            <thead className="bg-white/5 text-xs uppercase text-white/50 font-bold border-b border-white/5">
              <tr>
                <th className="px-6 py-4">Curso</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Módulos</th>
                <th className="px-6 py-4">Alunos Inscritos</th>
                <th className="px-6 py-4 text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {courses.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-white/40">
                    Nenhum curso cadastrado ainda. Clique em "Novo Curso" para começar.
                  </td>
                </tr>
              ) : (
                courses.map((course) => (
                  <tr key={course.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="px-6 py-4 font-bold text-white flex items-center gap-3">
                      <div className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center">
                        <Video className="w-5 h-5 text-[--color-brand-primary]" />
                      </div>
                      {course.title}
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                        Publicado
                      </span>
                    </td>
                    <td className="px-6 py-4 font-medium">{course._count.modules}</td>
                    <td className="px-6 py-4 font-medium flex items-center gap-2">
                      <Users className="w-4 h-4 text-white/30" />
                      {course._count.enrollments}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                        <MoreVertical className="w-5 h-5 text-white/50" />
                      </button>
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
