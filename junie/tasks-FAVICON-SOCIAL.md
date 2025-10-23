# Tareas – Favicon y Social (Ticket: FAVICON-SOCIAL)

Hallazgo inicial:
- No existe `./junie/development-standards.md`. Se siguen patrones del repo (Next.js App Router, TypeScript, Tailwind).
- Existen múltiples iconos en `src/app/favicon/*` y un `public/favicon.svg`.
- `src/app/layout.tsx` ya define `metadata` con Open Graph y Twitter, pero los `icons` apuntaban a `/wedding-Logo.svg`.

Objetivo:
- Configurar correctamente los favicons e iconos Apple/Android para navegadores y PWA, y mantener la imagen OG para redes sociales.

Tareas
1. Revisar layout raíz y metadatos actuales. [impacto: frontend] — done
2. Definir `metadata.icons` apuntando a rutas públicas `/favicon/*`. [impacto: frontend] — done
3. Crear/copiar archivos necesarios a `public/favicon/` para asegurar disponibilidad de rutas. [impacto: frontend] — done
   - favicon.ico
   - favicon-16x16.png
   - favicon-32x32.png
   - apple-icon-180x180.png
   - android-icon-192x192.png
   - ms-icon-144x144.png
4. Validar que OpenGraph/Twitter sigan con `/assets/og-cover.svg`. [impacto: frontend/SEO] — done
5. Documentar tareas y hallazgos en este archivo. [impacto: proceso] — done

Notas
- No se agregaron dependencias nuevas.
- Se mantuvo `openGraph`/`twitter` para vistas previas en redes sociales; los favicons no afectan las previews sociales.
- Se recomienda establecer `metadataBase` al dominio productivo cuando esté confirmado (actualmente `https://example.com`).
