# Tareas: Reducir lag en móviles al hacer scroll up

1. Revisar lineamientos en `.junie/guidelines.md`. — documentación — done
2. Analizar `PhotoBanner1` con GSAP/ScrollTrigger y detectar causas de jank en móviles. — frontend — done
3. Configurar `ScrollTrigger.config({ ignoreMobileResize: true })` una sola vez. — frontend — done
4. Cambiar `scrub: true` a `scrub: 0.2` para suavizar y reducir picos. — frontend — done
5. Alternar `will-change` solo cuando el slide esté activo (`onEnter/Back` y `onLeave/Back`). — frontend — done
6. Eliminar `will-change` fijo de la clase del `<Image>`. — frontend — done
7. Hacer `priority` opcional en `PhotoBanner1` y usarlo solo en el primer slide desde `PanelPinStack`. — frontend — done
8. Añadir `quality={70}` a `next/image` para contener decode pesado en móvil. — frontend — done
9. Validación teórica con sticky + ScrollTrigger; respetar `prefers-reduced-motion`. — QA — done
10. Documentar en `.junie/requirements-anim-mobile-lag.md` y este archivo. — documentación — done
11. Preparar rama/commits atómicos (no ejecutable en este entorno). — VCS — pendiente
