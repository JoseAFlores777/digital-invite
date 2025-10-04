# Tasks — WEDDING-SERVICE

1. Revisar estándares del proyecto en `./junie/development-standards.md` y patrones de servicios existentes. [impact: process]
   - Hallazgo: No existe `development-standards.md`. Se sigue patrón existente (Next.js App Router, servicios con RxJS + Directus SDK, barrel `src/lib/directus.ts`). [done]
2. Diseñar contrato del servicio `getWeddingById(weddingId)` para traer generalidades de la boda (id, code, date, times, timezone, status, hashtag, public_base_url, estimated_guests, color_palette, datos de couple). [impact: backend]
   - Campos seleccionados usando `fieldsFor` y `DirectusCollectionKeys.weddings`. [done]
3. Implementar `src/server/services/weddings.service.ts` con Directus SDK + RxJS (timeout, retry, catchError) y tipos derivados de `Weddings`. [impact: backend]
   - Función `getWeddingById(weddingId)` retornando `WeddingGeneralities | null`. [done]
4. Crear ruta API `GET /api/wedding-generalities` con query `wedding_id` (fallback a `NEXT_PUBLIC_WEDDING_ID`). [impact: backend]
   - Archivo `src/app/api/wedding-generalities/route.ts`. [done]
5. Exponer servicio desde barrel `src/lib/directus.ts`. [impact: backend]
   - `export { getWeddingById } from "@/server/services/weddings.service";` [done]
6. Llamar al endpoint al cargar la app en `src/app/page.tsx` y almacenar resultado en estado. [impact: frontend]
   - Agregado `setWedding` y fetch a `/api/wedding-generalities`. [done]
7. Validación rápida de imports y consistencia con servicios existentes. [impact: QA]
   - Revisión de rutas, nombres de colección y helpers. [done]

Notas:
- Se mantuvo el estilo del repo: sin comentarios innecesarios, servicios con RxJS, helper `fieldsFor` para campos tipados.
- Si se requieren más "generalidades" (eventos, venues), se puede extender `fieldsToReturn` según el esquema de Directus.
