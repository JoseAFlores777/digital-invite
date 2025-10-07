# Tasks — SCROLL-ADMIN-LIST

1. Revisar `junie/development-standards.md` y componentes afectados (AdminInvitationsList, AdminCharts). [impacto: documentación] ✓
2. Definir solución mínima: scroll interno del listado (max-height + overflow-y-auto) sin alterar header/filtros/gráficas. [impacto: frontend] ✓
3. Implementar en `src/components/AdminInvitationsList.tsx` añadiendo clases Tailwind al contenedor de ítems. [impacto: frontend] ✓
4. Validación manual en `/solicitudes-admin`: comprobar scroll interno, responsive y acciones/menús. [impacto: tests] *

Observaciones:
- Sin cambios en endpoints ni tipos.
- Mantener consistencia de estilos y arquitectura existente.
