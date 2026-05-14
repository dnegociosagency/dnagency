import { cookies } from "next/headers";
import { verifyToken } from "./auth";
import { prisma } from "./prisma";

export async function getCurrentUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get("refresh_token")?.value;

  if (!token) return null;

  try {
    const payload = verifyToken(token);
    
    if (!payload || !payload.userId) {
      return null;
    }

    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        companyId: true,
      },
    });

    return user;
  } catch (error) {
    return null;
  }
}
