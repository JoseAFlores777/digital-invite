# Tareas — Evitar salto del fondo al abrir modal (NO-JUMP-MODAL)

Fecha: 2025-10-05

Resumen del alcance:
- Prevenir el “salto” del layout al abrir el modal de SolicitudManager compensando el ancho de la barra de scroll.

Tareas
1. Revisar estándares en `./junie/development-standards.md` y contexto MCP. [impacto: procesos] — no existe archivo, se siguen convenciones del proyecto ✓
2. Auditar configuración actual del modal (`preventScroll`, `bodyOpenClassName`). [impacto: frontend] ✓
3. Implementar `onAfterOpen` para calcular `scrollBarWidth = window.innerWidth - document.documentElement.clientWidth` y aplicar `document.body.style.paddingRight`. [impacto: frontend] — done ✓
4. Extender `onAfterClose` para limpiar `paddingRight` además de `overflow`/clases. [impacto: frontend] — done ✓
5. Validación manual: abrir/cerrar desde botón RSVP; verificar que no hay salto y que el scroll se restaura correctamente. [impacto: QA] — pendiente 

Notas:
- Cambio mínimo y localizado en `SolicitudManager` modo `asModal`.
- Sin nuevas dependencias.
