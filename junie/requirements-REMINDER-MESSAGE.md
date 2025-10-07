# Requisitos — REMINDER-MESSAGE

Objetivo: Ajustar el mensaje de WhatsApp para la acción "Enviar recordatorio" en AdminInvitationsList, usando el texto especificado por el negocio.

Texto requerido (contenido, no literal URL-encoded):

🩵 ¡Hola {guest.person.first_name} y familia! 🤍

🙏🏼 DIOS les bendiga. Queríamos recordarles con mucho cariño que ya falta muy poco para nuestra boda 💒, un día en el que celebraremos el amor y la fidelidad de DIOS.

🌸 Nos encantaría saber si podrán acompañarnos en este momento tan especial.

🔗 Este enlace es único para ti y tu familia, pueden confirmar aquí:
👉 https://invite.joseiz.com/?invitationID={invitation.id}

📖 Proverbios 3:6
"Reconócelo en todos tus caminos, y ÉL enderezará tus veredas."

🩵 Con agradecimiento y alegría,
Clarisa y José

Alcance:
- Mantener el mensaje actual para "Enviar invitación".
- Para "Enviar recordatorio", usar el contenido anterior y URL-encodearlo al construir el parámetro `text`.
- Base del enlace de WhatsApp: usar `guest.person.WhatsApp` si existe, de lo contrario `https://wa.me/`.
- Respetar separador `?` o `&` según corresponda.

Criterios de aceptación:
- Desde AdminInvitationsList, al abrir el dropdown y elegir "Enviar recordatorio", el modal debe indicar "Enviar recordatorio" y el botón debe abrir WhatsApp con el mensaje anterior.
- El nombre `{guest.person.first_name}` y el `{invitation.id}` deben insertarse correctamente.
- No se introducen dependencias externas.
