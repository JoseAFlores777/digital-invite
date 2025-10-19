# TKT: RSVP-DEADLINE-LOCAL-TZ — Enviar deadline como fecha local sin zona horaria

Estado de estándares: No existe ./junie/development-standards.md en el repo; se siguieron patrones del proyecto (Next.js + TS + Tailwind) y se evitó agregar dependencias.

## Tareas
1. Identificar conversión a UTC en SolicitudManager al guardar `rsvp_deadline` (uso de `toISOString()`). [frontend] — done
2. Reemplazar por envío de string local en formato `YYYY-MM-DDTHH:mm:ss` (sin `Z`). Añadir `:00` si faltan segundos. [frontend] — done
3. Actualizar estado local (`deadlineIso`, `deadlineMs`) usando el mismo string local para evitar desplazamientos de zona. [frontend] — done
4. Verificación rápida: establecer 12:00 y 00:00 local; confirmar que al recargar no cambia a 06:00. [manual] — pending

## Notas
- Razón: `toISOString()` convertía la fecha local a UTC, produciendo un desplazamiento de -6h (ej. Tegucigalpa), causando que 12:00 se guardara como 06:00 local al reinterpretarse.
- El endpoint `/api/invitation-deadline` debe almacenar el valor tal cual (naive), sin re-normalizar a UTC.
- No se modificaron servicios ni tipos.
