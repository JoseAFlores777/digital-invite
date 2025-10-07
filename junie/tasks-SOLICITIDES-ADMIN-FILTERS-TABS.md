# Tasks — SOLICITUDES-ADMIN-FILTERS-TABS

1. Revisar estándares en ./junie/development-standards.md y contexto previo. [impacto: proceso] ✓
2. Backend: incluir `guests.guest.group` en `getWeddingInvitations` para `/api/wedding-invitations`. [impacto: backend] ✓
3. Frontend: eliminar inputs de Tipo y Rol en `AdminInvitationsList`. [impacto: frontend] ✓
4. Frontend: reemplazar select de estado por tabs (Todos/Borrador/Enviada/Cerrada). [impacto: frontend] ✓
5. Frontend: ajustar selector de Grupo a value=id y label=name (fallback a id). [impacto: frontend] ✓
6. Frontend: refactor de filtrado para usar `invitation.guests[].guest.group` (id) y `guest.person` para búsqueda. [impacto: frontend] ✓
7. Validación básica: compila, filtros funcionan sin llamadas extra. [impacto: tests/manual] *
8. Documentación: actualizar `junie/requirements-...` y `junie/tasks-...`. [impacto: documentación] ✓

Notas:
- Sin dependencias nuevas. Se mantienen estilos consistentes con `SolicitudManager`.
- Filtrado por Grupo ahora se basa exclusivamente en la data de `/api/wedding-invitations`.
