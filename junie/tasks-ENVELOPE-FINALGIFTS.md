# Tasks — ENVELOPE-FINALGIFTS

Contexto: Para `EnvelopeWelcome` solo se necesita calcular el URL final a `/gifts` (finalGifts) o un `fallback`, evitando construir el mensaje completo de WhatsApp dentro de este componente.

## Tareas
1. Extender `GiftsShareButton` con prop opcional `finalGifts?: string` para que, cuando no se provea `shareHref`, construya internamente el mensaje/href de WhatsApp usando esa URL. [impacto: frontend] — done ✓
2. Actualizar `EnvelopeWelcome` para calcular únicamente `finalGifts` (o `fallback`), guardar en estado y pasarlo a `<GiftsShareButton finalGifts={finalGifts} />`. Quitar la construcción del mensaje dentro de `EnvelopeWelcome`. [impacto: frontend] — done ✓
3. Mantener `/gifts` y `Gift` usando `shareHref` SSR-determinístico para evitar hydration mismatches. [impacto: frontend/SSR] — done ✓
4. Validar que el botón en `EnvelopeWelcome` siga renderizando tras el mount, sin warnings de hidratación y con el mismo mensaje canónico. [impacto: QA] — pending *

## Notas
- Cambios mínimos, sin nuevas dependencias.
- Se preserva la lógica de SSR/CSR: en `/gifts` el href se pasa desde el server; en `EnvelopeWelcome` se calcula post-mount con `finalGifts` o `fallback`.
