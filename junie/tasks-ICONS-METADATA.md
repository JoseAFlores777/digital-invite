# Tasks – ICONS-METADATA

Ticket: ICONS-METADATA

Objetivo: "Revisar los metadatos e íconos de cada página y ruta y hacer que siempre sea public/wedding-Logo.svg".

## Auditoría inicial
- Se revisó `src/app/layout.tsx` y ya define `metadata.icons` apuntando a `/wedding-Logo.svg`.
- Se detectaron páginas/rutas con `export const metadata` sin `icons`, por lo que heredan del layout raíz pero podrían generar ambigüedad.
- Se confirmó la existencia del asset: `public/wedding-Logo.svg`.
- Existe `public/favicon.svg` (no interfiere al usar `metadata.icons`).

## Cambios realizados
1. src/app/gifts/page.tsx — agregar `icons` con `/wedding-Logo.svg`. (impacto: frontend) — done
2. src/app/live/page.tsx — agregar `icons` con `/wedding-Logo.svg`. (impacto: frontend) — done
3. src/app/solicitud/page.tsx — agregar `icons` con `/wedding-Logo.svg`. (impacto: frontend) — done
4. src/app/solicitudes-admin/layout.tsx — agregar `icons` con `/wedding-Logo.svg`. (impacto: frontend) — done

## Notas
- No se encontraron otras definiciones de `generateMetadata` ni overrides adicionales.
- La unificación de `icons` en cada metadata asegura consistencia incluso si en el futuro cambia el layout raíz.

## Pendientes / Validación
- Ejecutar type-check/build local y validar que las etiquetas `<link rel="icon">`, `shortcut icon` y `apple-touch-icon` apunten al mismo SVG en cada ruta.
- Si en el futuro se agregan nuevas páginas/layouts, incluir el bloque `icons` para mantener consistencia.
