import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { getCurrentUser } from "@/lib/session";

const updateLessonSchema = z.object({
  title: z.string().min(2, "Título deve ter no mínimo 2 caracteres").optional(),
  content: z.string().optional(),
  videoUrl: z.string().url("URL de vídeo inválida").optional().or(z.literal("")),
  duration: z.number().int().nonnegative().optional(),
  order: z.number().int().nonnegative().optional(),
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

// PATCH: Update Lesson
export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  try {
    const user = await getCurrentUser();
    if (!user || (user.role !== "ADMIN" && user.role !== "INSTRUCTOR")) {
      return NextResponse.json({ message: "Acesso Negado." }, { status: 403 });
    }

    const body = await req.json();
    const result = updateLessonSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json({ message: "Dados inválidos", details: result.error.flatten().fieldErrors }, { status: 400 });
    }

    const lessonData = await prisma.lesson.findUnique({ where: { id: params.id } });
    if (!lessonData) {
      return NextResponse.json({ message: "Aula não encontrada" }, { status: 404 });
    }

    const { videoUrl, ...otherData } = result.data;
    
    let embedUrl = lessonData.embedUrl;
    if (videoUrl !== undefined) {
      embedUrl = getYoutubeEmbedUrl(videoUrl);
    }

    const updatedLesson = await prisma.lesson.update({
      where: { id: params.id },
      data: {
        ...otherData,
        ...(videoUrl !== undefined && { videoUrl }),
        ...(videoUrl !== undefined && { embedUrl }),
      }
    });

    return NextResponse.json({ success: true, lesson: updatedLesson }, { status: 200 });
  } catch (error) {
    console.error("UPDATE_LESSON_ERROR", error);
    return NextResponse.json({ message: "Erro ao atualizar aula." }, { status: 500 });
  }
}

// DELETE: Delete Lesson
export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const user = await getCurrentUser();
    if (!user || (user.role !== "ADMIN" && user.role !== "INSTRUCTOR")) {
      return NextResponse.json({ message: "Acesso Negado." }, { status: 403 });
    }

    const lessonData = await prisma.lesson.findUnique({ where: { id: params.id } });
    if (!lessonData) {
      return NextResponse.json({ message: "Aula não encontrada" }, { status: 404 });
    }

    await prisma.lesson.delete({ where: { id: params.id } });

    return NextResponse.json({ success: true, message: "Aula deletada" }, { status: 200 });
  } catch (error) {
    console.error("DELETE_LESSON_ERROR", error);
    return NextResponse.json({ message: "Erro ao deletar aula." }, { status: 500 });
  }
}
