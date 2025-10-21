# Tasks — DIGI-INV-TEXTCOLOR

Contexto: Alinear el color de texto por defecto de la app a `var(--color-dusty-800)` en cada sección de contenido, componentes y vistas, sin romper variantes que requieren contraste (p. ej., encabezados secundarios con fondo oscuro).

Estado de estándares: No existe `./junie/development-standards.md` en el repo; se siguen patrones del proyecto (Next.js App Router + TypeScript + Tailwind v4, CSS variables en `globals.css`).

## Tareas
1. Revisar configuración de Tailwind y variables de color en `src/app/globals.css`. [impacto: proceso] — done
2. Establecer color de texto base global a `var(--color-dusty-800)` para herencia por defecto, modificando `body` en `@layer base`. [impacto: frontend] — done
3. Auditar componentes con overrides explícitos de color (`text-neutral-*`) que puedan contradecir el requerimiento; priorizar los más visibles. [impacto: frontend] — in-progress
   - Ajustar `WeddingHeader` para que el subtítulo en variante primaria herede el color base (remover `text-neutral-600`), manteniendo blanco para la variante secundaria. — done
4. Validar visualmente (local) que textos principales hereden el nuevo color, y que excepciones (fondos oscuros) sigan siendo legibles. [impacto: QA] — pending
5. Identificar y proponer etapa 2 si se requiere eliminar más overrides en otros componentes (Itinerary, Gift, MainDetails, etc.) para uniformidad total. [impacto: frontend] — pending

## Notas
- Existen múltiples componentes con clases `text-neutral-*` (ver búsqueda en `src/`). No se eliminaron todos para mantener cambios mínimos y evitar afectar diseño intencional (jerarquías/acentos). Recomendado revisar en una segunda iteración según prioridad de pantallas.
- El cambio global asegura que cualquier texto sin color explícito utilice `--color-dusty-800` por defecto.
