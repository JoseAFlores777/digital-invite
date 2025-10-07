import { readItems } from "@directus/sdk";
import { getDirectusClient } from "@/server/directus-client";

import { from, defer, lastValueFrom, of } from "rxjs";
import { map, catchError, retry, timeout } from "rxjs/operators";
import { DirectusCollectionKeys, fieldsFor, Invitations } from "@/lib/directus-interfaces";

export async function getInvitationById(invitationId: string): Promise<Invitations | null> {
  const client = getDirectusClient();
  if (!client) return null;
  if (!invitationId) return null;

  const collection = DirectusCollectionKeys.invitations;
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
    "guests.guest.person.WhatsApp",
    "guests.guest.invitation_status",
    "guests.guest.id",
    "guests.guest.rsvp_at",
    "guests.guest.rsvp_status",
  );

  const source$ = defer(() =>
    from(
      client.request(
        readItems(collection, {
          fields: fieldsToReturn,
          filter: { id: { _eq: invitationId } },
          limit: 1,
        })
      )
    )
  ).pipe(
    timeout(8000),
    retry(2),
    map((items: any[]): Invitations | null => (Array.isArray(items) && items.length ? (items[0] as Invitations) : null)),
    catchError(() => of<Invitations | null>(null))
  );

  return lastValueFrom(source$);
}

export async function getWeddingInvitations(weddingId: string): Promise<Invitations[]> {
  const client = getDirectusClient();
  if (!client) return [];
  if (!weddingId) return [];

  const collection = DirectusCollectionKeys.invitations;

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
    "guests.guest.group",
  );

  const source$ = defer(() =>
    from(
      client.request(
        readItems(collection, {
          fields: fieldsToReturn,
          filter: { wedding: { _eq: weddingId } },
          sort: ["-sent_at", "id"],
          limit: -1,
        })
      )
    )
  ).pipe(
    timeout(8000),
    retry(2),
    map((items: any[]): Invitations[] => items as Invitations[]),
    catchError(() => of<Invitations[]>([]))
  );

  return lastValueFrom(source$);
}
