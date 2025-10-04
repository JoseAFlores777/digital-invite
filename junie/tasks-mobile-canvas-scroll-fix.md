# Tareas — Mobile canvas scroll position fix

1. Revisar estándares de desarrollo en `./junie/development-standards.md`. (Estado: no encontrado en repo; se documenta la ausencia) [done] (impacto: docs)
2. Analizar causa probable: `resize` frecuentes por barra de direcciones móvil disparan `ScrollTrigger.refresh()` provocando correcciones de scroll. (Estado: verificado) [done] (impacto: frontend)
3. Configurar `ScrollTrigger.config({ ignoreMobileResize: true })` de forma global al cargar el componente. [done] (impacto: frontend)
4. Modificar `onResize` en `AnilloScrollSequence` para:
   - Actualizar canvas y re-renderizar siempre. [done]
   - Llamar `ScrollTrigger.refresh()` solo si cambia el ancho. [done]
   - Manejar `orientationchange` con `refresh` y limpiar listeners en unmount. [done]
   (impacto: frontend)
5. Validar en emuladores iOS/Android: sin saltos de scroll con canvas visible; desktop sin cambios. [pendiente] (impacto: QA)
6. Documentar requisitos y tareas en `./junie/requirements-mobile-canvas-scroll-fix.md` y este archivo. [done] (impacto: docs)

## Notas
- No se introducen dependencias nuevas.
- Se mantiene `prefers-reduced-motion`.
- Si persiste algún micro-salto en dispositivos específicos, considerar debouncing del `resize` o control por `visualViewport` (no implementado por simplicidad).
