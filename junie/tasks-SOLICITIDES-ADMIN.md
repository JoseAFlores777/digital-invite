# Tasks — SOLICITUDES-ADMIN

1. Revisar estándares en ./junie/development-standards.md y contexto previo de invitaciones. [impacto: proceso] ✓
2. Identificar APIs existentes para listar invitaciones y huéspedes digitales. [impacto: backend/frontend] ✓
3. Crear componente `src/components/AdminInvitationsList.tsx` con filtros: búsqueda por nombre, tipo, rol, grupo y estado de invitación. [impacto: frontend] ✓
4. Reutilizar `SolicitudManager` en modo modal para gestionar cada invitación desde el listado. [impacto: frontend] ✓
5. Crear ruta `src/app/solicitudes-admin/page.tsx` que renderiza el listado. [impacto: frontend] ✓
6. Documentar requerimientos en `junie/requirements-SOLICITUDES-ADMIN.md`. [impacto: documentación] ✓
7. Validar compilación local y navegación básica. [impacto: tests/manual] *
8. Ajustes menores de UI/UX si es necesario (sin cambiar arquitectura). [impacto: frontend] 

Notas:
- Se evita añadir dependencias nuevas. Se aprovechan endpoints `/api/wedding-invitations`, `/api/digital-guests` y `SolicitudManager` que ya usa `/api/invitation-by-id`.
- Cualquier inconsistencia de datos se maneja con safeguards en cliente (listas vacías, mensajes de error simples).
