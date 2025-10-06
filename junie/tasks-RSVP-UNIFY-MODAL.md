# Tareas — Unificar modal con SolicitudManager (RSVP-UNIFY-MODAL)

Fecha: 2025-10-05

Resumen del alcance:
- El modal debe ser el mismo `SolicitudManager`, renderizable como card (flujo) o modal por prop.
- Mejorar la visibilidad de la selección en botones de estado.

Tareas
1. Revisar estándares en `./junie/development-standards.md` y contexto MCP. [impacto: procesos] — done ✓
2. Documentar requisitos en `requirements-RSVP-UNIFY-MODAL.md`. [impacto: documentación] — done ✓
3. Fortalecer `setAppElement` en `SolicitudManager` con fallback seguro a `document.body`. [impacto: frontend] — done ✓
4. Mejorar estilos de botones de estado: añadir `aria-pressed`, `data-selected`, y realce visual (ring/border/shadow) cuando están seleccionados. [impacto: frontend] — done ✓
5. Verificar wiring: en `page.tsx` ya se usa `SolicitudManager` como card y como modal; evitar uso de `RSVPModal`. [impacto: frontend] — done ✓
6. Validación manual: abrir/cerrar modal; bloqueo de scroll; foco; selección evidente en botones. [impacto: QA] — pendiente 

Notas:
- Cambios pequeños y contenidos al componente; sin nuevas dependencias.
- Se mantiene `ariaHideApp={false}` en `react-modal` para evitar problemas con SSR/hidratación.
