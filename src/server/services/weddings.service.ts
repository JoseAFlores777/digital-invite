import { readItems } from "@directus/sdk";
import { getDirectusClient } from "@/server/directus-client";

import { from, defer, lastValueFrom, of } from "rxjs";
import { map, catchError, retry, timeout } from "rxjs/operators";
import { DirectusCollectionKeys, fieldsFor, Weddings } from "@/lib/directus-interfaces";

export type WeddingGeneralities = Pick<
  Weddings,
  | "id"
  | "code"
  | "date"
  | "start_time"
  | "end_time"
  | "timezone"
  | "status"
  | "hashtag"
  | "public_base_url"
  | "estimated_guests"
  | "color_palette"
> & {
  couple?: {
    id?: string;
    name?: string | null;
    partner_1?: {
      id?: string;
      first_name?: string | null;
      last_name?: string | null;
    } | null;
    partner_2?: {
      id?: string;
      first_name?: string | null;
      last_name?: string | null;
    } | null;
  } | null;
};

export async function getWeddingById(weddingId: string): Promise<WeddingGeneralities | null> {
  const client = getDirectusClient();
  if (!client) return null;
  if (!weddingId) return null;

  const collection = DirectusCollectionKeys.weddings;

  const fieldsToReturn = fieldsFor(collection)(
    "id",
    "code",
    "date",
    "start_time",
    "end_time",
    "timezone",
    "status",
    "hashtag",
    "public_base_url",
    "estimated_guests",
    "color_palette",
    "couple.id",
    "couple.name",
    "couple.partner_1.id",
    "couple.partner_1.first_name",
    "couple.partner_1.last_name",
    "couple.partner_2.id",
    "couple.partner_2.first_name",
    "couple.partner_2.last_name",
  );

  const source$ = defer(() =>
    from(
      client.request(
        readItems(collection, {
          fields: fieldsToReturn,
          filter: { id: { _eq: weddingId } },
          limit: 1,
        })
      )
    )
  ).pipe(
    timeout(8000),
    retry(2),
    map((items: any[]): WeddingGeneralities | null => (items && items.length ? (items[0] as WeddingGeneralities) : null)),
    catchError(() => of<WeddingGeneralities | null>(null))
  );

  return lastValueFrom(source$);
}
