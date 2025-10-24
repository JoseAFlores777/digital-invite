# Tareas – Favicon en enlace con invitación (Ticket: FAVICON-INVITE)

## Contexto
- Reporte: El favicon se muestra en https://invite.joseiz.com/ pero no en https://invite.joseiz.com/?invitationID=...
- Hallazgo: `metadataBase` estaba configurado como `https://example.com`, lo que fuerza URLs absolutas erróneas para los íconos en páginas donde el navegador usa los `<link rel="icon">` generados por Next.

## Plan y Tareas
1. Revisar estándares de desarrollo en `./junie/development-standards.md`. [impacto: docs] — done
2. Auditar `src/app/layout.tsx` para `metadata.icons` y `metadataBase`. [impacto: frontend] — done
3. Corregir `metadataBase` a `https://invite.joseiz.com` para que Next genere URLs absolutas correctas en `<head>`. [impacto: frontend] — done
4. Verificar existencia de assets en `public/favicon/*` referenciados: `favicon.ico`, `favicon-16x16.png`, `favicon-32x32.png`, `apple-icon-180x180.png`, `android-icon-192x192.png`, `ms-icon-144x144.png`. [impacto: frontend] — done
5. Validar en entorno local/preview que el `<head>` incluya los `<link rel="icon">` con el dominio correcto al navegar a `/?invitationID=...`. [impacto: tests/manual] — pending

## Notas
- Existen duplicados de íconos en `src/app/favicon/*`. Actualmente estamos usando rutas públicas `public/favicon/*` mediante `metadata.icons`, por lo que no afectan. Si se desea limpieza futura, eliminar duplicados de `src/app/favicon/*` tras validar no usados por Next.
- No se añadieron dependencias ni cambios de arquitectura.

## Riesgos / Revisión Manual
- Verificar caches de navegador: limpiar cache/force-reload al probar el favicon en la URL con query.
- Confirmar en producción que los `<link rel="icon">` resuelvan a `https://invite.joseiz.com/favicon/...`.
