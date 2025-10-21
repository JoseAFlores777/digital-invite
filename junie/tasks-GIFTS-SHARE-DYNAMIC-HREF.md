# Tasks — GIFTS-SHARE-DYNAMIC-HREF

Contexto: Hacer dinámico el href de WhatsApp Share en la página `/gifts`, tomando como base el `root URL` (origin) de la petición y el `wedding_id` actual. Evitar mismatches de hidratación garantizando que el href se calcule en el Server Component y se pase como prop al botón.

Estado de estándares: No existe `./junie/development-standards.md`; se respetan patrones del proyecto (Next.js App Router, TS, Tailwind v4). Cambios mínimos.

## Tareas
1. Resolver `wedding_id` desde `searchParams` en `src/app/gifts/page.tsx`; redirigir si falta pero existe fallback en envs públicas. [frontend] — done ✓
2. Obtener `origin` de la petición vía `next/headers` (`x-forwarded-proto`, `x-forwarded-host`/`host`). [frontend] — done ✓
3. Construir `https://api.whatsapp.com/send?text=...` con un mensaje y la URL final a `/gifts` incluyendo `wedding_id` actual, usando `encodeURIComponent`. [frontend/SSR] — done ✓
4. Pasar `shareHref` a `GiftsShareButton` para asegurar paridad SSR/CSR. [frontend] — done ✓
5. Validar que sin `wedding_id` (y sin envs) el enlace se genere sin query param y que no haya warnings de hidratación. [QA] — pending *

## Notas
- Se mantiene el patrón previo de calcular el href en el Server Component para `/gifts`, evitando diferencias entre HTML del servidor y del cliente.
- Otros usos de `GiftsShareButton` (p. ej., `EnvelopeWelcome`) siguen calculando el href en el cliente si no reciben `shareHref`, sin causar hydration mismatch al no renderizarse en SSR.
