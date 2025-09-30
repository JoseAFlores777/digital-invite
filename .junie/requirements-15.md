# Ticket 15 — Fix divisor difuminado del Hero (inline Tailwind)

## Objetivo
Corregir el overlay de difuminado del Hero para que cubra toda la altura de la foto (encima de la imagen) y eliminar dependencias de utilidades personalizadas, usando clases inline de Tailwind (arbitrary values) en el template.

## Alcance
- Reemplazar la utilidad antigua `bg-hero-fade-card` por un gradiente inline con Tailwind v4 en `Hero.tsx`.
- Asegurar posicionamiento absoluto `inset-0` para cubrir 100% del alto del Hero, sobre la imagen y bajo los textos.
- Mantener color configurable vía `--fade-to` (prop `fadeTo`).

## Criterios de aceptación
1. El overlay de difuminado está por encima de la imagen y cubre toda la altura del Hero (sin líneas divisorias visibles).
2. El gradiente está implementado con clases inline de Tailwind (e.g., `bg-[linear-gradient(...)]`).
3. El color de destino sigue siendo configurable por `fadeTo`/`--fade-to`.
4. No se introducen regresiones en accesibilidad (overlay aria-hidden, pointer-events-none) ni en la legibilidad de textos.
5. La app compila en dev/prod sin errores.

## Notas
- El gradiente se definió como `to top` con paradas intermedias usando `color-mix(in oklab, ...)` para una transición más limpia. Navegadores modernos lo soportan.
- Si se requiere mayor compatibilidad, se puede complementar con un fallback simple (`to top` desde `var(--fade-to)` a `transparent`).
