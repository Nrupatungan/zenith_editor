// middleware.ts
import NextAuth from "next-auth";
import { authConfig } from "@/lib/next-auth/auth.config";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { pathname } = req.nextUrl;
  if (
    !req.auth?.user &&
    pathname !== "/auth/signin" &&
    pathname !== "/auth/register" &&
    pathname !== "/auth/register/success" &&
    pathname !== "/auth/register/verify-email" &&
    !pathname.startsWith("/api/auth") &&
    !pathname.startsWith("/api/objects")
  ) {
    const newUrl = new URL("/auth/signin", req.nextUrl.origin)
    return Response.redirect(newUrl)
  }
  if (
    req.auth?.user &&
    (pathname === "/auth/signin" || pathname === "/auth/register" || pathname === "/auth/register/success" || pathname === "/auth/register/verify-email")
  ) {
    const newUrl = new URL("/", req.nextUrl.origin)
    return Response.redirect(newUrl)
  }
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|public/).*)"],
};