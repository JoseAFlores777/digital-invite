# Requerimientos: Slides 1 y 2 se quedan estáticos al hacer scroll up

Objetivo
- Asegurar que los primeros slides (1 y 2) animen correctamente también al desplazarse hacia arriba, dentro del stack de paneles sticky.

Contexto
- Los slides están implementados como secciones sticky que contienen el componente `PhotoBanner1`.
- La animación de `PhotoBanner1` depende del progreso de scroll.

Criterios de aceptación
- Al desplazarse hacia arriba, los slides 1 y 2 muestran la animación de zoom de forma continua (no quedan congelados) durante su tramo sticky.
- El comportamiento es simétrico al desplazamiento hacia abajo.
- Se respeta `prefers-reduced-motion`.
- No se introducen dependencias externas.
- El cambio debe ser mínimo y no afectar negativamente el rendimiento.

Alcance
- Componente afectado: `src/components/photoBanner_1.tsx`.

Notas de implementación
- Evitar usar únicamente `getBoundingClientRect()` para calcular progreso dentro de contenedores sticky, ya que produce valores constantes mientras el elemento está fijado al viewport.
- Calcular la posición del elemento en el documento usando `offsetTop` acumulado (cadena de `offsetParent`) para obtener un `sectionTop` estable independiente del estado sticky.
- Mantener el `IntersectionObserver` con `rootMargin` simétrico para pre-activación al aproximarse tanto desde arriba como desde abajo.