# Requisitos – Ticket 11: Eliminar warning deprecado de Sass por `@import` en globals.scss

Contexto: Tailwind CSS v4 recomienda `@import "tailwindcss"` en archivos CSS procesados por PostCSS. En `globals.scss` (Sass), `@import` es interpretado como importación Sass (deprecada) y genera el warning:

> Sass @import rules are deprecated and will be removed in Dart Sass 3.0.0.

## Objetivo
Eliminar el warning reemplazando el uso de `@import` de Tailwind dentro de SCSS por una importación CSS dedicada, manteniendo el estilo actual y el orden de cascada.

## Alcance
- No cambiar diseño ni comportamientos. Solo reordenar/aislar imports.
- Mantener Tailwind v4, PostCSS y la paleta Wedgewood.

## Criterios de Aceptación
- No aparece el warning de Sass durante `npm run build`.
- Tailwind sigue cargando correctamente (clases disponibles).
- El orden de estilos se mantiene: Tailwind primero, luego overrides/utilidades custom.
- No se rompe el difuminado del Hero ni estilos existentes.

## Plan de Alto Nivel
1) Remover `@import "tailwindcss"` de `src/app/globals.scss`.
2) Crear `src/app/tailwind.css` con `@import "tailwindcss"` (procesado por PostCSS).
3) Importar `./tailwind.css` antes de `./globals.scss` en `src/app/layout.tsx`.
4) Verificar build y estilos.

## Notas
- Esta solución evita la deprecación de Sass sin cambiar el stack (Next + PostCSS + Tailwind + Sass).
- Futuro: si se desea, migrar de `@import` Sass a `@use`/`@forward` para módulos internos SCSS.
