# Tareas — Bloqueo de scroll y modal unificado (SCROLL-LOCK-MODAL)

Fecha: 2025-10-05

Resumen del alcance:
- Reusar el mismo card/div de `SolicitudManager` dentro del modal.
- Mantener el botón de cierre dentro del modal.
- Bloquear scroll del contenido detrás y evitar desplazamiento involuntario al abrir.

Tareas
1. Verificar estado actual del modal de `SolicitudManager` (asModal) y botón de cierre interno. [impacto: frontend] — done ✓
2. Activar bloqueo de scroll en `react-modal` usando `preventScroll`. [impacto: frontend] — done ✓
3. Añadir `bodyOpenClassName="overflow-hidden"` para reforzar el bloqueo de scroll en el `<body>`. [impacto: frontend] — done ✓
4. Evitar scroll chaining en el contenido del modal con `overscroll-contain` en el contenedor scrollable. [impacto: frontend] — done ✓
5. Validación manual: abrir/cerrar desde botón RSVP, verificar que el body no hace scroll, que no hay salto al abrir, y que el contenido interno sí puede desplazarse. [impacto: QA] — pendiente 

Notas:
- Se mantiene `ariaHideApp={false}` para evitar problemas con SSR/hidratación.
- El mismo card se renderiza dentro y fuera del modal, cumpliendo con el requerimiento.
