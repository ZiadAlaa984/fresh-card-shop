import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const protectedRoutes = ["/cart", "/wishlist", "/profile"];

const authRoutes = ["/auth/login", "/auth/signup"];

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;

  const { pathname } = request.nextUrl;

  // لو مش معاه token وبيحاول يدخل صفحة محمية
  if (!token && protectedRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  // لو معاه token وبيحاول يدخل صفحة auth
  if (token && authRoutes.includes(pathname)) { 
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}
