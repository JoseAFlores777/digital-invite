# Requisitos — Evitar mismatch de hidratación en /solicitud (HYDRATION-SOLICITUD)

Fecha: 2025-10-06

Contexto:
- Se observó el error de React/Next: "Hydration failed because the server rendered HTML didn't match the client" en la ruta `/solicitud`.
- En SSR se renderizaba un `<main>` de "falta identificador", mientras que en el cliente se montaba `<SolicitudManager>` y su skeleton (`<div class="min-h-[60vh]"></div>`), cambiando el árbol.
- Causa raíz: el componente de página leía `window.location.search` (indisponible/variable en SSR), en lugar de usar `searchParams` de Next.js App Router.

Objetivo:
- Asegurar que la página `/solicitud` renderice el mismo árbol en servidor y cliente, evitando leer `window` durante SSR.

Alcance:
- Convertir `src/app/solicitud/page.tsx` en Server Component (remover "use client").
- Extraer `solicitudId` desde `searchParams` (o `invitationID`) y pasarlo a `SolicitudManager` (Client Component) como prop.

Criterios de aceptación:
- No aparecen errores de hidratación al cargar `/solicitud?solicitudId=...`.
- Con y sin parámetro, el SSR y el cliente muestran el mismo layout inicial.
- No se altera la lógica del modal ni el resto del sitio.

Fuera de alcance:
- Cambios en `SolicitudManager` (salvo los existentes).
- Refactor de estilos fuera de la página.
