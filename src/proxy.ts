import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

export async function proxy(request: NextRequest) {
  const url = request.nextUrl.clone();
  const host = request.headers.get("host") || "";

  // Se for o subdomínio da unidade de Parauapebas
  if (host.includes("jjmotoparauapebas") || host.includes("parauapebas.jjmoto")) {
    if (!url.pathname.startsWith("/jj-moto-pecas") && !url.pathname.startsWith("/images") && !url.pathname.startsWith("/logos")) {
      url.pathname = `/jj-moto-pecas/parauapebas${url.pathname === "/" ? "" : url.pathname}`;
      return NextResponse.rewrite(url);
    }
  }

  // Se for o subdomínio da unidade de Marabá
  if (host.includes("jjmotomaraba") || host.includes("maraba.jjmoto")) {
    if (!url.pathname.startsWith("/jj-moto-pecas") && !url.pathname.startsWith("/images") && !url.pathname.startsWith("/logos")) {
      url.pathname = `/jj-moto-pecas/maraba${url.pathname === "/" ? "" : url.pathname}`;
      return NextResponse.rewrite(url);
    }
  }

  // Se for o subdomínio da unidade de Ananindeua
  if (host.includes("jjmotoananindeua") || host.includes("ananindeua.jjmoto")) {
    if (!url.pathname.startsWith("/jj-moto-pecas") && !url.pathname.startsWith("/images") && !url.pathname.startsWith("/logos")) {
      url.pathname = `/jj-moto-pecas/ananindeua${url.pathname === "/" ? "" : url.pathname}`;
      return NextResponse.rewrite(url);
    }
  }

  const { pathname } = request.nextUrl;

  // Defina as rotas que precisam de proteção
  const isDashboardRoute = pathname.startsWith("/dashboard");
  const isAdminRoute = pathname.startsWith("/dashboard/admin");
  const isCompanyRoute = pathname.startsWith("/dashboard/company");

  // Se não for rota protegida, passa direto
  if (!isDashboardRoute) {
    return NextResponse.next();
  }

  // 1. Extrair os tokens dos cookies
  // Nosso backend usa 'accessToken' e 'refreshToken'
  const accessToken = request.cookies.get("accessToken")?.value;
  const refreshToken = request.cookies.get("refreshToken")?.value;

  // Se não houver nenhum token, redireciona para login
  if (!accessToken && !refreshToken) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("error", "unauthorized");
    return NextResponse.redirect(loginUrl);
  }

  // Vamos validar o token usando a chave secreta
  const secret = new TextEncoder().encode(
    process.env.JWT_SECRET || "default_secret_key_change_me_in_prod"
  );

  let payload;

  try {
    // Tenta validar o accessToken primeiro (mais seguro e curto)
    if (accessToken) {
      const { payload: verifiedPayload } = await jwtVerify(accessToken, secret);
      payload = verifiedPayload;
    } else if (refreshToken) {
      // Se não tem access, mas tem refresh, permite e confia no refresh 
      // (na vida real o layout/app faria a troca, mas no middleware podemos apenas validar a assinatura)
      const { payload: verifiedPayload } = await jwtVerify(refreshToken, secret);
      payload = verifiedPayload;
    }
  } catch (error) {
    // Se a assinatura for inválida ou o token expirou
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("error", "session_expired");
    
    // Opcional: deletar os cookies inválidos
    const response = NextResponse.redirect(loginUrl);
    response.cookies.delete("accessToken");
    response.cookies.delete("refreshToken");
    return response;
  }

  // 2. Validação baseada em Função (RBAC - Role Based Access Control)
  const userRole = payload?.role as string;

  // Proteção da rota de Admin
  if (isAdminRoute && userRole !== "ADMIN" && userRole !== "MODERATOR") {
    const unauthorizedUrl = new URL("/dashboard", request.url);
    return NextResponse.redirect(unauthorizedUrl);
  }

  // Proteção da rota de Company Admin
  if (isCompanyRoute && userRole !== "COMPANY_ADMIN" && userRole !== "ADMIN") {
    const unauthorizedUrl = new URL("/dashboard", request.url);
    return NextResponse.redirect(unauthorizedUrl);
  }

  // 3. Adiciona headers de segurança (Rate Limit Base e Prevenção)
  const response = NextResponse.next();
  response.headers.set("x-content-type-options", "nosniff");
  response.headers.set("x-frame-options", "DENY");
  response.headers.set("x-xss-protection", "1; mode=block");

  // Passa o ID e Role do usuário nos headers para que as páginas Server-Side possam consumir sem verificar o JWT novamente
  response.headers.set("x-user-id", (payload?.userId as string) || (payload?.id as string) || "");
  response.headers.set("x-user-role", userRole || "STUDENT");

  return response;
}

// Configura quais rotas o middleware deve monitorar
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - images, logos (public assets folders for JJ Moto Peças)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|images|logos).*)",
  ],
};

export const middleware = proxy;
