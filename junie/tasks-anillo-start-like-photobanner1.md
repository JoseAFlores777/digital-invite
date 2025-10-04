# Tareas — Alinear inicio de AnilloScrollSequence con PhotoBanner1

1. Revisar estándares del proyecto en ./junie/development-standards.md (no existe en el repo, se documenta la ausencia). [done] (impacto: docs)
2. Analizar comportamiento de inicio en PhotoBanner1 (ScrollTrigger start: "top bottom") y en AnilloScrollSequence (start: "top top"). [done] (impacto: frontend)
3. Modificar AnilloScrollSequence para que inicie con start: "top bottom" (igual que PhotoBanner1). [done] (impacto: frontend)
4. Verificar soporte a prefers-reduced-motion (ya implementado en AnilloScrollSequence). [done] (impacto: frontend/accesibilidad)
5. Confirmar estado inicial de render (primer frame visible antes del scroll y progresión al entrar al viewport). [done] (impacto: frontend)
6. Documentar tarea y cambios aplicados. [done] (impacto: docs)

Notas:
- Se mantuvo scrub: true para no alterar el "feeling" de la animación; si se desea empatar exactamente con PhotoBanner1 se puede ajustar a scrub: 0.2.
- No se añadieron dependencias ni cambios de arquitectura.
