import { readItems } from "@directus/sdk";
import { getDirectusClient } from "@/server/directus-client";

import { from, defer, lastValueFrom, of } from "rxjs";
import { map, catchError, retry, timeout } from "rxjs/operators";
import { DirectusCollectionKeys, fieldsFor, Weddings, WebPhotos } from "@/lib/directus-interfaces";

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
  | "live_url"
  | "shared_album_url"
  | "shared_album_tutorial_url"
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
} & {
  web_photos?: WebPhotos[];
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
    "live_url",
    "shared_album_url",
    "shared_album_tutorial_url",
    "couple.id",
    "couple.name",
    "couple.partner_1.id",
    "couple.partner_1.first_name",
    "couple.partner_1.last_name",
    "couple.partner_2.id",
    "couple.partner_2.first_name",
    "couple.partner_2.last_name",
    "web_photos.asset",
    "web_photos.initialOpacity",
    "web_photos.initialOpacity_m",
    "web_photos.layer",
    "web_photos.layer_m",
    "web_photos.type",
    "web_photos.width",
    "web_photos.width_m",
    "web_photos.xposition",
    "web_photos.xposition_m",
    "web_photos.yposition",
    "web_photos.yposition_m",
    "web_photos.zIndex",
    "web_photos.zIndex_m",
  );

  const source$ = defer(() =>
    from(
      client.request(
        readItems(collection, {
          fields: fieldsToReturn,
          filter: { id: { _eq: weddingId } },
          limit: 1,
          deep: {
            web_photos: {
              _filter: { status: { _eq: "published" } },
              _limit: -1,
            },
          },
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
