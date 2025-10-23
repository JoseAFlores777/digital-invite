# Requisitos: WELCOME-SUBTITLE-GUESTS

Objetivo: En el componente de bienvenida (EnvelopeWelcome), el `subtitle` debe mostrar el texto "Invitación para {N} persona(s)", donde N se obtiene del arreglo de personas invitadas en la invitación.

Alcance:
- Leer el arreglo `invitation.guests` del endpoint existente `/api/invitation-by-id`.
- Calcular el número de personas invitadas válidas (con `guest.person`).
- Establecer el `subtitle` dinámicamente con pluralización correcta.
- Mantener el resto de la UI y flujo sin cambios.

Criterios de aceptación:
- Si hay 1 invitado válido, mostrar: "Invitación para 1 persona".
- Si hay 2+ invitados válidos, mostrar: "Invitación para N personas".
- El valor se refleja en el `subtitle` de `EnvelopeWelcome` al renderizar la pantalla del sobre.

Notas:
- El `subtitle` ya estaba pasando texto hardcodeado ("Con mucho cariño"); debe reemplazarse por el valor dinámico.
- No agregar dependencias nuevas. Mantener convenciones del proyecto.
- Si no existe `./junie/development-standards.md`, seguir patrones actuales (Next.js + TS + Tailwind) y la guía de evitar comentarios innecesarios en código.
