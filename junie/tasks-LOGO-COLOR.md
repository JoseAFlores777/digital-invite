# Tareas — LOGO-COLOR

Estado de estándares: No existe `./junie/development-standards.md`; se siguen patrones del proyecto (Next.js App Router, TypeScript, Tailwind). Si se agrega en el futuro, alinear los cambios.

## Lista de tareas
1. Analizar requerimiento: color del logo por defecto `--color-dusty-500` y configurable por props. [impacto: frontend] — done ✓
2. Actualizar `WeddingHeader` para aceptar `logoColor` y `logoSize`. [impacto: frontend] — done ✓
3. Reemplazar `<Image>` por un elemento con máscara CSS usando `/wedding-Logo.svg` y `backgroundColor` como color del logo. [impacto: frontend] — done ✓
4. Validación: Navegar a `/gifts?wedding_id=XYZ` y verificar que el logo se muestre en `--color-dusty-500`. Probar sobreescritura pasando `logoColor` manualmente. [impacto: tests/manual] — pending 
5. Documentar requisitos en `junie/requirements-LOGO-COLOR.md`. [impacto: docs] — done ✓

## Notas
- Se evita reintroducir SVG inline con atributos inválidos (`fill-opacity`) que provocaban warnings.
- No se añadieron dependencias externas.
- La solución permite cambiar el color a cualquier CSS color válido, incluyendo tokens CSS variables.
