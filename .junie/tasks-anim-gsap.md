# Tareas: Controlar la animación con GSAP

1. Revisar estándares locales en `.junie/guidelines.md`. — impacto: documentación — done
2. Verificar dependencias `gsap` y `@gsap/react` en `package.json`. — impacto: frontend — done
3. Analizar `PhotoBanner1` para identificar lógica de scroll existente y puntos de reemplazo. — impacto: frontend — done
4. Integrar GSAP+ScrollTrigger en `PhotoBanner1` para controlar `--hero-zoom` con `scrub` y `onUpdate`. — impacto: frontend — done
5. Respetar `prefers-reduced-motion` (fijar escala=1 y omitir GSAP). — impacto: frontend — done
6. Retirar listeners/refs no utilizados tras la migración (scroll/IO/resize). — impacto: frontend — done
7. Validación teórica con contenedores sticky usando `start: "top bottom"` y `end: "bottom top"`. — impacto: QA — done
8. Documentar requerimientos y tareas en `.junie/requirements-anim-gsap.md` y `.junie/tasks-anim-gsap.md`. — impacto: documentación — done

Notas
- Se mantienen cambios mínimos; no se agregan dependencias nuevas.
- GSAP se limita a `ScrollTrigger` con actualización de la variable CSS para mantener estilos existentes.
