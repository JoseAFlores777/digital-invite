# Tareas 0013 — GSAP con useGSAP (@gsap/react)

1. Crear rama de trabajo JUNIE-WIP-0013. [Acción manual requerida en este entorno]
   - git checkout -b JUNIE-WIP-0013
2. Revisar estándares en `./junie/development-standards.md`. (No existe; seguir convenciones actuales) ✓
3. Consultar contexto externo (Context7) de `@gsap/react` y `useGSAP`. ✓
4. Agregar dependencia `@gsap/react` en package.json. ✓
5. Refactorizar `src/components/PanelPinStack.tsx` para usar `useGSAP`:
   - Importar `useGSAP`, `gsap`, `ScrollTrigger` y registrar plugin. ✓
   - Usar `scope: ref` y mover la animación al callback de `useGSAP`. ✓
   - Añadir guard `prefers-reduced-motion`. ✓
   - Calcular `pinType` dinámico, `pinReparent`, `pinSpacing: 'margin'`, `anticipatePin`, `invalidateOnRefresh`. ✓
6. Verificar tipado/compilación local y que las pruebas existentes no se rompen. *
7. Documentar requisitos y tareas en `junie/requirements-0013.md` y `junie/tasks-0013.md`. ✓
8. Commit por tarea y push de la rama. [Acción manual en este entorno]

Impacto:
- Frontend: 4, 5, 6, 7, 8
- Tests: 6

Notas:
- Mantener Hero y Countdown con el hook interno para cambios mínimos; futuros tickets pueden migrarlos a `useGSAP` si se desea homogeneizar.
- Si hay fallas de pin en móviles con contenedores transformados, `pinType: 'transform'` mitigará el problema.
