import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const createCourseSchema = z.object({
  title: z.string().min(3),
  description: z.string().optional(),
  price: z.number().nonnegative(),
  thumbnail: z.string().url().optional().or(z.literal("")),
});

// GET: Lista todos os cursos (Com filtro para estudantes x Admins)
export async function GET(request: Request) {
  try {
    const role = request.headers.get("x-user-role");
    const userId = request.headers.get("x-user-id");
    
    // Se for estudante, retorna apenas cursos publicados
    const where = role === "STUDENT" ? { isPublished: true } : {};

    const courses = await prisma.course.findMany({
      where,
      include: {
        _count: {
          select: { modules: true, enrollments: true }
        }
      },
      orderBy: { createdAt: "desc" }
    });

    return NextResponse.json({ courses });
  } catch (error) {
    console.error("GET Courses Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// POST: Criar um curso (Apenas ADMIN ou MODERATOR)
export async function POST(request: Request) {
  try {
    const role = request.headers.get("x-user-role");
    const userId = request.headers.get("x-user-id");

    if (role !== "ADMIN" && role !== "MODERATOR") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const body = await request.json();
    const result = createCourseSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json({ error: "Invalid data", details: result.error.flatten().fieldErrors }, { status: 400 });
    }

    const { title, description, price, thumbnail } = result.data;
    
    // Gera um slug simples
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");

    const course = await prisma.course.create({
      data: {
        title,
        slug,
        description,
        price,
        thumbnail: thumbnail || null,
        instructorId: userId as string, // Quem criou é o instrutor por padrão
        isPublished: false // Cursos nascem como rascunhos
      }
    });

    return NextResponse.json({ success: true, course }, { status: 201 });
  } catch (error) {
    console.error("POST Course Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
