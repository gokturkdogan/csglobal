import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  const isLoginPage = request.nextUrl.pathname === "/admin/login";
  const token = await getToken({
    req: request,
    secret: process.env.AUTH_SECRET,
  });

  if (!token && !isLoginPage) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  if (token && isLoginPage) {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
