# Requisitos — Unificar modal con SolicitudManager (RSVP-UNIFY-MODAL)

Fecha: 2025-10-05

Objetivo:
- El modal debe ser el mismo componente "SolicitudManager".
- Debe poder ubicarse como card dentro del flujo o como modal, controlado por prop.
- Mejorar el estilo de los botones para que la selección sea claramente visible.

Alcance:
- Mantener un solo componente de UI (SolicitudManager) para la gestión RSVP.
- Exposición mediante prop (asModal) para renderizado en card (in-flow) o modal (overlay).
- Mejorar estilos y accesibilidad de botones (aria-pressed, contraste)
- Asegurar robustez de `react-modal` (setAppElement seguro con fallback a body).

Fuera de alcance:
- Cambios en API o lógica de negocio más allá del estado visual/UX y robustez del modal.

Criterios de aceptación:
- En page.tsx se ve el card en la sección administrativa y se abre el mismo componente como modal al presionar el CTA.
- Selección de estado por invitado claramente distinguible (realce visual)
- Sin errores de runtime relacionados a `react-modal`.
