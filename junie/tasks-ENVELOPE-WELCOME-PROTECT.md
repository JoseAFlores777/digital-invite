# Tasks: EnvelopeWelcome protegido por invitationID

1. Revisar estándares del proyecto en ./junie/development-standards.md (no existe en el repo). Se siguen patrones existentes (Next.js App Router, servicios Directus con RxJS, barrel en lib/directus). [impacto: procesos] — done ✓
2. Agregar servicio para obtener invitación por id (Directus): getInvitationById en src/server/services/invitations.service.ts con campos y manejo RxJS consistente. [impacto: backend] — done ✓
3. Exponer getInvitationById en el barrel src/lib/directus.ts. [impacto: backend] — done ✓
4. Crear endpoint API /api/invitation-by-id?id=… para uso desde el cliente; devolver 400/404/500 según caso. [impacto: backend] — done ✓
5. Proteger la UI de EnvelopeWelcome en src/app/page.tsx:
   - Leer query param invitationID en cliente. [impacto: frontend] — done ✓
   - Si falta/ inválido, mostrar mensaje personalizado de disculpa; no montar EnvelopeWelcome ni loader. [impacto: frontend] — done ✓
   - Si válido, pedir la invitación al endpoint y personalizar props (sender/subtitle) antes de montar EnvelopeWelcome. [impacto: frontend] — done ✓
   - Mantener lógica de loader/animaciones solo cuando hay invitación válida. [impacto: frontend] — done ✓
6. Verificación manual básica: compilar localmente, navegar a /?invitationID=<id_valido> y sin param para ver mensaje. [impacto: tests/manual] — pending 

Notas:
- No se agregaron dependencias nuevas.
- No se modificó EnvelopeWelcome.tsx para evitar cambios innecesarios.
- Middleware existente para /invitacion se mantiene sin cambios.
- Revisión manual de permisos/envs de Directus es externa a este ticket.
