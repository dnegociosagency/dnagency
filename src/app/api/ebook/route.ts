import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  try {
    const { name, email, phone } = await req.json();

    if (!name || !email || !phone) {
      return NextResponse.json({ error: "Campos obrigatórios faltando." }, { status: 400 });
    }

    // Configuração do transporter (Gmail com App Password)
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.SMTP_USER,   // seu gmail: agencia@gmail.com
        pass: process.env.SMTP_PASS,   // senha de app do gmail (16 dígitos)
      },
    });

    // ── 1. E-mail para o LEAD com o e-book ──────────────────────────────
    await transporter.sendMail({
      from: `"Agência DN" <${process.env.SMTP_USER}>`,
      to: email,
      subject: "📘 Seu E-book: O Manual do Crescimento Exponencial",
      html: `
        <!DOCTYPE html>
        <html lang="pt-BR">
        <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
        <body style="margin:0;padding:0;background:#040807;font-family:Inter,Arial,sans-serif;">
          <table width="100%" cellpadding="0" cellspacing="0" style="background:#040807;padding:40px 20px;">
            <tr><td align="center">
              <table width="600" cellpadding="0" cellspacing="0" style="background:#0c1f1d;border-radius:16px;border:1px solid rgba(47,107,101,0.3);overflow:hidden;max-width:600px;width:100%;">
                
                <!-- Header -->
                <tr><td style="background:linear-gradient(135deg,#2f6b65,#122c2a);padding:40px;text-align:center;">
                  <div style="background:rgba(255,255,255,0.1);display:inline-block;padding:10px 20px;border-radius:8px;border:1px solid rgba(255,255,255,0.2);margin-bottom:20px;">
                    <span style="color:#fff;font-weight:900;font-size:20px;letter-spacing:-1px;">DN</span>
                  </div>
                  <h1 style="color:#fff;font-size:28px;font-weight:800;margin:0;line-height:1.3;">
                    O Manual do<br>Crescimento Exponencial
                  </h1>
                  <p style="color:rgba(255,255,255,0.7);margin:12px 0 0;font-size:14px;">Agência DN · Estratégias de Elite</p>
                </td></tr>

                <!-- Body -->
                <tr><td style="padding:40px;">
                  <p style="color:rgba(255,255,255,0.9);font-size:16px;margin:0 0 16px;">Olá, <strong>${name}</strong>! 👋</p>
                  <p style="color:rgba(255,255,255,0.7);font-size:15px;line-height:1.7;margin:0 0 24px;">
                    Seu e-book está pronto! Clique no botão abaixo para acessar o 
                    <strong style="color:#2f6b65;">Manual do Crescimento Exponencial</strong> — 
                    as estratégias que usamos para escalar empresas no digital.
                  </p>
                  
                  <!-- CTA Button -->
                  <table cellpadding="0" cellspacing="0" style="margin:0 auto 32px;">
                    <tr><td align="center" style="border-radius:50px;background:linear-gradient(135deg,#2f6b65,#3b8780);">
                      <a href="${process.env.EBOOK_URL}" 
                         style="display:inline-block;padding:16px 36px;color:#fff;font-weight:700;font-size:15px;text-decoration:none;border-radius:50px;letter-spacing:0.5px;">
                        📥 Baixar E-book Agora
                      </a>
                    </td></tr>
                  </table>

                  <p style="color:rgba(255,255,255,0.4);font-size:13px;text-align:center;margin:0;">
                    Ou acesse diretamente: <a href="${process.env.EBOOK_URL}" style="color:#2f6b65;">${process.env.EBOOK_URL}</a>
                  </p>
                </td></tr>

                <!-- Footer -->
                <tr><td style="padding:24px 40px;border-top:1px solid rgba(255,255,255,0.06);text-align:center;">
                  <p style="color:rgba(255,255,255,0.3);font-size:12px;margin:0;">
                    Agência DN · Marketing Digital & Performance<br>
                    Você recebeu este e-mail por solicitar nosso material gratuito.
                  </p>
                </td></tr>

              </table>
            </td></tr>
          </table>
        </body>
        </html>
      `,
    });

    // ── 2. Notificação interna para a agência ───────────────────────────
    await transporter.sendMail({
      from: `"Site Agência DN" <${process.env.SMTP_USER}>`,
      to: process.env.NOTIFY_EMAIL || process.env.SMTP_USER,
      subject: `🔔 Novo lead: ${name} baixou o e-book`,
      html: `
        <div style="font-family:Arial,sans-serif;padding:24px;background:#f9f9f9;border-radius:8px;">
          <h2 style="color:#2f6b65;margin:0 0 16px;">Novo lead captado via e-book!</h2>
          <table style="border-collapse:collapse;width:100%;">
            <tr><td style="padding:8px 12px;background:#fff;border:1px solid #eee;font-weight:bold;width:120px;">Nome</td>
                <td style="padding:8px 12px;background:#fff;border:1px solid #eee;">${name}</td></tr>
            <tr><td style="padding:8px 12px;background:#f9f9f9;border:1px solid #eee;font-weight:bold;">E-mail</td>
                <td style="padding:8px 12px;background:#f9f9f9;border:1px solid #eee;">${email}</td></tr>
            <tr><td style="padding:8px 12px;background:#fff;border:1px solid #eee;font-weight:bold;">Telefone</td>
                <td style="padding:8px 12px;background:#fff;border:1px solid #eee;">${phone}</td></tr>
          </table>
          <p style="color:#888;font-size:12px;margin:16px 0 0;">Enviado em: ${new Date().toLocaleString("pt-BR")}</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[ebook/route] Erro ao enviar e-mail:", err);
    return NextResponse.json({ error: "Falha ao enviar e-mail." }, { status: 500 });
  }
}
