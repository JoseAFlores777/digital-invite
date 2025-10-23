# Tareas — ITINERARY-BUTTONS-FULLWIDTH

Contexto: Los botones del Itinerary deben cubrir todo el ancho disponible.

Estado de estándares: No existe ./junie/development-standards.md en el repo; se respetan patrones del proyecto (Next.js + TS, TailwindCSS, reutilización de `CustomBtn`).

## Tareas
1. Revisar layout de botones en `Itinerary.tsx` y classes responsivas. [impacto: frontend] — done
2. Ajustar contenedor de acciones para no encoger botones:
   - Remover `sm:justify-between`.
   - Usar `sm:items-stretch` para alturas consistentes. [impacto: frontend] — done
3. Asegurar ancho completo en cada acción:
   - Google Maps: `className="flex-1 min-w-0 w-full"`. [impacto: frontend] — done
   - Waze: `className="flex-1 min-w-0 w-full"`. [impacto: frontend] — done
   - CalendarAddButton: `className="flex-1 min-w-0 w-full ..."` (remover `sm:w-auto`). [impacto: frontend] — done
4. Validación responsiva manual (mobile, sm+): botones ocupan 100% del ancho disponible; en sm+ se distribuyen equitativamente con `flex-1`. [impacto: tests/manual] — done

## Notas
- Cambios mínimos, sin dependencias nuevas.
- Se mantuvieron estilos de `CustomBtn` y del botón de calendario para consistencia visual.
- Si se requiere que todos los botones tengan la misma altura en sm+, `sm:items-stretch` en el contenedor ya lo cubre.