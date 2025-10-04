# Requisitos: Centrado del heading en PerspectiveZoom (aún no centrado)

Objetivo: Asegurar que el contenido de `headingContent` en `PerspectiveZoom` quede centrado en la pantalla en todo momento.

Hallazgos:
- La clase `.heading` en `PerspectiveZoom.module.scss` aplica `transform: translate3d(-50%, -50%, -2000px)` (centra vía CSS).
- El wrapper del heading en JSX añadía además utilidades Tailwind `-translate-x-1/2 -translate-y-1/2` y `whitespace-nowrap`.
- Las transformaciones duplicadas y `whitespace-nowrap` pueden provocar conflictos/override del `transform` y desbordes horizontales, causando percepción de “descentrado”.

Requisitos de cambio:
- Eliminar `-translate-x-1/2 -translate-y-1/2` del wrapper del heading (tanto en la rama `headingContent` como en la de `headingText`).
- Eliminar `whitespace-nowrap` para permitir el quiebre natural de líneas del contenido.
- Mantener `left-1/2 top-1/2` y delegar el centrado al `transform` definido en `.heading`.

Criterios de aceptación:
- El heading (sea `headingContent` o `headingText`) se renderiza visualmente centrado en ambos ejes en viewport, sin desbordes inesperados.
- La animación GSAP de `z` (profundidad) sigue funcionando sin regresiones.

No funcionales:
- Cambios mínimos en código, sin nuevas dependencias.
- Mantener coherencia con patrones del repo (Tailwind + CSS Modules + useGsapContext).
