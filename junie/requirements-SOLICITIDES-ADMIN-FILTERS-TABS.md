# Requerimientos — SOLICITUDES-ADMIN-FILTERS-TABS

Objetivo: Ajustar la vista de administración `/solicitudes-admin` según nuevas indicaciones.

Alcance:
- Quitar inputs de "Tipo de invitado" y "Rol" del encabezado.
- Convertir el filtro de "Estado de invitación" en tabs (Todos, Borrador, Enviada, Cerrada), armonizados con el estilo de `SolicitudManager`.
- Filtrar por Grupo en cliente usando únicamente la data de `/api/wedding-invitations`, considerando una invitación válida cuando **al menos uno de sus miembros** tenga el `group` seleccionado.
  - Para ello, agregar el campo `guests.guest.group` en la llamada de `wedding-invitations`.
  - Evitar llamadas adicionales al cambiar de grupo.

Criterios de aceptación:
- No se muestran los campos de Tipo ni Rol.
- El estado de invitación se controla con tabs visuales.
- Al seleccionar un Grupo, se listan invitaciones que contengan algún invitado con `guest.group === <groupId>`.
- La búsqueda por nombre sigue funcionando usando `invitation.guests[].guest.person.{first_name,last_name}` de la misma respuesta.

No objetivos:
- Paginación.
- Cambios de backend adicionales más allá de incluir el campo `group`.

Notas:
- Mantener coherencia visual con `SolicitudManager`.
- Sin dependencias nuevas.
