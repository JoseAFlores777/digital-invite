# Tasks — GIFTS-WHATSAPP-MESSAGE-UNIFY

Contexto: Unificar el mensaje de WhatsApp del botón de compartir para que coincida exactamente con el formato requerido, manteniendo URL dinámica (origin + /gifts?wedding_id=...) y sin provocar hydration mismatch.

Estado de estándares: No existe `./junie/development-standards.md`; se respetan patrones del proyecto (Next.js App Router, TS, Tailwind v4). Cambios mínimos.

## Tareas
1. Auditar puntos de construcción del mensaje: `src/app/gifts/page.tsx` (SSR) y `src/components/GiftsShareButton.tsx` (cliente cuando no hay prop). [impacto: frontend] — done ✓
2. Definir plantilla canónica del mensaje (saludo, explicación, “Aquí está:”, URL, línea de agradecimiento y bendición), con asteriscos simples alrededor de nombres y bendición, y saltos de línea exactos. [impacto: frontend] — done ✓
3. Actualizar `src/app/gifts/page.tsx` para usar la plantilla canónica con URL dinámica (origin derivado de headers + wedding_id). [impacto: frontend/SSR] — done ✓
4. Actualizar `src/components/GiftsShareButton.tsx` para usar la misma plantilla en el cálculo cliente (y fallback). [impacto: frontend] — done ✓
5. Validar ausencia de hydration mismatch en `/gifts` (se pasa `shareHref` desde el server) y correcto armado del link en `EnvelopeWelcome` (cálculo post-mount). [impacto: QA] — pending *

## Notas
- El texto final coincide con el ejemplo proporcionado, pero inserta dinámicamente la URL real según el entorno y el `wedding_id` actual.
- No se introducen dependencias nuevas.
- Se mantiene el comportamiento: en `/gifts` el enlace se calcula en el Server Component; en otros contextos se calcula tras montar en cliente para evitar diferencias SSR/CSR.
