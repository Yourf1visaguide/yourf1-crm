import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

export function proxy(request: NextRequest) {
  const sessionCookie = getSessionCookie(request);
  const pathname = request.nextUrl.pathname;
  
  const isAuthPage = pathname === "/login";
  const isProtectedRoute = !isAuthPage;

  // Not authenticated → login
  if (isProtectedRoute && !sessionCookie) {
    return NextResponse.redirect(
      new URL("/login", request.url)
    );
  }

  // Already authenticated → dashboard
  if (isAuthPage && sessionCookie) {
    return NextResponse.redirect(
      new URL("/", request.url)
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Run on all application routes except
     * Next.js internals and API routes.
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};