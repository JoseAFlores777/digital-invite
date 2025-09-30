# Requerimiento 05 — Posicionar títulos del Hero cerca del borde inferior

Objetivo: Colocar el bloque de textos del Hero (título, subtítulo y botón) más cerca del borde inferior del Hero, sin invadir el área de transición del divisor difuminado y manteniendo buena legibilidad.

Criterios de aceptación:
- El título y subtítulo del Hero se ubican visualmente “cerca del bottom” del Hero en pantallas móviles y de escritorio.
- Debe mantenerse una separación vertical consistente respecto del borde inferior (aprox. 10–14dvh, adaptable por breakpoint) para no chocar con el divisor difuminado.
- La legibilidad del texto no debe degradarse por el overlay del divisor. El texto debe renderizarse por encima del overlay.
- No se introducen dependencias nuevas. Se respetan estilos existentes (Tailwind) y arquitectura.
- Responsivo: La posición se ve correcta en tamaños comunes (sm y md+).
- Build de producción compila sin errores.

Notas de implementación:
- Ajustar el contenedor interno del Hero para reducir el padding-bottom y elevar su z-index por encima del overlay del divisor.
- Mantener el difuminado inferior existente sin cambios visuales observables.

Pruebas/Validación:
- Verificar en viewport móvil (375×812 aprox.) y desktop (>1024) que el bloque queda cerca del borde inferior y no se tapa con el difuminado.
- Correr `npm run build` y confirmar éxito.
