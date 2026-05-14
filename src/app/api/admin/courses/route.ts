import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/session";

// GET all courses
export async function GET(req: Request) {
  try {
    const user = await getCurrentUser();
    
    if (!user || (user.role !== "ADMIN" && user.role !== "INSTRUCTOR")) {
      return NextResponse.json({ message: "Acesso Negado." }, { status: 403 });
    }

    const courses = await prisma.course.findMany({
      include: {
        _count: {
          select: { modules: true, enrollments: true }
        }
      },
      orderBy: { createdAt: "desc" }
    });

    return NextResponse.json(courses, { status: 200 });
  } catch (error) {
    console.error("GET_COURSES_ERROR", error);
    return NextResponse.json({ message: "Erro ao buscar cursos." }, { status: 500 });
  }
}

// POST create course
export async function POST(req: Request) {
  try {
    const user = await getCurrentUser();
    
    if (!user || (user.role !== "ADMIN" && user.role !== "INSTRUCTOR")) {
      return NextResponse.json({ message: "Acesso Negado." }, { status: 403 });
    }

    const body = await req.json();
    const { title, description, thumbnail } = body;

    if (!title || !description) {
      return NextResponse.json({ message: "Título e descrição são obrigatórios." }, { status: 400 });
    }

    const course = await prisma.course.create({
      data: {
        title,
        slug: title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''),
        description,
        thumbnail,
        price: 0,
        instructorId: user.id
      }
    });

    return NextResponse.json(course, { status: 201 });
  } catch (error) {
    console.error("CREATE_COURSE_ERROR", error);
    return NextResponse.json({ message: "Erro ao criar curso." }, { status: 500 });
  }
}
