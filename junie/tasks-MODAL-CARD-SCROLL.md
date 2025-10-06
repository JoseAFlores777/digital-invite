# Tareas — Modal: scroll al cerrar y evitar card sobre card (MODAL-CARD-SCROLL)

Fecha: 2025-10-05

Objetivo:
- Asegurar que el scroll del body se re-habilite al cerrar el modal.
- Evitar la apariencia de "card sobre card" cuando `SolicitudManager` se muestra como modal.

Tareas
1. Revisar implementación actual en `SolicitudManager` (modo `asModal`) y detectar fuentes de lock de scroll. [impacto: frontend] — done ✓
2. Añadir `onAfterClose` al `react-modal` para limpiar `overflow-hidden` del `body` y cualquier estilo residual de overflow. [impacto: frontend] — done ✓
3. Condicionar el contenedor principal del `card` para que, en `asModal`, no tenga `shadow`, `border`, `bg` ni `rounded` (evitar doble card). [impacto: frontend] — done ✓
4. Validación manual: abrir/cerrar modal varias veces y confirmar que el scroll del fondo se bloquea al abrir y se habilita al cerrar; verificar apariencia sin doble card. [impacto: QA]

Notas
- Se mantiene `preventScroll` y `bodyOpenClassName="overflow-hidden"` durante el open; `onAfterClose` garantiza limpieza en casos límite.
- Cambios mínimos, sin impacto en lógica de datos.