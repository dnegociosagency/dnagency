import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { getCurrentUser } from "@/lib/session";

const createModuleSchema = z.object({
  title: z.string().min(2, "Título deve ter no mínimo 2 caracteres"),
  courseId: z.string().uuid("ID do curso inválido"),
});

// POST: Create Module
export async function POST(req: Request) {
  try {
    const user = await getCurrentUser();
    if (!user || (user.role !== "ADMIN" && user.role !== "INSTRUCTOR")) {
      return NextResponse.json({ message: "Acesso Negado." }, { status: 403 });
    }

    const body = await req.json();
    const result = createModuleSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json({ message: "Dados inválidos", details: result.error.flatten().fieldErrors }, { status: 400 });
    }

    const { title, courseId } = result.data;

    // Verificar se curso existe
    const course = await prisma.course.findUnique({ where: { id: courseId } });
    if (!course) {
      return NextResponse.json({ message: "Curso não encontrado" }, { status: 404 });
    }

    // Achar o último order
    const lastModule = await prisma.module.findFirst({
      where: { courseId },
      orderBy: { order: "desc" },
    });
    const newOrder = lastModule ? lastModule.order + 1 : 1;

    const newModule = await prisma.module.create({
      data: {
        title,
        courseId,
        order: newOrder,
        isLocked: false
      }
    });

    return NextResponse.json({ success: true, module: newModule }, { status: 201 });
  } catch (error) {
    console.error("CREATE_MODULE_ERROR", error);
    return NextResponse.json({ message: "Erro ao criar módulo." }, { status: 500 });
  }
}

// GET: List Modules (by courseId)
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const courseId = searchParams.get("courseId");

    if (!courseId) {
      return NextResponse.json({ message: "courseId é obrigatório" }, { status: 400 });
    }

    const modules = await prisma.module.findMany({
      where: { courseId },
      include: {
        lessons: {
          orderBy: { order: "asc" }
        }
      },
      orderBy: { order: "asc" }
    });

    return NextResponse.json({ success: true, modules }, { status: 200 });
  } catch (error) {
    console.error("GET_MODULES_ERROR", error);
    return NextResponse.json({ message: "Erro ao listar módulos." }, { status: 500 });
  }
}
