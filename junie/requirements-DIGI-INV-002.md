# Requerimientos DIGI-INV-002

Preparar el archivo `.env` con todas las variables necesarias para la integración con Directus y realizar la llamada a `getDigitalGuests` cuando cargue la página principal.

Criterios de aceptación:
- Debe existir un archivo de plantilla `.env.example` con las variables requeridas y valores por defecto razonables.
- La página principal debe invocar `getDigitalGuests` en el momento de carga, sin exponer secretos en el cliente.
- La implementación debe respetar la arquitectura del proyecto (Next.js App Router).

Notas de diseño:
- Para no exponer `DIRECTUS_STATIC_TOKEN`, la llamada a Directus se hará desde un endpoint server-side (`/api/digital-guests`) que usa `getDigitalGuests()` y devuelve JSON al cliente.
- La página principal (`src/app/page.tsx`) hará `fetch` a dicho endpoint en `useEffect` durante el montaje.

Variables de entorno implicadas:
- `DIRECTUS_URL` (requerida)
- `DIRECTUS_STATIC_TOKEN` (opcional, recomendado)
- `DIRECTUS_COLLECTION` (por defecto: `invitation`)
- `DIRECTUS_GUESTS_COLLECTION` (por defecto: `guests`)
- `DIRECTUS_GUESTS_DIGITAL_FIELD` (por defecto: `is_digital`)
- `DIRECTUS_GUESTS_DIGITAL_VALUE` (por defecto: `true`)
