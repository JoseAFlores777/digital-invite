# Tareas — ITINERARY-BUTTONS

Estado de estándares: No existe ./junie/development-standards.md en el repo; se siguen patrones del proyecto (Next.js, TypeScript, Tailwind, Iconify, GSAP hook). Sin nuevas dependencias.

1. Analizar requerimiento: mover tres acciones al footer del card y unificar estilo al de “Añadir al calendario”. [impacto: frontend/UI] — done
2. Refactor en Itinerary.tsx:
   - Reemplazar grid de 2 botones por footer con 3 botones (Google Maps, Waze, Calendario). [impacto: frontend] — done
   - Usar layout responsive: flex-col en móvil; flex-row con justify-between en sm+. [impacto: frontend/responsive] — done
   - Igualar estilo a calendario: `inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg border border-neutral-300 bg-white hover:bg-neutral-50 text-sm`. [impacto: frontend/estilos] — done
   - Hacer que cada botón sea flex-1 min-w-0 para anchura equitativa. [impacto: frontend/responsive] — done
3. Eliminar botón global de “Añadir al calendario” debajo del grid. [impacto: frontend] — done
4. Mantener animación GSAP y estilos del proyecto. [impacto: frontend] — done
5. Validación manual: JSX y handlers correctos; condicional para mostrar botones de mapas solo si hay enlaces. [impacto: QA] — done

Notas:
- Se usaron íconos `solar:map-point-bold`, `mdi:waze` y `solar:calendar-bold`.
- Si falta algún enlace (Waze/Google), el botón correspondiente no se renderiza; el layout sigue equilibrado por `flex-1` y `gap`.
