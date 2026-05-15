"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Plus, GripVertical, Settings, Video, FileText, ChevronDown, ChevronLeft, Loader2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface Lesson {
  id: string;
  title: string;
  videoUrl?: string | null;
  embedUrl?: string | null;
  order: number;
}

interface Module {
  id: string;
  title: string;
  order: number;
  lessons: Lesson[];
}

export default function CourseBuilderPage() {
  const { id } = useParams() as { id: string };
  const router = useRouter();

  const [modules, setModules] = useState<Module[]>([]);
  const [courseTitle, setCourseTitle] = useState("");
  const [loading, setLoading] = useState(true);

  // Modal States
  const [isModuleModalOpen, setModuleModalOpen] = useState(false);
  const [moduleTitle, setModuleTitle] = useState("");
  const [isSavingModule, setSavingModule] = useState(false);

  const [isLessonModalOpen, setLessonModalOpen] = useState(false);
  const [activeModuleId, setActiveModuleId] = useState<string | null>(null);
  const [lessonTitle, setLessonTitle] = useState("");
  const [lessonVideo, setLessonVideo] = useState("");
  const [isSavingLesson, setSavingLesson] = useState(false);

  // Fetch Data
  const fetchData = async () => {
    try {
      const [courseRes, modulesRes] = await Promise.all([
        fetch(`/api/admin/courses/${id}`),
        fetch(`/api/modules?courseId=${id}`)
      ]);

      if (courseRes.ok) {
        const c = await courseRes.json();
        setCourseTitle(c.title);
      }
      if (modulesRes.ok) {
        const m = await modulesRes.json();
        setModules(m.modules);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  // Actions
  const handleCreateModule = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!moduleTitle) return;
    setSavingModule(true);

    try {
      const res = await fetch("/api/modules", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: moduleTitle, courseId: id })
      });
      if (res.ok) {
        setModuleModalOpen(false);
        setModuleTitle("");
        await fetchData(); // Recarrega
      }
    } catch (error) {
      console.error(error);
    } finally {
      setSavingModule(false);
    }
  };

  const handleCreateLesson = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!lessonTitle || !activeModuleId) return;
    setSavingLesson(true);

    try {
      const res = await fetch("/api/lessons", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          moduleId: activeModuleId,
          title: lessonTitle,
          videoUrl: lessonVideo || undefined
        })
      });
      if (res.ok) {
        setLessonModalOpen(false);
        setLessonTitle("");
        setLessonVideo("");
        await fetchData(); // Recarrega
      }
    } catch (error) {
      console.error(error);
    } finally {
      setSavingLesson(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <Loader2 className="w-8 h-8 text-[--color-brand-primary] animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-8 p-4 relative pb-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <Link href="/dashboard/admin/courses" className="p-1.5 bg-white/5 hover:bg-white/10 rounded-lg transition-colors">
              <ChevronLeft className="w-5 h-5" />
            </Link>
            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">
              Course Builder
            </h1>
          </div>
          <p className="text-sm text-[--color-brand-primary] font-medium">{courseTitle}</p>
        </div>
        <div className="flex gap-3">
          <Button className="bg-white/5 text-white hover:bg-white/10 rounded-full px-6">
            Configurações
          </Button>
          <Button 
            onClick={() => setModuleModalOpen(true)}
            className="bg-[--color-brand-primary] text-white hover:bg-[#3b8780] rounded-full px-6"
          >
            <Plus className="w-4 h-4 mr-2" /> Novo Módulo
          </Button>
        </div>
      </div>

      {/* Modules List */}
      <div className="max-w-4xl">
        {modules.length === 0 ? (
          <div className="text-center py-16 bg-white/5 border border-white/5 rounded-3xl">
            <p className="text-white/40 mb-4">Este curso ainda não possui módulos.</p>
            <Button onClick={() => setModuleModalOpen(true)} className="bg-white/10 hover:bg-white/20 text-white rounded-full">
              Criar o primeiro Módulo
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {modules.map((module, mIndex) => (
              <motion.div
                key={module.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: mIndex * 0.1 }}
                className="premium-card overflow-hidden"
              >
                {/* Module Header */}
                <div className="p-4 bg-white/[0.02] border-b border-white/5 flex items-center justify-between cursor-pointer hover:bg-white/[0.04] transition-colors">
                  <div className="flex items-center gap-3">
                    <GripVertical className="w-5 h-5 text-white/20 cursor-grab" />
                    <h3 className="font-semibold text-lg text-white">{module.title}</h3>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-bold px-2 py-1 bg-[--color-brand-primary]/20 text-[--color-brand-primary] rounded-md">
                      {module.lessons?.length || 0} Aulas
                    </span>
                    <ChevronDown className="w-5 h-5 text-white/40" />
                  </div>
                </div>

                {/* Lessons List */}
                <div className="p-2 space-y-1 bg-black/20">
                  {module.lessons && module.lessons.length > 0 ? (
                    module.lessons.map((lesson) => (
                      <div key={lesson.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-white/5 group border border-transparent hover:border-white/5 transition-all">
                        <div className="flex items-center gap-3">
                          <GripVertical className="w-4 h-4 text-white/10 cursor-grab opacity-0 group-hover:opacity-100 transition-opacity" />
                          <div className={`p-1.5 rounded-md ${lesson.embedUrl ? 'bg-blue-500/20 text-blue-400' : 'bg-rose-500/20 text-rose-400'}`}>
                            {lesson.embedUrl ? <Video className="w-4 h-4" /> : <FileText className="w-4 h-4" />}
                          </div>
                          <span className="text-sm font-medium text-white/80">{lesson.title}</span>
                        </div>
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-white/50 hover:text-white">
                            <Settings className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-4 text-center text-xs text-white/30">Nenhuma aula neste módulo.</div>
                  )}
                  
                  <button 
                    onClick={() => {
                      setActiveModuleId(module.id);
                      setLessonModalOpen(true);
                    }}
                    className="w-full mt-2 py-3 rounded-lg border border-dashed border-white/10 text-white/40 text-sm font-medium flex items-center justify-center gap-2 hover:bg-white/5 hover:text-white/70 hover:border-white/20 transition-all"
                  >
                    <Plus className="w-4 h-4" /> Adicionar Aula
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Modals - Simplificados com fixed overlay para não exigir dependências extras (ex: Radix) */}
      
      {/* Module Modal */}
      {isModuleModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-[#070d0c] border border-white/10 rounded-3xl p-6 w-full max-w-md relative shadow-2xl">
            <button onClick={() => setModuleModalOpen(false)} className="absolute top-4 right-4 text-white/40 hover:text-white"><X className="w-5 h-5"/></button>
            <h2 className="text-xl font-bold text-white mb-6">Criar Novo Módulo</h2>
            <form onSubmit={handleCreateModule} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-white/70 mb-1">Título do Módulo</label>
                <input required autoFocus value={moduleTitle} onChange={e => setModuleTitle(e.target.value)} type="text" className="w-full px-4 py-3 rounded-xl bg-black/50 border border-white/10 text-white focus:outline-none focus:border-[--color-brand-primary]" placeholder="Ex: Módulo 1 - Introdução" />
              </div>
              <Button type="submit" disabled={isSavingModule} className="w-full bg-[--color-brand-primary] text-white hover:bg-[#3b8780] py-6 rounded-xl">
                {isSavingModule ? <Loader2 className="w-5 h-5 animate-spin" /> : "Salvar Módulo"}
              </Button>
            </form>
          </motion.div>
        </div>
      )}

      {/* Lesson Modal */}
      {isLessonModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-[#070d0c] border border-white/10 rounded-3xl p-6 w-full max-w-md relative shadow-2xl">
            <button onClick={() => setLessonModalOpen(false)} className="absolute top-4 right-4 text-white/40 hover:text-white"><X className="w-5 h-5"/></button>
            <h2 className="text-xl font-bold text-white mb-6">Nova Aula</h2>
            <form onSubmit={handleCreateLesson} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-white/70 mb-1">Título da Aula</label>
                <input required autoFocus value={lessonTitle} onChange={e => setLessonTitle(e.target.value)} type="text" className="w-full px-4 py-3 rounded-xl bg-black/50 border border-white/10 text-white focus:outline-none focus:border-[--color-brand-primary]" placeholder="Ex: Como configurar sua conta" />
              </div>
              <div>
                <label className="block text-sm font-medium text-white/70 mb-1">Link do Youtube (Opcional)</label>
                <input value={lessonVideo} onChange={e => setLessonVideo(e.target.value)} type="url" className="w-full px-4 py-3 rounded-xl bg-black/50 border border-white/10 text-white focus:outline-none focus:border-[--color-brand-primary]" placeholder="https://youtube.com/watch?v=..." />
              </div>
              <Button type="submit" disabled={isSavingLesson} className="w-full bg-[--color-brand-primary] text-white hover:bg-[#3b8780] py-6 rounded-xl mt-4">
                {isSavingLesson ? <Loader2 className="w-5 h-5 animate-spin" /> : "Salvar Aula"}
              </Button>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}
