import { NextResponse } from "next/server";
import { getInvitationById } from "@/lib/directus";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const id = url.searchParams.get("id");
    if (!id) {
      return NextResponse.json({ invitation: null, error: "missing_id" }, { status: 400 });
    }

    const invitation = await getInvitationById(id);
    if (!invitation) {
      return NextResponse.json({ invitation: null, error: "not_found" }, { status: 404 });
    }

    return NextResponse.json({ invitation }, { status: 200 });
  } catch (e) {
    return NextResponse.json({ invitation: null, error: "failed_to_fetch" }, { status: 500 });
  }
}
