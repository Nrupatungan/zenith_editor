import { auth } from "@/lib/next-auth/auth"
 
export default auth((req) => {
  const { pathname } = req.nextUrl;

  // If user is not authenticated and not accessing signin/register, redirect to signin
  if (
    !req.auth?.user &&
    pathname !== "/auth/signin" &&
    pathname !== "/auth/register" &&
    !pathname.startsWith("/api/auth") &&
    !pathname.startsWith("/api/objects")
  ) {
    const newUrl = new URL("/auth/signin", req.nextUrl.origin)
    return Response.redirect(newUrl)
  }

  // If user is authenticated and tries to access signin/register, redirect to home
  if (
    req.auth?.user &&
    (pathname === "/auth/signin" || pathname === "/auth/register")
  ) {
    const newUrl = new URL("/", req.nextUrl.origin)
    return Response.redirect(newUrl)
  }
})

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico|public/).*)"],
}