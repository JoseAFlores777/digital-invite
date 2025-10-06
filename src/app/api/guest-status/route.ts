import { NextResponse } from "next/server";
import { getDirectusClient } from "@/server/directus-client";
import { updateItem } from "@directus/sdk";

export async function PATCH(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const { guestId, invitation_status, rsvp_status } = body || {};

    if (!guestId) {
      return NextResponse.json({ ok: false, error: "missing_guest_id" }, { status: 400 });
    }
    if (!invitation_status && !rsvp_status) {
      return NextResponse.json({ ok: false, error: "missing_status" }, { status: 400 });
    }

    const client = getDirectusClient();
    if (!client) {
      return NextResponse.json({ ok: false, error: "directus_not_configured" }, { status: 500 });
    }

    const patch: any = {};
    if (invitation_status) patch.invitation_status = invitation_status;
    if (rsvp_status) {
      patch.rsvp_status = rsvp_status;
      patch.rsvp_at = new Date().toISOString();
    }

    // @ts-expect-error runtime accepts options
    const updated = await client.request(updateItem("guests", guestId, patch));

    return NextResponse.json({ ok: true, guest: updated }, { status: 200 });
  } catch (e) {
    return NextResponse.json({ ok: false, error: "failed_to_update" }, { status: 500 });
  }
}
