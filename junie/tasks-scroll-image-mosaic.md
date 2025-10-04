# Tareas: ScrollImageMosaic

Estado de estándares: No existe `./junie/development-standards.md` en el repo. Se sigue convención observada en componentes existentes (PhotoBanner1, PanelPinStack) y hook `useGsapContext`.

1. Analizar utilidades/estilo del proyecto (hooks, Tailwind, GSAP). [impacto: general] — done
2. Definir API de la componente y cálculos de grilla/orden. [impacto: frontend] — done
3. Implementar `src/components/ScrollImageMosaic.tsx` con `use client`, Tailwind y GSAP + ScrollTrigger usando `useGsapContext`. [impacto: frontend] — done
   - Manejo de `prefers-reduced-motion` con modos `static|minimal`. — done
   - Limpieza de animaciones en unmount. — done
4. Añadir `Demo` exportado (opcional) para pruebas manuales sin afectar rutas. [impacto: frontend/tests manuales] — pending
5. Validar tipos y build local (sin romper componentes existentes). [impacto: build] — pending
6. Documentar breve uso en este archivo y en requisitos. [impacto: docs] — pending

Notas:
- No se agregan dependencias. GSAP ya está presente.
- Seguir la guía interna de no dejar comentarios innecesarios; solo los mínimos para comprensión.
