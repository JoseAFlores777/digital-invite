# Tareas — Mejora estética del modal (MODAL-UX)

Fecha: 2025-10-05

Resumen del alcance:
- Migrar modales a `react-modal`.
- Quitar botones de “confirmar todos” y “rechazar todos”.
- Agregar botón de cierre claro.
- Evitar scroll por detrás del modal.
- Mejorar interacción de botones y usar colores pálidos.

Tareas
1. Agregar dependencia `react-modal` en package.json. [impacto: frontend] — done ✓
2. Refactor `src/components/RSVPModal.tsx` a `react-modal` con overlay y content class de paleta pálida; botón de cierre; onRequestClose; evitar scroll de fondo. [impacto: frontend] — done ✓
3. Refactor `src/components/SolicitudManager.tsx` en modo `asModal` para usar `react-modal`, añadir botón de cierre, y eliminar botones masivos “Asistiré/No asistiré”. [impacto: frontend] — done ✓
4. Suavizar estilos de botones por invitado (paleta dusty, hover/active sutil). [impacto: frontend] — done ✓
5. Verificar wiring en `src/app/page.tsx` y `src/components/RSVP.tsx`. [impacto: frontend] — done ✓

Notas:
- `react-modal` maneja `aria-hidden` y bloqueo de scroll al abrir. Se usa `Modal.setAppElement('#__next')` por accesibilidad.
- Se mantuvieron utilidades globales de Tailwind y paleta “dusty” ya definida en globals.css.
- No se introdujeron dependencias adicionales.
