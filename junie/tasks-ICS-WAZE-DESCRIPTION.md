# TKT: ICS-WAZE-DESCRIPTION — Actualizar copy de DESCRIPTION en .ics

Estado de estándares: No existe ./junie/development-standards.md; se siguen patrones del proyecto (Next.js + TS + Tailwind). Sin dependencias nuevas.

## Tareas
1. Cambiar el prefijo del campo DESCRIPTION cuando exista `waze_link` de "Nos vemos aquí ->" a "Maneja con Waze ->". [frontend] — done
2. Mantener `URL:<waze_link>` en el .ics, CRLF, escape con `icsEscape`, y soporte de TZID en DTSTART/DTEND. [frontend] — done
3. Validar manualmente que el .ics descargado muestre `DESCRIPTION:Maneja con Waze -> <link>` y no el copy anterior. [manual] — pending

## Notas
- Sin cambios en backend ni tipos.
- Si no hay `waze_link`, se mantiene el fallback previo (LOCATION textual en DESCRIPTION).
