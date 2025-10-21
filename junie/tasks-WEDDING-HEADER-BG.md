# Tareas — WEDDING-HEADER-BG

Estado de estándares: No existe `./junie/development-standards.md`; se siguen patrones del proyecto (Next.js + TS + Tailwind). Si se define en el futuro, alinear el componente.

## Lista de tareas
1. Analizar requerimiento de fondo `secondary` para `WeddingHeader`. [impacto: frontend] — done ✓
2. Agregar prop `backgroundVariant?: "primary" | "secondary"` con default `primary`. [impacto: frontend] — done ✓
3. Aplicar `var(--color-dusty-500)` cuando sea `secondary` y actualizar colores de textos a blanco para contraste. [impacto: frontend] — done ✓
4. Ajustar color del logo a blanco cuando sea `secondary`. [impacto: frontend] — done ✓
5. Mantener compatibilidad: en `primary` no cambiar estilos actuales. [impacto: frontend] — done ✓
6. Validación manual en `/gifts`: render sin cambios por defecto y contraste correcto cuando se usa `backgroundVariant="secondary"`. [impacto: tests/manual] — done ✓
7. Documentar requisitos en `junie/requirements-WEDDING-HEADER-BG.md`. [impacto: docs] — done ✓

## Notas
- No se agregaron dependencias nuevas.
- No se modificó el uso en `/gifts`; el valor por defecto (`primary`) preserva el look & feel actual.
- Si en el futuro se quiere forzar otro color de logo en `secondary`, se puede pasar explícitamente `logoColor`.