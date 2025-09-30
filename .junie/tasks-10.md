# tasks-10.md — Refactor SCSS + Tailwind (paleta Wedgewood)

Ticket: 10
Rama: JUNIE-WIP-10

## Tareas
1. Crear rama de trabajo `JUNIE-WIP-10`. ✓
2. Añadir `tailwind.config.js` con paleta Wedgewood 50–1900 y `screens` incluyendo `xs`. ✓
3. Migrar `src/app/globals.css` a `src/app/globals.scss` con variables `:root` (Wedgewood) y mantener utilidades personalizadas. ✓
4. Actualizar import global en `src/app/layout.tsx` a `./globals.scss`. ✓
5. Estandarizar colores del Hero a utilidades `wedgewood` (textos y overlay). ✓
6. Ejecutar build de producción y validar. ✓
7. Documentar requisitos y tareas en `.junie/requirements-10.md` y `.junie/tasks-10.md`. ✓

## Dependencias
- Tailwind v4 vía `@tailwindcss/postcss` ya presente.
- Sass ya presente en devDependencies.

## Impacto
- Frontend: configuración de Tailwind, estilos globales (SCSS), Hero (colores).
- Tests: sin cambios.

## Notas y riesgos
- Sass muestra warning por `@import` (deprecado). No bloqueante; evaluar migración futura a `@use` si Tailwind lo soporta sin warnings.
- VCS: confirmar configuración de GPG si fuese necesario al commitear (ver tickets previos). Commits aún no realizados por restricciones de entorno.

## Estado
- Implementación completada y build ok. ✓