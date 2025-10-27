# Tasks — ITINERARY-BUTTONS-SIZE

Issue: "quiero que los 3 botnoes de itinerario sean del mismo tamaño"

1. Revisar estándares en ./junie/development-standards.md. [impacto: proceso] ✓
2. Analizar componentes implicados: Itinerary.tsx, CustomBtn.tsx, CalendarAddButton.tsx. [impacto: frontend] ✓
3. Identificar causa: `CustomBtn` envuelve en `inline-block` (Wrapper), por lo que `flex-1` en el botón no afecta el ancho del ítem flex; `CalendarAddButton` no usaba ese wrapper y tenía clases directas. [impacto: frontend] ✓
4. Implementar solución mínima sin tocar APIs compartidas: 
   - En `Itinerary.tsx`, envolver cada botón (Google Maps, Waze, Añadir al calendario) en un `<div class="flex-1 min-w-0">` y poner `className="w-full"` en cada botón interno para que los 3 ocupen el mismo ancho dentro del contenedor flex. [impacto: frontend] ✓
5. Validar en layouts: 
   - Mobile (columna): ocupan 100% cada uno; espaciado consistente por `gap`. 
   - sm+ (fila): los 3 comparten el ancho equitativamente. [impacto: tests/manual] *
6. Documentar resultado y dejar nota: se evitó modificar `CustomBtn` y `CalendarAddButton` para mantener cambios mínimos y no afectar otros usos. [impacto: doc] ✓

Notas:
- No se introducen dependencias ni cambios de API globales.
- Mantiene estilos (variant="outline", size="md") coherentes con la guía visual.
