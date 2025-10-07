# Tasks — GUEST-GROUPS

1. Revisar estándares en ./junie/development-standards.md y contexto de Directus. [impacto: proceso] ✓
2. Crear servicio server `getGuestGroups(weddingId?)` usando Directus SDK e interfaces (guest_groups). [impacto: backend] ✓
3. Crear API route `GET /api/guest-groups` con soporte `wedding_id`. [impacto: backend] ✓
4. Consumir `/api/guest-groups` en `AdminInvitationsList` y poblar opciones de Grupo con fallback. [impacto: frontend] ✓
5. Ajustar lógica de filtrado para aceptar coincidencia por `name` o `id` del grupo. [impacto: frontend] ✓
6. Validar navegación a `/solicitudes-admin`, opciones cargadas y filtro funcionando. [impacto: tests/manual] *
7. Documentar requerimientos y tareas en `junie/requirements-GUEST-GROUPS.md` y este archivo. [impacto: documentación] ✓
