# Tareas: Activar animación también al hacer scroll hacia arriba

1. Revisar estándares de desarrollo en `./junie/development-standards.md` (no existe en repo; se usa `.junie` como carpeta operativa) — impacto: documentación — done
2. Analizar componente afectado `src/components/photoBanner_1.tsx` y localizar lógica de activación con `IntersectionObserver` (líneas ~100–116) — impacto: frontend — done
3. Ajustar `rootMargin` para pre-activar también al aproximarse desde abajo: de `"0px"` a `"100% 0px 100% 0px"` — impacto: frontend — done
4. Validar que se mantiene `prefers-reduced-motion` y no se introducen dependencias — impacto: frontend — done
5. Actualizar `requirements-anim-scroll-up.md` y documentar tareas — impacto: documentación — done
6. Crear rama `JUNIE-WIP-anim-scroll-up` y hacer commit atómico — impacto: VCS — pendiente (no se pudo ejecutar git desde el entorno actual)

Notas
- Se detectó divergencia con la ruta sugerida `./junie/` en las guías: el proyecto utiliza `.junie/`. Se documenta y se mantienen los archivos en `.junie/` para consistencia con el repositorio.
