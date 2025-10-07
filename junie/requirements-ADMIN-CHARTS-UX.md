# Requerimientos — ADMIN-CHARTS-UX

Objetivo: Ajustar el panel de gráficas en `/solicitudes-admin` según nuevas indicaciones.

Alcance:
- Quitar el gráfico de "Tendencia de creación".
- Reubicar todos los gráficos dentro de un único card arriba del listado principal.
- Hacer el card colapsable, contraído por defecto. Un botón permite mostrar/ocultar todas las gráficas.
- Agregar métricas resumidas en forma de cards: p. ej. "50/105 confirmados", además de pendientes, rechazados y total de invitaciones.
- Mejorar la gráfica "Invitados por grupo" para que los labels no se corten:
  - Reducir tamaño de fuente.
  - Truncar con ellipsis y mostrar nombre completo en tooltip.
  - Ocultar labels si hay demasiadas categorías.
- Mantener responsividad y estilo coherente con el sitio (clases utilitarias, sin dependencias nuevas).

Criterios de aceptación:
- En `/solicitudes-admin`, se visualiza un card "Gráficas" contraído inicialmente, con botón de abrir/cerrar.
- Al expandir, se muestran el pie de estatus y la barra de invitados por grupo.
- No existe la sección de "Tendencia de creación".
- Se ven métricas resumidas (confirmados/total, pendientes, rechazados, invitaciones) que reaccionan a filtros.
- Labels del gráfico por grupo no se cortan: truncado visible y tooltip con nombre completo.

Notas:
- No se modifican endpoints. Se usa la data existente en `AdminInvitationsList`.
- Se respeta el patrón de componentes client-only.
