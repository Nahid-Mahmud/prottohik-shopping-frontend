import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("accessToken")?.value;

  // Redirect to login if token is not present
  if (!token) {
    const loginUrl = new URL("/login", request.url);
    return NextResponse.redirect(loginUrl);
  }
  // Proceed to the requested route
  return NextResponse.next();
}

// "Matching Paths"
export const config = {
  matcher: [],
};
