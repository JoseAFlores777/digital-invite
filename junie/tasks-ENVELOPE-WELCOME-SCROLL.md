# Tareas: ENVELOPE-WELCOME-SCROLL

## Estado de estándares
- No existe `./junie/development-standards.md` en el repo; se siguen patrones del proyecto (Next.js + TypeScript + TailwindCSS). Evitar comentarios en código salvo necesidad.

## Lista de tareas
1. Revisar componente `EnvelopeWelcome` e identificar bloqueo de scroll. [impacto: frontend] — done
2. Cambiar clase Tailwind en `<main>` de `overflow-hidden` a `overflow-x-hidden overflow-y-auto`. [impacto: frontend] — done
3. Validar en viewport pequeño que el scroll vertical funcione y no haya scroll horizontal. [impacto: frontend/tests manuales] — pending
4. Documentar requisitos y tareas en `./junie/requirements-ENVELOPE-WELCOME-SCROLL.md` y este archivo. [impacto: docs] — done
5. Verificación final de compilación y ausencia de regresiones visuales obvias. [impacto: frontend] — pending

## Notas de validación
- Se espera que el cambio sea no disruptivo, ya que sólo afecta overflow del contenedor principal.
- Si se detecta algún contenedor interno forzando altura fija, evaluar ajuste adicional específico.
