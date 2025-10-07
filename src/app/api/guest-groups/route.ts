import { NextResponse } from "next/server";
import { getGuestGroups } from "@/server/services/guest-groups.service";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const weddingId = url.searchParams.get("wedding_id") || process.env.NEXT_PUBLIC_WEDDING_ID || process.env.DIRECTUS_WEDDING_ID || undefined;
    const groups = await getGuestGroups(weddingId || undefined);
    return NextResponse.json({ groups }, { status: 200 });
  } catch (e) {
    return NextResponse.json({ groups: [], error: "failed_to_fetch" }, { status: 500 });
  }
}
