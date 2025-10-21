# Requisitos — GIFTS-PAGE

Objetivo: Crear una página independiente en ROOT-PATH/gifts que muestre únicamente el componente `Gift` con datos precargados, asegurando que siempre exista el parámetro `wedding_id`.

Alcance:
- Next.js App Router.
- Ruta: `/gifts`.
- Debe renderizar el componente `Gift` existente.
- Asegurar que la URL siempre incluya `?wedding_id=...` (usar env `NEXT_PUBLIC_WEDDING_ID` o `DIRECTUS_WEDDING_ID` como respaldo si no viene en la URL).
- No introducir dependencias externas.

Criterios de aceptación:
- Navegar a `/gifts?wedding_id=ABC` carga el componente `Gift` y este consume `/api/gift-options?wedding_id=ABC`.
- Navegar a `/gifts` sin query debe redirigir a `/gifts?wedding_id=<ENV>` si existe valor en env.
- Página compila y respeta estilos/base del layout.
