# Requerimientos: Controlar la animación de la imagen con GSAP

Objetivo
- Migrar la animación de zoom del banner para que sea controlada por GSAP, vinculada al progreso de scroll.

Criterios de aceptación
- La escala de la imagen debe avanzar de 1 → (1 + speed), limitada por `maxScale`, conforme al progreso de scroll 0 → 1.
- El mapeo de progreso debe permitir un exponente `easing` (1 = lineal; n > 1 = ease-in; 0 < n < 1 = ease-out).
- Debe funcionar de forma simétrica al acercarse desde arriba o desde abajo.
- Debe respetar `prefers-reduced-motion`.
- No introducir latencia perceptible ni parpadeos al entrar/salir de viewport.

Alcance
- Componente afectado: `src/components/photoBanner_1.tsx`.

Notas de implementación
- Usar `gsap` + `ScrollTrigger` con `scrub: true` para vincular el progreso de scroll.
- Configurar `start: "top bottom"` y `end: "bottom top"` para una progresión 0→1 simétrica.
- Actualizar la variable CSS `--hero-zoom` en `onUpdate` según `progress` y `easing`.
- Desactivar GSAP cuando `prefers-reduced-motion` esté activo, fijando `--hero-zoom` en `1`.
