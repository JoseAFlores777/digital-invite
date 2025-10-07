import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

const COOKIE_NAME = "solicitudes_admin_auth";
const COOKIE_MAX_AGE = 60 * 60 * 8; // 8 hours

function getPassword(): string | undefined {
  return process.env.SOLICITUDES_ADMIN_PASSWORD || process.env.SOLICITUDES_PASSWORD || process.env.ADMIN_PASSWORD || process.env.PASSWORD;
}

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  const authorized = token === "1";
  return NextResponse.json({ authorized });
}

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  const input = (body?.password ?? "").toString();
  const expected = getPassword();

  if (!expected) {
    return NextResponse.json({ error: "Missing server password" }, { status: 500 });
  }

  if (input !== expected) {
    return NextResponse.json({ authorized: false }, { status: 401 });
  }

  const res = NextResponse.json({ authorized: true });
  res.cookies.set({
    name: COOKIE_NAME,
    value: "1",
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: COOKIE_MAX_AGE,
  });
  return res;
}
