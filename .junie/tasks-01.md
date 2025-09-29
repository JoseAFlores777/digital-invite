# Tasks – Ticket 01: Divisor con difuminado entre Hero y “Nuestra Historia”

## Contexto
Implementar un divisor con gradiente/fade entre el Hero y la sección "Nuestra historia", usando TailwindCSS y GSAP (ScrollTrigger), con foco en accesibilidad, rendimiento y responsividad.

## Tareas
1. Crear rama de trabajo JUNIE-WIP-01. [impacto: VCS] – done
2. Revisar estándares de desarrollo del proyecto. Si faltan, usar .junie/guidelines.md como referencia. [impacto: proceso] – done (no existe development-standards.md)
3. Revisar requirements en .junie/requirements-01.md y alinear criterios de aceptación. [impacto: análisis] – done
4. Añadir utilidad Tailwind para gradiente del divisor (bg-hero-fade-card) en globals.css, parametrizada con --fade-to. [impacto: frontend/CSS] – done
5. Actualizar Hero.tsx para incluir overlay absoluto inferior (#hero-fade) con la utilidad de gradiente y aria-hidden. [impacto: frontend/React] – done
6. Integrar animación con GSAP ScrollTrigger para desvanecer el overlay al hacer scroll, respetando prefers-reduced-motion. [impacto: frontend/JS] – done
7. Verificar que la sección "Nuestra historia" tenga fondo sólido (blanco) y un id estable (historia). [impacto: frontend] – done (usa bg-white, id="historia")
8. Validación rápida: build/typecheck local para asegurar que no hay errores. [impacto: calidad] – done
9. Documentar y realizar commits atómicos y descriptivos. [impacto: VCS] – pending
10. Aumentar altura del overlay y asegurar stacking con z-index. [impacto: frontend/CSS] – done
11. Fortalecer el gradiente y agregar fallback RGBA en bg-hero-fade-card. [impacto: frontend/CSS] – done
12. Ajustar ScrollTrigger para un desvanecido más tardío y perceptible. [impacto: frontend/JS] – done
13. QA visual en dispositivos (nota: requiere ver en navegador). [impacto: QA] – pending

## Notas
- El color de destino del gradiente es configurable vía CSS var `--fade-to` (default #fff). Para cambiar hacia otro card bg, definir esa var en el contenedor siguiente.
- Accesibilidad: el overlay es `aria-hidden` y se respeta `prefers-reduced-motion`.
- Rendimiento: animaciones ligadas a ScrollTrigger con scrub y sin heavy layouts.
