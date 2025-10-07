# Tareas — Labels dinámicos y toasts de estado (GUEST-LABELS-TOASTS)

Estado de estándares: No existe ./junie/development-standards.md en el repo; se siguen patrones del proyecto (Next.js App Router, TS, Tailwind, sin comentarios innecesarios). Context7 consultado para react-hot-toast.

1. Revisar estándares internos y contexto (context7 para react-hot-toast). [impacto: procesos] — done ✓
2. Definir requisitos y alcance en `requirements-GUEST-LABELS-TOASTS.md`. [impacto: documentación] — done ✓
3. Agregar dependencia `react-hot-toast` en package.json. [impacto: frontend] — done ✓
4. Integrar Toaster en `SolicitudManager.tsx` (modal y no modal). [impacto: frontend] — done ✓
5. Etiquetas dinámicas:
   - accepted → "Confirmar"/"Confirmado" según seleccionado. [impacto: frontend] — done ✓
   - declined → "Rechazar"/"Rechazado" según seleccionado. [impacto: frontend] — done ✓
   - unknown → "Pendiente". [impacto: frontend] — done ✓
6. Toasts al cambiar estado individual (éxito/error). [impacto: frontend] — done ✓
7. Toasts en acciones masivas (éxito/error). [impacto: frontend] — done ✓
8. Verificar contrato `GuestStatus = "unknown" | "accepted" | "declined"` se mantiene. [impacto: frontend/backend] — done ✓
9. Validación rápida: inspección de tipos y rutas afectadas. [impacto: tests/manual] — done ✓

Notas:
- El componente ya revierte el estado en error; se añadió toast de error.
- Toaster se monta en ambas rutas de render para asegurar disponibilidad.
