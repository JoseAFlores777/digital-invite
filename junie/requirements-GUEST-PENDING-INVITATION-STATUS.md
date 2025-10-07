# Requisitos — GUEST-PENDING-INVITATION-STATUS

Objetivo: Al cambiar el estado de un invitado a "Pendiente" (unknown), el estado de la invitación asociada debe actualizarse automáticamente.

Reglas de agregación de estado de invitación:
- Si todos los invitados están Confirmados → invitation.status = "accepted_all".
- Si todos los invitados están Rechazados → invitation.status = "declined_all".
- Si hay al menos un Confirmado y no todos están confirmados → invitation.status = "accepted_partial".
- Si no hay confirmados y existe al menos un Pendiente → invitation.status = "sent".

Alcance:
- Implementar la lógica de agregación en el componente de administración (SolicitudManager) para enviar la actualización al backend con `patchInvitationStatus` tras guardar un cambio de invitado (individual o masivo).
- No se agregan dependencias.
- Mantener UI y arquitectura existentes.

Criterios de aceptación:
- Al cambiar un invitado a Pendiente, se actualiza el estado de la invitación a "Enviada" (sent) cuando corresponda.
- Cuando el conjunto de invitados resulte en todas confirmaciones/rechazos o mixto con confirmados, se apliquen los estados `accepted_all`, `declined_all`, `accepted_partial` respectivamente.
- La lista de invitaciones (AdminInvitationsList) refleja el nuevo estado sin recargar la página completa (mediante onChanged/reload).
