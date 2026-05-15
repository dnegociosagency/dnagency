import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/session";

export async function GET() {
  try {
    const user = await getCurrentUser();
    
    if (!user || (user.role !== "ADMIN" && user.role !== "INSTRUCTOR")) {
      return NextResponse.json({ message: "Acesso Negado." }, { status: 403 });
    }

    // Buscar contagens
    const totalStudents = await prisma.user.count({
      where: { role: "STUDENT" }
    });

    const activeCourses = await prisma.course.count({
      where: { isPublished: true }
    });

    const issuedCertificates = await prisma.certificate.count();

    // Calcular horas assistidas
    const progressStats = await prisma.progress.aggregate({
      _sum: {
        watchedSeconds: true
      }
    });
    const hoursWatched = Math.floor((progressStats._sum.watchedSeconds || 0) / 3600);

    // Calcular receita (baseado em UserCourse * preco do curso) - simplificado
    const userCourses = await prisma.userCourse.findMany({
      include: { course: true }
    });
    const revenue = userCourses.reduce((acc, uc) => {
      return acc + Number(uc.course.price || 0);
    }, 0);

    // Alunos online (baseado em sessoes recentes)
    const onlineStudents = await prisma.session.count({
      where: {
        expiresAt: { gt: new Date() }
      }
    });

    // Últimos acessos (baseado em progressos recentes ou matriculas)
    const recentActivity = await prisma.progress.findMany({
      take: 4,
      orderBy: { updatedAt: "desc" },
      include: {
        user: { select: { name: true } },
        lesson: { include: { module: { include: { course: { select: { title: true } } } } } }
      }
    });

    const formattedActivity = recentActivity.map((activity) => {
      // Calcular tempo relativo simplificado
      const diffMs = new Date().getTime() - new Date(activity.updatedAt).getTime();
      const diffMins = Math.floor(diffMs / 60000);
      let timeString = `Há ${diffMins} min`;
      if (diffMins > 60) {
        timeString = `Há ${Math.floor(diffMins / 60)} hora(s)`;
      }

      return {
        name: activity.user.name,
        time: timeString,
        course: activity.lesson?.module?.course?.title || "Curso Deletado"
      };
    });

    return NextResponse.json({
      metrics: {
        totalStudents,
        activeCourses,
        issuedCertificates,
        revenue,
        hoursWatched,
        onlineStudents
      },
      recentActivity: formattedActivity
    }, { status: 200 });

  } catch (error) {
    console.error("GET_METRICS_ERROR", error);
    return NextResponse.json({ message: "Erro ao buscar métricas." }, { status: 500 });
  }
}
