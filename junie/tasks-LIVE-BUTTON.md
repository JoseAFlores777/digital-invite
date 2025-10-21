# Tareas — LIVE-BUTTON

Estado de estándares: No existe ./junie/development-standards.md en el repo; se siguieron patrones del proyecto (Next.js App Router, TypeScript, Tailwind, Iconify, GSAP hook). Si se agregan estándares, alinear en iteraciones futuras.

1. Crear componente reutilizable `LiveStreamButton` que abra `live_url` en una pestaña nueva. [impacto: frontend/UI/TS] — done
2. Integrar `LiveStreamButton` en `Itinerary.tsx` (footer del card):
   - Cargar `live_url` desde wedding-generalities. [impacto: datos] — done
   - Render condicional con mismo estilo que el botón de calendario (clases Tailwind). [impacto: UI/responsive] — done
3. Integrar `LiveStreamButton` en `SolicitudManager.tsx` (toolbar):
   - Guardar `live_url` al cargar generalidades. [impacto: datos] — done
   - Render condicional junto a “Añadir al calendario” con estilo unificado. [impacto: UI] — done
4. Validación manual conceptual: sin dependencias nuevas; diseño consistente; accesible (title, disabled si falta URL); responsive intacto. [impacto: QA] — done

Notas:
- El badge "En vivo" usa `animate-pulse` y fondo rojo para simular parpadeo.
- Se usa Iconify (`mdi:youtube`) para el ícono de YouTube.
- El botón acepta `children` para permitir personalizar el contenido en el futuro si se requiere.