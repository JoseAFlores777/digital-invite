# Requisitos: Configurar dominio remoto `boda.joseiz.com` para next/image

Objetivo: Corregir el error de runtime de Next.js `next-image-unconfigured-host` permitiendo las imágenes que provienen de `https://boda.joseiz.com/assets/<id>`.

Alcance:
- Actualizar `next.config.ts` para incluir el host `boda.joseiz.com` bajo `images.remotePatterns` (o `images.domains`).
- Mantener configuración existente para `picsum.photos`.
- No introducir dependencias adicionales.

Contexto:
- La galería y/o collage consumen imágenes desde Directus expuesto en `https://boda.joseiz.com/assets/<id>`.
- Next/Image exige declarar explícitamente los hosts remotos.

Criterios de aceptación:
- La app no muestra el error: `Invalid src prop (...) hostname "boda.joseiz.com" is not configured under images in your next.config.js`.
- Las imágenes de `https://boda.joseiz.com/assets/...` cargan correctamente con `<Image />` de Next.
- Build/dev se ejecuta sin errores relacionados a next/image.

Notas:
- Ya existe configuración para `picsum.photos` usada por `PerspectiveZoom`.
- Se usará `remotePatterns` con `protocol: "https"`, `hostname: "boda.joseiz.com"`, `pathname: "/assets/**"`.
