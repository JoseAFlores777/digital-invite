# Tasks — DIGITAL-GUESTS endpoint calls hardening

1. Revisar estándares (`./junie/development-standards.md`) y requerimientos relacionados a solicitudes-admin. [impacto: proceso] ✓
2. Identificar todos los usos de `/api/digital-guests` en el repo. [impacto: frontend] ✓
   - Hallazgos:
     - `src/app/page.tsx` hacía `fetch('/api/digital-guests')` al cargar la invitación pública (con `?invitationID=...`).
     - `src/components/AdminInvitationsList.tsx` lo usa dentro del panel admin.
3. Remover la llamada pública en `src/app/page.tsx` para que el endpoint sólo se consuma tras autenticación en `/solicitudes-admin`. [impacto: frontend] ✓
   - Eliminado el `useEffect` que hacía `fetch('/api/digital-guests')` y estados relacionados no usados.
4. Verificar que en admin siga funcionando tras contraseña: `/src/app/solicitudes-admin/page.tsx` gatea el render del `AdminInvitationsList` por `/api/auth/solicitudes-admin`. [impacto: frontend] ✓
5. Validar que no existan otros usos públicos de `/api/digital-guests`. [impacto: frontend] ✓
6. Notas de seguridad: Con este cambio el endpoint deja de ser llamado en el flujo público, reduciendo exposición de datos. [impacto: doc] ✓

Estado: listo para revisión.
