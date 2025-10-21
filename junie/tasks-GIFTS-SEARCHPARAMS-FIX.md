# Tareas — GIFTS-SEARCHPARAMS-FIX

Estado de estándares: No existe `./junie/development-standards.md`; se siguen patrones del proyecto (Next.js App Router, TS, Tailwind). Se alinea con correcciones mínimas y sin dependencias.

## Lista de tareas
1. Analizar error `searchParams should be awaited` reportado por Next.js en `/gifts`. [impacto: frontend] — done ✓
2. Convertir `GiftsPage` a `async` y esperar `searchParams` si es una Promesa (mantener compatibilidad). [impacto: frontend] — done ✓
3. Verificar que la redirección por `wedding_id` siga funcionando como antes. [impacto: frontend] — done ✓
4. Documentar requisitos en `junie/requirements-GIFTS-SEARCHPARAMS-FIX.md`. [impacto: docs] — done ✓
5. Documentar tareas en `junie/tasks-GIFTS-SEARCHPARAMS-FIX.md`. [impacto: docs] — done ✓

## Notas
- No se añadieron dependencias.
- No se modificaron otros componentes.
- El cambio es compatible con versiones donde `searchParams` aún es un objeto síncrono.
