import { NextResponse } from "next/server";
import { getWeddingInvitations } from "@/lib/directus";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const weddingId = url.searchParams.get("wedding_id") || process.env.NEXT_PUBLIC_WEDDING_ID || process.env.DIRECTUS_WEDDING_ID || "";

    if (!weddingId) {
      return NextResponse.json({ invitations: [], error: "missing_wedding_id" }, { status: 400 });
    }

    const invitations = await getWeddingInvitations(weddingId);
    return NextResponse.json({ invitations }, { status: 200 });
  } catch (e) {
    return NextResponse.json({ invitations: [], error: "failed_to_fetch" }, { status: 500 });
  }
}
