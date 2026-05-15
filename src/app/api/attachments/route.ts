import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { getCurrentUser } from "@/lib/session";

const createAttachmentSchema = z.object({
  lessonId: z.string().uuid("ID da aula inválido"),
  fileName: z.string().min(2, "Nome do arquivo deve ter no mínimo 2 caracteres"),
  fileUrl: z.string().url("URL do arquivo inválida"),
  mimeType: z.string().optional(),
  size: z.number().int().nonnegative().optional(),
});

// POST: Create Attachment (URL based)
export async function POST(req: Request) {
  try {
    const user = await getCurrentUser();
    if (!user || (user.role !== "ADMIN" && user.role !== "INSTRUCTOR")) {
      return NextResponse.json({ message: "Acesso Negado." }, { status: 403 });
    }

    const body = await req.json();
    const result = createAttachmentSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json({ message: "Dados inválidos", details: result.error.flatten().fieldErrors }, { status: 400 });
    }

    const { lessonId, fileName, fileUrl, mimeType, size } = result.data;

    // Verificar se aula existe
    const lessonData = await prisma.lesson.findUnique({ where: { id: lessonId } });
    if (!lessonData) {
      return NextResponse.json({ message: "Aula não encontrada" }, { status: 404 });
    }

    const newAttachment = await prisma.attachment.create({
      data: {
        lessonId,
        fileName,
        fileUrl,
        mimeType: mimeType || "application/pdf",
        size: size || null
      }
    });

    return NextResponse.json({ success: true, attachment: newAttachment }, { status: 201 });
  } catch (error) {
    console.error("CREATE_ATTACHMENT_ERROR", error);
    return NextResponse.json({ message: "Erro ao criar anexo." }, { status: 500 });
  }
}

// DELETE: Delete Attachment
export async function DELETE(req: Request) {
  try {
    const user = await getCurrentUser();
    if (!user || (user.role !== "ADMIN" && user.role !== "INSTRUCTOR")) {
      return NextResponse.json({ message: "Acesso Negado." }, { status: 403 });
    }

    const { searchParams } = new URL(req.url);
    const attachmentId = searchParams.get("id");

    if (!attachmentId) {
      return NextResponse.json({ message: "ID do anexo é obrigatório" }, { status: 400 });
    }

    const attachmentData = await prisma.attachment.findUnique({ where: { id: attachmentId } });
    if (!attachmentData) {
      return NextResponse.json({ message: "Anexo não encontrado" }, { status: 404 });
    }

    await prisma.attachment.delete({ where: { id: attachmentId } });

    return NextResponse.json({ success: true, message: "Anexo deletado" }, { status: 200 });
  } catch (error) {
    console.error("DELETE_ATTACHMENT_ERROR", error);
    return NextResponse.json({ message: "Erro ao deletar anexo." }, { status: 500 });
  }
}
