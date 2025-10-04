# Requisitos — PhotoBanner1: proyección de contenido centrado

## Contexto
Se requiere poder inyectar (proyectar) una plantilla/contenido en medio de la imagen del componente `PhotoBanner1`, manteniendo su animación de zoom y la estética actual.

## Objetivo
Agregar una propiedad al componente que permita renderizar contenido arbitrario centrado sobre la imagen de fondo, sin alterar el comportamiento existente para quienes no utilicen la nueva propiedad.

## Alcance
- Componente afectado: `src/components/photoBanner_1.tsx`.
- No se modifican rutas, dependencias ni otros componentes.

## Criterios de Aceptación
- Nueva prop opcional `projection?: React.ReactNode`.
- Cuando se provea, el contenido debe mostrarse centrado (vertical y horizontal) ocupando la capa superior del banner.
- El contenido proyectado no debe quedar tapado por el fade inferior del héroe (debe estar por encima en z-index).
- Si no se proporciona `projection`, el componente se comporta exactamente igual que antes (retrocompatibilidad).
- Mantener soporte a `prefers-reduced-motion` ya existente para la animación del zoom.

## No Funcional
- Sin dependencias nuevas.
- Seguir convenciones del proyecto (linters/formatters, nombres claros, sin comentarios innecesarios en código).

## Consideraciones
- El contenedor de proyección se ubica con `absolute inset-0` y se centra con utilidades de layout (grid `place-items-center`).
- Se usa `z-20` para asegurar que esté por encima del fade (`z-10`).
