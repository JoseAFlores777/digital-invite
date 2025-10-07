# Tasks — CALENDAR-BUTTON

1. Revisar estándares en ./junie/development-standards.md y contexto previo de SolicitudManager. [impacto: proceso] ✓
2. Capturar en estado los valores de wedding-generalities: couple.name, date, start_time, end_time, timezone, location (nombre, dirección, lat/lng). [impacto: frontend] ✓
3. Implementar helper de normalización de zona horaria (mapear GTM-6/GMT-6/UTC-6 → America/Tegucigalpa). [impacto: frontend] ✓
4. Refactor de handleDownloadIcs para usar TZID y start/end reales, título "Boda {couple.name}", LOCATION y GEO. [impacto: frontend] ✓
5. Mover el botón "Añadir al calendario" al lado del título (misma línea) y agregar ícono. [impacto: frontend] ✓
6. Validación manual: generar .ics, verificar SUMMARY, DTSTART/DTEND con TZID, LOCATION y nombre de archivo. [impacto: tests/manual] *
7. Documentar cambios en ./junie/requirements-CALENDAR-BUTTON.md. [impacto: documentación] ✓

Notas:
- Mantener estilos y patrones del proyecto; sin dependencias nuevas.
- No se modifica backend; se usa /api/wedding-generalities existente.