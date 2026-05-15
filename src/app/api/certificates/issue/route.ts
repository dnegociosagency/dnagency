import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import { z } from "zod";

const issueCertSchema = z.object({
  courseId: z.string().uuid(),
});

export async function POST(request: Request) {
  try {
    const userId = request.headers.get("x-user-id");

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const result = issueCertSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json({ error: "Invalid data", details: result.error.flatten().fieldErrors }, { status: 400 });
    }

    const { courseId } = result.data;

    // 1. Verificar se o curso existe e obter o total de aulas
    const course = await prisma.course.findUnique({
      where: { id: courseId },
      include: {
        modules: {
          include: {
            lessons: true
          }
        }
      }
    });

    if (!course) {
      return NextResponse.json({ error: "Course not found" }, { status: 404 });
    }

    const allLessons = course.modules.flatMap(m => m.lessons);
    const totalLessons = allLessons.length;

    if (totalLessons === 0) {
      return NextResponse.json({ error: "O curso não possui aulas para serem concluídas." }, { status: 400 });
    }

    // 2. Verificar o progresso do aluno (Regra: 100% concluído)
    const completedProgress = await prisma.progress.count({
      where: {
        userId,
        lessonId: { in: allLessons.map(l => l.id) },
        isCompleted: true
      }
    });

    if (completedProgress < totalLessons) {
      return NextResponse.json({ 
        error: "Forbidden", 
        message: `Você concluiu ${completedProgress} de ${totalLessons} aulas. O certificado requer 100%.` 
      }, { status: 403 });
    }

    // 3. Obter dados do usuário para o certificado
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

    // 4. Verificar se o certificado já existe
    let certificate = await prisma.certificate.findFirst({
      where: { userId, courseId }
    });

    if (!certificate) {
      // Cria o registro no banco com Hash Único
      const uniqueCode = `DN-${course.id.split('-')[0]}-${Date.now().toString(36).toUpperCase()}`;
      
      certificate = await prisma.certificate.create({
        data: {
          userId,
          courseId,
          code: uniqueCode,
        }
      });
    }

    // 5. Gerar o PDF do Certificado Server-Side (Segurança Antifraude)
    const pdfDoc = await PDFDocument.create();
    
    // Configura formato A4 Paisagem
    const page = pdfDoc.addPage([842, 595]); 
    const font = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
    const regularFont = await pdfDoc.embedFont(StandardFonts.Helvetica);

    const { width, height } = page.getSize();

    // Fundo Premium (Placeholder simplificado)
    page.drawRectangle({
      x: 0, y: 0, width, height,
      color: rgb(0.1, 0.1, 0.12), // Dark Mode Premium
    });

    // Borda Dourada / Verde Brand
    page.drawRectangle({
      x: 20, y: 20, width: width - 40, height: height - 40,
      borderColor: rgb(0.18, 0.42, 0.40), // #2f6b65 aproximado
      borderWidth: 4,
    });

    // Título Central
    page.drawText('CERTIFICADO DE CONCLUSÃO', {
      x: width / 2 - 190,
      y: height - 150,
      size: 26,
      font,
      color: rgb(1, 1, 1),
    });

    // Texto descritivo
    page.drawText('Certificamos que', {
      x: width / 2 - 60,
      y: height - 220,
      size: 16,
      font: regularFont,
      color: rgb(0.7, 0.7, 0.7),
    });

    // Nome do Aluno
    const nameWidth = font.widthOfTextAtSize(user.name.toUpperCase(), 32);
    page.drawText(user.name.toUpperCase(), {
      x: width / 2 - nameWidth / 2,
      y: height - 280,
      size: 32,
      font,
      color: rgb(1, 1, 1),
    });

    // Concluiu o curso
    page.drawText('concluiu com êxito o curso de', {
      x: width / 2 - 100,
      y: height - 330,
      size: 16,
      font: regularFont,
      color: rgb(0.7, 0.7, 0.7),
    });

    // Nome do Curso
    const courseWidth = font.widthOfTextAtSize(course.title, 24);
    page.drawText(course.title, {
      x: width / 2 - courseWidth / 2,
      y: height - 380,
      size: 24,
      font,
      color: rgb(0.18, 0.42, 0.40), // Verde Brand
    });

    // Código de Validação e Assinatura
    page.drawText(`Data de Emissão: ${certificate.issueDate.toLocaleDateString('pt-BR')}`, {
      x: 80, y: 80, size: 12, font: regularFont, color: rgb(0.6, 0.6, 0.6)
    });
    
    page.drawText(`Código de Autenticação: ${certificate.code}`, {
      x: 80, y: 60, size: 12, font: regularFont, color: rgb(0.6, 0.6, 0.6)
    });

    page.drawText(`Validar em: agenciadnegocios.com/certificado/${certificate.code}`, {
      x: width - 380, y: 60, size: 12, font: regularFont, color: rgb(0.6, 0.6, 0.6)
    });

    const pdfBytes = await pdfDoc.save();

    // Retorna o PDF para o frontend baixar ou exibir no iframe
    return new NextResponse(pdfBytes, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="Certificado_${course.title.replace(/\s+/g, "_")}.pdf"`,
      },
    });

  } catch (error) {
    console.error("Issue Certificate Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
