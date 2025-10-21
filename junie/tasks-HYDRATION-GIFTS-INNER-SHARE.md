# Tasks — HYDRATION-GIFTS-INNER-SHARE

Contexto: En la página `/gifts` aparecía un error de hidratación (Recoverable Error) porque dentro de la sección `Gift` se renderizaba `GiftsShareButton` sin `shareHref` en SSR. El componente, al no recibir `shareHref`, evitaba renderizar en SSR (retornaba `null`) y luego montaba un `<a>` en el cliente con `href` calculado, generando diferencia entre HTML de servidor y cliente.

## Causa raíz
- SSR (servidor): `GiftsShareButton` sin `shareHref` devuelve `null` → no hay `<a>`.
- Cliente: tras `useEffect`, el botón calcula `clientHref` y renderiza `<a href="...">` → el árbol cambia frente a lo entregado por SSR.
- Resultado: Hydration mismatch en el árbol de `/gifts` (stack apunta a `GiftsShareButton` dentro de `Gift`).

## Decisión
- Mantener el cálculo determinístico del `shareHref` en el Server Component `src/app/gifts/page.tsx` (usando `next/headers`) y propagarlo hacia adentro del árbol hasta `GiftsShareButton` para asegurar paridad SSR/CSR.

## Tareas
1. Agregar prop opcional `shareHref?: string` al componente `Gift` y reenviarla al `GiftsShareButton` interno. [impacto: frontend] — done ✓
2. Actualizar `src/app/gifts/page.tsx` para invocar `<Gift shareHref={shareHref} />`. [impacto: frontend] — done ✓
3. Mantener el `GiftsShareButton` superior (debajo del `WeddingHeader`) usando el mismo `shareHref` ya calculado en SSR. [impacto: frontend] — done ✓
4. Validación: al tener `href` estable en SSR y cliente, no debería mostrarse el warning de hidratación. [impacto: QA] — pending *

## Notas
- `EnvelopeWelcome` sigue usando `GiftsShareButton` sin `shareHref`, pero ese caso está pensado para calcularse en cliente y evitar SSR del anchor; no forma parte del árbol de `/gifts` descrito en el error.
- Cambios mínimos, sin dependencias nuevas y respetando la arquitectura existente (Next.js App Router + TS).