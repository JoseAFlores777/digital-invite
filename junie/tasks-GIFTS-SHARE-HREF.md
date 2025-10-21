# Tasks — GIFTS-SHARE-HREF

Contexto: Se requiere que el botón de compartir en la página `/gifts` use exactamente el href proporcionado en el ticket (enlace de WhatsApp con mensaje y URL codificados) y que esté declarado en una variable tipo string.

Estado de estándares: No existe `./junie/development-standards.md`; se siguieron patrones del proyecto (Next.js App Router, TypeScript, Tailwind v4). Cambios mínimos.

## Tareas
1. Revisar implementación actual del share en `src/app/gifts/page.tsx` y detectar dónde se compone el `shareHref`. [impacto: frontend] — done ✓
2. Reemplazar la construcción dinámica por una constante string con el valor exacto provisto en el ticket. [impacto: frontend] — done ✓
3. Verificar que el botón consuma la constante mediante `GiftsShareButton shareHref={shareHref}` para mantener compatibilidad SSR/CSR. [impacto: frontend] — done ✓
4. Mantener sin cambios otros botones de share (ej. en `EnvelopeWelcome`) ya que el requerimiento apunta a `/gifts`. [impacto: frontend] — done ✓
5. Validación rápida: revisar que no haya mismatch de hidratación (el href ahora es estable en SSR). [impacto: QA] — pending *

## Notas
- Se dejó el href exactamente igual al proporcionado, incluyendo host `http://localhost:3000` y el `wedding_id` fijo `b257bf2e-de97-4e1d-8545-3a9d071b84bf`.
- Cambios limitados a `src/app/gifts/page.tsx` para no afectar otros contextos.
