# Tasks — WHATSAPP-REMINDER-TEMPLATE

1. Revisar estándares y contexto previo (junie/*) y el estado actual del builder de recordatorio. [impacto: proceso] ✓
2. Extender la carga detallada de la invitación para incluir `status` por invitado (rsvp_status/invitation_status). [impacto: frontend] ✓
3. Actualizar el tipo de `sendInviteGuests` para almacenar `status` por persona. [impacto: frontend] ✓
4. Reescribir `buildWhatsAppReminderUrlFromPerson` para admitir el arreglo de invitados de la invitación y decidir singular/plural. [impacto: frontend] ✓
5. Componer el copy:
   - Singular sin sección de pendientes. [impacto: frontend] ✓
   - Plural con lista dinámica de pendientes (excluye accepted/confirmed/declined). [impacto: frontend] ✓
6. Pasar `sendInviteGuests` al builder desde el botón de "Enviar recordatorio". [impacto: frontend] ✓
7. Validación manual: abrir modal en casos de 1 y >1 invitados, verificar texto, lista de pendientes y encoding de WhatsApp. [impacto: tests] *
8. Documentar alcance en `junie/requirements-WHATSAPP-REMINDER-TEMPLATE.md` y este archivo. [impacto: documentación] ✓

Notas:
- Sin cambios en endpoints ni contratos.
- Mantener consistencia de estilo y evitar comentarios en código innecesarios.