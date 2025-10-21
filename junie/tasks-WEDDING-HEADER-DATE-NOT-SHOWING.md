# Tasks — WEDDING-HEADER-DATE-NOT-SHOWING

Contexto: En algunos entornos no se muestra la fecha en el WeddingHeader porque la llamada a `/api/wedding-generalities` no recibe `wedding_id` (o las envs no están definidas), devolviendo 400 y dejando `dateLabel` vacío.

Estado de estándares: No existe `./junie/development-standards.md`; se respetan patrones actuales (Next.js App Router, TS, Tailwind v4). Cambios mínimos y encapsulados en el componente.

## Tareas
1. Leer requisitos `junie/requirements-WEDDING-HEADER.md` para confirmar contrato y expectativas. [impacto: proceso] — done ✓
2. Ajustar `WeddingHeader` para leer `wedding_id` desde la URL con `useSearchParams` y usar fallback a `process.env.NEXT_PUBLIC_WEDDING_ID`/`process.env.DIRECTUS_WEDDING_ID`. [impacto: frontend] — done ✓
3. Pasar `weddingId` a `fetchWeddingGeneralities` y agregarlo al arreglo de dependencias del `useEffect` para re-evaluar si cambia. [impacto: frontend] — done ✓
4. Validar que la fecha se muestre en `/gifts` tras redirección con `wedding_id` y también cuando falte el parámetro pero existan envs públicas. [impacto: QA] — pending
5. Documentar el cambio y razonar por qué fallaba (400 por `missing_wedding_id`). [impacto: documentación] — done ✓

## Notas
- Se mantuvo el formateo de fecha/hora previamente implementado (es-ES, 12h, am/pm minúsculas y `GMT-6` via `shortOffset`).
- No se añade fallback hardcodeado de fecha para evitar incoherencias con datos reales; si el endpoint o envs fallan, el componente sigue sin romperse.
