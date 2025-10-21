# Tareas — GALLERY-NO-DISTORTION

Estado de estándares: No existe ./junie/development-standards.md; se respetan patrones del proyecto (Next.js, TypeScript, Tailwind, Iconify, PhotoSwipe). Sin dependencias nuevas.

1. Analizar problema: deformación en PhotoSwipe por `data-pswp-width/height` fijos (1600x1067). [impacto: frontend/UI] — done
2. Medir dimensiones reales de cada asset antes de inicializar PhotoSwipe (Image.naturalWidth/Height sobre la URL original del asset). [impacto: frontend] — done
3. Actualizar Gallery.tsx para establecer `data-pswp-width` y `data-pswp-height` con valores medidos; mantener grid existente. [impacto: frontend] — done
4. Ajustar configuración de PhotoSwipe (initialZoomLevel: 'fit', secondaryZoomLevel: 1) para reforzar preservación de aspecto. [impacto: frontend] — done
5. Validación conceptual: si no se puede medir, fallback 1600x1067; sin cambios en estilos; no se toca InvitationContent. [impacto: QA] — done

Notas:
- La medición usa la URL original del asset (`/assets/<id>`) para obtener dimensiones reales.
- El grid mantiene object-cover para thumbnails; la relación real se respeta dentro del lightbox.
