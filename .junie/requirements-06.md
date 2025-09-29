# Requerimiento 06: Ajuste de padding-top para `.md:pt-[22dvh]`

## Descripción
Se solicita que la clase utilitaria de Tailwind `md:pt-[22dvh]` aplique un `padding-top` de `63dvh` en pantallas medianas o mayores (≥768px). Esto centraliza el comportamiento esperado en un override de CSS para asegurar que el contenido (como los títulos del Hero) se posicione más hacia la parte inferior sin introducir nuevas clases.

## Criterios de Aceptación
- En viewports `≥768px` (breakpoint `md`), cualquier elemento con la clase `md:pt-[22dvh]` debe tener un `padding-top` computado de `63dvh`.
- No debe introducirse una nueva clase; el ajuste debe realizarse mediante override de CSS.
- La build de producción debe completar sin errores.
- No se deben introducir regresiones visuales en el Hero ni en otras secciones conocidas.

## Alcance / Consideraciones
- Tailwind v4: se agrega un override dentro de `@layer utilities` y un `@media (min-width: 768px)` para garantizar precedencia.
- Se usa `!important` para evitar conflictos con utilidades generadas por Tailwind.
- Accesibilidad: sin impacto funcional.
- Rendimiento: impacto nulo; es una sola regla CSS.

## Implementación
- Archivo: `src/app/globals.css`
- Regla agregada:

```css
@layer utilities {
  @media (min-width: 768px) {
    .md\:pt-\[22dvh\] { padding-top: 63dvh !important; }
  }
}
```

## Validación
- Ejecutar `npm run build` y confirmar que no existan errores.
- Revisar, en el DOM del Hero, que el contenedor con `md:pt-[22dvh]` tenga padding-top computado de `63dvh` a partir de 768px.

## Notas
- Esta decisión mapea explícitamente una utility a un valor distinto del indicado en su nombre. Si en el futuro se busca semántica estricta, considerar reemplazarla por una utility personalizada (p. ej. `md:pt-[63dvh]`) y actualizar el JSX correspondiente.
