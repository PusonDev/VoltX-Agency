import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protect admin dashboard routes (not the login page itself)
  if (pathname === "/admin" || pathname.startsWith("/admin/") && !pathname.startsWith("/admin/login")) {
    const sessionToken = request.cookies.get("voltx_admin_token")?.value;

    if (sessionToken !== "valid_session") {
      const loginUrl = new URL("/admin/login", request.url);
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  // Block direct browser access to API routes (only allow programmatic access)
  if (pathname.startsWith("/api/admin/")) {
    const contentType = request.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      return NextResponse.json(
        { error: "API endpoints require programmatic JSON access." },
        { status: 403 }
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/api/admin/:path*",
  ],
};
