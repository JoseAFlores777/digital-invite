# Tareas — Countdown de confirmación en SolicitudManager (COUNTDOWN-RSVP)

Fecha: 2025-10-06

Resumen del alcance:
- Agregar un contador regresivo en `SolicitudManager` que finaliza 3 semanas antes del evento.
- Al expirar: deshabilitar botones de confirmación y mostrar rótulo en rojo suave en el header.

Tareas
1. Revisar estándares `./junie/development-standards.md` y contexto MCP. [impacto: procesos] — no existe, seguir convenciones del repo ✓
2. Obtener fecha/hora del evento desde `fetchWeddingGeneralities` y calcular `deadline = event - 21 días`. [impacto: frontend] — done ✓
3. Implementar estado `deadlineMs`, `nowMs`, y efecto `setInterval(1s)` para tick. [impacto: frontend] — done ✓
4. Derivar `timeLeft` e `isClosed`; mostrar countdown activo en header o aviso en rojo si expiró. [impacto: frontend] — done ✓
5. Deshabilitar botones por invitado y acciones masivas cuando `isClosed` y hacer no-op en `update*`. [impacto: frontend] — done ✓
6. Validación manual: abrir como modal y como card; verificar countdown, expiración, y bloqueo de acciones. [impacto: QA] — pendiente 

Notas:
- Se parsea fecha/hora en horario local por simplicidad; si se requiere zona horaria exacta, considerar añadir soporte con Intl o librería especializada.
- Cambios limitados a `src/components/SolicitudManager.tsx`; sin nuevas dependencias.
