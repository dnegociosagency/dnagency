import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const cookieHeader = req.headers.get("cookie");
    const refreshToken = cookieHeader
      ?.split("; ")
      .find((c) => c.startsWith("refresh_token="))
      ?.split("=")[1];

    if (refreshToken) {
      // Delete session from database
      await prisma.session.deleteMany({
        where: { refreshToken },
      });
    }

    const response = NextResponse.json(
      { message: "Logout efetuado com sucesso." },
      { status: 200 }
    );

    // Clear the HTTP-Only cookie
    response.cookies.set("refresh_token", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 0, // Immediately expire
    });

    return response;
  } catch (error) {
    console.error("LOGOUT_ERROR", error);
    return NextResponse.json(
      { message: "Erro interno no servidor ao sair." },
      { status: 500 }
    );
  }
}
