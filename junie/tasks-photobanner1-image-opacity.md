# Tareas — PhotoBanner1: opacidad de la imagen

1. Revisar estándares del proyecto en `./junie/development-standards.md` y registrar estado. [done] (impacto: docs)
   - Observación: el archivo no existe actualmente; se mantiene la nota como en tickets previos.
2. Analizar implementación actual de `PhotoBanner1` para ubicar el punto de aplicación de opacidad (style del `<Image>`). [done] (impacto: frontend)
3. Agregar prop opcional `imageOpacity?: number` al tipo `PhotoBanner1Props`. [done] (impacto: frontend)
4. Exponer `imageOpacity` en el destructuring del componente. [done] (impacto: frontend)
5. Aplicar `opacity` en el `style` del `<Image>` junto a `transformOrigin` e `imageFilter`. [done] (impacto: frontend)
6. Verificar compatibilidad hacia atrás (prop opcional; `undefined` no altera estilos). [done] (impacto: frontend)
7. Documentar requisitos en `junie/requirements-photobanner1-image-opacity.md`. [done] (impacto: docs)
8. Documentar este desglose en `junie/tasks-photobanner1-image-opacity.md`. [done] (impacto: docs)
9. Intentar compilación local para validar (puede fallar por error ajeno en `AnilloScrollSequence.tsx`, como en builds previas). [pending] (impacto: build)

Notas:
- Cambios mínimos y sin dependencias nuevas.
- Se recomienda una revisión humana final dado que existen warnings/errores previos en otras partes del repo.
