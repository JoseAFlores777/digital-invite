# Requisito – Ticket 03: Quitar GSAP del Hero

## Descripción
Eliminar completamente el uso de GSAP (incl. ScrollTrigger y hooks utilitarios) del componente `Hero`, manteniendo el divisor con difuminación inferior como elemento estático (sin animación de scroll) y sin afectar otras secciones.

## Criterios de aceptación
- El componente `Hero` no debe importar ni usar `gsap`, `ScrollTrigger` ni `useGsapContext`.
- No debe haber lógica de efectos ni referencias a `prefers-reduced-motion` en `Hero` relacionadas con GSAP.
- El overlay de difuminado inferior (divisor) se mantiene de forma estática y configurable vía prop `fadeTo` o variable CSS `--fade-to`.
- La aplicación compila sin errores de TypeScript ni ESLint por imports/variables no usados.
- No se modifican animaciones de otras secciones (p. ej., `StoryBeats`) que sí pueden seguir usando GSAP.
- Compatibilidad y accesibilidad se mantienen: `aria-hidden` en el overlay, `pointer-events-none`, alturas responsivas.

## Detalles de implementación
- Editar `src/components/Hero.tsx` para:
  - Eliminar imports y llamadas a `useGsapContext`, `gsap`, `useIsReducedMotion`.
  - Quitar el bloque con animaciones (stagger de textos, parallax, fade del divisor).
  - Remover `ref` no utilizado en el `<section>`.
  - Conservar el overlay `#hero-fade` con la utilidad `bg-hero-fade-card`.
  - Conservar el prop `fadeTo` (default `#ffffff`) para el color de difuminado.

## Validación
- `npm run build` debe completar sin errores.
- Verificar visualmente que el difuminado se vea y no existan líneas divisorias.
- Confirmar que otras secciones sigan funcionando.

## Notas
- Si en el futuro se requiere animación, considerar opciones CSS-only (por ejemplo, `mask-image` con `position: sticky`) en lugar de GSAP.
