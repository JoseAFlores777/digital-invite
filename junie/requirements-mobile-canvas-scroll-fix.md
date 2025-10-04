# Requisitos — Mobile canvas scroll position fix

Contexto: En dispositivos móviles (iOS/Android), cuando el canvas de la secuencia del anillo está en pantalla, el desplazamiento sufre una "corrección" de posición (saltos) al mostrar/ocultar la barra de direcciones, lo que genera una experiencia inestable.

## Objetivo
Eliminar las correcciones/saltos de posición durante el scroll en móviles cuando el canvas está visible, manteniendo el comportamiento actual en desktop.

## Alcance
- Componente afectado: `src/components/AnilloScrollSequence.tsx`.
- No se modifica el contenido visual ni la secuencia de frames; solo se estabiliza el scroll en móviles.

## Criterios de Aceptación
- iOS Safari y Android Chrome: al scrollear con el canvas visible no debe haber saltos/"correcciones" de posición.
- Cambios en la altura del viewport por barra de direcciones NO deben disparar `ScrollTrigger.refresh()`.
- El `refresh` debe ocurrir en cambios reales de layout (cambio de ancho u orientación).
- La animación se mantiene sincronizada con el scroll. Desktop sin cambios perceptibles.
- No se introducen dependencias externas.

## No Funcional
- Mantener performance: listeners pasivos, evitar trabajo innecesario en eventos frecuentes.
- Accesibilidad: respetar `prefers-reduced-motion` como ya implementado.

## Consideraciones
- `ScrollTrigger.config({ ignoreMobileResize: true })` aplicado globalmente desde el componente para asegurar comportamiento consistente aunque se monte antes que otros.
- En `resize`, se actualiza el canvas y se re-renderiza, pero solo se hace `refresh` si cambia el ancho; para orientación, se fuerza `refresh` explícito.
