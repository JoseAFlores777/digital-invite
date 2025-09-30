# Tareas (Ticket 0002)

Fecha: 2025-09-29

## Lista de tareas
1. Crear rama de trabajo `JUNIE-WIP-0002`. [bloqueada]
   - Impacto: workflow
   - Nota: El entorno no permite ejecutar comandos git. Por favor ejecutar localmente:
     - `git checkout -b JUNIE-WIP-0002`
2. Revisar estándares en `./junie/development-standards.md`. [no encontrado]
   - Impacto: QA/estándares
   - Nota: No existe el archivo en el repo; se aplican buenas prácticas generales y se alinea con `context7` de GSAP/ScrollTrigger horizontal pinning.
3. Diagnóstico de errores en PhotoMasonry. [hecho]
   - Impacto: frontend
   - Hallazgos clave:
     - Se animaban todos los tiles en lugar del track principal.
     - Distancia calculada contra `window.innerWidth` en vez del contenedor.
     - Grid no generaba ancho horizontal por uso de `minmax(..., 1fr)`.
4. Refactor de PhotoMasonry. [hecho]
   - Impacto: frontend
   - Cambios:
     - Nuevo `pinRef` (wrapper) y `trackRef` (pista) para animar solo el track.
     - `distance = track.scrollWidth - wrapper.clientWidth`.
     - `ScrollTrigger.create({... animation: tween ...})` con `start: 'top top'`, `scrub: 0.5`.
     - `ResizeObserver`, listeners de `resize/orientationchange`, y refresh tras carga de imágenes.
     - Guardas para `prefers-reduced-motion` y `distance <= 0`.
5. Ajustes CSS. [hecho]
   - Impacto: frontend/CSS
   - Añadido `.pinWrapper { overflow: hidden; width: 100%; }`.
   - `gridAutoColumns: <cell>px` para que el grid crezca horizontalmente.
6. Validación local. [pendiente]
   - Impacto: QA
   - Pasos sugeridos:
     - `npm run dev` y validar que al llegar a la sección la página hace pin y el grid se desplaza horizontalmente.
     - Cambiar el tamaño de ventana y rotar dispositivo móvil para verificar `refresh` correcto.
     - Probar con imágenes reales en `/public/photos/*`.
7. Documentación. [hecho]
   - Impacto: documentación
   - Se agregaron `junie/requirements-0002.md` y este archivo.

## Notas
- Si existen reglas de linters/formatters específicas, correrlas antes del commit.
- Si el pin debe comenzar en otro punto (ej. `center center`), ajustar `start` según feedback de UX.
