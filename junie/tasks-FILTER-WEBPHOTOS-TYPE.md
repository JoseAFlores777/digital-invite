# Tareas: Filtrar web_photos por tipo en componentes

Estado de estándares: No existe ./junie/development-standards.md en el repo; se siguen patrones de Next.js + TypeScript usados en el proyecto.

1. PerspectiveZoom debe usar solo web_photos con type === "collage". [impacto: frontend] ✓
   - Aplicado filtro interno en InvitationContent.tsx antes de mapear a ZoomItemConfig.
2. Gallery debe usar solo web_photos con type === "gallery". [impacto: frontend] ✓
   - Aplicado filtro interno en Gallery.tsx antes de construir URLs.
3. Validación rápida de tipos/opcionales y estado vacío. [impacto: tests/manual] ✓
   - Comparación case-insensitive y null-safe.

Notas:
- No se introdujeron llamadas nuevas a la API; solo se filtran los datos ya obtenidos por cada flujo.
- Mantiene compatibilidad si algunos items no incluyen el campo `type`.
