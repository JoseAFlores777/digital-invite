# Ticket 17 — Hero title estilo “logo de boda” (ampersand gigante + líneas TOGETHER/FOREVER)

## Objetivo
Adaptar el título del Hero para que siga el estilo propuesto: ampersand (“&”) gigante en segundo plano y los nombres en dos líneas, acompañados por etiquetas “together” y “forever” en mayúsculas y la fecha al centro. Debe respetar la paleta Wedgewood y evitar tonos blancos para el texto.

## Alcance
- Modificar `src/components/Hero.tsx` para reemplazar el bloque de título por una estructura `relative isolate grid place-items-center` con el ampersand gigante como decorativo (`aria-hidden="true"`).
- Usar variables tipográficas ya definidas (Forum como display/sans y Pinyon Script para script cuando aplique), con utilidades Tailwind `font-display` y `italic`.
- Emplear colores Wedgewood; evitar `text-white` y otros blancos para mantener contraste.
- Mantener el layout existente: anclado al borde inferior en mobile con `pt-[62dvh]` y paddings actuales; conservar el difuminado inferior y el tint overlay del Hero.

## Criterios de aceptación
1. El Hero muestra:
   - Ampersand gigante en segundo plano con baja opacidad y color Wedgewood (p. ej. `text-wedgewood-1100/10`).
   - Líneas “TOGETHER” y “FOREVER” en mayúsculas, tracking amplio y color `text-wedgewood-1100/90`.
   - Nombres “Clarisa” y “José” en dos líneas con `font-display italic` y tamaño responsivo (`text-5xl md:text-6xl lg:text-7xl`).
   - Fecha al centro con separadores `·` y tracking amplio.
2. Los colores del texto pertenecen a la paleta Wedgewood (no usar blanco puro).
3. Se mantiene la accesibilidad: el ampersand de fondo es `aria-hidden` y `pointer-events-none`.
4. No se rompen comportamientos previos del Hero (anclaje inferior móvil, difuminado y overlay tint, zoom-on-scroll si no hay reduce-motion).
5. La app compila en `dev` y `build` sin errores.

## Notas
- El ejemplo base usa `text-foreground` para los nombres, que en el tema actual es un tono profundo Wedgewood (oscuro), evitando blanco.
- Si en QA visual el contraste sobre la fotografía fuese insuficiente, se puede aumentar ligeramente el `bg-wedgewood-1400/35` del overlay (p. ej. a `/45`) o añadir `drop-shadow` sutil a los títulos.
