# Tasks – Ticket 11: Eliminar warning de Sass por `@import` en globals.scss

## Contexto
Durante el build aparecía:
> Sass @import rules are deprecated and will be removed in Dart Sass 3.0.0.

La causa era `@import "tailwindcss"` dentro de `globals.scss` (Sass lo interpreta como import Sass, deprecado). En Tailwind v4, el import debe estar en un archivo CSS procesado por PostCSS.

## Lista de tareas
1. Crear rama de trabajo `JUNIE-WIP-11`. (blocked por entorno)
2. Remover `@import "tailwindcss"` de `src/app/globals.scss`. (done)
3. Crear `src/app/tailwind.css` con `@import "tailwindcss"`. (done)
4. Importar `./tailwind.css` antes de `./globals.scss` en `src/app/layout.tsx`. (done)
5. Verificar build (`npm run build`) y confirmar que desaparece el warning. (pending)
6. Validar visualmente que no cambió el orden/cascada de estilos críticos (Hero fade, tipografías, etc.). (pending)
7. Documentar requisitos y tareas (`.junie/requirements-11.md`, `.junie/tasks-11.md`). (done)

## Dependencias / Impacto
- Impacto: build config/estilos globales.
- No afecta lógica de componentes.
- Depende de PostCSS + Tailwind v4 funcionando (plugins configurados en `postcss.config.mjs`).

## Notas de VCS
- La creación de la rama puede fallar por restricciones (GPG/global config). Soluciones sugeridas previamente: unset de `gpg.format` o usar `GIT_CONFIG_GLOBAL=/dev/null` al commitear.

## Pendientes para QA
- Ejecutar build local y revisar que no existe el warning de Sass.
- Abrir la aplicación y verificar Hero y secciones con clases Tailwind.
