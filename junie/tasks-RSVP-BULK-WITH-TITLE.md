# TKT: RSVP-BULK-WITH-TITLE — Botones masivos junto al título de la lista

Estado de estándares: No existe ./junie/development-standards.md; se siguen patrones del proyecto (Next.js + TS + Tailwind). Cambios mínimos, sin dependencias.

## Tareas
1. Retirar los botones masivos del toolbar superior para evitar duplicados. [frontend] — done
2. Renderizar “Confirmar todos” y “Rechazar todos” en la misma línea del título “Lista de Invitados”, alineados a la derecha. [frontend] — done
3. Hacer el contenedor responsive: en viewports angostos, los botones se trasladan a una nueva fila debajo del título (flex-wrap + w-full sm:w-auto + justify-end). [frontend] — done
4. Mantener reglas de visibilidad (showBulkActions && (adminMode || !asModal)), disabled, y handlers existentes. [frontend] — done
5. Validación manual: comprobar en desktop (misma fila, derecha) y móvil (nueva fila, abajo del título). [manual] — pending

## Notas
- El botón “Añadir al calendario” y controles de admin (deadline) permanecen en el toolbar superior.
- No hay cambios en backend ni en tipos.
