# Tareas – GALLERY-USE-WEDDING-DATA

Estado de estándares: No existe ./junie/development-standards.md en el repo; se siguen patrones del repo (Next.js App Router, TS, Tailwind, componentes client/server) y consistencia con código existente.

1. Analizar requerimiento y alcance: “En Gallery ya no hay necesidad de traer info de la API; ya viene en useWeddingData”. [impacto: proceso] – done
2. Revisar componente Gallery.tsx para detectar llamadas a API o dependencias no necesarias. [impacto: frontend] – done
3. Eliminar fallback a rutas de API internas (/api/directus/assets/...) para construir URLs; usar únicamente directus_url de useWeddingData o NEXT_PUBLIC_DIRECTUS_URL. [impacto: frontend] – done
4. Asegurar que se use web_photos del estado (wg.wedding.web_photos o wg.web_photos) y que se filtre por type === "gallery". [impacto: frontend] – done
5. Remover logs de depuración residuales (console.log). [impacto: frontend] – done
6. Validar que, si no hay baseUrl, el componente falle de manera segura (renderiza vacío) sin llamadas a API. [impacto: frontend] – done
7. Revisión rápida de otros componentes relacionados para consistencia (sin cambios funcionales). [impacto: frontend] – pending

Notas:
- No se introdujeron dependencias nuevas.
- No aplica cambio de backend; el store sigue resolviendo datos de manera general.
- El componente aún mide tamaños naturales cargando las imágenes (necesario para PhotoSwipe), lo cual no implica consulta de metadatos a la API.
