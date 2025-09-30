# Requisitos (Ticket 0002)

Objetivo: Corregir el comportamiento de scroll del componente PhotoMasonry.

Contexto:
- Actualmente el scroll horizontal se comporta de forma errónea: el contenedor no genera el ancho esperado, el pinning se aplica sobre el mismo elemento que se transforma y el cálculo de la distancia usa `window.innerWidth` en lugar del ancho real del contenedor.

Alcance del fix:
- Separar contenedor "pin" y pista "track" para animar únicamente el track.
- Calcular la distancia con `track.scrollWidth - wrapper.clientWidth`.
- Ajustar CSS Grid para producir ancho horizontal real usando `grid-auto-flow: column` y `grid-auto-columns: <cell>px`.
- Añadir `ResizeObserver`, listeners de `resize/orientationchange` y refresco tras carga de imágenes.
- Respetar `prefers-reduced-motion`.

Criterios de aceptación:
- La sección se fija (pin) y, al hacer scroll vertical, el grid se desplaza horizontalmente de forma suave.
- Sin saltos ni jank al redimensionar o tras cargar imágenes.
- Si no hay overflow horizontal, no se crea la animación ni el pin, y la página sigue su scroll normal.
