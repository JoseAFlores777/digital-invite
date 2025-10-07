import { readItems } from "@directus/sdk";
import { getDirectusClient } from "@/server/directus-client";
import { DirectusCollectionKeys, fieldsFor, GuestGroups } from "@/lib/directus-interfaces";

export async function getGuestGroups(weddingId?: string): Promise<GuestGroups[]> {
  const client = getDirectusClient();
  if (!client) return [];

  const collection = DirectusCollectionKeys.guest_groups;
  const fieldsToReturn = fieldsFor(collection)(
    "id",
    "name",
    "type",
    "wedding",
  );

  // @ts-expect-error runtime accepts options
  const items = await client.request(
    readItems(collection, {
      fields: fieldsToReturn,
      filter: weddingId ? { wedding: { _eq: weddingId } } : undefined,
      limit: -1,
      sort: ["name"],
    })
  );

  return (Array.isArray(items) ? (items as GuestGroups[]) : []) as GuestGroups[];
}
