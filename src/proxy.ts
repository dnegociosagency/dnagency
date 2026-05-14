import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export default function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Protected paths
  const isProtectedPath = pathname.startsWith("/dashboard") || pathname.startsWith("/academy/learn");
  const isAuthPath = pathname.startsWith("/login") || pathname.startsWith("/register");

  // Get refresh token from cookie
  const token = request.cookies.get("refresh_token")?.value;

  // 1. If trying to access a protected route without a token, redirect to login
  if (isProtectedPath && !token) {
    const url = new URL("/login", request.url);
    url.searchParams.set("callbackUrl", encodeURI(pathname));
    return NextResponse.redirect(url);
  }

  // 2. If trying to access login/register while already authenticated, redirect to dashboard
  if (isAuthPath && token) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/academy/learn/:path*",
    "/login",
    "/register",
  ],
};
