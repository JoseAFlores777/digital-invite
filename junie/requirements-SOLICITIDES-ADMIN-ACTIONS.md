# Requerimientos — SOLICITUDES-ADMIN-ACTIONS

Objetivo: Extender la vista de administración de solicitudes (`/solicitudes-admin`) para agregar acciones por item: gestionar, enviar invitación y enviar recordatorio. Implementar un modal para "Enviar invitación".

Alcance:
- En cada item del listado de invitaciones, agregar un dropdown "Acciones" con:
  - Gestionar (abre `SolicitudManager` en modal para esa invitación).
  - Enviar invitación (abre un modal propio para componer y abrir el mensaje de WhatsApp).
  - Enviar recordatorio (por ahora reutiliza el mismo modal; se puede ajustar el copy más adelante).
- Modal "Enviar invitación":
  - Selector de invitado (derivado de `/api/digital-guests` filtrados por `invitation_id`).
  - Dropdown para estado de la invitación (solo UI por ahora: draft/sent/closed; no persiste hasta definir endpoint).
  - Botón "Enviar invitación" que es un href a WhatsApp tomando `guest.person.WhatsApp` como base y agregando `text=` con el template proporcionado.

Template WhatsApp (con variables):
- Base: `guest.person.WhatsApp` (si no existe, `https://wa.me/`)
- Query string `text=` con el siguiente contenido URL-encoded, interpolando:
  - `{{guest.person.first_name}}`
  - `{{invitation.id}}`

Texto (codificado) tomado del requerimiento original.

Fuentes de datos:
- `/api/wedding-invitations` para invocaciones.
- `/api/digital-guests` para invitados digitales y su `person` (incluye WhatsApp si existe).
- `SolicitudManager` sigue usando `/api/invitation-by-id` internamente.

Criterios de aceptación:
- Cada item del listado muestra botón Gestionar y un dropdown Acciones.
- Opción "Enviar invitación" abre el modal con selector de invitado y botón que abre WhatsApp con el texto.
- El href incluye el `invitationID` correcto y el nombre del invitado en el saludo.
- UI consistente con `SolicitudManager` (bordes, sombras, clases utilitarias).

No objetivos (por ahora):
- Persistencia de cambio de estado de la invitación (falta endpoint/flujo).
- Cambios de estado masivos.
- Mensajería de recordatorio con copy diferenciado.
