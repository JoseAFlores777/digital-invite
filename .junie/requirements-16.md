# Ticket 16 — El contador debe seguir después del Hero

## Objetivo
Colocar la sección de cuenta regresiva (counter) inmediatamente después del Hero, tal como lo solicitó el usuario: "quiero que el conter siga despues del hero".

## Alcance
- Reordenar las secciones dentro de `InvitationContent` para que `<Countdown />` aparezca justo después de `<Hero />`.
- Mantener el resto de secciones en su orden relativo original.
- No se modifican estilos ni lógica del contador ni del Hero.

## Criterios de aceptación
1. Al cargar la invitación, la primera sección es el Hero y, al hacer scroll, la siguiente sección visible es el contador.
2. No debe existir un duplicado de la sección de contador.
3. El resto de secciones (Historia, Detalles, Programa, etc.) se mantienen funcionales y en orden después del contador.
4. Build/dev sin errores.

## Notas
- Cambio puramente de orden en el JSX; no afecta a backend ni a datos.
- Se mantienen las clases Tailwind y los estilos existentes.
