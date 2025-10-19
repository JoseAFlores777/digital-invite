# TKT: WAZE-ONLY — Usar solo waze_link y quitar lat/long en .ics

Estado de estándares: No existe ./junie/development-standards.md; se siguen patrones del proyecto (Next.js + TS + Tailwind). Cambios mínimos y localizados.

## Tareas
1. Identificar generación de .ics en SolicitudManager (handleDownloadIcs). [frontend] — done
2. Eliminar inclusión de GEO y URL:geo basados en latitude/longitude. [frontend] — done
3. Incluir únicamente `URL:<waze_link>` cuando exista; mantener `LOCATION` y `DESCRIPTION` con el waze_link como referencia. [frontend] — done
4. Mantener CRLF ("\r\n"), SUMMARY, DTSTAMP, UID y TZID en DTSTART/DTEND. [frontend] — done
5. Verificar que no haya otros lugares que dependan de lat/long para este flujo. [revisión] — done

## Notas
- La interfaz de Venues ya incluye `waze_link`; no se modificaron servicios.
- Si no existe `waze_link`, se omite URL y `DESCRIPTION` cae al texto de ubicación si está disponible.
- No se agregaron dependencias.
