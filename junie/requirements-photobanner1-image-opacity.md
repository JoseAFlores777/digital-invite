# Requisitos — PhotoBanner1: opacidad de la imagen

Contexto: Se solicita "agrega otra prop para asignar la opacidad de la imagen" en el componente `PhotoBanner1`.

Alcance:
- Agregar una prop opcional al componente `PhotoBanner1` que permita controlar la opacidad de la imagen base.
- Debe ser retro-compatible (no romper usos actuales).
- No agregar dependencias externas.

Criterios de aceptación:
- El componente acepta una prop opcional `imageOpacity?: number` (rango sugerido 0–1).
- Si `imageOpacity` está definida, se aplica como `style.opacity` sobre la imagen `<Image>` de `next/image`.
- Si no se define, el valor por defecto es `undefined` y el comportamiento visual permanece igual.
- Debe convivir correctamente con la prop existente `imageFilter` y con el `transformOrigin` del zoom.

Ejemplos de uso:
- `<PhotoBanner1 src="/images/foto.jpg" imageOpacity={0.6} />`
- `<PhotoBanner1 src="/images/foto.jpg" imageFilter="grayscale(100%)" imageOpacity={0.75} />`

Notas:
- Mantener la API simple y consistente con props existentes.
- Tipado en TypeScript para guiar el uso correcto (0–1).
