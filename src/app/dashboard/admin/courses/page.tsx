"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, GripVertical, Settings, Video, FileText, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CourseBuilderPage() {
  const [modules, setModules] = useState([
    {
      id: "m1", title: "Módulo 1: Fundamentos", lessons: [
        { id: "l1", title: "Boas-vindas e Mindset", type: "video" },
        { id: "l2", title: "O que é Performance?", type: "video" }
      ]
    },
    {
      id: "m2", title: "Módulo 2: Tráfego Pago na Prática", lessons: [
        { id: "l3", title: "Configurando o BM", type: "video" },
        { id: "l4", title: "Material Complementar", type: "pdf" }
      ]
    }
  ]);

  return (
    <div className="space-y-8 p-4">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">
            Course Builder
          </h1>
          <p className="text-sm text-white/50 mt-1">Crie, reorganize e gerencie as aulas do curso.</p>
        </div>
        <div className="flex gap-3">
          <Button className="bg-white/5 text-white hover:bg-white/10 rounded-full px-6">
            Configurações
          </Button>
          <Button className="bg-[--color-brand-primary] text-white hover:bg-[#3b8780] rounded-full px-6">
            <Plus className="w-4 h-4 mr-2" /> Novo Módulo
          </Button>
        </div>
      </div>

      <div className="max-w-4xl">
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
                    {module.lessons.length} Aulas
                  </span>
                  <ChevronDown className="w-5 h-5 text-white/40" />
                </div>
              </div>

              {/* Lessons List (Placeholder for Drag & Drop context) */}
              <div className="p-2 space-y-1 bg-black/20">
                {module.lessons.map((lesson) => (
                  <div key={lesson.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-white/5 group border border-transparent hover:border-white/5 transition-all">
                    <div className="flex items-center gap-3">
                      <GripVertical className="w-4 h-4 text-white/10 cursor-grab opacity-0 group-hover:opacity-100 transition-opacity" />
                      <div className={`p-1.5 rounded-md ${lesson.type === 'video' ? 'bg-blue-500/20 text-blue-400' : 'bg-rose-500/20 text-rose-400'}`}>
                        {lesson.type === 'video' ? <Video className="w-4 h-4" /> : <FileText className="w-4 h-4" />}
                      </div>
                      <span className="text-sm font-medium text-white/80">{lesson.title}</span>
                    </div>
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-white/50 hover:text-white">
                        <Settings className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
                
                <button className="w-full mt-2 py-3 rounded-lg border border-dashed border-white/10 text-white/40 text-sm font-medium flex items-center justify-center gap-2 hover:bg-white/5 hover:text-white/70 hover:border-white/20 transition-all">
                  <Plus className="w-4 h-4" /> Adicionar Aula
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
