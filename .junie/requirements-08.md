# Requerimiento 08 — Anclar contenido del Hero desde el bottom en móviles con `padding-top: 62dvh`

Objetivo: En pantallas móviles (<768px), el bloque de contenido del Hero (títulos y botón) debe estar anclado al borde inferior y disponer un `padding-top: 62dvh` medido desde abajo hacia arriba. De esta forma, si se agregan más elementos, se apilarán hacia arriba sin invadir el borde inferior.

Criterios de aceptación:
- En móviles (<md), el contenedor del contenido del Hero está anclado al bottom del Hero.
- En móviles, el contenedor aplica `padding-top: 62dvh` + `padding-bottom` con `env(safe-area-inset-bottom)` para respetar el área segura.
- En desktop (`md+`), el layout se mantiene como antes (usa `md:pt-[22dvh]` con el override existente a `63dvh`).
- El contenido queda visualmente “desde abajo hacia arriba” al crecer (más elementos dentro del contenedor empujan hacia arriba, no hacia abajo).
- Sin GSAP ni nuevas dependencias.
- Build de producción compila sin errores.

Notas de implementación:
- Convertir el contenedor interno del Hero a `absolute inset-x-0 bottom-0` en móviles y revertir a `md:relative md:inset-auto md:bottom-auto` en `md+`.
- Mantener `z-20` para que el texto quede por encima del overlay de difuminado.
- Conservar `pb-[calc(...safe-area...)]` para separar el botón del borde inferior en dispositivos con notch/home indicator.

Validación:
- Verificar visualmente en 375×812 que el bloque está anclado abajo y que el espaciado desde el bottom es el esperado.
- Confirmar en `md+` que el comportamiento previo se mantiene.
- Ejecutar `npm run build` y confirmar éxito.
