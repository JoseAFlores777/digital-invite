# Requisitos: quoteText respeta espacios + Proverbios 3:6 (RVR1960)

Objetivo: Asegurar que el texto de la cita (quoteText) preserve espacios y saltos de línea, y actualizar la invitación para usar el versículo Proverbios 3:6 (RVR1960).

Alcance:
- En `PerspectiveZoom`, el split de caracteres debe:
  - Convertir espacios comunes (`" "`) a espacio no separable (`\u00A0`) para evitar colapsos.
  - Convertir `"\n"` en `<br>` para respetar saltos de línea.
  - Alternativamente, robustecer con `whitespace-pre-wrap` en el párrafo del quote.
- En `InvitationContent`, establecer `quoteText` a: 
  - `Reconócelo en todos tus caminos, Y él enderezará tus veredas. (Proverbios 3:6, RVR1960)`.

Criterios de aceptación:
- Múltiples espacios consecutivos se mantienen visualmente en el quote.
- Los saltos de línea en `quoteText` (si los hubiera) se respetan en pantalla.
- La invitación muestra el versículo indicado (RVR1960) en la sección de quote.

No-funcionales:
- Cambios mínimos, sin nuevas dependencias.
- Mantener SSR-safety y patrones del proyecto (GSAP vía `useGsapContext`, Tailwind).
