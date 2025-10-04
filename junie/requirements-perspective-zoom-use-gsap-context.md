# Requisitos: PerspectiveZoom debe usar useGsapContext

Objetivo: Reemplazar la inicialización/limpieza manual de GSAP + ScrollTrigger en `PerspectiveZoom.tsx` para utilizar el hook centralizado `useGsapContext` del proyecto.

Criterios de aceptación:
- `src/components/PerspectiveZoom.tsx` debe importar `{ useGsapContext, gsap }` desde `@/hooks/useGsapContext`.
- La animación debe ejecutarse dentro de `useGsapContext(() => {...}, [deps])` en lugar de `React.useEffect` + `gsap.context` manual.
- No se debe llamar `gsap.registerPlugin(ScrollTrigger)` manualmente; el hook se encarga del registro.
- La limpieza debe delegarse al contexto del hook (sin matar todos los ScrollTriggers globalmente).
- Mantener el comportamiento actual de la animación y el respeto a `prefers-reduced-motion`.

Notas:
- No existe `./junie/development-standards.md` en el repo; se siguen convenciones observadas (hook `useGsapContext`, Tailwind, SSR-safe).
- No cambiar la API pública del componente ni sus estilos.
