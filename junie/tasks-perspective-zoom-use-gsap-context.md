# Tareas: PerspectiveZoom usa useGsapContext

Estado de estándares: No existe `./junie/development-standards.md`. Se siguen patrones del repo (hook `useGsapContext`, Tailwind, SSR-safe, sin comentarios innecesarios).

1. Revisar `PerspectiveZoom.tsx` y localizar el efecto GSAP/ScrollTrigger manual. [impacto: frontend] — done
2. Reemplazar `React.useEffect` + `gsap.context` + `registerPlugin` por `useGsapContext`. [impacto: frontend] — done
   - Importar `{ useGsapContext, gsap }` desde `@/hooks/useGsapContext`. — done
   - Eliminar limpieza global `ScrollTrigger.getAll().forEach(kill)`; delegar a contexto. — done
   - Mantener lógica de animación, refs y respeto a `prefers-reduced-motion`. — done
3. Validación rápida de tipos/compilación mental (sin romper API). [impacto: build] — done
4. Documentar requisitos y tareas en `junie/requirements-...` y `junie/tasks-...`. [impacto: docs] — done

Notas:
- No se modifica la API pública del componente.
- Cualquier comportamiento visual debería permanecer igual; la única diferencia es el mecanismo de inicialización/cleanup.
