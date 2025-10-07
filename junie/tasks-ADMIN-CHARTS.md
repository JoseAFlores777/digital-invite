# Tasks — ADMIN-CHARTS

1. Revisar `junie/development-standards.md` y requerimientos existentes de SOLICITUDES-ADMIN. [impacto: documentación] ✓
2. Analizar datos disponibles en `AdminInvitationsList` y endpoints relacionados para métricas. [impacto: frontend] ✓
3. Agregar dependencia `recharts` en package.json. [impacto: build] ✓
4. Implementar componente `AdminCharts` con:
   - Pie por estado de invitación. [impacto: frontend] ✓
   - Barras por invitados/grupo. [impacto: frontend] ✓
   - Área para tendencia (created_at o buckets). [impacto: frontend] ✓
5. Integrar `AdminCharts` en `AdminInvitationsList` usando dataset filtrado y grupos. [impacto: frontend] ✓
6. Validación manual: cargar `/solicitudes-admin`, verificar charts y reacción a filtros. [impacto: tests] *
7. Documentar alcance en `junie/requirements-ADMIN-CHARTS.md`. [impacto: documentación] ✓

Observaciones:
- No se modifican endpoints ni tipos. Se respeta UI existente.
- Mantener este archivo como referencia de progreso; marcar 6 como done tras validación en entorno local.
