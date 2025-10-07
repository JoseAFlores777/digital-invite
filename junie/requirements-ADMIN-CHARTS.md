# Requerimientos — ADMIN-CHARTS

Objetivo: Agregar panel de gráficas a la página de administración de solicitudes (`/solicitudes-admin`) usando Recharts y la data existente (invitaciones y grupos).

Alcance:
- Mostrar métricas visuales sin romper los filtros/UX existentes.
- Gráficas iniciales:
  - Pie por estado de invitación (draft, sent, bounced, accepted_all, accepted_partial, declined_all).
  - Barras de cantidad de invitados por grupo (usando grupos de Directus o derivado de data en invitaciones).
  - Tendencia temporal de creación si existe `created_at` (sino, buckets secuenciales como fallback).
- Las gráficas deben reaccionar a los filtros actuales (búsqueda, grupo, estado) mostrando el dataset filtrado.
- Mantener la UI ligera, responsive y consistente con estilos existentes.

Dependencias:
- `recharts` (añadida a package.json).

Criterios de aceptación:
- Navegar a `/solicitudes-admin` con acceso autorizado muestra un bloque de gráficas encima del listado.
- Al cambiar filtros, la data de las gráficas se actualiza acorde.
- La página compila sin errores y no se modifican endpoints ni contratos.

Notas:
- Se evita añadir comentarios en código salvo necesidad. Estilos con clases utilitarias existentes.
- Sin dependencias externas adicionales.
