# Requerimientos — SOLICITUDES-ADMIN-UX

Objetivo: Ajustes de UI/UX para las vistas AdminInvitationsList y SolicitudManager.

Alcance:
- Color activo de tabs: azul (consistente con botón de Pendiente).
- AdminInvitationsList:
  - Tabs con chips de conteo según lista filtrada (búsqueda y grupo).
  - En cada ítem: mostrar estado en español con chip de color y contadores de RSVP (confirmados, rechazados, pendientes).
- SolicitudManager:
  - Distribución de buscador/acciones en grid similar a Admin (3 columnas; buscador ocupa 2 cols en md+).
  - Tabs de filtro (Todos/Pendientes/Confirmados/Rechazados) debajo del grid, activo en azul.
  - Mostrar fecha y lugar en disposición en fila (row) bajo el título.
  - Formatear fecha/hora: "13 de diciembre del 2025 a las 3:00 p. m.".
  - Botón para descargar un archivo .ics (añadir al calendario) con duración por defecto.

Fuentes de datos:
- Sin nuevos endpoints. Se reutiliza:
  - /api/wedding-invitations
  - /api/invitation-by-id
  - /api/digital-guests
  - /api/wedding-generalities

Criterios de aceptación:
- Tabs activos en ambas vistas se ven azules.
- Admin: tabs muestran cantidad; cada fila muestra chip de estado traducido y contadores RSVP.
- SolicitudManager: fecha/lugar en fila; formato de fecha/hora correcto; botón descarga .ics funcional.
- El grid de buscador/acciones en SolicitudManager replica el de Admin a nivel de distribución.

No objetivos:
- Cambios de backend.
- Soporte de zonas horarias avanzadas en ICS.

Notas:
- Mantener consistencia con estilos existentes (bordes, radios, sombras, colores Tailwind).