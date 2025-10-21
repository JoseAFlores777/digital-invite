# Tareas — ICS-BUTTON-EXTRACT

Estado de estándares: No existe ./junie/development-standards.md en el repo; se siguieron patrones del proyecto (Next.js App Router, TypeScript, Tailwind, Iconify/inline SVG). Si se agregan estándares, revisar y alinear.

1. Crear componente reutilizable `CalendarAddButton` con lógica de generación ICS (props: date, startTime, endTime, timezone, title/coupleName, location o venue+address, waze/google links, uidPrefix, confirmUrl, fileName, className, disabled, children). [impacto: frontend/UI/TS] — done
2. Reemplazar botón de “Añadir al calendario” en `Itinerary.tsx` por `CalendarAddButton`; eliminar funciones duplicadas (normalizeTz, icsEscape, handleDownloadIcs). [impacto: frontend/refactor] — done
3. Reemplazar botón en `SolicitudManager.tsx` por `CalendarAddButton`; eliminar funciones duplicadas y pasar `confirmUrl` y `uidPrefix`. Mantener estilos y disabled. [impacto: frontend/refactor] — done
4. Validación manual conceptual: props correctas, estilos preservados, comportamiento responsive intacto y descargas .ics correctas. [impacto: QA] — done

Notas:
- `CalendarAddButton` acepta `children` para mantener los íconos y textos propios de cada contexto.
- `confirmUrl` se pasa desde `SolicitudManager` usando `window.location.origin` cuando está disponible.
- No se añadieron dependencias nuevas; se respetaron estilos existentes.
