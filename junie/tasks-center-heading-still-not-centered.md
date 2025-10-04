# Tareas: Centrado del heading en PerspectiveZoom (aún no centrado)

1. Revisar estilos actuales de `.heading` y wrapper en JSX para detectar conflictos de `transform`. ✓
2. Quitar `-translate-x-1/2 -translate-y-1/2` del wrapper del heading en `PerspectiveZoom.tsx` (ambas ramas de render). ✓
3. Quitar `whitespace-nowrap` del wrapper del heading para evitar desbordes que afecten el centrado. ✓
4. Verificación rápida de centrado: confiar en `.heading { transform: translate3d(-50%, -50%, -2000px) }` + `left/top 50%`. ✓
5. Documentar requisitos y tareas en `junie/requirements-center-heading-still-not-centered.md` y este archivo. ✓
6. Recordatorio: si persiste algún desalineamiento en móviles extremadamente estrechos, evaluar `max-w` del contenido embebido y ajuste de `text-center` en el slot. 
