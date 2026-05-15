"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { ChevronLeft, CheckCircle2, Circle, Lock, PlayCircle } from "lucide-react";
import { cn } from "@/lib/utils";

// Mock data for the sidebar. In production, this would come from a Server Component or React Query.
const courseData = {
  id: "c1",
  title: "Tráfego Pago PRO",
  modules: [
    {
      id: "m1", title: "Módulo 1: Fundamentos",
      lessons: [
        { id: "l1", title: "Boas-vindas e Mindset", duration: "05:20", isCompleted: true, isLocked: false },
        { id: "l2", title: "O que é Performance?", duration: "12:45", isCompleted: false, isLocked: false },
      ]
    },
    {
      id: "m2", title: "Módulo 2: O Gerenciador",
      lessons: [
        { id: "l3", title: "Configurando o BM", duration: "25:10", isCompleted: false, isLocked: true },
        { id: "l4", title: "Píxeis e Conversões", duration: "30:00", isCompleted: false, isLocked: true },
      ]
    }
  ]
};

export default function CoursePlayerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const params = useParams();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex h-[calc(100vh-80px)] overflow-hidden bg-[#040807]">
      {/* Sidebar de Módulos */}
      <aside className={cn(
        "flex flex-col border-r border-white/5 bg-[#070d0c] transition-all duration-300",
        sidebarOpen ? "w-80" : "w-0 opacity-0 pointer-events-none"
      )}>
        <div className="p-4 border-b border-white/5 flex flex-col gap-4">
          <Link href="/dashboard" className="flex items-center gap-2 text-xs font-bold text-white/40 hover:text-white uppercase tracking-widest transition-colors">
            <ChevronLeft className="w-4 h-4" /> Voltar ao Dashboard
          </Link>
          <h2 className="text-xl font-bold text-white truncate">{courseData.title}</h2>
          
          <div className="w-full">
            <div className="flex justify-between text-xs font-medium mb-2 text-white/50">
              <span>Progresso</span>
              <span>25%</span>
            </div>
            <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
              <div className="h-full bg-[--color-brand-primary] w-[25%] rounded-full" />
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto scrollbar-hide py-2">
          {courseData.modules.map((module) => (
            <div key={module.id} className="mb-4">
              <div className="px-4 py-2 text-xs font-bold text-white/30 uppercase tracking-widest">
                {module.title}
              </div>
              <div className="flex flex-col">
                {module.lessons.map((lesson) => {
                  const isActive = pathname.includes(lesson.id);
                  return (
                    <Link
                      key={lesson.id}
                      href={lesson.isLocked ? "#" : `/dashboard/courses/${courseData.id}/lessons/${lesson.id}`}
                      className={cn(
                        "flex items-start gap-3 px-4 py-3 hover:bg-white/[0.02] transition-colors border-l-2",
                        isActive ? "border-[--color-brand-primary] bg-white/[0.03]" : "border-transparent",
                        lesson.isLocked ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
                      )}
                    >
                      <div className="mt-0.5">
                        {lesson.isLocked ? (
                          <Lock className="w-4 h-4 text-white/20" />
                        ) : lesson.isCompleted ? (
                          <CheckCircle2 className="w-4 h-4 text-[--color-brand-primary]" />
                        ) : isActive ? (
                          <PlayCircle className="w-4 h-4 text-white" />
                        ) : (
                          <Circle className="w-4 h-4 text-white/20" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className={cn(
                          "text-sm font-medium leading-tight mb-1",
                          isActive ? "text-white" : "text-white/70"
                        )}>
                          {lesson.title}
                        </p>
                        <p className="text-xs text-white/40">{lesson.duration}</p>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </aside>

      {/* Main Content (Player) */}
      <main className="flex-1 relative flex flex-col bg-black">
        {/* Toggle Sidebar Button */}
        <button 
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="absolute top-4 left-4 z-50 p-2 rounded-full bg-black/50 border border-white/10 text-white/70 hover:text-white backdrop-blur-md transition-all"
        >
          {sidebarOpen ? <ChevronLeft className="w-5 h-5" /> : <PlayCircle className="w-5 h-5" />}
        </button>
        
        {children}
      </main>
    </div>
  );
}
