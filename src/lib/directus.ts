import { createDirectus, rest, readItems, staticToken } from "@directus/sdk";

export type InvitationContent = {
  id?: string | number;
  title?: string; // e.g., "Nuestra Boda"
  couple?: string; // e.g., "Clarissa & José"
  date?: string; // ISO date or human-readable
  time?: string; // e.g., "17:00"
  venue?: string; // e.g., "Iglesia ..."
  address?: string;
  message?: string;
  cover_image?: string; // Directus file ID or URL
};

export function getDirectusClient() {
  const url = process.env.DIRECTUS_URL;
  if (!url) return null;
  let client = createDirectus(url).with(rest());
  const token = process.env.DIRECTUS_STATIC_TOKEN;
  if (token) {
    client = client.with(staticToken(token));
  }
  return client;
}

export async function getInvitationContent(): Promise<InvitationContent> {
  try {
    const client = getDirectusClient();
    if (!client) throw new Error("DIRECTUS_URL no configurado");
    const collection: string = process.env.DIRECTUS_COLLECTION || "invitation";

    const items = (await client.request(
      readItems(collection, {
        limit: 1,
        sort: ["-date"],
      })
    )) as unknown as InvitationContent[];

    const item: InvitationContent = items?.[0] ?? {};
    return {
      id: item.id,
      title: item.title ?? "Nuestra Boda",
      couple: item.couple ?? "Clarissa & José",
      date: item.date ?? "2025-12-31",
      time: item.time ?? "17:00",
      venue: item.venue ?? "Lugar por definir",
      address: item.address ?? "Dirección por definir",
      message:
        item.message ??
        "Nos hace mucha ilusión compartir este día contigo. ¡Acompáñanos a celebrar!",
      cover_image: item.cover_image ?? undefined,
    };
  } catch (error) {
    // Fallback when Directus is not configured or request fails
    return {
      title: "Nuestra Boda",
      couple: "Clarissa & José",
      date: "2025-12-31",
      time: "17:00",
      venue: "Lugar por definir",
      address: "Dirección por definir",
      message:
        "Nos hace mucha ilusión compartir este día contigo. ¡Acompáñanos a celebrar!",
    };
  }
}
