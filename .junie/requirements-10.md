# Refactor de estilos: migración a SCSS + Tailwind, paleta Wedgewood y soporte móvil

## Objetivo
Estandarizar los estilos del proyecto migrando de CSS a SCSS, manteniendo TailwindCSS como framework utilitario, e incorporando una paleta Wedgewood definida mediante variables CSS y configuración de Tailwind. Garantizar compatibilidad móvil con breakpoints adecuados y mantener utilidades personalizadas existentes (p.ej., difuminado del Hero).

## Alcance
- Migración de `src/app/globals.css` a `src/app/globals.scss`.
- Creación de `tailwind.config.js` con paleta Wedgewood y breakpoints móviles.
- Declaración de variables HSL en `:root` para la paleta Wedgewood.
- Ajuste del import global en `src/app/layout.tsx` para cargar `globals.scss`.
- Estandarización de colores en `Hero.tsx` a utilidades Tailwind `wedgewood`.
- Mantener las utilidades especiales existentes (e.g., `@utility bg-hero-fade-card`).

## Requisitos funcionales
1. El proyecto debe compilar correctamente en modo producción.
2. La paleta Wedgewood debe estar disponible como utilidades de color Tailwind (`text-wedgewood-…`, `bg-wedgewood-…`, etc.).
3. Los estilos globales deben residir en SCSS y cargarse desde `layout.tsx`.
4. El Hero debe usar colores de tipografía de la paleta Wedgewood y conservar el difuminado inferior.
5. Debe existir configuración explícita para mobile (breakpoints incluyendo `xs`).

## Criterios de aceptación
- Build (`npm run build`) completo sin errores.
- Archivo `tailwind.config.js` presente con la paleta Wedgewood (50–1900) y `screens` con `xs`, `sm`, `md`, `lg`, `xl`, `2xl`.
- Archivo `src/app/globals.scss` contiene `@import "tailwindcss";`, bloque `:root` con variables Wedgewood y mantiene utilidades personalizadas.
- `src/app/layout.tsx` importa `./globals.scss`.
- `src/components/Hero.tsx` usa clases de color `wedgewood` en textos y overlay.

## No-funcionales
- Accesibilidad: sin regresiones (texto legible sobre la imagen).
- Rendimiento: sin aumento notable del CSS generado.
- Compatibilidad: navegadores modernos; responsive estable en mobile y desktop.

## Notas
- Tailwind v4 está integrado vía `@tailwindcss/postcss` (PostCSS plugin). La configuración adicional se ha añadido en `tailwind.config.js`.
- `@import` en SCSS muestra una advertencia de deprecación de Sass, pero es compatible. Se puede evaluar `@use` si Tailwind lo soporta sin warnings en el futuro.
