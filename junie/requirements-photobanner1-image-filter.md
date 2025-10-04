# Requisitos — PhotoBanner1: filtro de color/tono en la imagen

Contexto: Se solicita "agrega una prop a PhotoBanner1 para añadirle color a la imagen como por ejemplo un grayscale".

Alcance:
- Agregar una prop opcional al componente `PhotoBanner1` que permita aplicar un filtro de color/tono a la imagen base.
- Debe admitir valores de CSS `filter` (p. ej.: `grayscale(100%)`, `sepia(40%) contrast(1.05)`, `saturate(120%)`), sin limitarse a un solo efecto.
- No debe romper usos actuales del componente (compatibilidad hacia atrás).

Criterios de aceptación:
- El componente acepta una prop opcional `imageFilter?: string`.
- Si `imageFilter` está definida, se aplica como `style.filter` sobre la imagen de `Next/Image` en `PhotoBanner1`.
- Si no se define, el componente se comporta como antes, sin cambios visuales.
- La prop funciona con ejemplos comunes: `grayscale(100%)`, `sepia(60%)`, `contrast(1.1) brightness(0.95)`.

Notas:
- Mantener la API mínima y clara, alineada con las props ya existentes.
- No introducir dependencias externas.
