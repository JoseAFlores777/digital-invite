# Tareas — PhotoBanner1: filtro de color/tono en la imagen

1. Revisar estándares del proyecto en ./junie/development-standards.md y documentar ausencia. [done] (impacto: docs)
2. Analizar implementación actual de `PhotoBanner1` para ubicar punto de aplicación del filtro. [done] (impacto: frontend)
3. Agregar prop opcional `imageFilter?: string` al tipo `PhotoBanner1Props`. [done] (impacto: frontend)
4. Exponer `imageFilter` en la función `PhotoBanner1` (destructuring) y aplicarlo en `Next/Image` vía `style.filter`. [done] (impacto: frontend)
5. Validar que no haya usos rotos del componente (búsqueda de referencias). [done] (impacto: frontend)
6. Probar con valores de ejemplo (`grayscale(100%)`) en un uso existente (manual/visual). [pending] (impacto: frontend)
7. Verificar compilación/typos con typecheck/build local. [pending] (impacto: build)
8. Documentar requisitos y tareas en `junie/` (este archivo y requirements). [done] (impacto: docs)

Notas:
- No se añadieron dependencias.
- Cambios son retro-compatibles; la prop es opcional.
