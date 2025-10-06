import { NextResponse } from "next/server";
import { getWeddingById, getWeddingLocation } from "@/lib/directus";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const weddingId =
      url.searchParams.get("wedding_id") ||
      process.env.NEXT_PUBLIC_WEDDING_ID ||
      process.env.DIRECTUS_WEDDING_ID ||
      "";

    if (!weddingId) {
      return NextResponse.json({ wedding: null, location: null, error: "missing_wedding_id" }, { status: 400 });
    }

    const [wedding, location] = await Promise.all([
      getWeddingById(weddingId),
      getWeddingLocation(weddingId),
    ]);

    return NextResponse.json({ wedding, location }, { status: 200 });
  } catch (e) {
    return NextResponse.json({ wedding: null, location: null, error: "failed_to_fetch" }, { status: 500 });
  }
}
