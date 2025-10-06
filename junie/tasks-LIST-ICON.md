# Tareas — Ícono de conteo junto al título de “Lista de Invitados” (LIST-ICON)

Fecha: 2025-10-05

Objetivo:
- Mostrar el ícono/contador de invitados junto al título "Lista de Invitados" dentro de SolicitudManager.

Tareas
1. Revisar estándares en `./junie/development-standards.md` y contexto MCP. [impacto: procesos] — no existe archivo, se mantienen convenciones actuales ✓
2. Identificar el título y el badge de conteo en `SolicitudManager.tsx`. [impacto: frontend] ✓
3. Mover el `attendeesBadge` del encabezado derecho para colocarlo en línea con el título "Lista de Invitados". [impacto: frontend] ✓
4. Validación manual (pendiente): verificar que el badge se muestre a la par del título en desktop y mobile, sin duplicación en el encabezado. [impacto: QA]

Notas
- Cambio mínimo, sin tocar lógica de negocio.
- Mantiene estilos existentes del badge y tipografía.
