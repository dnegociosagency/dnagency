import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/session";

export async function GET() {
  try {
    const user = await getCurrentUser();
    if (!user || (user.role !== "ADMIN" && user.role !== "MODERATOR")) {
      return NextResponse.json({ message: "Acesso Negado." }, { status: 403 });
    }

    const users = await prisma.user.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        progress: true,
        sessions: {
          orderBy: { createdAt: "desc" },
          take: 1
        }
      }
    });

    const formattedUsers = users.map(u => {
      // Cálculo simplificado de progresso: quantidade de aulas concluídas.
      // Se tivéssemos o total geral exato, seria uma % precisa. 
      // Para simular o visual, faremos um fallback visual se não houver progresso.
      const completedCount = u.progress.filter(p => p.isCompleted).length;
      const fakeProgress = Math.min(completedCount * 10, 100); 

      const lastLogin = u.sessions.length > 0 ? new Date(u.sessions[0].createdAt) : u.createdAt;
      const diffMs = new Date().getTime() - lastLogin.getTime();
      const diffDays = Math.floor(diffMs / (1000 * 3600 * 24));
      
      let lastLoginStr = "Hoje";
      if (diffDays === 1) lastLoginStr = "Ontem";
      else if (diffDays > 1) lastLoginStr = `Há ${diffDays} dias`;

      return {
        id: u.id,
        name: u.name,
        email: u.email,
        role: u.role,
        status: u.deletedAt ? "Bloqueado" : "Ativo",
        progress: `${fakeProgress}%`,
        lastLogin: lastLoginStr
      };
    });

    return NextResponse.json({ users: formattedUsers }, { status: 200 });
  } catch (error) {
    console.error("GET_USERS_ERROR", error);
    return NextResponse.json({ message: "Erro ao buscar usuários." }, { status: 500 });
  }
}
