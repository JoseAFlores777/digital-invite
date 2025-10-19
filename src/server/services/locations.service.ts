import { readItems } from "@directus/sdk";
import { getDirectusClient } from "@/server/directus-client";
import { from, defer, lastValueFrom, of } from "rxjs";
import { map, catchError, retry, timeout } from "rxjs/operators";
import { DirectusCollectionKeys, fieldsFor, WeddingEvents } from "@/lib/directus-interfaces";

export type WeddingLocation = {
  venue_name?: string | null;
  address?: string | null;
  latitude?: number | null;
  longitude?: number | null;
  event_type?: string | null;
};

export async function getWeddingLocation(weddingId: string): Promise<WeddingLocation | null> {
  const client = getDirectusClient();
  if (!client) return null;
  if (!weddingId) return null;

  const collection = DirectusCollectionKeys.wedding_events;

  const fieldsToReturn = fieldsFor(collection)(
    "id",
    "type",
    "venue.name",
    "venue.address",
    "venue.latitude",
    "venue.longitude",
    "venue.waze_link",
    "venue.google_maps_link",
  );

  // Prefer reception, then ceremony, else any
  const preferOrder = ["reception", "ceremony"]; // fallback any

  const source$ = defer(() =>
    from(
      client.request(
        readItems(collection, {
          fields: fieldsToReturn,
          filter: { wedding: { _eq: weddingId } },
          limit: -1,
        })
      )
    )
  ).pipe(
    timeout(8000),
    retry(2),
    map((items: any[]): WeddingLocation | null => {
      const events = Array.isArray(items) ? (items as any[]) : [];
      if (!events.length) return null;
      let selected = events.find((e) => preferOrder.includes((e?.type || "").toLowerCase()));
      if (!selected) selected = events[0];
      return {
        venue_name: selected?.venue?.name ?? null,
        address: selected?.venue?.address ?? null,
        latitude: selected?.venue?.latitude ?? null,
        longitude: selected?.venue?.longitude ?? null,
        event_type: selected?.type ?? null,
          ...(selected?.venue?.waze_link ? { waze_link: selected?.venue?.waze_link } : {}),
          ...(selected?.venue?.google_maps_link ? { google_maps_link: selected?.venue?.google_maps_link } : {}),
      };
    }),
    catchError(() => of<WeddingLocation | null>(null))
  );

  return lastValueFrom(source$);
}
