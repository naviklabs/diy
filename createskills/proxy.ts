import { NextRequest, NextResponse } from "next/server";
import { COOKIE_NAME } from "@/lib/auth";

export function proxy(req: NextRequest) {
  const token = req.cookies.get(COOKIE_NAME);

  if (req.nextUrl.pathname.startsWith("/my-skills")) {
    if (!token) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/my-skills/:path*"],
};
