# Requisitos 0014 — "No tiene scroll"

Problema reportado: La página con el banner de paneles apilados (PanelPinStack) no permite hacer scroll.

Hipótesis: El elemento fijado (pin) `.pin-trigger` estaba contenido dentro de un contenedor con `height: 100vh` y `overflow: hidden`, lo que impedía que ScrollTrigger pudiera insertar el espacio (pinSpacing) necesario en el flujo normal del documento.

Objetivo: Restablecer el scroll correcto sin alterar el efecto visual de paneles en capas.

Criterios de aceptación:
- La vista permite desplazar (scroll) hacia abajo durante el pin, revelando los paneles.
- El pin se mantiene estable con `scrub: true` y `pinSpacing: 'margin'`.
- No se observan saltos de layout al liberar el pin.
- La solución debe ser mínima y alineada al patrón existente.

Enfoque de solución:
- Mover `height: 100vh` y `overflow: hidden` desde `.container` hacia un elemento en flujo normal: `.pin-trigger`.
- Mantener `.container` como `position: relative` para servir de contexto de posicionamiento, pero sin restringir la expansión vertical generada por ScrollTrigger.
- Conservar la clase global `pin-trigger` (para selección en JS) y añadir una clase de módulo `s.pinTrigger` para estilos.
