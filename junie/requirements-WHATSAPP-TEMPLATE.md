# Requerimientos — WHATSAPP-TEMPLATE

Objetivo: Actualizar el texto de WhatsApp para enviar invitaciones desde `/solicitudes-admin`, usando el nuevo copy provisto y cambiando a singular cuando la invitación tenga solo una persona.

Alcance:
- Reemplazar el mensaje de "Enviar invitación" por el template solicitado (incluye enlace único y canal de WhatsApp).
- Detectar si la invitación tiene 1 persona y ajustar el texto a singular:
  - "¡Hola {nombre}!" (sin "y familia").
  - "DIOS te bendiga", "invitarte", "tenerte".
  - "*Este enlace es único para ti*" (sin "y tu familia").
- Mantener el comportamiento actual para el botón de "Enviar recordatorio" (no solicitado el cambio).

Criterios de aceptación:
- En el modal de "Enviar invitación", el link abre WhatsApp con el nuevo copy.
- Para invitaciones con 1 invitado, se usa el texto en singular.
- Para invitaciones con más de 1 invitado, se usa el texto en plural ("y familia").
- El enlace de canal de WhatsApp y la cita bíblica están presentes.

Notas:
- No se modifican endpoints ni contratos.
- Se usa `encodeURIComponent` y se respeta `person.WhatsApp` como base del enlace.
