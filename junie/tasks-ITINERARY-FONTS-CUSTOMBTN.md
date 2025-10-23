# Tareas — ITINERARY-FONTS-CUSTOMBTN

Contexto: Ajustar el tamaño de tipografías dentro del card de <Itinerary/> para que sea consistente con el resto de secciones y migrar los botones a `CustomBtn` cuando aplique.

Estado de estándares: No existe ./junie/development-standards.md en el repo; se respetan patrones del proyecto (Next.js + TS, TailwindCSS, componentes reutilizables como `CustomBtn`).

## Tareas
1. Revisar `Itinerary.tsx` y localizar textos/botones que requieren ajuste. [impacto: frontend] — done
2. Reducir jerarquía tipográfica dentro del card:
   - Título del evento: `text-xl md:text-2xl` (antes `text-2xl`). [impacto: frontend] — done
   - Hora: `text-sm` y compactar márgenes. [impacto: frontend] — done
   - Descripción: mantener `text-sm` y ajustar espaciados. [impacto: frontend] — done
   - Ubicación/dirección: `text-sm` / `text-xs` respectivamente. [impacto: frontend] — done
3. Reemplazar botones nativos por `CustomBtn` para acciones externas:
   - Google Maps → `CustomBtn` variant="outline" size="md". [impacto: frontend] — done
   - Waze → `CustomBtn` variant="outline" size="md". [impacto: frontend] — done
4. Alinear estilo del botón de “Añadir al calendario” a la guía visual de `CustomBtn md/outline` usando clases equivalentes en `CalendarAddButton` (sin refactor interno). [impacto: frontend] — done
5. Validación rápida de tipos/props y consistencia visual comparando con `SharedAlbum`. [impacto: frontend] — done

## Notas
- Se evitó modificar `CalendarAddButton` internamente para mantener cambios mínimos; se ajustaron únicamente `className` e icon/label scale en su uso.
- No se introdujeron dependencias nuevas ni cambios de comportamiento.
