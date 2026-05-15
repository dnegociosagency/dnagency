import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { hashPassword, generateAccessToken, generateRefreshToken } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, password } = body;

    if (!name || !email || !password) {
      return NextResponse.json(
        { message: "Nome, email e senha são obrigatórios." },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { message: "A senha deve ter no mínimo 6 caracteres." },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { message: "Este e-mail já está em uso." },
        { status: 409 }
      );
    }

    const passwordHash = await hashPassword(password);

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        passwordHash,
      },
    });

    // Auto-login: generate tokens
    const payload = {
      userId: newUser.id,
      role: newUser.role,
      companyId: newUser.companyId,
    };

    const accessToken = generateAccessToken(payload);
    const refreshToken = generateRefreshToken(payload);

    // Save session in database
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7); // 7 days

    await prisma.session.create({
      data: {
        userId: newUser.id,
        refreshToken,
        expiresAt,
      },
    });

    const response = NextResponse.json(
      {
        message: "Usuário registrado e autenticado com sucesso.",
        user: {
          id: newUser.id,
          name: newUser.name,
          email: newUser.email,
          role: newUser.role,
        },
        accessToken,
      },
      { status: 201 }
    );

    // Set refresh token as HTTP-Only cookie
    response.cookies.set("refresh_token", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 7 * 24 * 60 * 60, // 7 days in seconds
    });

    return response;
  } catch (error: any) {
    console.error("=======================");
    console.error("[REGISTER_ERROR] Erro na rota de registro:");
    console.error(error);
    console.error("=======================");

    // Verifica erro específico de conexão do banco/Prisma (Hostinger)
    if (error?.message?.includes("Access denied") || error?.message?.includes("timeout")) {
      return NextResponse.json(
        { message: "Erro de conexão com o banco de dados. Verifique o Remote MySQL da Hostinger." },
        { status: 503 }
      );
    }

    return NextResponse.json(
      { message: "Erro interno no servidor ao tentar registrar." },
      { status: 500 }
    );
  }
}
