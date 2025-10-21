# Tareas — ITINERARY-GENERALIDADES

Estado de estándares: No existe ./junie/development-standards.md en el repo; se siguieron patrones del proyecto (Next.js App Router, TypeScript, Tailwind, Iconify, hooks gsap). Si se agregan estándares, revisar y alinear.

1. Analizar requerimiento: usar `location` del endpoint de generalidades para "Cómo llegar" (Google/Waze) y agregar botón "Añadir al calendario" debajo del Itinerario. [impacto: frontend] — done
2. Revisar `fetchWeddingGeneralities` y ejemplo en `SolicitudManager` (manejo de waze_link, google_maps_link e ICS). [impacto: frontend] — done
3. `Itinerary.tsx`: agregar estado y `useEffect` para cargar generalidades (venue_name, address, waze_link, google_maps_link, date, start_time, end_time, timezone, couple). [impacto: frontend] — done
4. Reemplazar URL fija por botones:
   - Mostrar botón "Abrir en Google Maps" si `google_maps_link` existe. [impacto: frontend] — done
   - Mostrar botón "Manejar con Waze" si `waze_link` existe. [impacto: frontend] — done
5. Construir rango de hora a partir de `start_time` y `end_time` con formato 12h es-ES. [impacto: frontend] — done
6. Agregar botón global debajo del grid: "Añadir al calendario" reutilizando la lógica ICS de `SolicitudManager` (normalización TZ, escape, DESCRIPTION con Waze/Maps). [impacto: frontend] — done
7. Mantener animación GSAP `[data-anim="card"]` y estilos (display-font, paleta dusty). [impacto: frontend] — done
8. Validación manual conceptual: sin dependencias nuevas; si no hay links, se ocultan botones; ICS incluye SUMMARY, DTSTART/DTEND con TZ cuando aplique, LOCATION y DESCRIPTION. [impacto: QA] — done

Notas:
- Si en el futuro se requiere weddingId específico, `fetchWeddingGeneralities("")` puede cambiarse para pasar el id.
- No se agregaron comentarios en código salvo lo imprescindible (se evitó añadir).