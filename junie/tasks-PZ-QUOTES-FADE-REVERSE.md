# Tareas — PZ-QUOTES-FADE-REVERSE

1. Revisar estándares del proyecto en ./junie/development-standards.md y MCP context7. [impacto: procesos]
   - Hallazgo: No existe ./junie/development-standards.md en el repo. Se mantienen convenciones existentes (Next.js App Router, TS, Tailwind v4 tokens, GSAP via hook useGsapContext). [done]

2. Reproducir problema: quotes “se van para arriba” al salir. [impacto: frontend]
   - Observación esperada: al final del pin podría percibirse desplazamiento vertical si la salida coincide con el unpin. [pendiente de verificación en UI]

3. Implementar corrección en PerspectiveZoom.tsx. [impacto: frontend]
   - Asegurar animación simétrica: entrada fade-in, salida fade-out. [done]
   - Bloquear movimiento vertical añadiendo y:0 tanto en fromTo como en el to final; usar immediateRender:false. [done]

4. Validación manual en desktop/móvil y con/ sin prefers-reduced-motion. [impacto: pruebas]
   - Confirmar que no hay desplazamiento vertical durante el fade-out y que el elemento se mantiene centrado. [pendiente]

5. Documentar y solicitar validación. [impacto: documentación]
   - Este archivo creado y actualizado. [done]
   - Solicitar feedback del usuario para afinar tiempos/easing si fuese necesario. [pendiente]
