# tasks-06

## Ticket
JUNIE-WIP-06 — Ajustar `md:pt-[22dvh]` → `padding-top: 63dvh` en `md`.

## Tareas
1. Crear rama de trabajo `JUNIE-WIP-06`. — ¡Fallo! (bloqueado por entorno) !
2. Revisar estándares de desarrollo (`./junie/development-standards.md`) y guías internas (`.junie/guidelines.md`). — Revisado lo disponible; no existe `./junie/development-standards.md` en el repo, se usó `.junie/guidelines.md`. *
3. Identificar uso de `md:pt-[22dvh]` (Hero). — Confirmado en `src/components/Hero.tsx`. ✓
4. Implementar override CSS en `src/app/globals.css` para mapear `.md:pt-[22dvh]` a `padding-top: 63dvh` en `md`+. — Agregado dentro de `@layer utilities` con `!important`. ✓
5. Ejecutar build de producción para validar. — `npm run build` finalizó sin errores (solo warnings previos). ✓
6. Documentar requerimiento en `.junie/requirements-06.md`. ✓
7. Documentar tareas en `.junie/tasks-06.md`. ✓

## Impacto
- Frontend (CSS/Tailwind): medio-bajo — cambia layout en `md+` donde se use esta utility.
- Backend: n/a
- Tests: n/a (no hay pruebas afectadas). 

## Notas
- La creación de la rama fue bloqueada por el entorno (acciones git rechazadas). Cuando sea posible, ejecutar:
  - `git checkout -b JUNIE-WIP-06`
  - Commit 1: `feat(css): override md:pt-[22dvh] → 63dvh at md breakpoint`
  - Commit 2: `docs(junie): add requirements-06 and tasks-06`
- Considerar a futuro renombrar la utility en el JSX por semántica (p. ej., `md:pt-[63dvh]`) si se desea alinear nombre/valor.
