import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  try {
    const { name, email, phone } = await req.json();

    if (!name || !email || !phone) {
      return NextResponse.json(
        { error: "Preencha todos os campos." },
        { status: 400 }
      );
    }

    // Validação básica de e-mail
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "E-mail inválido." }, { status: 400 });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // ── 1. E-mail de confirmação para o LEAD ──────────────────────────────────
    await transporter.sendMail({
      from: `"Canal D Negócios" <${process.env.SMTP_USER}>`,
      to: email,
      subject: "🚀 Seu diagnóstico gratuito foi solicitado!",
      html: `
        <!DOCTYPE html>
        <html lang="pt-BR">
        <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
        <body style="margin:0;padding:0;background:#040807;font-family:Arial,sans-serif;">
          <table width="100%" cellpadding="0" cellspacing="0" style="background:#040807;padding:40px 20px;">
            <tr><td align="center">
              <table width="600" cellpadding="0" cellspacing="0" style="background:#0c1f1d;border-radius:16px;border:1px solid rgba(47,107,101,0.3);overflow:hidden;max-width:600px;width:100%;">
                
                <!-- Header -->
                <tr><td style="background:linear-gradient(135deg,#2f6b65,#122c2a);padding:40px;text-align:center;">
                  <div style="background:rgba(255,255,255,0.1);display:inline-block;padding:10px 20px;border-radius:8px;border:1px solid rgba(255,255,255,0.2);margin-bottom:20px;">
                    <span style="color:#fff;font-weight:900;font-size:20px;letter-spacing:-1px;">DN</span>
                  </div>
                  <h1 style="color:#fff;font-size:26px;font-weight:800;margin:0;line-height:1.3;">
                    Diagnóstico Gratuito<br>Solicitado com Sucesso!
                  </h1>
                  <p style="color:rgba(255,255,255,0.7);margin:12px 0 0;font-size:14px;">Canal D Negócios · Marketing & Performance</p>
                </td></tr>

                <!-- Body -->
                <tr><td style="padding:40px;">
                  <p style="color:rgba(255,255,255,0.9);font-size:16px;margin:0 0 16px;">Olá, <strong>${name}</strong>! 👋</p>
                  <p style="color:rgba(255,255,255,0.7);font-size:15px;line-height:1.7;margin:0 0 24px;">
                    Recebemos sua solicitação de <strong style="color:#2f6b65;">diagnóstico gratuito</strong>. Nossa equipe irá analisar o seu negócio e entrar em contato em breve pelo telefone/WhatsApp ou e-mail informados.
                  </p>
                  
                  <div style="background:rgba(47,107,101,0.1);border:1px solid rgba(47,107,101,0.3);border-radius:12px;padding:20px;margin-bottom:24px;">
                    <p style="color:rgba(255,255,255,0.6);font-size:13px;margin:0 0 10px;text-transform:uppercase;letter-spacing:1px;font-weight:700;">O que você vai receber:</p>
                    <ul style="color:rgba(255,255,255,0.75);font-size:14px;line-height:1.8;margin:0;padding-left:18px;">
                      <li>Análise completa do seu marketing digital atual</li>
                      <li>Identificação de gaps e oportunidades de crescimento</li>
                      <li>Plano de ação personalizado e gratuito</li>
                    </ul>
                  </div>

                  <p style="color:rgba(255,255,255,0.5);font-size:13px;text-align:center;margin:0;">
                    Prazo de retorno: até <strong style="color:#2f6b65;">24 horas úteis</strong>
                  </p>
                </td></tr>

                <!-- Footer -->
                <tr><td style="padding:24px 40px;border-top:1px solid rgba(255,255,255,0.06);text-align:center;">
                  <p style="color:rgba(255,255,255,0.3);font-size:12px;margin:0;">
                    Canal D Negócios · Marketing Digital & Performance<br>
                    Você recebeu este e-mail por solicitar nosso diagnóstico gratuito.
                  </p>
                </td></tr>

              </table>
            </td></tr>
          </table>
        </body>
        </html>
      `,
    });

    // ── 2. Notificação interna para canaldnegocios@gmail.com ──────────────────
    await transporter.sendMail({
      from: `"Site Canal D Negócios" <${process.env.SMTP_USER}>`,
      to: "canaldnegocios@gmail.com",
      subject: `🔔 Novo lead: ${name} quer diagnóstico gratuito`,
      html: `
        <div style="font-family:Arial,sans-serif;padding:32px;background:#f0f4f4;border-radius:8px;">
          <h2 style="color:#2f6b65;margin:0 0 20px;font-size:20px;">🎯 Novo Lead — Diagnóstico Gratuito</h2>
          <table style="border-collapse:collapse;width:100%;max-width:480px;">
            <tr>
              <td style="padding:10px 14px;background:#fff;border:1px solid #e0e0e0;font-weight:bold;width:120px;color:#333;">Nome</td>
              <td style="padding:10px 14px;background:#fff;border:1px solid #e0e0e0;color:#333;">${name}</td>
            </tr>
            <tr>
              <td style="padding:10px 14px;background:#f9f9f9;border:1px solid #e0e0e0;font-weight:bold;color:#333;">E-mail</td>
              <td style="padding:10px 14px;background:#f9f9f9;border:1px solid #e0e0e0;">
                <a href="mailto:${email}" style="color:#2f6b65;">${email}</a>
              </td>
            </tr>
            <tr>
              <td style="padding:10px 14px;background:#fff;border:1px solid #e0e0e0;font-weight:bold;color:#333;">Telefone</td>
              <td style="padding:10px 14px;background:#fff;border:1px solid #e0e0e0;">
                <a href="https://wa.me/55${phone.replace(/\D/g, '')}" style="color:#2f6b65;">${phone}</a>
              </td>
            </tr>
          </table>
          <p style="color:#888;font-size:12px;margin:20px 0 0;">
            Captado em: ${new Date().toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" })} (Horário de Brasília)<br>
            Origem: <strong>Pop-up de diagnóstico gratuito</strong>
          </p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[diagnostico/route] Erro:", err);
    return NextResponse.json(
      { error: "Falha ao enviar. Tente novamente mais tarde." },
      { status: 500 }
    );
  }
}
