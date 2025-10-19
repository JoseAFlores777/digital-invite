# TKT: RSVP-PENDING-AS-DECLINED — Banner para pendientes al vencer countdown

Estado de estándares: No existe ./junie/development-standards.md; se siguen patrones del proyecto (Next.js + TS + Tailwind). Sin dependencias nuevas.

## Tareas
1. En SolicitudManager, cuando `isClosed && !adminMode`, mostrar el banner de estado por invitado. [frontend] — done
2. Para invitados con `status === "unknown"`, usar copy "Ha rechazado la invitación" (en lugar de "Pendiente"). [frontend] — done
3. Para ese mismo caso, aplicar estilo de rechazado (rose) y usar icono `X`. [frontend] — done
4. Verificar que adminMode mantiene botones editables aunque el contador haya vencido. [frontend] — done

## Notas
- Cambio aplicado solo en la rama de banner (no afecta botones cuando `!isClosed || adminMode`).
- Sin cambios en backend, tipos o APIs.
