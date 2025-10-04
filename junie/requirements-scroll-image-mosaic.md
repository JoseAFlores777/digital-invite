# Requisitos: ScrollImageMosaic

Contexto: Se requiere una componente de héroe scroll-driven tipo mosaico, donde una imagen base hace zoom-out mientras un mosaico de "tiles" del mismo asset aparece (stagger), un título entra y los tiles luego se desvanecen.

Requerimientos funcionales:
- Props: src (string), alt (string opcional), title (string opcional), tiles (number), pin (boolean), start (string), end (string), revealOrder ("in"|"out"), easing (string), reduceMotionFallback ("static"|"minimal").
- Animación con GSAP + ScrollTrigger (scrub). Respeto a prefers-reduced-motion con fallback configurable.
- SSR-safe en Next.js (App Router), sin acceso a window fuera de efectos.
- TailwindCSS para layout y estilos principales.
- Limpieza de animaciones al desmontar.

Requerimientos no funcionales:
- Seguir patrones del repo (usar hook `useGsapContext` cuando aplique).
- Evitar comentarios innecesarios en el código.
- No agregar dependencias externas nuevas.

Criterios de aceptación:
- La componente se puede importar desde `src/components/ScrollImageMosaic.tsx`.
- Con el prop `pin=true` se fija el viewport durante el rango de scroll configurado por `start`/`end`.
- Cambiar `tiles` ajusta la grilla de forma cercana a un cuadrado; orden de revelado desde el centro (in) o hacia afuera (out).
- Con `reduceMotion` del SO activado: 
  - modo "static": estado final sin animación. 
  - modo "minimal": transiciones simples sin pin ni ScrollTrigger.
