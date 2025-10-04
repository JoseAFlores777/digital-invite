# Requisitos — INVITATIONS-ROUTE-AND-FRONTEND

Objetivo
- Crear la ruta API para obtener invitaciones por id de boda y llamarla en el frontend junto a la llamada de guests.

Alcance
1. Ruta API Next.js App Router: `src/app/api/wedding-invitations/route.ts` (método GET).
   - Params: `?wedding_id=<ID>` (si falta, 400 con `missing_wedding_id`).
   - Usa el servicio `getWeddingInvitations(weddingId)`.
   - Respuesta: `{ invitations: Invitations[] }` o `{ invitations: [], error: string }`.
2. Exportar el servicio desde el barrel `src/lib/directus.ts`.
3. Frontend: `src/app/page.tsx` (client component)
   - Llamar en paralelo a `/api/digital-guests` y `/api/wedding-invitations`.
   - Manejar `NEXT_PUBLIC_WEDDING_ID` si está disponible para pasarla como query.
   - Guardar invitaciones en estado local (no UI requerida en este ticket).

Fuera de alcance
- Renderizar/mostrar UI de invitaciones.
- Autenticación distinta a la ya existente.

Notas
- Mantener patrón y estilo de `digital-guests`.
- Tolerar errores devolviendo arreglos vacíos.
