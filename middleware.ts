import { NextRequest, NextResponse } from "next/server";

export default function middleware(request: NextRequest) {
  const sessionCookie = request.cookies.get(
    "better-auth.session_token"
  );

  const pathname = request.nextUrl.pathname;

  const isAuthPage = pathname === "/login";
  const isProtectedRoute = pathname === "/";

  // User is not authenticated → send to login
  if (isProtectedRoute && !sessionCookie) {
    return NextResponse.redirect(
      new URL("/login", request.url)
    );
  }

  // User is already authenticated → don't let them visit login
  if (isAuthPage && sessionCookie) {
    return NextResponse.redirect(
      new URL("/", request.url)
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/login",
  ],
};