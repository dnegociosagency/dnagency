"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Play, Pause, Maximize, Volume2, Settings, CheckCircle2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLMSStore } from "@/lib/store";

export default function LessonPlayerPage({ params }: { params: { courseId: string, lessonId: string } }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0); // 0 to 100
  const [isCompleted, setIsCompleted] = useState(false);
  const [isCompleting, setIsCompleting] = useState(false);
  
  // Zustand Store
  const incrementWatched = useLMSStore(state => state.incrementWatchedSeconds);
  const resetWatched = useLMSStore(state => state.resetWatchedSeconds);

  // Simula o tempo de reprodução do vídeo
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying && progress < 100) {
      interval = setInterval(() => {
        setProgress(p => {
          const next = p + 1; // Incrementa 1% a cada segundo na simulação
          incrementWatched(1); // Incrementa 1 segundo no estado global
          return next;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, progress, incrementWatched]);

  // Ao montar, reseta o tempo da aula atual
  useEffect(() => {
    resetWatched();
  }, [params.lessonId, resetWatched]);

  const handleCompleteLesson = async () => {
    setIsCompleting(true);
    
    // Simulação da chamada da API Strict construída na Fase 2
    // const res = await fetch('/api/progress/complete', {
    //   method: 'POST',
    //   body: JSON.stringify({ lessonId: params.lessonId })
    // });
    
    // Simulação Visual
    setTimeout(() => {
      setIsCompleted(true);
      setIsCompleting(false);
    }, 1500);
  };

  return (
    <div className="flex flex-col h-full bg-[#040807]">
      {/* Video Area */}
      <div className="flex-1 relative flex items-center justify-center bg-black overflow-hidden group">
        {/* Placeholder para iframe do Vimeo/Panda/YouTube */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Fake Video Thumbnail / Background */}
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1616469829581-73993eb86b02?q=80&w=1920&auto=format&fit=crop')] bg-cover bg-center opacity-30" />
        
        {!isPlaying && (
          <button 
            onClick={() => setIsPlaying(true)}
            className="z-20 w-20 h-20 bg-[--color-brand-primary] text-white rounded-full flex items-center justify-center hover:scale-110 hover:bg-[#3b8780] transition-all shadow-[0_0_40px_rgba(47,107,101,0.5)]"
          >
            <Play className="w-8 h-8 ml-1" />
          </button>
        )}

        {/* Fake Video Controls */}
        <div className="absolute bottom-0 left-0 right-0 p-6 z-20 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          {/* Progress Bar */}
          <div className="w-full h-1.5 bg-white/20 rounded-full mb-4 cursor-pointer relative">
            <div 
              className="absolute left-0 top-0 h-full bg-[--color-brand-primary] rounded-full"
              style={{ width: `${progress}%` }}
            />
            <div 
              className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-lg"
              style={{ left: `calc(${progress}% - 6px)` }}
            />
          </div>
          
          <div className="flex items-center justify-between text-white">
            <div className="flex items-center gap-6">
              <button onClick={() => setIsPlaying(!isPlaying)} className="hover:text-[--color-brand-primary] transition-colors">
                {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
              </button>
              <div className="flex items-center gap-2">
                <Volume2 className="w-5 h-5 text-white/70 hover:text-white cursor-pointer" />
                <div className="w-20 h-1 bg-white/20 rounded-full">
                  <div className="w-1/2 h-full bg-white rounded-full" />
                </div>
              </div>
              <span className="text-sm font-medium text-white/70">
                00:{progress.toString().padStart(2, '0')} / 01:40
              </span>
            </div>
            
            <div className="flex items-center gap-6">
              <Settings className="w-5 h-5 text-white/70 hover:text-white cursor-pointer" />
              <Maximize className="w-5 h-5 text-white/70 hover:text-white cursor-pointer" />
            </div>
          </div>
        </div>
      </div>

      {/* Footer Details */}
      <div className="h-24 bg-[#070d0c] border-t border-white/5 flex items-center justify-between px-8 flex-shrink-0">
        <div>
          <h1 className="text-xl font-bold text-white mb-1">Boas-vindas e Mindset</h1>
          <p className="text-sm text-white/50">Módulo 1 • Aula 1</p>
        </div>
        
        <div className="flex gap-4">
          {isCompleted ? (
            <Button className="bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 border border-emerald-500/20 rounded-full px-6 pointer-events-none">
              <CheckCircle2 className="w-5 h-5 mr-2" /> Concluída
            </Button>
          ) : (
            <Button 
              onClick={handleCompleteLesson}
              disabled={isCompleting || progress < 90}
              className={`rounded-full px-8 transition-all duration-300 ${
                progress >= 90 
                  ? "bg-[--color-brand-primary] text-white hover:bg-[#3b8780] shadow-[0_0_20px_rgba(47,107,101,0.3)]" 
                  : "bg-white/5 text-white/30 border border-white/10"
              }`}
            >
              {isCompleting ? (
                <span className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                  Validando...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  Marcar como Concluída
                  {progress < 90 && <span className="text-xs ml-2 opacity-50">({progress}%)</span>}
                </span>
              )}
            </Button>
          )}

          <Button className="bg-white text-black hover:bg-white/90 rounded-full px-6 group">
            Próxima <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </div>
  );
}
