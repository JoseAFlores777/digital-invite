# tasks-09 — Hero: colores dusty blue, sin botón y zoom con scroll

## Ticket
JUNIE-WIP-09

## Tareas
1. Crear rama de trabajo `JUNIE-WIP-09`. — Intentado; bloqueado por entorno.
2. Revisar estándares (`./junie/development-standards.md`) y guías (`.junie/guidelines.md`). — No existe `./junie/development-standards.md`; se siguen las guías. ✓
3. Ajustar tipografías del Hero a paleta dusty blue. ✓
4. Quitar el botón "Ver detalles" del Hero. ✓
5. Implementar zoom de imagen al hacer scroll con GSAP (ScrollTrigger) respetando `prefers-reduced-motion`. ✓
6. Validar build de producción (`npm run build`).
7. QA visual (móvil y escritorio) para confirmar contraste, ausencia del botón y suavidad del zoom.
8. Preparar commits pequeños y descriptivos; crear PR cuando git esté disponible.

## Impacto
- Frontend (Hero.tsx)
- Build (validación)

## Mensajes de commit sugeridos
- feat(hero): use dusty blue palette for headings and subtitle; remove details button
- feat(hero): add GSAP ScrollTrigger zoom-in effect on background image with reduced motion support
- docs(junie): add requirements-09 and tasks-09

## Notas
- La creación de rama fue bloqueada por el entorno. Al habilitar git:
  - `git checkout -b JUNIE-WIP-09`
  - Commits según las tareas listadas.
