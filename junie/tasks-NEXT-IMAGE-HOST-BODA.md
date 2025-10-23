# Tareas – Configurar host remoto para next/image (Ticket: NEXT-IMAGE-HOST-BODA)

Estado de estándares: No existe `./junie/development-standards.md`; se siguen patrones del proyecto (Next.js App Router, TS) y guía oficial de `next/image` (context7/Next.js).

## Lista de tareas
1. Identificar origen del error `next-image-unconfigured-host` para `https://boda.joseiz.com/assets/...`. [impacto: frontend/runtime] – done ✓
2. Corregir `next.config.ts` (typo actual `boda.joseiz` → `boda.joseiz.com`) en `images.remotePatterns`. [impacto: build] – done ✓
3. Mantener patrón existente para `picsum.photos` y TTL de cache. [impacto: build] – done ✓
4. Búsqueda rápida de otros hosts de imágenes externos usados por `<Image />`. [impacto: QA] – done ✓ (Directus vía `https://boda.joseiz.com/assets/...` o proxy `/api`)
5. Validar en dev que desaparece el error y las imágenes cargan. [impacto: QA] – pending 

## Notas
- `Gallery` y `ResponsiveImageGallery` componen URLs desde `directus_url` que puede apuntar a `https://boda.joseiz.com`.
- `remotePatterns` con `pathname: "/assets/**"` limita el scope de imágenes remotas a la ruta esperada.

## Pendientes / Revisión humana
- Ejecutar `next dev` o entorno equivalente y navegar a secciones con galería/collage para validar carga.
- Si se cambian dominios en el futuro (ej. subdominio diferente), actualizar `next.config.ts` en consecuencia.
