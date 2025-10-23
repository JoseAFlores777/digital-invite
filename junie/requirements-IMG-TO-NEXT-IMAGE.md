# Requisitos: Migrar <img> a Next.js <Image>

Objetivo: Reemplazar todas las etiquetas HTML <img> en páginas y componentes relacionados con rutas por el componente Image de Next.js, para optimizar rendimiento (carga diferida, tamaños responsivos) y SEO/UX.

Alcance:
- Páginas bajo src/app/** y los componentes que renderizan.
- Mantener estilos y estructura existentes.
- Evitar dependencias nuevas.

Criterios de aceptación:
- No quedan etiquetas <img> en páginas ni en componentes usados por páginas.
- Cada reemplazo importa correctamente `next/image`.
- Para grillas y thumbnails, usar `fill` + `sizes` y contenedor `relative`.
- Para íconos o sellos simples, usar `width`/`height` razonables.
- Si hay imágenes remotas, ajustar next.config.ts (no aplica: Directus se sirve vía /api proxy o dominios ya configurados).

Notas:
- Gallery, PhotoMasonry y ResponsiveImageGallery requieren `fill` para conservar `object-cover`.
- PerspectiveZoom posiciona imágenes con `vw`; se usó `width/height` por defecto (1600x900) y `style` para preservar comportamiento.
