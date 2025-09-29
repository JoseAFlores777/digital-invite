# Tasks – Ticket 02: Div con difuminación hacia arriba en el borde inferior del Hero (color configurable)

## Contexto
Implementar un overlay en el Hero que difumine hacia arriba el color de la siguiente sección para eliminar líneas divisorias. El color debe ser configurable.

## Tareas
1. Crear rama de trabajo `JUNIE-WIP-02`. [impacto: VCS] – pending (bloqueado por entorno)
2. Revisar estándares de desarrollo (`./junie/development-standards.md`). Si no existe, usar `.junie/guidelines.md`. [impacto: proceso] – done
3. Hacer configurable el color del difuminado: agregar prop `fadeTo` al componente `Hero` y enlazarlo a `--fade-to`. [impacto: frontend/React] – done
4. Mantener overlay inferior con `-bottom-px`, z-index y altura responsiva para evitar seams visibles. [impacto: frontend/CSS] – done
5. Validar build y typecheck local (Next.js + TS). [impacto: calidad] – pending
6. Documentar el requerimiento y ejemplo de uso en `.junie/requirements-02.md`. [impacto: docs] – done
7. Documentar tareas en este archivo y marcar progreso. [impacto: proceso] – in progress
8. Realizar commits atómicos y descriptivos y push de la rama `JUNIE-WIP-02`. [impacto: VCS] – pending (bloqueado por entorno)

## Notas
- Uso recomendado: `<Hero fadeTo="#FAF7F2" />` para empatar con una tarjeta crema en la siguiente sección.
- Alternativa: definir `--fade-to` en el contenedor de la sección siguiente si se prefiere controlar desde el layout.
- Accesibilidad: `aria-hidden` en el overlay; `prefers-reduced-motion` respetado para la animación GSAP.
