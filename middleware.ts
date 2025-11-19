


import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  const isAdmin = req.cookies.get("isAdmin")?.value === 'true';

  const path = req.nextUrl.pathname;


  const isPublicRoute = ["/login", "/signup"].some((r) =>
    path.startsWith(r)
  );

  const isAdminRoute = path.startsWith("/admin");
  const isProtectedRoute = [
    "/events"
  ].some((r) => path.startsWith(r));


  // -------------------------------
  // PUBLIC ROUTES
  // -------------------------------
  if (isPublicRoute) {
    if (token && isAdmin) {
      return NextResponse.redirect(new URL("/admin", req.url));
    }
    if (token && !isAdmin) {
      return NextResponse.redirect(new URL("/events", req.url));
    }
    return NextResponse.next();
  }

  // -------------------------------
  // ADMIN ROUTES
  // -------------------------------

  if (isAdminRoute) {
    if (!token) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
    console.log(isAdminRoute,isAdmin, '-----')

    if (!isAdmin) {

      return NextResponse.redirect(new URL("/events", req.url));
    }
    return NextResponse.next();
  }

  // -------------------------------
  // PROTECTED USER ROUTES
  // -------------------------------


  if (isProtectedRoute) {
    if (!token) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/dashboard/:path*",
    "/profile/:path*",
    "/events",
    "/events/book/:path*",
    "/events/:path*",
    "/login",
    "/signup"
  ],
};
