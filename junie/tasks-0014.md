# Tareas 0014 — Restaurar scroll en PanelPinStack

1. Crear rama de trabajo JUNIE-WIP-0014.  
   - Impacto: repo (VCS)
   - Nota: si el entorno no permite comandos git, documentar la limitación y continuar.  

2. Revisar estándares en `./junie/development-standards.md` y lineamientos GSAP (context7).  
   - Impacto: documentación  

3. Diagnóstico del bloqueo de scroll.  
   - Hallazgo: `.container` con `height: 100vh` + `overflow: hidden` encapsulaba el elemento pin, impidiendo el crecimiento del `pinSpacing`.  
   - Impacto: frontend  

4. Implementar fix mínimo.  
   - Mover `height: 100vh` y `overflow: hidden` a `.pinTrigger`.  
   - Dejar `.container` con `position: relative` únicamente.  
   - Aplicar clase `s.pinTrigger` en JSX manteniendo `class="pin-trigger"` para ScrollTrigger.  
   - Impacto: frontend  

5. Verificación.  
   - Construcción/compilación local y revisión visual del scroll y del pin.  
   - Impacto: frontend/tests manuales  

6. Documentación final.  
   - Actualizar `requirements-0014.md` (este archivo ya creado).  
   - Registrar notas de limitaciones (p. ej., rama no creada si el entorno lo impide).  

Progreso:
- [ ] 1. Rama creada
- [x] 2. Estándares revisados (no existe archivo; se respeta estilo actual del proyecto)  
- [x] 3. Diagnóstico realizado  
- [x] 4. Fix implementado  
- [ ] 5. Verificación local  
- [x] 6. Documentación actualizada  
