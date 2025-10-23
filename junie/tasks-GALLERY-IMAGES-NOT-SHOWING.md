# Tareas – GALLERY-IMAGES-NOT-SHOWING

Estado de estándares: No existe ./junie/development-standards.md en el repo; se siguen patrones del repo (Next.js App Router, TS, Tailwind, componentes client/server) y consistencia con código existente.

1. Analizar el problema reportado: "en Galeria no me están apareciendo las imágenes". [impacto: frontend] – done
2. Revisar Gallery.tsx para identificar posibles causas (datos, URLs, next/image, PhotoSwipe, estilos). [impacto: frontend] – done
3. Detectar colisión de nombres: import `Image` de next/image vs uso de `new Image()` (global). [impacto: frontend] – done
4. Solución mínima: renombrar import a `NextImage` y usar `window.Image` en la rutina de medición. [impacto: frontend] – done
5. Verificar construcción de URLs con `directus_url`/`NEXT_PUBLIC_DIRECTUS_URL` y manejo cuando falte `baseUrl`. [impacto: frontend] – done
6. Confirmar compatibilidad de dominios con next.config.ts (images.remotePatterns); anotar si se requiere agregar host adicional. [impacto: config] – pending
7. Validación manual: miniaturas visibles, apertura en PhotoSwipe, colapso/expand. [impacto: frontend/tests manuales] – pending
8. Documentar cambios y conclusiones. [impacto: docs] – pending

Notas:
- Si `directus_url` apunta a un host distinto a `boda.joseiz.com`, habrá que agregarlo en `next.config.ts#images.remotePatterns`.
- No se agregaron dependencias nuevas.
- No se tocaron otros componentes.
