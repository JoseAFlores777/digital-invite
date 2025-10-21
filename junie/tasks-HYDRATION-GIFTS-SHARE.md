# Tasks — HYDRATION-GIFTS-SHARE

Contexto: Error de hidratación en `/gifts` debido a que el `href` del botón de compartir (WhatsApp) difería entre SSR y cliente. La causa raíz fue construir el enlace usando `window.location.origin` y `useSearchParams` dentro del Client Component, generando HTML distinto entre servidor y cliente.

## Tareas
1. Calcular `shareHref` en el Server Component (`src/app/gifts/page.tsx`) usando `next/headers` para derivar el `origin` y el `wedding_id` resuelto. [impacto: frontend/SSR] — done ✓
2. Actualizar `GiftsShareButton` para aceptar `shareHref?: string` y usarlo tal cual cuando se provee, garantizando coincidencia SSR/CSR. [impacto: frontend] — done ✓
3. Evitar render SSR de `GiftsShareButton` cuando no se provee `shareHref` (otros usos como `EnvelopeWelcome`), y calcular el enlace en `useEffect` tras montar para no provocar mismatches. [impacto: frontend] — done ✓
4. Validar que en `/gifts` no aparezca el warning de hydration y que el enlace abra WhatsApp con el mensaje correcto. [impacto: QA] — pending *

## Notas
- Mensaje de WhatsApp se mantiene idéntico; solo se garantizó su construcción determinística en SSR de `/gifts`.
- En otros contextos donde no se pase `shareHref`, el botón se monta solo en cliente, evitando diferencias de HTML.
