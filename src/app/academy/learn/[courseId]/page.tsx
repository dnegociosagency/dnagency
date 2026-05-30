import React from "react";
import { getCurrentUser } from "@/lib/session";
import { redirect } from "next/navigation";
import Link from "next/link";
import { ChevronLeft, PlayCircle, FileText, CheckCircle2, MessageCircle } from "lucide-react";

export default async function CoursePlayerPage({
  params
}: {
  params: Promise<{ courseId: string }>
}) {
  const { courseId } = await params;
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  // Mock data for the layout structure
  const course = {
    title: "DN Method: Scaling Sales",
    modules: [
      {
        id: "m1",
        title: "Module 1: Conversion Fundamentals",
        lessons: [
          { id: "l1", title: "The scaling mindset", duration: "12:45", isCompleted: true },
          { id: "l2", title: "Designing your core funnel", duration: "24:10", isCompleted: true },
          { id: "l3", title: "Metrics that matter", duration: "18:20", isCompleted: false },
        ]
      },
      {
        id: "m2",
        title: "Module 2: The VSL System",
        lessons: [
          { id: "l4", title: "Perfect VSL Structure", duration: "45:00", isCompleted: false },
          { id: "l5", title: "Advanced Mental Triggers", duration: "32:15", isCompleted: false },
        ]
      }
    ]
  };

  return (
    <div className="h-screen flex flex-col bg-[#040807] text-white font-sans overflow-hidden">
      {/* Top Navbar */}
      <header className="h-16 border-b border-white/5 bg-[#070d0c] flex items-center justify-between px-6 shrink-0 z-20">
        <div className="flex items-center gap-4">
          <Link href="/dashboard/courses" className="p-2 hover:bg-white/5 rounded-full transition-colors">
            <ChevronLeft className="w-5 h-5 text-white/50" />
          </Link>
          <div>
            <h1 className="text-sm font-bold truncate max-w-xs md:max-w-md">{course.title}</h1>
            <p className="text-xs text-[--color-brand-primary]">Progress: 45%</p>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <button className="hidden md:flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 rounded-full text-sm font-medium transition-colors">
            <MessageCircle className="w-4 h-4" /> Support
          </button>
        </div>
      </header>

      {/* Main Layout */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden relative">
        
        {/* Video Area (Main) */}
        <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
          {/* 16:9 Video Player Container */}
          <div className="w-full bg-black aspect-video relative flex items-center justify-center border-b border-white/5 shadow-2xl">
            {/* Fake Video Player for UI structure */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10 pointer-events-none" />
            <PlayCircle className="w-16 h-16 text-white/30 z-0" />
            
            {/* Fake Player Controls */}
            <div className="absolute bottom-0 inset-x-0 p-4 z-20 flex flex-col gap-2">
               <div className="w-full h-1 bg-white/20 rounded-full cursor-pointer">
                 <div className="w-1/3 h-full bg-[--color-brand-primary] rounded-full relative">
                   <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-[0_0_10px_rgba(47,107,101,1)]" />
                 </div>
               </div>
               <div className="flex justify-between text-xs text-white/70 font-medium">
                 <span>04:12 / 18:20</span>
                 <span>HD • Speed 1x</span>
               </div>
            </div>
          </div>

          {/* Lesson Content Area */}
          <div className="max-w-4xl mx-auto w-full p-6 md:p-10">
            <h2 className="text-3xl font-black mb-4">Metrics That Matter</h2>
            
            {/* Tabs */}
            <div className="flex items-center gap-6 border-b border-white/10 mb-8">
              <button className="pb-3 text-sm font-bold text-[--color-brand-primary] border-b-2 border-[--color-brand-primary]">
                Overview
              </button>
              <button className="pb-3 text-sm font-bold text-white/40 hover:text-white transition-colors border-b-2 border-transparent">
                Supplementary Materials
              </button>
            </div>

            <div className="prose prose-invert prose-emerald max-w-none">
              <p className="text-white/70 leading-relaxed text-lg">
                In this class, we will break down the key KPIs (Key Performance Indicators) that you need to track daily to ensure your sales funnel is not bleeding money. Forget vanity metrics.
              </p>
              
              <div className="mt-8 p-6 bg-white/5 border border-[--color-brand-primary]/20 rounded-2xl flex items-start gap-4">
                <FileText className="w-6 h-6 text-[--color-brand-primary] shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold text-white mb-1">KPI Control Spreadsheet.xlsx</h4>
                  <p className="text-sm text-white/50 mb-3">Download the official spreadsheet used at DN Agency for daily tracking.</p>
                  <button className="text-sm font-bold text-[--color-brand-primary] hover:text-white transition-colors">
                    Download
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Sidebar (Modules List) */}
        <aside className="w-full md:w-80 lg:w-96 bg-[#070d0c] border-l border-white/5 flex flex-col flex-shrink-0 z-10 shadow-[-20px_0_50px_rgba(0,0,0,0.5)]">
          <div className="p-4 border-b border-white/5 bg-black/20">
            <h3 className="font-bold text-sm uppercase tracking-widest text-white/50">Course Content</h3>
          </div>
          
          <div className="flex-1 overflow-y-auto">
            {course.modules.map((module) => (
              <div key={module.id} className="border-b border-white/5 last:border-0">
                <div className="p-4 bg-white/[0.02] cursor-pointer hover:bg-white/[0.04] transition-colors">
                  <h4 className="font-bold text-sm">{module.title}</h4>
                </div>
                <div>
                  {module.lessons.map((lesson) => (
                    <button 
                      key={lesson.id}
                      className={`w-full flex items-start gap-3 p-4 hover:bg-white/5 transition-colors text-left ${lesson.id === 'l3' ? 'bg-[--color-brand-primary]/10 border-l-2 border-[--color-brand-primary]' : 'border-l-2 border-transparent'}`}
                    >
                      {lesson.isCompleted ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                      ) : (
                        <div className="w-5 h-5 rounded-full border border-white/20 shrink-0 flex items-center justify-center">
                          {lesson.id === 'l3' && <div className="w-2 h-2 bg-[--color-brand-primary] rounded-full" />}
                        </div>
                      )}
                      <div>
                        <p className={`text-sm ${lesson.id === 'l3' ? 'text-white font-bold' : 'text-white/70'}`}>
                          {lesson.title}
                        </p>
                        <p className="text-xs text-white/30 mt-1 flex items-center gap-1">
                          <PlayCircle className="w-3 h-3" /> {lesson.duration}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </aside>

      </div>
    </div>
  );
}
