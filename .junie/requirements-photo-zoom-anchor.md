# Requerimientos: Anclaje de zoom direccionado en PhotoBanner1

Objetivo
- Permitir que la animación de zoom (acercar/alejar) pivote alrededor de un punto de la imagen configurable por prop.

Criterios de aceptación
- Debe existir un enum exportado que identifique las posiciones típicas: TopLeft, TopCenter, TopRight, CenterLeft, Center, CenterRight, BottomLeft, BottomCenter, BottomRight.
- PhotoBanner1 debe aceptar una prop `anchor` basada en ese enum.
- La animación de zoom debe ocurrir alrededor del `anchor` indicado (vía `transform-origin`).
- Mantener la animación actual controlada por GSAP/ScrollTrigger sin alteraciones funcionales.
- Respetar `prefers-reduced-motion` como hasta ahora.
- Cambios mínimos, sin nuevas dependencias.

Alcance
- Componente afectado: `src/components/photoBanner_1.tsx`.

Notas de implementación
- Mapear cada valor del enum a un string de CSS `transform-origin` (ej. "top left", "center right").
- Quitar `origin-center` de la clase para no sobrescribir el `transform-origin` dinámico.
- Aplicar `style={{ transformOrigin: ... }}` en el `<Image>` manteniendo el resto de clases y la variable CSS `--hero-zoom`.
