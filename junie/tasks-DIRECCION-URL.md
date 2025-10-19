# TKT: DIRECCION-URL — Mostrar URL de confirmación en Admin

Estado de estándares: No existe ./junie/development-standards.md; se siguieron patrones del proyecto (Next.js + TS + Tailwind). Cambios mínimos en frontend.

## Tareas
1. Identificar el lugar donde mostrar "Direccion URL" (modal de enviar invitación en AdminInvitationsList). [frontend] — done
2. Agregar estado `origin` (window.location.origin) y `copiedUrl` para feedback de copiado. [frontend] — done
3. Renderizar campo de solo lectura con la URL `${origin}/solicitud?invitationID=${sendInviteFor}` y botón "Copiar" (cambia a "Copiado"). [frontend] — done
4. Mantener estilos consistentes, accesibles y responsive. [frontend] — done
5. Sin cambios en backend ni tipos. [backend] — n/a

## Notas
- La URL se construye del lado del cliente para respetar el dominio actual (
  producción/desarrollo). 
- El campo aparece dentro del modal de "Enviar invitación/recordatorio" en /solicitudes-admin.
