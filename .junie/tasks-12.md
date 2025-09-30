# tasks-12.md — Fix dev errors (Tailwind plugins + Sass import)

Ticket: 12
Rama: JUNIE-WIP-12 (no creada por restricción del entorno)

## Tareas
1. Crear rama de trabajo `JUNIE-WIP-12`. (!)
2. Agregar `@tailwindcss/forms`, `@tailwindcss/typography`, `@tailwindcss/aspect-ratio` a `devDependencies` en `package.json`. (done)
3. Cambiar `@import "tailwindcss";` → `@import url("tailwindcss");` en `src/app/globals.scss` para evitar warning de Sass. (done)
4. Verificar que `@plugin` en `globals.scss` se mantenga y que `tailwind.config.js` continúe exportando la configuración (plugins ok). (done)
5. Ejecutar `npm i` y luego `npm run dev` para validar. (pendiente en entorno del usuario)

## Dependencias
- Tailwind v4 (`tailwindcss@^4`, `@tailwindcss/postcss`).
- Sass.

## Impacto
- Frontend: build y dev server (Tailwind plugins activos), estilos globales.
- Tests: sin impacto.

## Notas
- Si prefieres no depender de plugins, se podría eliminar `@plugin` y las clases `prose*` que dependen de typography, pero implicaría reemplazar estilos de prosa manualmente.
- Tras `npm i`, el error `Module not found: Can't resolve '@tailwindcss/*'` debe desaparecer en `npm run dev`.
