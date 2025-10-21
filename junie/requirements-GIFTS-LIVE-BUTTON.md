# Requisitos — GIFTS-LIVE-BUTTON

Objetivo: En la página independiente `/gifts`, colocar un botón para "ver transmisión" arriba del componente `<Gift />`.

Alcance:
- Reutilizar el componente `LiveStreamButton` ya existente.
- Obtener la URL de transmisión (`live_url`) desde `fetchWeddingGeneralities`.
- Renderizar el botón únicamente si existe `live_url`.
- Mantener la redirección para `wedding_id` existente en la página `/gifts`.
- No agregar dependencias externas.

Criterios de aceptación:
- Al navegar a `/gifts?wedding_id=XYZ` y si `live_url` está definido en Directus, se muestra un botón centrado arriba de `<Gift />` que abre la transmisión en una nueva pestaña.
- Si no hay `live_url`, el botón no se muestra y el resto de la página funciona normalmente.
- No se rompe el flujo de carga de `Gift` ni el aseguramiento del `wedding_id` en la URL.
