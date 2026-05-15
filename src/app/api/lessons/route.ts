import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { getCurrentUser } from "@/lib/session";

const createLessonSchema = z.object({
  moduleId: z.string().uuid("ID do módulo inválido"),
  title: z.string().min(2, "Título deve ter no mínimo 2 caracteres"),
  content: z.string().optional(),
  videoUrl: z.string().url("URL de vídeo inválida").optional().or(z.literal("")),
  duration: z.number().int().nonnegative().optional(),
});

function getYoutubeEmbedUrl(url: string | undefined): string | null {
  if (!url) return null;
  let videoId = "";
  try {
    const parsedUrl = new URL(url);
    if (parsedUrl.hostname.includes("youtube.com")) {
      videoId = parsedUrl.searchParams.get("v") || "";
    } else if (parsedUrl.hostname.includes("youtu.be")) {
      videoId = parsedUrl.pathname.slice(1);
    }
  } catch (e) {
    return null;
  }
  return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
}

// POST: Create Lesson
export async function POST(req: Request) {
  try {
    const user = await getCurrentUser();
    if (!user || (user.role !== "ADMIN" && user.role !== "INSTRUCTOR")) {
      return NextResponse.json({ message: "Acesso Negado." }, { status: 403 });
    }

    const body = await req.json();
    const result = createLessonSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json({ message: "Dados inválidos", details: result.error.flatten().fieldErrors }, { status: 400 });
    }

    const { moduleId, title, content, videoUrl, duration } = result.data;

    // Verificar se módulo existe
    const moduleData = await prisma.module.findUnique({ where: { id: moduleId } });
    if (!moduleData) {
      return NextResponse.json({ message: "Módulo não encontrado" }, { status: 404 });
    }

    // Achar o último order
    const lastLesson = await prisma.lesson.findFirst({
      where: { moduleId },
      orderBy: { order: "desc" },
    });
    const newOrder = lastLesson ? lastLesson.order + 1 : 1;

    // Converte Youtube URL para Embed
    const embedUrl = videoUrl ? getYoutubeEmbedUrl(videoUrl) : null;

    const newLesson = await prisma.lesson.create({
      data: {
        title,
        content,
        moduleId,
        videoUrl: videoUrl || null,
        embedUrl: embedUrl || null,
        duration: duration || 0,
        order: newOrder
      }
    });

    return NextResponse.json({ success: true, lesson: newLesson }, { status: 201 });
  } catch (error) {
    console.error("CREATE_LESSON_ERROR", error);
    return NextResponse.json({ message: "Erro ao criar aula." }, { status: 500 });
  }
}

// GET: List Lessons (by moduleId)
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const moduleId = searchParams.get("moduleId");

    if (!moduleId) {
      return NextResponse.json({ message: "moduleId é obrigatório" }, { status: 400 });
    }

    const lessons = await prisma.lesson.findMany({
      where: { moduleId },
      include: {
        attachments: true
      },
      orderBy: { order: "asc" }
    });

    return NextResponse.json({ success: true, lessons }, { status: 200 });
  } catch (error) {
    console.error("GET_LESSONS_ERROR", error);
    return NextResponse.json({ message: "Erro ao listar aulas." }, { status: 500 });
  }
}
