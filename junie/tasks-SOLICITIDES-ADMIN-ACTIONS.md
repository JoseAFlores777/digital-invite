# Tasks — SOLICITUDES-ADMIN-ACTIONS

1. Revisar `./junie/development-standards.md` y alinear estilos/arquitectura. [impacto: proceso] ✓
2. Agregar dropdown de acciones por item en `AdminInvitationsList`: Gestionar, Enviar invitación, Enviar recordatorio. [impacto: frontend] ✓
3. Implementar modal "Enviar invitación": selector de invitado y dropdown de estado de invitación (solo UI). [impacto: frontend] ✓
4. Generar href de WhatsApp con template provisto usando `guest.person.WhatsApp`, `guest.person.first_name` e `invitation.id`. [impacto: frontend] ✓
5. Reutilizar `SolicitudManager` para Gestión. [impacto: frontend] ✓
6. Validación básica: compila, navega a `/solicitudes-admin`, abrir Acciones → Enviar invitación, verificar href. [impacto: tests/manual] *
7. Documentar alcance en `requirements-SOLICITUDES-ADMIN-ACTIONS.md`. [impacto: documentación] ✓

Notas:
- Se creó endpoint `src/app/api/invitation-status/route.ts` para persistir cambios de estado de invitación.
- El dropdown de estado de invitación ahora hace PATCH inmediato al cambiar.
- Mantener consistencia visual con `SolicitudManager` (tarjeta, sombras, bordes, botones).
