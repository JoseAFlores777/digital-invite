# Tareas – SEO Metadata y Favicon (Ticket: SEO-METADATA)

Estado de estándares: No existe `./junie/development-standards.md` en el repo; se siguen patrones del proyecto (Next.js App Router, TS, Tailwind) y documentación de Next.js Metadata API (context7/Next.js).

## Lista de tareas
1. Auditar rutas y páginas que requieren metadata (/, /gifts, /live, /solicitud, /solicitudes-admin). [impacto: frontend] – done
2. Actualizar iconos globales a `public/wedding-Logo.svg` en `src/app/layout.tsx`. [impacto: frontend] – done
3. Añadir metadata completa a `/gifts` (title, description, OG, Twitter, canonical). [impacto: frontend] – done
4. Añadir metadata completa a `/live` (title, description, OG, Twitter, canonical). [impacto: frontend] – done
5. Añadir metadata completa a `/solicitud` (title, description, OG, Twitter, canonical). [impacto: frontend] – done
6. Evitar indexación en `/solicitudes-admin` con `robots` noindex,nofollow en `layout.tsx` del segmento. [impacto: frontend/SEO] – done
7. Validar que Home herede metadata del `RootLayout` y no rompa porque la página es cliente. [impacto: frontend] – done
8. Verificar existencia de `public/wedding-Logo.svg`. [impacto: frontend] – done

## Notas
- La página Home (`src/app/page.tsx`) es un Client Component; por compatibilidad con Next.js, la metadata específica se mantiene en el `RootLayout` (`src/app/layout.tsx`).
- Se añadieron `alternates.canonical` por ruta; el `metadataBase` del layout se mantiene con el valor previo del proyecto.
- Para `/solicitudes-admin` se agrega `robots` estricto para que no sea indexable.
- No se introdujeron dependencias externas.

## Pendientes / Revisión humana
- Confirmar `metadataBase` correcto para el dominio final (actualmente `https://example.com`).
- Si se requiere imagen OG específica por ruta, agregar assets dedicados en `public/` y referenciarlos en `openGraph.images`.
