# Requisitos — Evitar desplazamiento de fondo al abrir modal (NO-JUMP-MODAL)

Fecha: 2025-10-05

Objetivo:
- Al abrir el modal de SolicitudManager, el contenido de fondo no debe moverse ni “saltar” hacia abajo.

Contexto:
- Actualmente se usa `react-modal` con `preventScroll` y `bodyOpenClassName="overflow-hidden"`.
- El bloqueo del scroll del `<body>` elimina la barra de desplazamiento vertical, lo que provoca reflow y “salto” del layout.

Criterios de aceptación:
- Abrir el modal no debe generar ningún salto/desplazamiento visible en el contenido de atrás.
- El scroll de fondo queda bloqueado mientras el modal está abierto.
- Al cerrar el modal, se restaura el estado del `<body>` sin estilos residuales.

Alcance:
- Añadir compensación del ancho de la barra de scroll (padding-right en `<body>`) al abrir; retirar al cerrar.
- Mantener el resto de la configuración del modal y estilos actuales.

Fuera de alcance:
- Cambios en APIs o lógica de negocio.
- Refactor amplio de estilos fuera de SolicitudManager en modo modal.
