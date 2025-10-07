# Requerimientos — SCROLL-ADMIN-LIST

Objetivo: Hacer que el listado (tabla) de solicitudes en `/solicitudes-admin` tenga scroll interno, de modo que el encabezado, filtros y gráficas permanezcan fijos mientras se navega por los ítems.

Alcance:
- Aplicar un contenedor con altura máxima y `overflow-y: auto` sobre el listado de invitaciones.
- Mantener estilos, bordes y UX actuales.
- No modificar endpoints ni contratos de datos.

Criterios de aceptación:
- Al acceder a `/solicitudes-admin`, el listado de invitaciones hace scroll dentro del card, sin mover el header/filtros/gráficas.
- La interacción (filtros, acciones, menús, modales) sigue funcionando sin cambios.
- La UI se mantiene responsiva en móvil y escritorio.

Notas:
- Implementación mínima usando clases utilitarias (Tailwind) según estándares del proyecto.
