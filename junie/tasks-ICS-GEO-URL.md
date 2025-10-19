# TKT: ICS-GEO-URL — Incluir GEO y URL geo en archivos .ics

Estado de estándares: No existe ./junie/development-standards.md; se siguen patrones del proyecto (Next.js + TS + Tailwind). Sin dependencias nuevas. Alineado con el requerimiento de agregar GEO y URL:geo en el .ics.

## Tareas
1. Identificar generador de .ics en SolicitudManager (handleDownloadIcs). [frontend] — done
2. Agregar línea `GEO:lat;lon` si hay coordenadas. [frontend] — done
3. Agregar línea `URL:geo:lat,lon` si hay coordenadas. [frontend] — done
4. Mantener `LOCATION` textual si existe y agregar `DESCRIPTION` con enlace a Google Maps cuando haya coordenadas (escape de caracteres y `\n`). [frontend] — done
5. Verificar CRLF (`\r\n`) en el archivo final y uso de `icsEscape`. [frontend] — done
6. Mantener `DTSTART/DTEND` con `TZID=America/Tegucigalpa` (normalización desde `GMT-6`) cuando aplique; mantener `DTSTAMP` y `UID`. [frontend] — done
7. Prueba manual: descargar .ics, abrir con Apple/Google Calendar/Outlook y confirmar presencia de GEO, URL:geo, LOCATION, DESCRIPTION, TZID y CRLF. [manual] — pending

## Notas
- No se tocaron servicios ni tipos.
- `icsEscape` ya manejaba `\\`, `,`, `;` y saltos de línea → `\\n`.
- Se mantiene `join("\r\n")` para CRLF.
- Si no hay coordenadas, `DESCRIPTION` incluye texto de ubicación si existe.