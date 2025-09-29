# Tasks – Ticket 04: Altura del div difuminado y opacidad 100%→20%

## Contexto
Ajustar el overlay de difuminación del Hero para que cubra la altura completa del Hero y su gradiente vaya de 100% (abajo) a 20% (arriba) del color destino.

## Tareas
1. Crear rama de trabajo `JUNIE-WIP-04`. [impacto: VCS] – pending (bloqueado por entorno)
2. Revisar estándares de desarrollo (`./junie/development-standards.md`); si no existe, usar `.junie/guidelines.md`. [impacto: proceso] – done
3. Actualizar utilidad `bg-hero-fade-card` en `globals.css` para que el gradiente parta en ~20% (top) y llegue a 100% (bottom), con fallback RGBA y `color-mix` usando `--fade-to`. [impacto: frontend/CSS] – done
4. Cambiar altura del overlay en `Hero.tsx` a `h-full` y mantener `absolute inset-x-0 -bottom-px z-10`. [impacto: frontend/React-CSS] – done
5. Validar build y typecheck (`npm run build`). [impacto: calidad] – pending
6. QA visual en distintos viewports (top 20% tinte, bottom 100% tinte; sin líneas divisorias). [impacto: QA] – pending
7. Documentar el requerimiento en `.junie/requirements-04.md` y este archivo. [impacto: docs] – done
8. Realizar commits atómicos y descriptivos; push de la rama `JUNIE-WIP-04`. [impacto: VCS] – pending (bloqueado por entorno)

## Notas
- El color sigue configurable vía prop `fadeTo` o variable CSS `--fade-to`.
- El fallback RGBA utiliza blanco por compatibilidad; en navegadores modernos se usará `color-mix` con el color objetivo.
