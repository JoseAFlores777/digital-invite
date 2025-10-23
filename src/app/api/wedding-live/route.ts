import { NextResponse } from "next/server";
import { getDirectusClient } from "@/server/directus-client";
import { updateItem } from "@directus/sdk";

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const live_url = typeof body?.live_url === "string" ? body.live_url.trim() : "";
    const wedding_id =
      body?.wedding_id ||
      process.env.NEXT_PUBLIC_WEDDING_ID ||
      process.env.DIRECTUS_WEDDING_ID ||
      "";

    if (!wedding_id) return NextResponse.json({ ok: false, error: "missing_wedding_id" }, { status: 400 });

    const client = getDirectusClient();
    if (!client) return NextResponse.json({ ok: false, error: "directus_not_configured" }, { status: 500 });

    await client.request(updateItem("weddings" as any, wedding_id, { live_url } as any));

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (e) {
    return NextResponse.json({ ok: false, error: "failed_to_update" }, { status: 500 });
  }
}
