# TKT: ICS-BOTH-LINKS — Incluir Waze y Google Maps en .ics

Estado de estándares: No existe ./junie/development-standards.md; se siguen patrones del proyecto (Next.js + TS + Tailwind). Sin dependencias nuevas.

## Tareas
1. Ubicar generador de .ics en SolicitudManager (handleDownloadIcs). [frontend] — done
2. Mantener una sola propiedad URL (preferir Waze si existe; de lo contrario Google). [frontend] — done
3. Construir DESCRIPTION con ambos enlaces cuando existan: 
   - "Maneja con Waze -> <waze_link>" 
   - "Abrir en Google Maps -> <google_maps_link>"
   separados por salto de línea. [frontend] — done
4. Mantener escapes con `icsEscape` y CRLF en el join; preservar LOCATION, SUMMARY, DTSTAMP, UID, DTSTART/DTEND con TZID. [frontend] — done
5. Fallbacks: si solo hay uno, usarlo en URL y en DESCRIPTION; si no hay ninguno, usar texto de ubicación. [frontend] — done
6. Verificación manual: descargar .ics en escenarios (ambos, solo Waze, solo Google, ninguno). [manual] — pending

## Notas
- No se modificaron servicios ni tipos; Venues ya contiene `waze_link` y `google_maps_link`.
- Se evita usar múltiples propiedades URL para maximizar compatibilidad con apps de calendario.
