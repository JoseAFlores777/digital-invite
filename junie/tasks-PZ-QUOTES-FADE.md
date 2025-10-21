# Tareas — PZ-QUOTES-FADE

1. Revisar estándares del proyecto en ./junie/development-standards.md. [impacto: procesos]
- Hallazgo: No existe ./junie/development-standards.md; se siguen patrones del repo (Next.js App Router, TypeScript, Tailwind, GSAP mediante hook useGsapContext). [done]

2. Analizar componente afectado (PerspectiveZoom) y localizar animaciones de las quotes. [impacto: frontend]
- Ubicadas en src/components/PerspectiveZoom.tsx dentro del bucle de secciones con ScrollTrigger (tl2). [done]

3. Cambiar comportamiento: de desplazamiento/efecto con scale a solo fade in/out reaccionando al scroll. [impacto: frontend]
- Reemplazado bloque que construía spans por carácter y aplicaba stagger + scale por una simple animación de opacidad (fromTo opacity 0→1 y luego 1→0) tanto para párrafos como para bloques HTML. [done]

4. Validar que no haya movimiento residual desde CSS o transforms. [impacto: frontend]
- No hay transforms en las quotes; se mantiene pin para que el fade reaccione al scroll. [done]

5. Verificación rápida: no romper otros apartados (heading e items). [impacto: frontend]
- Sin cambios en timelines de items/heading. [done]

Notas: No se introdujeron dependencias. No se añadió código comentado. Seguir revisando con validación manual en navegador.
