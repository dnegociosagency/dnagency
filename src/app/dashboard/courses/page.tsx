import React from "react";
import { getCurrentUser } from "@/lib/session";
import { redirect } from "next/navigation";
import { PlayCircle, Clock, Lock, BookOpen } from "lucide-react";
import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function CoursesPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  // Buscar cursos que o usuário tem acesso
  const userCourses = await prisma.userCourse.findMany({
    where: { userId: user.id, isActive: true },
    include: {
      course: {
        include: {
          modules: {
            include: {
              lessons: true
            }
          }
        }
      }
    }
  });

  // Buscar progresso global do usuário
  const userProgress = await prisma.progress.findMany({
    where: { userId: user.id, isCompleted: true }
  });
  const completedLessonIds = new Set(userProgress.map(p => p.lessonId));

  const courses = userCourses.map(uc => {
    const course = uc.course;
    
    // Contar total de aulas
    const totalLessons = course.modules.reduce((acc, module) => acc + module.lessons.length, 0);
    
    // Contar aulas concluídas deste curso
    const courseLessonIds = course.modules.flatMap(m => m.lessons.map(l => l.id));
    const completedLessons = courseLessonIds.filter(id => completedLessonIds.has(id)).length;
    
    // Calcular progresso (0-100)
    const progressPercentage = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;

    return {
      id: course.id,
      title: course.title,
      thumbnail: course.thumbnail || "",
      progress: progressPercentage,
      totalLessons,
      completedLessons,
      isLocked: false, // Como filtramos por isActive: true, nenhum está bloqueado
    };
  });

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-3xl font-black text-white tracking-tight">
          Meus Cursos
        </h1>
        <p className="text-white/50 mt-2">
          Acesse todo o conteúdo liberado para a sua conta.
        </p>
      </div>

      {courses.length === 0 ? (
        <div className="premium-card p-12 text-center flex flex-col items-center justify-center">
          <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-4">
            <BookOpen className="w-8 h-8 text-white/20" />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">Nenhum curso liberado</h3>
          <p className="text-white/50 max-w-md mx-auto mb-6">
            Você ainda não possui acesso a nenhum treinamento. Assim que sua matrícula for processada, seus cursos aparecerão aqui.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course) => (
            <Link 
              key={course.id} 
              href={course.isLocked ? "#" : `/academy/learn/${course.id}`}
              className={`block group relative bg-white/5 border border-white/10 rounded-3xl overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)] ${course.isLocked ? 'opacity-60 cursor-not-allowed' : ''}`}
            >
              {/* Thumbnail Placeholder */}
              <div className="w-full aspect-[4/3] bg-black/60 relative flex items-center justify-center overflow-hidden">
                {course.thumbnail ? (
                  <img src={course.thumbnail} alt={course.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a1211] to-transparent z-10" />
                )}
                {course.isLocked ? (
                  <Lock className="w-12 h-12 text-white/20 z-20" />
                ) : (
                  !course.thumbnail && <PlayCircle className="w-12 h-12 text-white/40 group-hover:text-[--color-brand-primary] group-hover:scale-110 transition-all z-20" />
                )}
              </div>

              {/* Content */}
              <div className="p-6 relative z-20 bg-gradient-to-b from-transparent to-[#0a1211] mt-[-20px] bg-[#0a1211]">
                <h3 className="text-xl font-bold text-white mb-4 line-clamp-2 leading-tight">
                  {course.title}
                </h3>
                
                <div className="flex items-center justify-between text-xs font-medium text-white/50 mb-4">
                  <div className="flex items-center gap-1.5">
                    <PlayCircle className="w-4 h-4" />
                    <span>{course.completedLessons}/{course.totalLessons} Aulas</span>
                  </div>
                  {course.progress > 0 && (
                    <div className="flex items-center gap-1.5 text-[--color-brand-primary]">
                      <Clock className="w-4 h-4" />
                      <span>Continuar</span>
                    </div>
                  )}
                </div>

                {/* Progress Bar */}
                <div className="w-full">
                  <div className="flex justify-between text-xs font-bold mb-2 text-white/70">
                    <span>Progresso</span>
                    <span>{course.progress}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-[--color-brand-primary] rounded-full transition-all duration-1000" 
                      style={{ width: `${course.progress}%` }} 
                    />
                  </div>
                </div>
              </div>

              {course.isLocked && (
                 <div className="absolute top-4 right-4 bg-black/80 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded-full flex items-center gap-2 z-30">
                   <Lock className="w-3 h-3 text-white/70" />
                   <span className="text-[10px] font-bold text-white/70 uppercase tracking-widest">Bloqueado</span>
                 </div>
              )}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
