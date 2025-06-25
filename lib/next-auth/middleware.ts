import { auth } from "@/lib/next-auth/auth"
 
export default auth((req) => {
  if (!req.auth && !(req.nextUrl.pathname.startsWith("/api/auth") || req.nextUrl.pathname === "/auth/signin" || req.nextUrl.pathname === "/auth/register" || req.nextUrl.pathname.startsWith("/api/video"))) {
    const newUrl = new URL("/auth/signin", req.nextUrl.origin)
    return Response.redirect(newUrl)
  }
})

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico|public/).*)"],
}