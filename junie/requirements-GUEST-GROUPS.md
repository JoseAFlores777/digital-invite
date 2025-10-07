# Requerimientos — GUEST-GROUPS

Objetivo: Obtener los tipos/grupos desde Directus (`/items/guest_groups`) usando servicios y tipos del proyecto, exponer un endpoint interno y poblar el filtro "Grupo" en AdminInvitationsList.

Alcance:
- Servicio server-side `getGuestGroups(weddingId?)` que consulta la colección `guest_groups` con campos: `id`, `name`, `type`, `wedding`.
- Ruta API App Router: `GET /api/guest-groups?wedding_id=...` para entregar los grupos al frontend.
- Ajuste de `AdminInvitationsList.tsx` para consumir `/api/guest-groups` y llenar el dropdown de Grupo.
- Mantener fallback a grupos derivados de `/api/digital-guests` en caso de error.
- El filtrado debe tolerar que `guest.group` sea `name` o `id`.

Criterios de aceptación:
- Navegar a `/solicitudes-admin` muestra el filtro "Grupo" con opciones proveniente de Directus.
- Si falla la API, aún aparecen opciones derivadas de los datos de invitados.
- Al seleccionar un grupo, el listado se filtra correctamente.

No objetivos:
- Crear/editar/eliminar grupos desde UI.
- Cambios de esquema en Directus.

Notas:
- Usar `directus-interfaces.ts` (DirectusCollectionKeys y fieldsFor) y `getDirectusClient` existente.
