# Requisitos — GIFTS-SEARCHPARAMS-FIX

Objetivo: Corregir el error de Next.js "searchParams should be awaited" en la ruta `/gifts`, asegurando el acceso asíncrono a `searchParams` antes de leer sus propiedades.

Alcance:
- Actualizar la página `src/app/gifts/page.tsx` para usar una función `async` y esperar `searchParams` cuando sea una Promesa (compatibilidad con Next 15).
- Mantener la lógica existente de redirección cuando falta `wedding_id` (usar `NEXT_PUBLIC_WEDDING_ID` o `DIRECTUS_WEDDING_ID`).
- No modificar otros componentes ni agregar dependencias externas.

Criterios de aceptación:
- Navegar a `/gifts?wedding_id=XYZ` funciona sin errores y no aparece el mensaje de Next.js sobre APIs dinámicas síncronas.
- Navegar a `/gifts` sin query redirige a `/gifts?wedding_id=<ENV>` si existe valor en env.
- La página sigue mostrando `WeddingHeader`, el botón de transmisión (si existe `live_url`) y el componente `Gift` correctamente.
