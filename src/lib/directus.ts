import { createDirectus, rest, readItems, staticToken } from "@directus/sdk";
import {getNested, parseEnvValue, parseFields} from "@/utils/server-utils";

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
  } catch {
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

export type Guest = {
  id?: string | number;
  name?: string;
  email?: string;
  phone?: string;
  [key: string]: any;
};


export interface Guest {
    id: string | number;
    name?: string;
    email?: string;
    phone?: string;
    // ...otros campos que vengan de Directus
    [key: string]: unknown;
}



const DEFAULT_FIELDS = [
    "id",
    "person.first_name",
    "person.last_name",
    "person.email",
    "person.phone",
] as const;

export async function getDigitalGuests(): Promise<Guest[]> {
    try {
        const client = getDirectusClient();
        if (!client) throw new Error("DIRECTUS_URL no configurado");

        const collection = process.env.DIRECTUS_GUESTS_COLLECTION ?? "guests";
        const digitalField = process.env.DIRECTUS_GUESTS_DIGITAL_FIELD ?? "digital";
        const digitalValue = parseEnvValue(process.env.DIRECTUS_GUESTS_DIGITAL_VALUE, true);

        const fields = parseFields(process.env.DIRECTUS_GUESTS_FIELDS, [...DEFAULT_FIELDS]);

        // 1) Intento con filtro en servidor
        let items: any[];
        try {
            items = (await client.request(
                readItems(collection,{
                    fields:[
                        "id",
                        {
                        person:["first_name","last_name","email","phone"]
                        }
                    ],
                })
            )) as any[];
            console.log("items", JSON.parse(JSON.stringify(items)));
        } catch {
            // 2) Fallback: traigo y filtro en cliente (por si el campo anidado no es filtrable en DB)
            items = (await client.request(
                readItems(collection, {
                    fields,
                    limit: -1,
                    sort: ["id"],
                })
            )) as any[];

            const pick = (obj: any) =>
                digitalField.includes(".") ? getNested(obj, digitalField) : obj?.[digitalField];

            items = items.filter((it) => pick(it) === digitalValue);
        }

        // 3) Normalización de salida
        const normalized: Guest[] = items.map((it) => {
            // Preferir name plano; si no existe, construirlo desde person.*
            const fullName = [
                (it?.person?.first_name as string | undefined)?.trim(),
                (it?.person?.last_name as string | undefined)?.trim(),
            ]
                .filter(Boolean)
                .join(" ")
                .trim();

            const name = (it?.name as string | undefined)?.trim() || fullName || undefined;

            const email = (it?.email as string | undefined) || (it?.person?.email as string | undefined);
            const phone = (it?.phone as string | undefined) || (it?.person?.phone as string | undefined);

            return {
                id: it?.id,
                name,
                email,
                phone,
                ...it, // conserva el resto por compatibilidad
            } as Guest;
        });

        // Evita logs ruidosos en prod; si necesitas, usa un logger
        // if (process.env.NODE_ENV !== "production") console.debug("digital guests", normalized);

        return normalized;
    } catch {
        return [];
    }
}
