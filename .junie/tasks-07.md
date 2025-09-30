# tasks-07.md — Compatibilidad web y móvil del Hero

1. Crear rama de trabajo JUNIE-WIP-07 — pendiente (bloqueado por entorno).
2. Revisar estándares internos — no existe ./junie/development-standards.md; se usará .junie/guidelines.md — done.
3. Redactar requisitos y criterios de aceptación (.junie/requirements-07.md) — done.
4. Ajustar espaciado inferior del Hero para respetar safe-area en móviles — done.
   - Cambiar pb-[10dvh] → pb-[calc(10dvh+env(safe-area-inset-bottom))] — done.
   - Cambiar md:pb-[12dvh] → md:pb-[calc(12dvh+env(safe-area-inset-bottom))] — done.
5. Validar build de producción — pendiente.
6. QA visual rápido (375×812 y >1024px) — pendiente.
7. Preparar commits pequeños y descriptivos — pendiente.
8. Crear PR tras resolver restricción de git local — pendiente.

Impacto estimado:
- frontend (Hero.tsx)
- build (validación)

Mensajes de commit sugeridos:
- feat(hero): add safe-area aware bottom spacing for mobile and desktop
- docs(junie): add requirements-07 and tasks-07 for mobile+web compatibility

Notas:
- La creación de rama está bloqueada por el entorno. Al habilitar git, usar `git checkout -b JUNIE-WIP-07` y realizar commits separados por tarea.