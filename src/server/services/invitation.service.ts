import { readItems } from "@directus/sdk";
import { getDirectusClient } from "@/server/directus-client";


class InvitationContent {
    id: string;
    title: string;
    couple: string;
    date: string;
    time: string;
    venue: string;
    address: string;
    message: string;
    cover_image?: string;
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
  } catch {
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
