# Tasks — SOLICITUD-TOAST

Estado de estándares: No existe ./junie/development-standards.md en el repo; se siguen patrones del proyecto (Next.js App Router, TypeScript, Tailwind, react-modal, react-hot-toast). Los cambios son mínimos y no alteran la arquitectura.

Requerimiento:
- En el toast de SolicitudManager, ser más detallistas indicando para quién se aplica la acción (ej.: "Marcado Juan Pérez como Pendiente").

Tareas
1. Localizar uso de toast en updateGuestStatus. [frontend] — done
2. Obtener el nombre del invitado a partir del guestId. [frontend] — done
3. Construir mensaje detallado: "Marcado <Nombre Invitado> como <Estado>" usando los textos existentes (Confirmado/Pendiente/Rechazado). [frontend] — done
4. Mantener toast masivo tal como está (indica conteo). [frontend] — done
5. Verificar compilación en build de producción. [proceso] — pending

Notas
- No se añadieron dependencias nuevas.
- Se mantuvo Toaster en SolicitudManager con posición top-right.
- No se cambiaron textos de acciones masivas.

Validación
- Manual: Cambiar el estado de un invitado individualmente debe mostrar el toast con el nombre del invitado y el estado final.
