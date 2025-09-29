# Requisito – Ticket 04: Altura del div difuminado y opacidad 100%→20%

## Descripción
Ajustar el divisor con difuminado del Hero para:
- Que su altura coincida con la altura de la imagen del Hero (el overlay debe cubrir todo el alto del Hero).
- Que el gradiente de opacidad vaya de 100% (en el borde inferior) a 20% (en la parte superior del overlay), evitando líneas divisorias visibles.

## Criterios de aceptación
- El overlay de difuminado está anclado al borde inferior del Hero y su altura es igual a la altura del Hero (h-full).
- El gradiente parte con opacidad ~100% del color destino en la parte inferior y va disminuyendo hasta ~20% en la parte superior.
- El color destino del difuminado continúa siendo configurable mediante la prop `fadeTo` en `Hero` o a través de la variable CSS `--fade-to`.
- Accesibilidad mantenida: `aria-hidden`, `pointer-events-none`.
- Compatibilidad con navegadores modernos; existe fallback razonable cuando no hay `color-mix`.

## Detalles de implementación
- `src/components/Hero.tsx`: cambiar la altura del overlay del divisor a `h-full` manteniendo `absolute inset-x-0 -bottom-px z-10`.
- `src/app/globals.css` (utilidad `@utility bg-hero-fade-card`): ajustar los stops para que el gradiente vaya de ~20% (arriba) a 100% (abajo) usando `color-mix(in oklab, var(--fade-to) X%, transparent)` y un fallback con `rgba(...)`.

## Ejemplo de uso
```tsx
// Difuminado hacia un tono crema, cubriendo todo el alto del Hero y con opacidad 100%→20%
<Hero fadeTo="#FAF7F2" />
```

## QA / Validación
- Verificar visualmente en móvil, tablet y desktop que:
  - La altura del overlay cubre todo el Hero.
  - No hay líneas divisorias perceptibles; el top del overlay conserva ~20% de tinte.
- Probar diferentes valores de `fadeTo` para asegurar continuidad cromática con la siguiente sección.
