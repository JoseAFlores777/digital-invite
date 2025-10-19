# TKT: WAZE-LINK — Usar waze_link en vez de lat/long y agregarlo a Venues

Estado de estándares: No existe ./junie/development-standards.md; se siguen patrones del proyecto (Next.js + TS + Tailwind). Sin dependencias nuevas.

## Tareas
1. Agregar campo `waze_link?: string | null` a la interfaz `Venues` en `src/lib/directus-interfaces.ts`. [impacto: tipos] — done
2. En `SolicitudManager`, leer `wg.location.waze_link` desde `fetchWeddingGeneralities` y guardarlo en estado `eventWazeLink`. [impacto: frontend] — done
3. Ajustar generación de .ics: preferir `URL:<waze_link>` cuando exista; omitir `GEO` y `URL:geo:` en ese caso. Mantener fallback a lat/long si no hay Waze. [impacto: frontend] — done
4. Mantener `LOCATION`, `SUMMARY`, `DTSTAMP`, `DTSTART/DTEND` con soporte de `TZID` y CRLF, y escape correcto. [impacto: frontend] — done
5. Validación manual: con Waze presente, el .ics contiene `URL:<waze_link>` y la descripción apunta al mismo enlace; sin Waze, se usa lat/long como antes. [tests/manual] — pending

## Notas
- No se tocaron endpoints; se asume que `/api/wedding-generalities` incluye `location.waze_link` si está disponible en Directus.
- Cambios mínimos y compatibles hacia atrás.
