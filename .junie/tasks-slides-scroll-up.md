# Tareas: Slides 1 y 2 estáticos al hacer scroll up

1. Revisar lineamientos locales y presencia de `./junie/development-standards.md`; usar `.junie/guidelines.md` si no existe — impacto: documentación — done
2. Identificar componentes de slides (PanelPinStack, PhotoBanner1) y su relación con sticky — impacto: frontend — done
3. Analizar cálculo de progreso en `PhotoBanner1` y detectar dependencia de `getBoundingClientRect` que queda constante en sticky — impacto: frontend — done
4. Implementar cálculo de `sectionTop` basado en `offsetTop` acumulado (cadena de `offsetParent`) — impacto: frontend — done
5. Mantener `IntersectionObserver` con `rootMargin: "100% 0px 100% 0px"` para pre-activación simétrica — impacto: frontend — done
6. Validar manualmente/razonado el comportamiento al subir y bajar; respetar `prefers-reduced-motion` — impacto: QA — pending
7. Documentar requisitos y tareas en `.junie/requirements-slides-scroll-up.md` y `.junie/tasks-slides-scroll-up.md` — impacto: documentación — done
8. Crear rama de trabajo y commit atómicos — impacto: VCS — pendiente (limitación del entorno)

Notas
- Se eligió un cambio mínimo en `PhotoBanner1` para soportar contenedores sticky sin introducir dependencias ni afectar el rendimiento.