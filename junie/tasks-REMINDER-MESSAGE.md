# Tasks — REMINDER-MESSAGE

1. Revisar estándares en ./junie/development-standards.md — impacto: docs ✓
2. Documentar requisitos de negocio del mensaje de recordatorio — impacto: docs ✓
3. Añadir estado `sendMode` ('invite' | 'reminder') en AdminInvitationsList — impacto: frontend ✓
4. Implementar `buildWhatsAppReminderUrlFromPerson` con el texto solicitado — impacto: frontend ✓
5. Ajustar acciones del dropdown para establecer `sendMode` correspondiente — impacto: frontend ✓
6. Actualizar modal (título, label del botón, href) según `sendMode` — impacto: frontend ✓
7. Validación manual: probar ambos flujos y verificar texto en WhatsApp — impacto: tests *

Notas:
- Sin dependencias nuevas.
- Respetar separador `?`/`&` según presencia de query en `person.WhatsApp`.
- Mantener estilos y arquitectura existentes; sin comentarios innecesarios en código.
