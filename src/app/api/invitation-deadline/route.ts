import { NextResponse } from "next/server";
import { getDirectusClient } from "@/server/directus-client";
import { updateItem } from "@directus/sdk";

export async function PATCH(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const { invitationId, rsvp_deadline } = body || {};

    if (!invitationId) {
      return NextResponse.json({ ok: false, error: "missing_invitation_id" }, { status: 400 });
    }

    const client = getDirectusClient();
    if (!client) {
      return NextResponse.json({ ok: false, error: "directus_not_configured" }, { status: 500 });
    }

    // Allow null to clear deadline; otherwise expect ISO string
    const patch: any = { rsvp_deadline: rsvp_deadline ?? null };

    // @ts-expect-error runtime accepts options
    const updated = await client.request(updateItem("invitations", invitationId, patch));

    return NextResponse.json({ ok: true, invitation: updated }, { status: 200 });
  } catch (e) {
    return NextResponse.json({ ok: false, error: "failed_to_update_deadline" }, { status: 500 });
  }
}
