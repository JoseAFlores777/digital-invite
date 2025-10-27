# Tasks — ITINERARY-BUTTONS-FULLROW

Issue: "pero que abarque el row full-width" (Itinerario: los 3 botones deben ocupar el ancho completo de su fila)

1. Revisar estándares en ./junie/development-standards.md y contexto de UI previo. [impacto: proceso] ✓
2. Analizar el layout actual de Itinerary y la implementación de CustomBtn (Wrapper inline-block). [impacto: frontend] ✓
3. Diseñar cambio mínimo y compatible: agregar prop opcional `fullWidth` a CustomBtn para permitir que el wrapper sea `block w-full` y que el control interno use `w-full`. [impacto: frontend] ✓
4. Implementar `fullWidth` en CustomBtn sin romper API existente (default false). [impacto: frontend] ✓
5. Actualizar `Itinerary.tsx` para pasar `fullWidth` a los botones de Google Maps y Waze, manteniendo `CalendarAddButton` con `className="w-full"`. [impacto: frontend] ✓
6. Verificar que en mobile (columna) cada botón ocupe 100% y en sm+ (fila) los tres compartan equitativamente el ancho de la fila completa. [impacto: tests/manual] *
7. Validar compilación local (sin ejecutar endpoints nuevos; sin dependencias). [impacto: tests/manual] *
8. Documentar resultado y dejar nota: se evitó tocar estilos globales y se mantuvo compatibilidad hacia atrás. [impacto: doc] ✓

Notas:
- El `Wrapper` de `CustomBtn` ahora soporta `fullWidth` para resolver casos donde el contenedor requiere expandirse al 100% del ancho disponible.
- No se modifica comportamiento por defecto de componentes existentes.
