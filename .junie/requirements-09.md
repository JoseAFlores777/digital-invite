# Requerimiento 09 — Hero con tipografías en paleta dusty blue, sin botón y zoom al hacer scroll

## Objetivo
Actualizar el Hero para que:
- Use combinaciones de la paleta "dusty blue" en los textos.
- Elimine el botón de "Ver detalles".
- Aplique un efecto de acercamiento (zoom-in) de la imagen de fondo conforme se hace scroll, usando GSAP (ScrollTrigger), con respeto a `prefers-reduced-motion`.

## Criterios de aceptación
- Tipografía del Hero usa colores de la paleta dusty blue definida en `globals.css` (ej.: `--color-dusty-50`, `--color-dusty-100`, `--color-dusty-200`).
- El botón "Ver detalles" ya no aparece en el Hero.
- La imagen del Hero se acerca progresivamente al hacer scroll (p. ej., escala ~1 → 1.15), con animación fluida y sin tirones.
- Si el usuario prefiere reducir movimiento, el zoom se desactiva.
- El difuminado inferior y la legibilidad del texto se mantienen correctos.
- Build de producción compila sin errores.

## Implementación
- Archivo principal: `src/components/Hero.tsx`.
  - Cambiar clases de color de los textos a la paleta dusty blue.
  - Remover la etiqueta del botón.
  - Envolver/apuntar la imagen con un selector (p. ej., `[data-hero-zoom]`) y aplicar GSAP `fromTo` con `ScrollTrigger` (`scrub: true`) para escalar de `1` a `1.15` entre `start: "top top"` y `end: "bottom top"` del Hero.
  - Respetar `prefers-reduced-motion` mediante `matchMedia`.
- Reutilizar la paleta definida en `src/app/globals.css` (no agregar dependencias).

## Consideraciones de accesibilidad y rendimiento
- `aria-hidden` se mantiene en overlays decorativos.
- `will-change: transform` en la imagen para mejor rendimiento durante el scroll.
- No bloquear interacciones (overlays con `pointer-events: none`).

## Validación
- Verificar visualmente en móvil y escritorio el zoom progresivo y la legibilidad de textos con los nuevos colores.
- Ejecutar `npm run build` y confirmar que no existan errores.

