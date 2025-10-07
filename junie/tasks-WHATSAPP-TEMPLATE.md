# Tasks — WHATSAPP-TEMPLATE

1. Revisar estándares y contexto previo (junie/*). [impacto: proceso] ✓
2. Actualizar builder del texto de WhatsApp para invitación (plural según requerimiento). [impacto: frontend] ✓
3. Agregar variante singular cuando la invitación tenga 1 persona (detección por length). [impacto: frontend] ✓
4. Pasar el total de invitados al builder desde el modal. [impacto: frontend] ✓
5. Mantener el builder de recordatorio sin cambios. [impacto: frontend] ✓
6. Validación manual: abrir modal en invitación con 1 y >1 invitados; verificar copy y encoding. [impacto: tests] *
7. Documentar en `requirements-WHATSAPP-TEMPLATE.md` y este archivo. [impacto: documentación] ✓

Notas:
- Sin cambios en endpoints ni contratos.
- Se conserva `person.WhatsApp` como base del enlace y se aplica `encodeURIComponent` al texto.
