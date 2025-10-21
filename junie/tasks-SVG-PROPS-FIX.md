# Tareas — SVG-PROPS-FIX

Estado de estándares: No existe `./junie/development-standards.md`; se siguen patrones del proyecto (Next.js App Router, TS, Tailwind). Se documenta la solución mínima sin dependencias nuevas.

## Lista de tareas
1. Analizar stacktrace y localizar uso de `WeddingLogoSVG` en `WeddingHeader`. [impacto: frontend] — done ✓
2. Aplicar fix mínimo: remover import y render de `WeddingLogoSVG` en `WeddingHeader` y mantener solo `<Image src="/wedding-Logo.svg" />`. [impacto: frontend] — done ✓
3. Verificar que el header siga mostrando el logo y que desaparezca el error de consola. [impacto: tests/manual] — done ✓
4. Documentar requisitos y tareas en `junie/requirements-SVG-PROPS-FIX.md` y `junie/tasks-SVG-PROPS-FIX.md`. [impacto: docs] — done ✓

## Notas
- Se evitó refactor masivo de un SVG inline grande con posibles múltiples atributos incompatibles (p. ej., fill-opacity, stroke-width, etc.).
- El componente `WeddingLogoSvg.tsx` permanece en el repositorio por si se decide limpiarlo y reutilizarlo a futuro.
