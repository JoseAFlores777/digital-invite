# Tasks – Ticket 03: Quitar GSAP del Hero

## Contexto
Se solicita eliminar GSAP únicamente del componente `Hero`, manteniendo el divisor con difuminación inferior como elemento estático y configurable.

## Tareas
1. Crear rama de trabajo `JUNIE-WIP-03`. [impacto: VCS] – pending (bloqueado por entorno)
2. Revisar estándares de desarrollo (`./junie/development-standards.md`); si no existe, usar `.junie/guidelines.md`. [impacto: proceso] – done
3. Identificar todos los usos de GSAP en `Hero.tsx` (stagger, parallax, fade del divisor) y definir eliminación. [impacto: análisis] – done
4. Remover imports/uso de `gsap`, `ScrollTrigger`, `useGsapContext`, `useIsReducedMotion` en `Hero.tsx`. [impacto: frontend/React] – done
5. Eliminar bloque de efectos GSAP y referencias a `ref` no necesarias; mantener overlay con `bg-hero-fade-card` y prop `fadeTo`. [impacto: frontend] – done
6. Validar build y typecheck (`npm run build`). [impacto: calidad] – pending
7. QA visual: confirmar que el difuminado se mantiene y no hay líneas divisorias. [impacto: QA] – pending
8. Documentar cambios en `.junie/requirements-03.md` y este archivo. [impacto: docs] – done
9. Realizar commits atómicos y descriptivos, y push de la rama. [impacto: VCS] – pending (bloqueado por entorno)

## Notas
- Otras secciones (por ejemplo, `StoryBeats`) se mantienen con GSAP según implementación actual.
- El color de difuminado sigue configurable con el prop `fadeTo` o definiendo `--fade-to` en el contenedor de la siguiente sección.
