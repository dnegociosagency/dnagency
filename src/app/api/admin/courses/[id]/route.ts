import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/session";

// GET one course
export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const user = await getCurrentUser();
    
    if (!user || (user.role !== "ADMIN" && user.role !== "INSTRUCTOR")) {
      return NextResponse.json({ message: "Acesso Negado." }, { status: 403 });
    }

    const course = await prisma.course.findUnique({
      where: { id },
      include: {
        modules: {
          include: { lessons: true }
        }
      }
    });

    if (!course) {
      return NextResponse.json({ message: "Curso não encontrado." }, { status: 404 });
    }

    return NextResponse.json(course, { status: 200 });
  } catch (error) {
    console.error("GET_COURSE_ERROR", error);
    return NextResponse.json({ message: "Erro ao buscar curso." }, { status: 500 });
  }
}

// PUT update course
export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const user = await getCurrentUser();
    
    if (!user || (user.role !== "ADMIN" && user.role !== "INSTRUCTOR")) {
      return NextResponse.json({ message: "Acesso Negado." }, { status: 403 });
    }

    const body = await req.json();
    const { title, description, thumbnail } = body;

    const course = await prisma.course.update({
      where: { id },
      data: {
        title,
        description,
        thumbnail
      }
    });

    return NextResponse.json(course, { status: 200 });
  } catch (error) {
    console.error("UPDATE_COURSE_ERROR", error);
    return NextResponse.json({ message: "Erro ao atualizar curso." }, { status: 500 });
  }
}

// DELETE course
export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const user = await getCurrentUser();
    
    if (!user || (user.role !== "ADMIN" && user.role !== "INSTRUCTOR")) {
      return NextResponse.json({ message: "Acesso Negado." }, { status: 403 });
    }

    await prisma.course.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Curso excluído com sucesso." }, { status: 200 });
  } catch (error) {
    console.error("DELETE_COURSE_ERROR", error);
    return NextResponse.json({ message: "Erro ao excluir curso." }, { status: 500 });
  }
}
