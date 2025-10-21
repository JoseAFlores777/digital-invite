# Tasks — ENVELOPE-GIFTS-SHARE

Contexto: Agregar en EnvelopeWelcome un botón para compartir (GiftsShareButton) con `shareHref` dinámico que apunte a `/gifts` incluyendo el `wedding_id` actual, evitando problemas de hidratación.

Estado de estándares: No existe `./junie/development-standards.md`; se siguen patrones del proyecto (Next.js App Router, TypeScript, Tailwind v4). Cambios mínimos y encapsulados.

## Tareas
1. Calcular `shareHref` en `EnvelopeWelcome` del lado del cliente usando `window.location` y el `wedding_id` actual. [impacto: frontend] — done ✓
2. Usar la misma plantilla canónica del mensaje de WhatsApp ya empleada en `/gifts` y en `GiftsShareButton`. [impacto: frontend] — done ✓
3. Renderizar `GiftsShareButton` solo cuando `shareHref` esté disponible para evitar HTML distinto entre SSR y cliente. [impacto: frontend/SSR] — done ✓
4. Validación rápida: compilar y smoke test visual (local) para confirmar que abre WhatsApp con la URL correcta. [impacto: QA] — pending

## Notas
- EnvelopeWelcome es Client Component; se evita el render del botón hasta tener el `href` listo tras `useEffect`, previniendo mismatches.
- El `wedding_id` se toma del query param actual y, si no existe, se usa `NEXT_PUBLIC_WEDDING_ID` como fallback.
- No se introducen dependencias nuevas; se reutiliza el patrón existente y el componente `GiftsShareButton`.
