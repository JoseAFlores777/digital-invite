# Requisitos — Bloqueo de scroll y modal unificado (SCROLL-LOCK-MODAL)

Fecha: 2025-10-05

Objetivo:
- El modal debe ser el mismo card/div de SolicitudManager.
- El botón de cierre debe estar dentro del modal.
- Debe bloquear el scroll del contenido de atrás y evitar desplazamientos involuntarios al abrir.

Alcance:
- Usar el componente existente `SolicitudManager` en modo `asModal` para renderizar el mismo card dentro de un overlay.
- Asegurar el bloqueo de scroll de fondo con `react-modal`.
- Mantener estilos actuales y UX de selección.

Criterios de aceptación:
- El mismo contenido (card) se renderiza tanto embebido como en modal.
- Botón de cierre visible dentro del modal.
- No se puede hacer scroll en el body al abrir el modal; no hay salto o desplazamiento indeseado al abrir.
- El contenido del modal es scrollable de ser necesario.

Fuera de alcance:
- Cambios en APIs.
- Eliminación de archivos no utilizados (p. ej., RSVPModal) a menos que lo soliciten.
