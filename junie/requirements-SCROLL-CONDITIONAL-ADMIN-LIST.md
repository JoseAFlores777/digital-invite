# Requerimientos — SCROLL-CONDITIONAL-ADMIN-LIST

Objetivo: El listado (tabla) de solicitudes en `/solicitudes-admin` debe evitar el scroll interno cuando la altura del contenedor del card completo sea menor a `100vh`. Solo se habilita el scroll interno cuando el contenedor supera o iguala la altura de la ventana.

Alcance:
- Medir la altura del contenedor principal (card) y compararla con `window.innerHeight`.
- Activar `max-h` + `overflow-y-auto` en el `<ul>` de ítems únicamente cuando el contenedor sea alto (≥ `100vh`).
- Mantener estilos, UX y funcionalidad previas (filtros, menús, modales, gráficas).

Criterios de aceptación:
- Si el contenedor del card < `100vh`, el listado no tiene scroll interno (se ve completo sin recorte).
- Si el contenedor del card ≥ `100vh`, el listado aplica `max-h` y `overflow-y-auto` para mantener fijo encabezado/filtros/gráficas.
- El comportamiento se adapta a cambios de tamaño de ventana y a la cantidad de datos (reactivo).

Notas:
- Implementación mínima con `useRef`, `useEffect` y clases Tailwind condicionales.
- Sin cambios en endpoints ni contratos.
- Se respeta la arquitectura y estilo del proyecto.
