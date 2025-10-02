# Requerimientos: Reducir lag en móviles al hacer scroll up en los slides con imagen

Objetivo
- Eliminar o reducir de forma notable el jank/lag que se observa en móviles al hacer scroll hacia arriba en el stack sticky de `PhotoBanner1`.

Criterios de aceptación
- La animación de zoom debe mantenerse fluida al subir y bajar en dispositivos móviles.
- No deben activarse múltiples capas con `will-change` innecesariamente fuera de viewport.
- Evitar refrescos costosos por resize móvil durante el scroll.
- Mantener cambios mínimos y sin romper la UI existente.
- Respetar `prefers-reduced-motion`.

Alcance
- `src/components/photoBanner_1.tsx`
- `src/components/PanelPinStack.tsx`

Solución aplicada (resumen)
- GSAP ScrollTrigger: `scrub` numérico (`0.2`) para suavizar y reducir picos de trabajo.
- Alternar `will-change: transform` solo cuando el slide esté activo (`onEnter`/`onEnterBack`) y retirarlo al salir (`onLeave`/`onLeaveBack`).
- Configurar `ScrollTrigger.config({ ignoreMobileResize: true })` una sola vez para evitar `refresh` por cambios de barra de URL en móviles durante el scroll.
- Usar `next/image` sin `priority` por defecto; habilitar `priority` solo en el primer slide desde `PanelPinStack`.
- Mantener `fill` + `sizes="100vw"` y añadir `quality={70}` para contener el costo de decode en móviles.

Notas
- Se removió `will-change` fijo de la clase CSS del `<Image>`.
- No se introdujeron dependencias nuevas.
