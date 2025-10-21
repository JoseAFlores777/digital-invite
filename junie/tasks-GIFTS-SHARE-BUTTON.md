# Tasks — GIFTS-SHARE-BUTTON

Contexto: Crear un componente (similar a botón de transmisión o agendar) que comparta por WhatsApp el enlace hacia la ruta de regalos (/gifts) y colocarlo debajo del título de la sección de Gifts y en EnvelopeWelcome debajo del slider.

Estado de estándares: No existe `./junie/development-standards.md`; se siguen patrones del proyecto (Next.js App Router, TS, Tailwind v4 y uso de @iconify/react ya presente).

## Tareas
1. Crear componente reusable `GiftsShareButton` que:
   - Genere el URL final a `/gifts` preservando `wedding_id` desde la URL/env. [frontend] — done ✓
   - Construya el mensaje prellenado y el enlace `https://api.whatsapp.com/send?text=...` con `encodeURIComponent`. [frontend] — done ✓
   - Estilo consistente con otros botones (borde, fondo blanco, rounded-xl) e icono de WhatsApp. [frontend] — done ✓
2. Integrar `GiftsShareButton` en `/gifts` directamente debajo del `WeddingHeader`. [frontend] — done ✓
3. Integrar `GiftsShareButton` en `EnvelopeWelcome` debajo del slider (`SwipeableButton`). [frontend] — done ✓
4. Validar que el enlace incluya correctamente `wedding_id` y abra WhatsApp en nueva pestaña. [QA] — pending *
5. Smoke test visual de estilos para asegurar consistencia con botones existentes. [QA] — pending *

## Notas
- Si no hay `window.location.origin` disponible (SSR), se usa fallback y se construye el mensaje con `/gifts` (y `wedding_id` si aplica).
- No se agregaron dependencias nuevas; se reutilizó `@iconify/react` ya presente.
- El texto del mensaje sigue el proporcionado en el ticket, reemplazando la URL por la ruta real de `/gifts` de la aplicación.
