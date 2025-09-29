# Requerimiento 07 — Compatibilidad web y móvil del Hero y su difuminado

Objetivo: Asegurar que el bloque Hero (imagen de fondo, títulos, botón y divisor difuminado inferior) funcione y se muestre correctamente en navegadores modernos tanto en pantallas móviles como de escritorio.

Criterios de aceptación:
- El Hero mantiene altura mínima de 100dvh y se adapta a barras de sistema en móviles (notch, home indicator) sin que el contenido toque el borde inferior.
- El bloque de textos (título, fecha y botón) mantiene separación inferior adecuada en móvil y escritorio, respetando el área segura (safe-area) cuando aplica.
- El divisor difuminado inferior no introduce líneas duras y no tapa el contenido (overlay con pointer-events: none y z-index por debajo del texto).
- Responsivo: Tipografías y espaciados usan breakpoints (base y md+) para mantener legibilidad.
- Accesibilidad: El overlay del difuminado sigue con aria-hidden.
- No se agregan dependencias nuevas.
- Build de producción compila sin errores.

Notas de implementación:
- Ajustar el padding-bottom del contenedor interno del Hero a valores dependientes de la safe-area mediante env(safe-area-inset-bottom) usando clases arbitrarias de Tailwind (v4):
  - pb-[calc(10dvh+env(safe-area-inset-bottom))] para móvil
  - md:pb-[calc(12dvh+env(safe-area-inset-bottom))] para escritorio
- Mantener el overlay del difuminado existente, z-index por debajo del texto, y color configurable vía --fade-to/prop fadeTo.

Pruebas/Validación:
- Verificar en viewport móvil (p. ej., 375×812) que el botón y textos no queden pegados al borde inferior y que el difuminado no opaque interacciones.
- Verificar en desktop (>1024px) que la separación sigue siendo adecuada.
- Ejecutar `npm run build` y confirmar éxito.