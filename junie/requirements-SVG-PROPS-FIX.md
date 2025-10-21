# Requisitos — SVG-PROPS-FIX

Objetivo: Eliminar el error de consola "Invalid DOM property `fill-opacity`. Did you mean `fillOpacity`?" causado por atributos SVG no compatibles con JSX/React.

Alcance:
- Componente afectado: `WeddingHeader` al renderizar `WeddingLogoSVG` (inline SVG).
- Solución mínima: dejar de renderizar el SVG inline problemático y mostrar únicamente el asset público `public/wedding-Logo.svg` mediante `next/image`, manteniendo apariencia.
- No agregar dependencias externas ni modificar la lógica de datos.

Criterios de aceptación:
- Navegar a `/gifts` ya no muestra el error de consola relacionado a `fill-opacity`.
- El logo sigue visible en el header con el mismo look & feel.
- No se rompen otras funcionalidades en la página `/gifts` (botón de transmisión, lista de regalos, etc.).
