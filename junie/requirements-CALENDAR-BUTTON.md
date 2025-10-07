# Requerimientos — CALENDAR-BUTTON

Objetivo: Ajustar el botón "Añadir al calendario" en SolicitudManager para que:
- Se ubique a la par del nombre de la familia/invitación (en el encabezado).
- Muestre un ícono de calendario.
- Genere un archivo/evento de calendario cuyo título sea "Boda {couple.name}" tomado de wedding-generalities.
- Considere wedding.date, wedding.start_time, wedding.end_time y wedding.timezone (con normalización de zona horaria) al construir el ICS.
- Incluir LOCATION (venue_name + address) y GEO cuando estén disponibles.

Alcance:
- Solo frontend (SolicitudManager). No cambios de backend.
- Reutilizar el endpoint /api/wedding-generalities ya consumido por SolicitudManager.

Criterios de aceptación:
- El botón aparece al lado derecho del nombre/título de la invitación en la misma línea.
- El archivo .ics descargado tiene nombre "Boda {couple.name}.ics".
- SUMMARY del evento es "Boda {couple.name}".
- DTSTART/DTEND usan TZID (si wedding.timezone está definido). Se mapea "GTM-6"/"GMT-6"/"UTC-6" a "America/Tegucigalpa".
- LOCATION contiene "{venue_name}, {address}" si existen.
- GEO incluye lat;lng cuando ambos son válidos.

No objetivos:
- Generar VTIMEZONE completo en el ICS.
- Cambiar textos o estructura fuera del encabezado y botón.

Notas:
- Mantener consistencia visual con botones anteriores (bordes, hover, tamaños).