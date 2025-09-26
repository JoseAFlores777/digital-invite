import { NextRequest, NextResponse } from "next/server";

export const config = {
  matcher: ["/invitacion"],
};

export default function middleware(req: NextRequest) {
  const { nextUrl, headers, method } = req;

  // Allow prefetch/data/HEAD/OPTIONS to pass to avoid loops/timeouts
  if (headers.get("x-middleware-prefetch") || method !== "GET") {
    return NextResponse.next();
  }

  // Only gate direct navigations to the page path
  if (nextUrl.pathname !== "/invitacion") {
    return NextResponse.next();
  }

  const hasOpened = req.cookies.get("invite_opened")?.value === "true";
  if (hasOpened) {
    return NextResponse.next();
  }
  return NextResponse.redirect(new URL("/", req.url));
}
