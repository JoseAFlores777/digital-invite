# Tasks — TAILWIND-ANIMATE-SHINE

Contexto: Agregar keyframes y animation en Tailwind para soportar la clase `animate-shine` utilizada por `ShineBorder`.

Estado de estándares: No existe `./junie/development-standards.md`. Se mantiene el estilo y arquitectura actuales (Next.js + Tailwind). Cambios mínimos.

## Tareas
1. Definir `keyframes.shine` en `tailwind.config.js` que anime `background-position` de 0%→100%→0%. [impacto: frontend] — done ✓
2. Definir `animation.shine` usando `var(--duration,14s)` para sincronizar con `ShineBorder`. [impacto: frontend] — done ✓
3. Verificar que `ShineBorder` aplica `motion-safe:animate-shine` y que el gradiente tiene `background-size: 300% 300%`. [impacto: QA] — done ✓
4. QA manual: Renderizar un componente con `ShineBorder` (por ejemplo en GiftDialog con `shine={true}`) y verificar movimiento suave del borde. [impacto: QA] — pending *

## Notas
- La animación respeta preferencias de usuario: se activa sólo con `motion-safe:`.
- La duración puede variarse desde el componente via `duration` prop (p.ej., 12s, 14s).