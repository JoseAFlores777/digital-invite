# Tareas — LIVE-BUTTON-SIZE

Estado de estándares: No existe ./junie/development-standards.md; se siguen patrones del proyecto (Next.js, TypeScript, Tailwind, Iconify, GSAP). Si se publican estándares, alinear en futuras iteraciones.

1. Analizar requerimiento: hacer más grande el botón de transmisión en vivo y su contenido en Countdown. [impacto: frontend/UI] — done
2. Countdown.tsx:
   - Aumentar padding y tamaño de fuente del botón (px-6 py-3, rounded-xl, text-base). [impacto: UI] — done
   - Pasar children personalizados a LiveStreamButton con ícono YouTube más grande (w-5 h-5), label con font-medium y badge "En vivo" más grande (text-xs, px-2.5). [impacto: UI] — done
   - Importar Iconify para el ícono. [impacto: UI] — done
3. Validación conceptual: Sólo afecta el botón bajo Countdown; otros contextos (Itinerary/SolicitudManager) mantienen tamaños previos. [impacto: QA] — done

Notas:
- Se mantuvo el estilo visual del proyecto (bordes neutros, fondo blanco, hover neutro).
- No se añadieron dependencias.
