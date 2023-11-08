import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Midleware function to handle requests before reaching the actual api endpoint
export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const isPublicPaths = path === "/login" || path === "/signup";

  const token = request.cookies.get("token")?.value || "";

  if (isPublicPaths && token) {
    return NextResponse.redirect(new URL("/", request.nextUrl));
  } else if (!isPublicPaths && !token) {
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/", "/profile/(.*)", "/login", "/signup"],
};
