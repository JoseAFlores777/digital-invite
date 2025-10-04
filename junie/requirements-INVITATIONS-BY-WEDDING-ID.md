# Requisitos — INVITATIONS-BY-WEDDING-ID

Objetivo
- Crear un servicio que retorne todas las invitaciones (Invitations[]) asociadas a una boda dada (wedding id).

Alcance
1. Nuevo servicio en `src/server/services/invitations.service.ts`.
2. Función exportada: `getWeddingInvitations(weddingId: string): Promise<Invitations[]>`.
3. Usar el cliente existente `getDirectusClient()` y el SDK `readItems`.
4. Filtrar por `wedding: { _eq: weddingId }`.
5. Seleccionar campos base (id, code, invite_type, status, sent_at, public_link, notes, wedding) con `fieldsFor(DirectusCollectionKeys.invitations)`.
6. Seguir el mismo patrón RxJS que otros servicios (timeout, retry, catchError) y retornar `[]` en caso de error.

No Alcance
- No crear ruta API ni UI; solo el servicio.
- No expandir relaciones (guests) por ahora.

Notas
- Mantener consistencia con `guests.service.ts`.
- Tipar con `Invitations` de `src/lib/directus-interfaces.ts`.
