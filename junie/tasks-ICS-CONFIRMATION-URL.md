# TKT: ICS-CONFIRMATION-URL — Usar URL de confirmación en el .ics

Estado de estándares: No existe ./junie/development-standards.md; se siguen patrones del proyecto (Next.js + TS + Tailwind). Cambios mínimos en frontend.

## Tareas
1. Localizar generador de .ics en `SolicitudManager.handleDownloadIcs`. [frontend] — done
2. Construir `confirmUrl` con `window.location.origin` y `solicitudId`: `${origin}/solicitud?invitationID=${solicitudId}`. [frontend] — done
3. Establecer la línea `URL:<confirmUrl>` en el .ics, en lugar de Waze/Google. [frontend] — done
4. Mantener Waze/Google en `DESCRIPTION` (una o dos líneas según disponibilidad). [frontend] — done
5. Verificar que se conservan CRLF, SUMMARY, DTSTAMP, UID y TZID. [revisión] — pending

## Notas
- No hay cambios en backend ni tipos.
- La generación ocurre en el cliente (evento de click), por lo que `window` está disponible.
- La URL de confirmación coincide con la que se muestra en Admin (“Direccion URL”).
