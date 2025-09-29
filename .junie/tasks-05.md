# tasks-05.md — Posicionar títulos del Hero cerca del borde inferior

1. Crear rama de trabajo JUNIE-WIP-05 — pendiente (bloqueado por entorno local).
2. Revisar estándares internos (.junie/development-standards.md / .junie/guidelines.md) — pendiente.
3. Redactar requisitos y criterios de aceptación (.junie/requirements-05.md) — done.
4. Ajustar layout del Hero para acercar el bloque de textos al borde inferior — done.
   - Reducir padding-bottom en breakpoints móviles y de escritorio — done.
   - Asegurar que el bloque de texto quede por encima del overlay (z-index) — done.
5. Ejecutar build de producción para validar compilación — done.
6. QA visual en móvil y desktop; ajustar separación si es necesario — pendiente.
7. Documentar cambios y preparar commits pequeños y descriptivos — pendiente.
8. Crear PR tras resolver restricción de git local — pendiente.

Impacto estimado:
- frontend (Hero.tsx)
- build (validación)

Notas:
- La creación de rama y commits están bloqueados por la configuración del entorno. Al habilitar git, usar mensajes de commit:
  - feat(hero): move headline block closer to bottom and raise z-index above fade
  - docs(junie): add requirements-05 and tasks-05 for ticket 05
