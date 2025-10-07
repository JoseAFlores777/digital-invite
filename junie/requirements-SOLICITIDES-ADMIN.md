# Requerimientos — SOLICITUDES-ADMIN

Objetivo: Crear una nueva ruta de administración para gestionar invitaciones ("solicitudes-admin").

Alcance:
- Nueva página en App Router: `/solicitudes-admin`.
- Listado de todas las invitaciones de la boda.
- Filtros:
  - Búsqueda por nombre de invitado (first_name/last_name en cualquiera de los invitados de la invitación).
  - Por tipo de invitado (guest.type).
  - Por rol (guest.role).
  - Por grupo (guest.group).
  - Por estado de la invitación (invitation.status).
- Cada ítem tiene botón de acción que abre un modal con los datos de la invitación y el estado de cada invitado.
- En el modal, se pueden:
  - Cambiar estado por persona (accepted/unknown/declined).
  - Enviar invitación y enviar recordatorio (cuando apliquen según la implementación existente del manager).
  - Cambiar estado de la invitación (si aplica en el manager).

Fuentes de datos:
- Reutilizar endpoints existentes usados por Home:
  - `/api/wedding-invitations` para listar invitaciones.
  - `/api/digital-guests` para obtener invitados digitales (rol/tipo/grupo y relación con invitación).
  - `/api/invitation-by-id` para cargar el detalle cuando el modal abre (lo maneja `SolicitudManager`).

Criterios de aceptación:
- Navegar a `/solicitudes-admin` muestra filtros y la lista.
- Aplicar filtros y búsqueda actualiza el listado en cliente.
- Al pulsar "Gestionar" se abre el modal del manager para esa invitación.
- Desde el modal se pueden cambiar estados por invitado y cerrar el modal sin romper navegación.

No objetivos:
- No se implementa paginación todavía.
- No se crean nuevos endpoints si los existentes proveen la data mínima.

Notas:
- Mantener estilos coherentes con componentes existentes.
- Evitar dependencias nuevas.
