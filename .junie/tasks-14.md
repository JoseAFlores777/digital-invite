# tasks-14.md — Arreglar loader

Ticket: 14
Rama: JUNIE-WIP-14 (intento de creación fallido por restricciones del entorno)

## Tareas
1. Crear rama de trabajo `JUNIE-WIP-14`. (!)
2. Analizar problema: estilos del loader estaban en `globals.css` (no importado). (done)
3. Añadir en `src/app/globals.scss` las clases faltantes: `.sr-only`, `.loader-overlay`, `.loader-overlay.fade-out`, `.loader-animation`. (done)
4. Usar tokens del tema: `background: var(--color-background)` y respetar safe-areas. (done)
5. Verificar en dev que el overlay centra el Lottie y desaparece con `fade-out`. (pendiente QA)
6. Documentar requisitos y tareas (`.junie/requirements-14.md`, `.junie/tasks-14.md`). (done)

## Dependencias
- Tailwind v4 (@tailwindcss/postcss) ya configurado.
- `@lottiefiles/dotlottie-react` ya instalado para la animación del loader.

## Impacto
- Frontend (global styles): el loader vuelve a tener diseño y transición.
- Accesibilidad: `.sr-only` restaurada.

## Notas / Riesgos
- El wrapper de `page.tsx` aún usa variables `--color-dusty-*`. No afecta al overlay, pero podría revisarse en un ticket aparte para estandarizar a tokens `--color-*` actuales.
- Si deseas eliminar estilos no usados, podemos limpiar las reglas antiguas de `globals.css` en una tarea de mantenimiento.

## Checklist de validación
- [ ] Loader aparece centrado con fondo y se desvanece al comenzar la app.
- [ ] Mobile: safe-areas respetadas (notch/home indicator).
- [ ] Sin errores en consola por el loader.
