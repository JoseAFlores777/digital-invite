# Tareas — COUNTDOWN-LIVE-BUTTON

Estado de estándares: No existe ./junie/development-standards.md en el repo; se siguen patrones del proyecto (Next.js App Router, TypeScript, Tailwind, GSAP hook). Si se agregan estándares, revisar y alinear.

1. Analizar requerimiento: mostrar el botón de transmisión en vivo únicamente debajo del Countdown y dentro del componente Countdown. [impacto: frontend/UI] — done
2. Importar e integrar `LiveStreamButton` en `Countdown.tsx`. [impacto: frontend] — done
3. Leer `live_url` desde `/api/wedding-generalities` dentro de `Countdown.tsx` y guardarlo en estado. [impacto: datos/frontend] — done
4. Render condicional: si `live_url` existe, mostrar botón centrado bajo el contador, con estilo consistente (inline-flex, borde neutral, bg blanca, hover). [impacto: UI/responsive] — done
5. Validación conceptual: sin dependencias nuevas; no se afecta el layout del resto de la página. [impacto: QA] — done

Notas:
- Se reutiliza el componente `LiveStreamButton` ya existente (YouTube icon + tag rojo "En vivo").
- El botón solo aparece si `live_url` está presente en las generalidades de la boda.
