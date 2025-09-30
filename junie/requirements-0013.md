# Requisitos 0013 — Integración GSAP con useGSAP (@gsap/react)

Objetivo: Migrar la implementación de GSAP en el banner de PanelPinStack para usar el hook oficial `useGSAP` de `@gsap/react`, mejorando el manejo del ciclo de vida, el scoping y la limpieza automática, manteniendo compatibilidad con SSR en Next.js (componente cliente) y buenas prácticas de accesibilidad (reduced-motion).

Alcance:
- Añadir la dependencia `@gsap/react` al proyecto.
- Refactorizar `PanelPinStack` para usar `useGSAP` con `scope` (ref) y `ScrollTrigger`.
- Mantener y/o mejorar robustez del pin: `pinType` dinámico, `pinReparent`, `pinSpacing: 'margin'`, `anticipatePin`, `invalidateOnRefresh`.
- Respetar `prefers-reduced-motion`.
- No romper componentes existentes; mantener Hero/Countdown como están.

Criterios de aceptación:
- El banner se comporta igual o mejor que antes (fijo durante el tramo; paneles se revelan desde abajo).
- No hay errores de tipo ni advertencias relevantes.
- Código alineado a patrones existentes y limpio.
