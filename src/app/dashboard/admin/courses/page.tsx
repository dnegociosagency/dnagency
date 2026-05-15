"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Plus, BookOpen, Clock, Settings, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Course {
  id: string;
  title: string;
  description: string;
  thumbnail?: string;
  _count: {
    modules: number;
    userCourses: number;
  };
}

export default function AdminCoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCourses() {
      try {
        const res = await fetch("/api/admin/courses");
        if (res.ok) {
          const data = await res.json();
          setCourses(data);
        }
      } catch (error) {
        console.error("Erro ao buscar cursos", error);
      } finally {
        setLoading(false);
      }
    }
    fetchCourses();
  }, []);

  return (
    <div className="space-y-8 p-4">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">
            Meus Cursos
          </h1>
          <p className="text-sm text-white/50 mt-1">Gerencie e crie novos treinamentos para seus alunos.</p>
        </div>
        <Link href="/dashboard/admin/courses/new">
          <Button className="bg-[--color-brand-primary] text-white hover:bg-[#3b8780] rounded-full px-6">
            <Plus className="w-4 h-4 mr-2" /> Novo Curso
          </Button>
        </Link>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-20">
          <Loader2 className="w-8 h-8 text-[--color-brand-primary] animate-spin" />
        </div>
      ) : courses.length === 0 ? (
        <div className="premium-card p-12 text-center flex flex-col items-center justify-center">
          <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-4">
            <BookOpen className="w-8 h-8 text-white/20" />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">Nenhum curso encontrado</h3>
          <p className="text-white/50 max-w-md mx-auto mb-6">
            Você ainda não criou nenhum treinamento. Clique no botão abaixo para começar a construir a sua plataforma.
          </p>
          <Link href="/dashboard/admin/courses/new">
            <Button className="bg-white/10 text-white hover:bg-white/20 rounded-full px-6">
              Criar meu primeiro curso
            </Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course, i) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="premium-card overflow-hidden flex flex-col group cursor-pointer border border-transparent hover:border-[--color-brand-primary]/30 transition-all"
            >
              <div className="h-40 bg-white/5 relative overflow-hidden">
                {course.thumbnail ? (
                  <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[--color-brand-primary]/20 to-black/40 group-hover:scale-105 transition-transform duration-500">
                    <BookOpen className="w-10 h-10 text-[--color-brand-primary]/50" />
                  </div>
                )}
                <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-xs font-medium text-white border border-white/10">
                  {course._count.modules} Módulos
                </div>
              </div>
              
              <div className="p-5 flex-1 flex flex-col">
                <h3 className="text-xl font-bold text-white mb-2 line-clamp-1 group-hover:text-[--color-brand-primary] transition-colors">{course.title}</h3>
                <p className="text-white/50 text-sm line-clamp-2 mb-4 flex-1">
                  {course.description}
                </p>
                
                <div className="flex items-center justify-between pt-4 border-t border-white/5 mt-auto">
                  <div className="flex items-center gap-2 text-white/40 text-xs">
                    <Settings className="w-4 h-4" />
                    <span>{course._count.userCourses} Alunos</span>
                  </div>
                  <Link href={`/dashboard/admin/courses/${course.id}`}>
                    <Button variant="ghost" className="text-[--color-brand-primary] hover:bg-[--color-brand-primary]/10 hover:text-white rounded-full text-sm px-4">
                      Construtor
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
