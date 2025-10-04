import { createDirectus, rest, staticToken } from "@directus/sdk";

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
