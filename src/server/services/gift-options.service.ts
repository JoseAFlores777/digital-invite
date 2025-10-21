import { readItems } from "@directus/sdk";
import { getDirectusClient } from "@/server/directus-client";

import { from, defer, lastValueFrom, of } from "rxjs";
import { map, catchError, retry, timeout } from "rxjs/operators";
import { DirectusCollectionKeys, fieldsFor, GiftOptions } from "@/lib/directus-interfaces";

export async function getGiftOptionsByWeddingId(weddingId: string): Promise<GiftOptions[]> {
  const client = getDirectusClient();
  if (!client) return [];
  if (!weddingId) return [];

  const collection = DirectusCollectionKeys.gift_options;

  const fieldsToReturn = fieldsFor(collection)(
    "id",
    "title",
    "icon",
    "details",
    "redirectBtn_hide",
    "redirectBtn_icon",
    "redirectBtn_label",
    "redirectBtn_url",
    "sort",
    "status",
    "wedding_id",
  );

  const source$ = defer(() =>
    from(
      client.request(
        readItems(collection, {
          fields: fieldsToReturn,
          filter: { wedding_id: { _eq: weddingId } },
          sort: ["sort", "id"],
          limit: -1,
        })
      )
    )
  ).pipe(
    timeout(8000),
    retry(2),
    map((items: any[]): GiftOptions[] => (Array.isArray(items) ? (items as GiftOptions[]) : [])),
    catchError(() => of<GiftOptions[]>([]))
  );

  return lastValueFrom(source$);
}
