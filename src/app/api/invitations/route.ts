import { NextResponse } from "next/server";
import { readItems } from "@directus/sdk";
import { getDirectusClient } from "@/server/directus-client";
import type { Invitations } from "@/lib/directus-interfaces";
import { DirectusCollectionKeys, fieldsFor } from "@/lib/directus-interfaces";

// export const revalidate = 60;
export const dynamic = "force-dynamic";

function withTimeout<T>(promise: Promise<T>, ms: number, controller: AbortController): Promise<T> {
  const t = setTimeout(() => controller.abort(), ms);
  return promise.finally(() => clearTimeout(t));
}

async function getWeddingInvitations(weddingId: string, timeoutMs = 8000): Promise<Invitations[]> {
  const client = getDirectusClient();
  if (!client) return [];
  if (!weddingId) return [];

  const collection = DirectusCollectionKeys.invitations;

  // Remove duplicate invitation_status
  const fieldsToReturn = fieldsFor(collection)(
    "id",
    "code",
    "invite_type",
    "status",
    "sent_at",
    "public_link",
    "notes",
    "wedding",
    "guests.guest.person.first_name",
    "guests.guest.person.last_name",
    "guests.guest.invitation_status",
    "guests.guest.id",
    "guests.guest.rsvp_at",
    "guests.guest.rsvp_status",
  );

  const ac = new AbortController();

  try {
    // @ts-expect-error: directus client accepts RequestOptions with signal at runtime
    const req = client.request(
      readItems<Invitations>(collection, {
        fields: fieldsToReturn as unknown as string[],
        filter: { wedding: { _eq: weddingId } },
        sort: ["-sent_at", "id"],
        limit: -1,
      }),
      { signal: ac.signal }
    ) as Promise<Invitations[]>;

    return await withTimeout(req, timeoutMs, ac);
  } catch (err) {
    return [];
  }
}

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const weddingId =
      url.searchParams.get("wedding_id") ||
      process.env.NEXT_PUBLIC_WEDDING_ID ||
      process.env.DIRECTUS_WEDDING_ID ||
      "";

    if (!weddingId) {
      return NextResponse.json(
        { invitations: [], error: "missing_wedding_id" },
        { status: 400 }
      );
    }

    const invitations = await getWeddingInvitations(weddingId, 8000);

    return NextResponse.json(
      { invitations },
      {
        status: 200,
      }
    );
  } catch {
    return NextResponse.json(
      { invitations: [], error: "failed_to_fetch" },
      { status: 500 }
    );
  }
}
