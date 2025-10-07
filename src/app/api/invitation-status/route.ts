import { NextResponse } from "next/server";
import { getDirectusClient } from "@/server/directus-client";
import { updateItem } from "@directus/sdk";

export async function PATCH(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const { invitationId, status } = body || {};

    if (!invitationId) {
      return NextResponse.json({ ok: false, error: "missing_invitation_id" }, { status: 400 });
    }
    if (!status) {
      return NextResponse.json({ ok: false, error: "missing_status" }, { status: 400 });
    }

    const client = getDirectusClient();
    if (!client) {
      return NextResponse.json({ ok: false, error: "directus_not_configured" }, { status: 500 });
    }

    // @ts-expect-error runtime accepts options
    const updated = await client.request(updateItem("invitations", invitationId, { status }));

    return NextResponse.json({ ok: true, invitation: updated }, { status: 200 });
  } catch (e) {
    return NextResponse.json({ ok: false, error: "failed_to_update" }, { status: 500 });
  }
}
