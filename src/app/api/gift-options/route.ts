import { NextResponse } from "next/server";
import { getGiftOptionsByWeddingId } from "@/lib/directus";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const weddingId =
      url.searchParams.get("wedding_id") ||
      process.env.NEXT_PUBLIC_WEDDING_ID ||
      process.env.DIRECTUS_WEDDING_ID ||
      "";

    if (!weddingId) {
      return NextResponse.json({ options: [], error: "missing_wedding_id" }, { status: 400 });
    }

    const items = await getGiftOptionsByWeddingId(weddingId);

    const options = (items || []).map((it) => ({
      id: it.id,
      title: it.title || "",
      icon: it.icon || "lucide:gift",
      details: it.details || {},
      redirectBtn_hide: it.redirectBtn_hide ?? true,
      redirectBtn_url: it.redirectBtn_url || null,
      redirectBtn_label: it.redirectBtn_label || null,
      redirectBtn_icon: it.redirectBtn_icon || null,
      sort: it.sort ?? null,
      status: it.status,
    }));

    return NextResponse.json({ options }, { status: 200 });
  } catch (e) {
    return NextResponse.json({ options: [], error: "failed_to_fetch" }, { status: 500 });
  }
}
