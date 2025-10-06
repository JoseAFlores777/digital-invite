# Requisitos — Countdown de confirmación en SolicitudManager (COUNTDOWN-RSVP)

Fecha: 2025-10-06

Objetivo:
- Mostrar un contador regresivo (días, horas, minutos, segundos) dentro de SolicitudManager indicando el tiempo restante para confirmar asistencia.
- El contador debe finalizar 3 semanas antes del día/hora del evento.
- Al llegar a cero, deshabilitar los botones de confirmación/cambio de estado y mostrar un rótulo en rojo suave indicando que ya no se puede confirmar.

Alcance:
- Solo frontend, en `src/components/SolicitudManager.tsx`.
- Cálculo del deadline a partir de la fecha/hora del evento obtenida por `fetchWeddingGeneralities`.
- Temporizador con `setInterval` (1s) y derivación de `isClosed`.
- Ajustes de UI para mostrar el countdown cuando está activo y el rótulo cuando expiró.
- Deshabilitar buttons (por invitado y masivos) y no-op en funciones de actualización cuando expiró.

Criterios de aceptación:
- Mientras falte tiempo: se ve un badge con el contador (días/hh:mm:ss) en el header de SolicitudManager.
- Al expirar: los botones de estado están deshabilitados y aparece un aviso en rojo suave: "Ya no se puede confirmar: el tiempo ha finalizado.".
- El cálculo se basa en `eventDateTime - 21 días`. Si no hay fecha del evento, no se muestra countdown y no se bloquea.

Fuera de alcance:
- Soporte completo de zonas horarias (se interpreta fecha/hora en local si no hay contexto adicional).
- Cambios en APIs o backend.
