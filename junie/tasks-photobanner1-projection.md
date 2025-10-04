# Tareas — PhotoBanner1: proyección de contenido centrado

1. Revisar estándares en `./junie/development-standards.md` y documentar su ausencia si aplica. [done] (impacto: docs)
2. Analizar `PhotoBanner1` para ubicar punto de inyección de contenido overlay. [done] (impacto: frontend)
3. Definir API: `projection?: React.ReactNode` (opcional) con contenedor centrado y `z-20`. [done] (impacto: frontend)
4. Implementar cambios en `src/components/photoBanner_1.tsx` (tipos, props, render). [done] (impacto: frontend)
5. Verificar layering respecto al fade inferior (contenido por encima). [done] (impacto: frontend)
6. Pruebas básicas: render sin `projection` y con `projection` (texto simple). [pendiente] (impacto: QA)
7. QA manual en desktop/móvil: centrado y no interferencia con zoom/scroll. [pendiente] (impacto: QA)

## Notas
- No se agregaron dependencias. Retrocompatibilidad preservada.
- El contenedor usa `absolute inset-0 grid place-items-center z-20`. Se deja estilo adicional a consumidores si lo requieren.
