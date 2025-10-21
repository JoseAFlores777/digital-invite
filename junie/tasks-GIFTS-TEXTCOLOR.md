# Tasks — GIFTS-TEXTCOLOR

Contexto: Solicitud para que en la ruta `/gifts` el color del texto sea `text-[color:var(--color-dusty-800)]`.

Estado de estándares: No existe `./junie/development-standards.md` en el repo. Se siguen convenciones actuales (Next.js App Router, TS, Tailwind v4, CSS variables en `globals.css`).

## Tareas
1. Revisar si ya existe color de texto global por defecto en `globals.css`. [impacto: frontend] — done ✓
2. Aplicar clase explícita `text-[color:var(--color-dusty-800)]` en el contenedor principal de `src/app/gifts/page.tsx` para cumplir el requerimiento puntual de la ruta. [impacto: frontend] — done ✓
3. Validar que `WeddingHeader` en variante primaria herede el color y que la secundaria mantenga texto blanco. [impacto: frontend] — pending
4. Smoke test visual de `/gifts` para confirmar que todo el texto en la página tiene el color solicitado y no se rompe el layout. [impacto: QA] — pending

## Notas
- Ya existe un color base global `var(--color-dusty-800)` aplicado al `body`, pero se añade la clase explícita en `/gifts` para cumplir el requerimiento del ticket.
- Otros componentes podrían tener overrides de color internos; si se detecta alguno que contradiga el objetivo visual en `/gifts`, evaluar ajustes puntuales en una iteración posterior.
