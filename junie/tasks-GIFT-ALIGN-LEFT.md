# Tasks — GIFT-ALIGN-LEFT

Contexto: En la grilla de opciones del componente `Gift`, el contenido dentro del botón debe alinearse a la izquierda.

## Tareas
1. Localizar el botón de cada opción dentro de `src/components/Gift.tsx` (actualmente `CustomBtn`). ✓
2. Forzar alineación a la izquierda agregando la clase utilitaria `justify-start` en el `className` del `CustomBtn` de las tarjetas de opción (manteniendo `w-full text-left`). ✓
3. Verificar que no afecte otros botones (cambio localizado solo en `Gift`). ✓

## Notas
- `CustomBtn` usa `justify-center` por defecto; al añadir `justify-start` en `className` (que se concatena al final) se sobreescribe para estos botones sin modificar el componente base.
- Cambio mínimo y acotado; no se altera la API ni la lógica del componente.
