# Requerimientos: Usar `next/image` en lugar de `<img>` en Hero y PhotoBanner1

Objetivo
- Reemplazar todas las etiquetas `<img>` por el componente `Image` de Next.js en los componentes `Hero` y `photoBanner_1`.

Criterios de aceptación
- Los componentes `Hero` y `PhotoBanner1` deben usar `next/image`.
- Debe mantenerse el comportamiento visual actual: imagen en modo cover, ocupa todo el contenedor y respeta la animación de zoom controlada por CSS var `--hero-zoom` (controlada por GSAP/scroll).
- Respetar `prefers-reduced-motion` (ya implementado en la lógica existente).
- Evitar regresiones de rendimiento: usar `fill` + `sizes="100vw"` y `priority` en lugar de `loading="eager"`.
- Mantener el tinte/overlays y enmascarados sin cambios visuales.

Alcance
- `src/components/Hero.tsx`
- `src/components/photoBanner_1.tsx`

Notas de implementación
- Importar `Image` desde `next/image`.
- Usar `fill` y mover la responsabilidad de tamaño al contenedor (que ya es `absolute inset-0` dentro de un `section` relativo).
- Mantener `data-hero-zoom` y `className` en el `<Image>` para que la animación continúe aplicándose sobre el elemento img interno.
- Eliminar `decoding` y `onError` ad-hoc; Next gestiona decodificación y priorización.
