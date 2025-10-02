# Requerimientos: Activar animación también al hacer scroll hacia arriba

Objetivo
- La animación del banner (zoom del héroe) debe activarse de forma equivalente cuando el usuario hace scroll hacia arriba, no solo hacia abajo.

Criterios de aceptación
- Al acercarse a la sección desde abajo (scroll hacia arriba), la animación debe comenzar a aplicarse antes de que la sección entre completamente al viewport, de forma similar a cuando se llega desde arriba.
- El comportamiento debe sentirse simétrico en ambas direcciones.
- No se deben introducir dependencias externas.
- Debe respetarse `prefers-reduced-motion`.

Alcance
- Componente afectado: `src/components/photoBanner_1.tsx`.

Notas de implementación
- Ampliar el área de activación del `IntersectionObserver` usando `rootMargin` para pre-activar la animación cuando el elemento esté a ~1 viewport de distancia tanto por arriba como por abajo (p.ej. `"100% 0px 100% 0px"`).
- Mantener el resto de la lógica intacta para cambios mínimos y buena performance.
