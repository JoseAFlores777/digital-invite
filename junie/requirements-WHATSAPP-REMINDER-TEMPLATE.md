# Requerimientos — WHATSAPP-REMINDER-TEMPLATE

Objetivo: Actualizar el texto de WhatsApp para "Enviar recordatorio" en `/solicitudes-admin`, con variantes en singular y plural, e incluir la lista de integrantes pendientes de confirmar cuando aplique.

Alcance:
- Implementar builder de mensaje para recordatorio que:
  - Use singular si la invitación tiene solo una persona (sin "y familia").
  - Use plural si hay más de una persona e incluya una sección con los nombres de quienes aún no han confirmado (estado distinto de `accepted`/`confirmed` y `declined`).
  - Mantenga el enlace único con `invitationID` y el formato de emojis/énfasis solicitados.
- Reutilizar `person.WhatsApp` como base del enlace y aplicar `encodeURIComponent` al texto.
- No modificar endpoints ni contratos.

Detalles de copy:
- Plural (resumen):
  - "¡Hola {first_name} y familia!"
  - "Queríamos recordarles... falta muy poco para nuestra boda 💍... la fidelidad de DIOS. 💒"
  - "Nos haría muy felices contar con su presencia..."
  - "Este enlace es único para ti y tu familia, por favor confirmen su asistencia aquí:"
  - Sección de pendientes (si existen):
    - "📋 Aún falta por confirmar de tu familia:" con lista con viñetas `• {first_name}`.
  - Cierre: "🕊️ Atentamente, Clarisa y José 💐💙".
- Singular (resumen):
  - "¡Hola {first_name}!"
  - "Queríamos recordarte..."
  - "Nos haría muy feliz contar con tu presencia..."
  - "Este enlace es único para ti, por favor confirma tu asistencia aquí:"
  - Sin sección de pendientes.

Criterios de aceptación:
- En el modal de "Enviar recordatorio":
  - Si la invitación tiene una sola persona, se genera el mensaje en singular.
  - Si la invitación tiene varias personas, se genera el mensaje en plural y se listan los pendientes (excluyendo confirmados/declinados).
  - El enlace abre WhatsApp con el texto codificado correctamente.
- No se altera la funcionalidad de "Enviar invitación".

Notas:
- El listado de pendientes usa `first_name` de cada persona.
- Se omite la sección de pendientes si no hay nadie pendiente.
- La lógica usa los estados por invitado provenientes de `rsvp_status` o `invitation_status` (fallback a `unknown`).
