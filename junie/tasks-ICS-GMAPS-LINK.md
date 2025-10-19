# TKT: ICS-GMAPS-LINK — Soportar google_maps_link además de waze_link en .ics

Estado de estándares: No existe ./junie/development-standards.md; se siguen patrones del proyecto (Next.js + TS + Tailwind). Sin dependencias nuevas.

## Tareas
1. Agregar `google_maps_link?: string | null` a la interfaz `Venues` en `src/lib/directus-interfaces.ts`. [tipos] — done
2. Leer `location.google_maps_link` en `SolicitudManager` (fetchWeddingGeneralities) y guardarlo en estado `eventGoogleMapsLink`. [frontend] — done
3. Ajustar generación del .ics en `handleDownloadIcs`:
   - Preferir `URL:<waze_link>`; si no hay, usar `URL:<google_maps_link>`. [frontend] — done
   - DESCRIPTION: si Waze → `Maneja con Waze -> <link>`; si Google Maps → `Abrir en Google Maps -> <link>`; si ninguno → fallback a `Ubicación: <texto>`. [frontend] — done
   - Conservar CRLF, TZID en DTSTART/DTEND, SUMMARY, DTSTAMP y UID. [frontend] — done
4. Verificar que no se use lat/long en el .ics. [revisión] — done

## Notas
- No se tocaron endpoints; se asume que `/api/wedding-generalities` ya expone `location.google_maps_link` si existe.
- Si ambas ligas existen, se prioriza Waze para `URL` y DESCRIPTION.
- Cambios mínimos y compatibles con lo implementado previamente (Waze).