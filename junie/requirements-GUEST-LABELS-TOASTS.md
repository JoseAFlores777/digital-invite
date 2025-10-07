# Requisitos — Labels dinámicos y toasts de estado (GUEST-LABELS-TOASTS)

Contexto: Ajustar UX de botones de estatus de invitado y notificar cambios.

Alcance:
- Labels de botones por estado:
  - accepted → cuando seleccionado/guardado: "Confirmado" (pasado). Cuando no seleccionado: "Confirmar".
  - declined → cuando seleccionado/guardado: "Rechazado" (pasado). Cuando no seleccionado: "Rechazar".
  - unknown → "Pendiente".
- Al guardar un cambio de estatus (individual o masivo) mostrar un toast (react-hot-toast):
  - Éxito: mensaje breve ("Confirmado", "Rechazado", "Pendiente" / en masivo: "N Confirmados"/"N Rechazados").
  - Error: revertir estado (ya existe en el componente) y mostrar toast de error.
- Mantener contrato de datos: GuestStatus = "unknown" | "accepted" | "declined" en FE/BE.
- Usar `react-hot-toast` con Toaster montado en el componente.

No fuera de alcance: cambios de backend distintos al PATCH existente; estilos globales.
