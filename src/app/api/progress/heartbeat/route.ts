import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const heartbeatSchema = z.object({
  lessonId: z.string().uuid(),
  watchedSeconds: z.number().int().nonnegative(),
});

export async function POST(request: Request) {
  try {
    const userId = request.headers.get("x-user-id");

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const result = heartbeatSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json({ error: "Invalid data", details: result.error.flatten().fieldErrors }, { status: 400 });
    }

    const { lessonId, watchedSeconds } = result.data;

    // Garante que o progresso existe ou cria um novo
    const progress = await prisma.progress.upsert({
      where: {
        userId_lessonId: {
          userId,
          lessonId,
        },
      },
      update: {
        // Não sobrescreve isCompleted se já for true
        // Atualiza watchedSeconds apenas se for maior que o salvo (previne retrocesso via exploit)
        watchedSeconds: {
          set: watchedSeconds
        }
      },
      create: {
        userId,
        lessonId,
        watchedSeconds,
        isCompleted: false,
      },
    });

    return NextResponse.json({ success: true, progress }, { status: 200 });
  } catch (error) {
    console.error("Heartbeat Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
