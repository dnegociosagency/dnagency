import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/session";

export async function PATCH(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const user = await getCurrentUser();
    if (!user || (user.role !== "ADMIN" && user.role !== "MODERATOR")) {
      return NextResponse.json({ message: "Acesso Negado." }, { status: 403 });
    }

    const { id } = await context.params;
    const body = await req.json();

    if (body.action === "toggle_block") {
      const targetUser = await prisma.user.findUnique({ where: { id } });
      if (!targetUser) {
        return NextResponse.json({ message: "Usuário não encontrado" }, { status: 404 });
      }

      // Prevenir que um admin bloqueie a si mesmo
      if (targetUser.id === user.id) {
        return NextResponse.json({ message: "Você não pode bloquear a si mesmo." }, { status: 400 });
      }

      const newDeletedAt = targetUser.deletedAt ? null : new Date();

      await prisma.user.update({
        where: { id },
        data: { deletedAt: newDeletedAt }
      });

      return NextResponse.json({ message: "Status alterado com sucesso" });
    }

    return NextResponse.json({ message: "Ação não reconhecida" }, { status: 400 });
  } catch (error) {
    console.error("PATCH_USER_ERROR", error);
    return NextResponse.json({ message: "Erro interno." }, { status: 500 });
  }
}
