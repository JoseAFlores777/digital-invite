# Tareas — Fix react-modal setAppElement root (REACT-MODAL-ROOT)

Fecha: 2025-10-05

Contexto:
- Error en runtime: `react-modal: No elements were found for selector #__next.`
- Causa: Llamada a `Modal.setAppElement('#__next')` en `RSVPModal` sin verificar existencia del nodo en tiempo de ejecución (Next 15 + Turbopack).

Tareas
1. Revisar estándares del proyecto en `./junie/development-standards.md` y contexto. [impacto: procesos]
   - Hallazgo: No existe `development-standards.md` en el repo; se siguen patrones del proyecto (Next.js App Router, React 19, Tailwind). — done ✓
2. Identificar componentes que utilizan `react-modal` (`RSVPModal`, `SolicitudManager`) y localizar llamadas a `setAppElement`. [impacto: frontend] — done ✓
3. Corregir `RSVPModal`: proteger `setAppElement` con verificación de `window` y fallback a `document.body`, dentro de `try/catch`. [impacto: frontend] — done ✓
4. Mantener `ariaHideApp={false}` en modales para evitar alteraciones no deseadas en accesibilidad durante SSR/hidratación. [impacto: frontend] — done ✓
5. Verificar `SolicitudManager` (modo modal) ya envuelve `setAppElement` en `try/catch` — sin cambios necesarios. [impacto: frontend] — done ✓
6. Validación manual: abrir/cerrar modales, confirmar que no hay crash y el scroll de fondo se bloquea al abrir. [impacto: QA] — pendiente 

Notas:
- Cambio mínimo, sin impacto en API ni estilos previos del requerimiento de UX.
- Si el proyecto define un root distinto a `#__next` en el futuro, el fallback a `document.body` seguirá funcionando.
