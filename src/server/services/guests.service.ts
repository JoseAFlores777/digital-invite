import { readItems } from "@directus/sdk";
import { getDirectusClient } from "@/server/directus-client";
import { getNested, parseEnvValue, parseFields } from "@/utils/server-utils";
import type { Guest } from "@/lib/directus-interfaces";

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

    let items: any[];
    try {
      items = (await client.request(
        readItems(collection, {
          fields: [
            "id",
            {
              person: ["first_name", "last_name", "email", "phone"],
            },
          ],
        })
      )) as any[];
    } catch {
      items = (await client.request(
        readItems(collection, {
          fields,
          limit: -1,
          sort: ["id"],
        })
      )) as any[];

      const pick = (obj: any) =>
        digitalField.includes(".") ? getNested(obj, digitalField) : (obj as any)?.[digitalField];

      items = items.filter((it) => pick(it) === digitalValue);
    }

    const normalized: Guest[] = items.map((it) => {
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
        ...it,
      } as Guest;
    });

    return normalized;
  } catch {
    return [];
  }
}
