# Tareas — GALLERY-WEBPHOTOS

Estado de estándares: No existe ./junie/development-standards.md en el repo; se siguieron patrones del proyecto (Next.js App Router, TypeScript, Tailwind, Iconify). Se consultó el contexto existente (PhotoMasonry, PerspectiveZoom) para mantener consistencia visual.

1. Analizar requerimiento: crear sección “Galería” con subtítulo “Fotos de nuestro compromiso”, usar PhotoSwipe y pintar fotos desde `web_photos` de la wedding. [impacto: frontend/UI] — done
2. Verificar disponibilidad de datos: `web_photos` y `directus_url` desde `/api/wedding-generalities` (fallback a `NEXT_PUBLIC_DIRECTUS_URL`). [impacto: frontend/datos] — done
3. Implementar `src/components/Gallery.tsx` (client):
   - Inicializar `PhotoSwipeLightbox` con `gallery: #engagement-gallery` y `children: 'a'`. [impacto: frontend] — done
   - Importar `photoswipe/style.css`. [impacto: build] — done
   - Mapear `web_photos[].asset` → URLs de Directus (`/assets/{id}?width=1600` para grande, `?width=400` para thumbnail). [impacto: frontend] — done
   - Estimar `width/height` por defecto (1600x1067) si no hay metadata. [impacto: frontend] — done
   - Maquetar grid responsive inspirado en `PhotoMasonry.tsx` (variaciones `col-span`/`row-span`). [impacto: UI] — done
4. Integrar `Gallery` en `InvitationContent.tsx` debajo de “Menú”. [impacto: frontend] — done
5. Validar que `photoswipe` ya existe en `package.json` y que el import sólo corre en cliente. [impacto: build] — done

Notas:
- No se agregaron dependencias nuevas (photoswipe ya presente).
- Si el endpoint no trae `directus_url`, el componente usa `NEXT_PUBLIC_DIRECTUS_URL`.
- El grid evita el efecto “pinned scroll” de PhotoMasonry para no interferir con el flujo de la invitación; sólo replica el pattern de spans para estética.
