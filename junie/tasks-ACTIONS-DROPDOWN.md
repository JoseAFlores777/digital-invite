# Tasks — ACTIONS-DROPDOWN

1. Revisar estándares en ./junie/development-standards.md — impacto: docs ✓
2. Analizar componente afectado (AdminInvitationsList) y ubicar contenedor con overflow que recorta el dropdown — impacto: frontend ✓
3. Aplicar fix mínimo: cambiar overflow-hidden a overflow-visible en el contenedor principal de la tarjeta — impacto: frontend ✓
4. Verificar que el menú no se recorte cuando solo hay un ítem y que no haya regresiones visuales obvias — impacto: frontend *
5. Documentar cambios y solicitar validación visual humana si es necesario — impacto: docs *

Notas:
- No se añadieron dependencias.
- El menú ya tiene z-50, el problema era clipping por overflow; z-index no soluciona overflow.
- Si se detectan regresiones de recorte en bordes por remover overflow-hidden, considerar alternativa con Portal a body para el menú.
