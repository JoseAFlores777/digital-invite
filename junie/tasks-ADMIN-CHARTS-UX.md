# Tasks — ADMIN-CHARTS-UX

1. Revisar `junie/development-standards.md` y contexto previo de ADMIN-CHARTS. [impacto: proceso]
   - Hallazgo: No existe `development-standards.md`; se siguen patrones del repo (Next.js + TS, Tailwind). ✓
2. Quitar gráfico de "Tendencia de creación" del componente de gráficas. [impacto: frontend] ✓
3. Envolver todas las gráficas en un único card colapsable, contraído por defecto. [impacto: frontend] ✓
4. Agregar métricas tipo "confirmados/total", pendientes, rechazados, total de invitaciones. [impacto: frontend] ✓
5. Mejorar gráfico "Invitados por grupo":
   - Reducir tamaño de labels. ✓
   - Truncar con ellipsis y mostrar nombre completo en tooltip. ✓
   - Ocultar labels si hay demasiadas categorías. ✓
6. Integrar el card encima del listado en `/solicitudes-admin` (mantener posición y espaciado). [impacto: frontend] ✓
7. Validación manual en entorno local: abrir/cerrar card, revisar métricas y comportamiento de labels/tooltip, confirmar eliminación de tendencia. [impacto: tests] *
8. Documentar cambios en `junie/requirements-ADMIN-CHARTS-UX.md` y actualizar este archivo con el progreso. [impacto: documentación] ✓
