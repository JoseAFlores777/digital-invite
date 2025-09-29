# Requisito – Ticket 02: Div con difuminación hacia arriba en el borde inferior del Hero (color configurable)

## Descripción
Se requiere un elemento visual (div) ubicado al fondo del Hero que genere una difuminación hacia arriba para lograr una transición suave hacia la siguiente sección, sin líneas divisorias visibles. El color destino del difuminado debe ser configurable.

## Criterios de aceptación
- Existe un div/overlay anclado al borde inferior del Hero que realiza una difuminación hacia arriba (de sólido en el borde inferior a transparente hacia arriba).
- El color del difuminado es configurable sin tocar estilos globales, preferentemente mediante una propiedad de componente (p. ej., `fadeTo`), y con alternativa vía variable CSS `--fade-to`.
- No se perciben líneas divisorias duras entre el Hero y la siguiente sección en distintos tamaños de pantalla y densidades de píxel.
- La altura del difuminado es responsiva (valores por defecto apropiados para móvil/tablet/desktop).
- Se respeta `prefers-reduced-motion` (no se fuerzan animaciones de scroll cuando el usuario lo prefiere).
- Compatibilidad con navegadores modernos y fallback visual aceptable cuando no existe `color-mix`.
- Accesibilidad: el overlay no interfiere con la navegación (aria-hidden, pointer-events-none).

## Detalles de implementación
- Utilidad TailwindCSS `bg-hero-fade-card` que dibuja el gradiente usando `--fade-to` (por defecto `#fff`) y fallback con RGBA cuando `color-mix` no está disponible.
- Overlay posicionado absolutamente dentro del Hero: `absolute inset-x-0 -bottom-px z-10` con alturas `h-40 md:h-56 lg:h-64`.
- Animación con GSAP ScrollTrigger para desvanecer el overlay mientras se hace scroll (solo cuando no hay reduced motion), evitando seams durante el desplazamiento.
- Configuración del color vía prop `fadeTo` en el componente `Hero` (con default `#ffffff`). Alternativa: definir `--fade-to` en el contenedor de la sección siguiente si se desea.

## Ejemplo de uso
```tsx
// Usando el prop para cambiar el color del difuminado hacia un tono crema
<Hero fadeTo="#FAF7F2" />
```

## Consideraciones de rendimiento
- Overlay simple (un div) con gradient background; animación con `scrub` ligero.
- Sin layouts costosos ni listeners innecesarios.

## QA / Validación
- Revisar en móvil, tablet y desktop que no aparezca ninguna línea de separación.
- Probar cambio de color con `<Hero fadeTo="#FAF7F2" />` y confirmar la continuidad con la siguiente sección.
- Verificar que con `prefers-reduced-motion: reduce` no se ejecute la animación de scroll.
