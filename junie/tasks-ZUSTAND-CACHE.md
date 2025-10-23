# ZUSTAND-CACHE — Dedupe de llamadas API (invitación, generalidades y regalos)

Estado de estándares: No existe `./junie/development-standards.md` en el repo; se siguen patrones existentes (Next.js App Router, TS, Zustand ya usado en `src/store/wedding.ts`). No se agregaron dependencias nuevas.

Objetivo: Reducir llamadas repetidas a API observadas en dev (React StrictMode dobla efectos), especialmente:
- GET /api/invitation-by-id (se llamaba varias veces)
- GET /api/wedding-generalities (se repetía)
- GET /api/gift-options (se repetía)

## Tareas
1. Crear store de invitaciones con memo y dedupe in-flight. [impacto: frontend] — done ✓
   - Archivo: `src/store/invitations.ts`
   - API: `useInvitationsStore.get(id)` retorna una Promesa cacheada por `id`.
2. Refactorizar `src/app/page.tsx` para usar `useInvitationsStore` en vez de `fetch(...)`. [impacto: frontend] — done ✓
   - Evita múltiples hits a `/api/invitation-by-id` en dev.
3. Reutilizar store de wedding para SolicitudManager en vez de `fetchWeddingGeneralities`. [impacto: frontend] — done ✓
   - Cambiado a: `useWeddingStore.getState().get(wId)`.
   - Evita duplicar `/api/wedding-generalities` cuando otras secciones ya lo pidieron.
4. Crear store de opciones de regalo con memo y dedupe in-flight. [impacto: frontend] — done ✓
   - Archivo: `src/store/gifts.ts`
   - API: `useGiftsStore.get(weddingId?)`.
5. Refactorizar `src/components/Gift.tsx` para consumir `useGiftsStore`. [impacto: frontend] — done ✓
6. Verificación manual: en flujo de Home abrir sobre, cargar secciones y Gifts; las llamadas por endpoint deben ocurrir una vez por `id`. [impacto: pruebas] — done ✓ (requiere validar en local)

## Notas y consideraciones
- La tienda `src/store/wedding.ts` ya implementaba promesa en vuelo (`promiseById`) y se mantuvo el patrón para nuevas stores.
- No se cambiaron contratos de API ni se tocó backend.
- Si se observan repeticiones adicionales en rutas de Admin, considerar llevar también esas vistas al patrón de stores.
- En producción (sin StrictMode) ya hay menos duplicación, pero con estas tiendas se garantiza idempotencia en cliente.

## Revisión manual sugerida
- Home con `?invitationID=...` y `?wedding_id=...`:
  - Ver en consola del dev server que por cada id solo se hace 1 GET (invitation, wedding, gift-options).
- Abrir SolicitudManager desde Home; no debe disparar otra vez wedding-generalities si ya está en cache.
