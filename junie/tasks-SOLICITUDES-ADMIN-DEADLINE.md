# TKT: SOLICITUDES-ADMIN-DEADLINE — Admin puede editar deadline y forzar acciones

Estado de estándares: No existe ./junie/development-standards.md en el repo; se siguen patrones del proyecto (Next.js App Router, TypeScript, Tailwind, servicios Directus). Alineado con requirements de esta sesión.

## Tareas
1. Agregar prop `adminMode` a `SolicitudManager` para permitir edición aún con countdown vencido. [impacto: frontend] — done
2. Sustituir lógica de disabled por `canEdit = adminMode || !isClosed` en filtros, acciones masivas y botones por invitado. [impacto: frontend] — done
3. Mantener botones (no banner) en filas cuando `adminMode` aunque `isClosed`. [impacto: frontend] — done
4. Añadir input `datetime-local` y botón "Guardar deadline" junto al botón de calendario, visible solo en admin. [impacto: frontend] — done
5. Crear endpoint PATCH `/api/invitation-deadline` para actualizar `invitations.rsvp_deadline`. [impacto: backend] — done
6. Crear función cliente `patchInvitationDeadline(invitationId, rsvp_deadline)` en `src/lib/api/solicitudes.ts`. [impacto: frontend] — done
7. Conectar UI de admin a endpoint, actualizar `deadlineMs` y countdown tras guardar; mostrar toasts. [impacto: frontend] — done
8. Hacer que `AdminInvitationsList` pase `adminMode` al abrir `SolicitudManager`. [impacto: frontend] — done

## Notas
- El countdown sigue mostrándose en admin, pero no bloquea acciones.
- El input acepta limpiar deadline (envía null) para desactivar contador.
- Sin nuevas dependencias.
