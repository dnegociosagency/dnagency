import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const completeSchema = z.object({
  lessonId: z.string().uuid(),
});

export async function POST(request: Request) {
  try {
    const userId = request.headers.get("x-user-id");

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const result = completeSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json({ error: "Invalid data", details: result.error.errors }, { status: 400 });
    }

    const { lessonId } = result.data;

    // 1. Busca a aula e o progresso atual do aluno
    const lesson = await prisma.lesson.findUnique({
      where: { id: lessonId },
      include: { module: { include: { course: true } } }
    });

    if (!lesson) {
      return NextResponse.json({ error: "Lesson not found" }, { status: 404 });
    }

    const progress = await prisma.progress.findUnique({
      where: {
        userId_lessonId: { userId, lessonId },
      },
    });

    // Validação estrita: O aluno assistiu pelo menos 90% da aula?
    // Se a aula não tiver duração cadastrada, vamos flexibilizar, mas idealmente todas têm.
    if (lesson.duration && lesson.duration > 0) {
      const minRequiredSeconds = lesson.duration * 0.9;
      const watched = progress?.watchedSeconds || 0;
      
      if (watched < minRequiredSeconds) {
        return NextResponse.json({ 
          error: "Você precisa assistir pelo menos 90% da aula para marcá-la como concluída.",
          required: minRequiredSeconds,
          watched
        }, { status: 403 }); // 403 Forbidden para bloqueio de regra de negócio
      }
    }

    // 2. Marca como concluída
    const updatedProgress = await prisma.progress.upsert({
      where: {
        userId_lessonId: { userId, lessonId },
      },
      update: {
        isCompleted: true,
      },
      create: {
        userId,
        lessonId,
        watchedSeconds: lesson.duration || 0,
        isCompleted: true,
      },
    });

    // 3. (Opcional Futuro) Verificar se o curso inteiro foi concluído para emissão do certificado
    // const allLessonsInCourse = ...
    // const allCompleted = ...
    // if (allCompleted) generateCertificate()

    return NextResponse.json({ success: true, progress: updatedProgress }, { status: 200 });
  } catch (error) {
    console.error("Complete Lesson Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
