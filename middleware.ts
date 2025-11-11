import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value || req.headers.get("authorization");

  const { pathname } = req.nextUrl;

  // Public routes
  if (pathname.startsWith("/login") || pathname.startsWith("/signup")) {
    return NextResponse.next();
  }

  // No token → redirect to login
  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // Example: check admin route
  if (pathname.startsWith("/admin")) {
    // decode or validate token here if needed
    const isAdmin = req.cookies.get("is_admin")?.value === "true"; // or decode JWT
    if (!isAdmin) {
      return NextResponse.redirect(new URL("/events", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", ],
};
