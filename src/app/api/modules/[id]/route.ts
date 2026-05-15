import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { getCurrentUser } from "@/lib/session";

const updateModuleSchema = z.object({
  title: z.string().min(2, "Título deve ter no mínimo 2 caracteres").optional(),
  order: z.number().int().nonnegative().optional(),
  isLocked: z.boolean().optional(),
});

// PATCH: Update Module
export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  try {
    const user = await getCurrentUser();
    if (!user || (user.role !== "ADMIN" && user.role !== "INSTRUCTOR")) {
      return NextResponse.json({ message: "Acesso Negado." }, { status: 403 });
    }

    const body = await req.json();
    const result = updateModuleSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json({ message: "Dados inválidos", details: result.error.flatten().fieldErrors }, { status: 400 });
    }

    const moduleData = await prisma.module.findUnique({ where: { id: params.id } });
    if (!moduleData) {
      return NextResponse.json({ message: "Módulo não encontrado" }, { status: 404 });
    }

    const updatedModule = await prisma.module.update({
      where: { id: params.id },
      data: result.data
    });

    return NextResponse.json({ success: true, module: updatedModule }, { status: 200 });
  } catch (error) {
    console.error("UPDATE_MODULE_ERROR", error);
    return NextResponse.json({ message: "Erro ao atualizar módulo." }, { status: 500 });
  }
}

// DELETE: Delete Module
export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const user = await getCurrentUser();
    if (!user || (user.role !== "ADMIN" && user.role !== "INSTRUCTOR")) {
      return NextResponse.json({ message: "Acesso Negado." }, { status: 403 });
    }

    const moduleData = await prisma.module.findUnique({ where: { id: params.id } });
    if (!moduleData) {
      return NextResponse.json({ message: "Módulo não encontrado" }, { status: 404 });
    }

    await prisma.module.delete({ where: { id: params.id } });

    return NextResponse.json({ success: true, message: "Módulo deletado" }, { status: 200 });
  } catch (error) {
    console.error("DELETE_MODULE_ERROR", error);
    return NextResponse.json({ message: "Erro ao deletar módulo." }, { status: 500 });
  }
}
