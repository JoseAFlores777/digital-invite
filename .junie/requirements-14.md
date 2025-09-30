# Ticket 14 — Arreglar el loader tras la migración a SCSS/Tailwind v4

## Contexto
Tras migrar estilos a `globals.scss`, las clases globales del loader (`.loader-overlay`, `.loader-animation`, `.sr-only`) sólo existían en el antiguo `globals.css`, que ya no se importa. Como resultado, el loader se mostraba sin estilos (sin fondo, centrado o transición de salida).

## Objetivo
Restaurar y estandarizar los estilos del loader dentro de `globals.scss`, usando los tokens del tema (Tailwind v4 `@theme`) y manteniendo la transición de fade-out.

## Alcance
- Añadir utilidades globales en `globals.scss`:
  - `.sr-only` (accesibilidad, texto para lectores de pantalla)
  - `.loader-overlay` (overlay fijo, centrado, con safe-areas y transición)
  - `.loader-overlay.fade-out` (opacidad 0 + pointer-events: none)
  - `.loader-animation` (tamaño del lottie)
- Mantener el componente `Loader.tsx` y la integración en `page.tsx` sin cambios funcionales.

## Criterios de aceptación
1. El overlay del loader cubre la pantalla, centra la animación y respeta safe-areas en mobile.
2. Al añadirse la clase `fade-out` al overlay, el loader se desvanece suavemente y deja de capturar eventos.
3. No se usan variables antiguas `--color-dusty-*`; se emplean tokens actuales (`--color-background`, etc.).
4. `npm run dev`/`npm run build` funcionan sin errores relacionados con el loader.

## Consideraciones
- Accesibilidad: `.sr-only` permite exponer el estado “Cargando invitación” a lectores de pantalla.
- Compatibilidad: estilos simples (CSS), sin dependencias adicionales.
- Rendimiento: sin impacto significativo (unas pocas reglas CSS globales).
