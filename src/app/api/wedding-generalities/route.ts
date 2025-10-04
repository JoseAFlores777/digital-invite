import { NextRequest, NextResponse } from "next/server";
import { getWeddingById } from "@/server/services/weddings.service";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const idFromQuery = searchParams.get("wedding_id");
    const idFromEnv = process.env.NEXT_PUBLIC_WEDDING_ID;
    const weddingId = idFromQuery || idFromEnv || "";

    if (!weddingId) {
      return NextResponse.json({ wedding: null, error: "missing_wedding_id" }, { status: 400 });
    }

    const wedding = await getWeddingById(weddingId);
    return NextResponse.json({ wedding }, { status: 200 });
  } catch (e) {
    return NextResponse.json({ wedding: null, error: "failed_to_fetch" }, { status: 500 });
  }
}
