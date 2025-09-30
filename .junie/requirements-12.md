# Ticket 12 — Fix dev errors: Tailwind plugins missing + Sass @import deprecation

## Contexto
Al ejecutar `npm run dev`, la app falla con `Module not found: Can't resolve '@tailwindcss/...'` para `forms`, `typography` y `aspect-ratio`. Además, aparece un warning deprecado de Sass por usar `@import "tailwindcss";` en `globals.scss`.

## Objetivo
- Habilitar el entorno de desarrollo sin errores por falta de módulos de Tailwind.
- Eliminar el warning deprecado de Sass.

## Alcance
- Agregar `@tailwindcss/forms`, `@tailwindcss/typography`, `@tailwindcss/aspect-ratio` como `devDependencies` en `package.json`.
- Cambiar `@import "tailwindcss";` por `@import url("tailwindcss");` en `src/app/globals.scss`.
- Mantener la configuración de Tailwind v4 (PostCSS + `@plugin` en CSS y `tailwind.config.js`).

## Criterios de aceptación
1. `npm i` instala correctamente los paquetes de plugins de Tailwind.
2. `npm run dev` inicia sin errores `Module not found` relacionados con `@tailwindcss/*`.
3. No se muestran warnings deprecados de Sass por `@import` en `globals.scss`.
4. No hay regresiones visuales en tipografía/prosa, formularios y utilidades de aspecto (plugins activos).

## Notas
- Se requiere ejecutar `npm i` tras el cambio en `package.json`.
- En Tailwind v4 se recomienda activar plugins desde CSS con `@plugin`, lo cual ya está presente.
