# tasks-15.md — Fix del difuminado del Hero con clases inline Tailwind

Ticket: 15
Rama sugerida: JUNIE-WIP-15 (creación fallida por restricciones del entorno)

## Tareas
1. Crear rama de trabajo `JUNIE-WIP-15`. (!)
2. Reemplazar util clase `bg-hero-fade-card` por gradiente inline Tailwind en `Hero.tsx`. (done)
3. Asegurar cobertura total del alto del Hero: contenedor del overlay `absolute inset-0 z-10`. (done)
4. Mantener `--fade-to`/prop `fadeTo` para color configurable. (done)
5. QA rápido: verificar que no hay línea divisoria visible; overlay encima de la imagen y debajo del texto. (*)
6. Build local: `npm run dev` o `npm run build` para confirmar sin errores. (*)
7. Documentar cambios en `.junie/requirements-15.md` y este archivo. (done)

## Impacto
- Frontend (Hero): estilos/overlay.
- No hay cambios en backend ni base de datos.
- Tests: sin impacto directo; validar manualmente el Hero.

## Notas
- Si se desea compatibilidad adicional, se puede añadir fallback alternativo simplificado (gradiente de `var(--fade-to)` a `transparent`) en lugar del `color-mix`.
- El overlay se mantiene `pointer-events-none` y `aria-hidden` para accesibilidad.
