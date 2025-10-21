# Tasks — ENVELOPE-CUSTOMBTN

Contexto: Reemplazar `GiftsShareButton` por `CustomBtn` dentro de `EnvelopeWelcome`, manteniendo el comportamiento de compartir por WhatsApp hacia `/gifts` con el `wedding_id` actual y evitando problemas de hidratación.

## Tareas
1. Importar `CustomBtn` en `src/components/EnvelopeWelcome.tsx` y remover el uso de `GiftsShareButton`. [impacto: frontend] — done ✓
2. Mantener cálculo existente de `finalGifts` (URL hacia `/gifts` con `wedding_id`) en `useEffect` del cliente. [impacto: frontend] — done ✓
3. Agregar `shareHref` derivado de `finalGifts` con el mensaje canónico y `encodeURIComponent`, calculado en un `useEffect` dependiente de `finalGifts`. Renderizar el botón solo cuando `shareHref` esté listo para prevenir hydration mismatch. [impacto: frontend/SSR] — done ✓
4. Configurar `CustomBtn` como `<a>` externo con `target="_blank"`, variante `outline`, `icon="mdi:whatsapp"` y label "Mesa de regalos" para mantener coherencia visual. [impacto: frontend] — done ✓
5. Validación rápida: compilar y smoke test local para verificar apertura correcta de WhatsApp y ausencia de warnings de hidratación. [impacto: QA] — pending *

## Notas
- `EnvelopeWelcome` es Client Component: el render del botón se condiciona a que `shareHref` exista tras el mount.
- Se respeta el mensaje canónico ya utilizado en `/gifts` y en `GiftsShareButton` para consistencia textual.
- Cambios mínimos y acotados al componente; no se tocan otros lugares donde se usa `GiftsShareButton`.
