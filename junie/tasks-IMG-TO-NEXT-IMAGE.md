# Tareas – Migrar <img> a Next.js <Image> (Ticket: IMG-TO-NEXT-IMAGE)

Estado de estándares: No existe `./junie/development-standards.md`; se siguen patrones del proyecto (Next.js App Router, TS, Tailwind) y guías oficiales de `next/image`.

## Lista de tareas
1. Auditar repo para ubicar `<img>` en rutas y componentes renderizados por páginas. [impacto: frontend] – done ✓
2. `src/app/page.tsx`: importar `next/image` y reemplazar sello en `sealSlot`. [impacto: frontend] – done ✓
3. `src/components/AlbumQR.tsx`: importar `Image` y reemplazar QR + thumbnails. [impacto: frontend] – done ✓
4. `src/components/Gallery.tsx`: importar `Image` y usar `fill + sizes` en miniaturas (contenedor `relative`). [impacto: frontend] – done ✓
5. `src/components/PhotoMasonry.tsx`: importar `Image` y usar `fill + sizes` dentro de `figure` relativo. [impacto: frontend] – done ✓
6. `src/components/ResponsiveImageGallery.tsx`: importar `Image` y usar `fill + sizes`, `priority` en primeros elementos. [impacto: frontend] – done ✓
7. `src/components/PerspectiveZoom.tsx`: importar `Image` y reemplazar `<img>` con `width/height` por defecto y estilos para preservar layout en `vw`. [impacto: frontend] – done ✓
8. Verificar necesidad de `next.config.ts` para dominios remotos. [impacto: build] – done ✓ (no cambios; assets vía `/api/directus` o `/public`).
9. Búsqueda final de `<img` en `src/`. [impacto: QA] – done ✓ (0 restantes).

## Notas
- En grillas se usó `sizes` para mejorar responsive y ahorro de datos.
- En `PerspectiveZoom` el contenedor posiciona por `vw`; por eso se dejó `style={{ width:'100%', height:'auto' }}` y dimensiones 1600x900 por defecto.
- No se agregaron dependencias nuevas ni se modificó la arquitectura.

## Pendientes / Revisión humana
- Confirmar visualmente que `PerspectiveZoom` mantiene las proporciones esperadas en todos los breakpoints.
- Si se detectan imágenes desde dominios externos no proxied, agregar `images.remotePatterns` en `next.config.ts`.
