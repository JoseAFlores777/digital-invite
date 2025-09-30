# Requisitos 0010 — Banner 1 con pinning en capas (GSAP ScrollTrigger)

- Reemplazar el comportamiento de banner_1 por un efecto de "layered pinning from bottom" basado en GSAP + ScrollTrigger.
- Debe fijar la sección mientras se hace scroll (pin) y revelar paneles superpuestos desde abajo con `yPercent: -100`, `scrub: true`, `stagger`.
- Adaptar el snippet vanilla JS provisto al stack del proyecto (Next.js + React + TypeScript), respetando SSR y reduced-motion.
- Exponer una implementación reusable como componente React.
- Integrar el componente dentro del flujo de la invitación en el lugar del banner_1. En esta iteración se sustituyó la sección de PhotoMasonry por el nuevo banner, a falta de una referencia explícita a "banner_1" en el código.
- Mantener consistencia con el estilo y animaciones existentes (uso de GSAP ya presente en Hero y PhotoMasonry).
