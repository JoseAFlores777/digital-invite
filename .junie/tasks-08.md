# tasks-08 — Anclar contenido del Hero desde el bottom en móviles (pt 62dvh)

## Ticket
JUNIE-WIP-08

## Tareas
1. Crear rama de trabajo `JUNIE-WIP-08`. — ¡Fallo! (bloqueado por entorno)
2. Revisar estándares (`./junie/development-standards.md` si existe) y `.junie/guidelines.md`. — Revisado lo disponible; sin archivo de estándares, se siguieron las guías. *
3. Implementar anclaje inferior del contenido del Hero en móviles. ✓
   - Cambiar contenedor a `absolute inset-x-0 bottom-0` en mobile. ✓
   - Aplicar `pt-[62dvh]` en mobile para medir desde abajo hacia arriba. ✓
   - Mantener `pb` con `env(safe-area-inset-bottom)` para respetar área segura. ✓
   - Revertir en `md+` a layout previo (`md:relative md:pt-[22dvh]`, override a 63dvh activo). ✓
4. Validar build de producción. 
5. QA visual móvil y desktop. 
6. Documentar requerimientos en `.junie/requirements-08.md`. ✓
7. Preparar commits pequeños y descriptivos y PR cuando git esté disponible. 

## Impacto
- Frontend (Hero.tsx)
- Build (validación)

## Notas
- Mensajes de commit sugeridos:
  - feat(hero): anchor content from bottom on mobile with pt-[62dvh] and safe-area padding
  - docs(junie): add requirements-08 and tasks-08
