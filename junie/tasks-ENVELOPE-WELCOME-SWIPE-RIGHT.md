# Tareas – Envelope Welcome Swipe-Right Hint

Estado de estándares: No existe ./junie/development-standards.md en el repo; se siguen patrones del proyecto (Next.js + TypeScript + Tailwind) y consistencia con componentes existentes (ScrollIdleHintOverlay, Loader con DotLottieReact).

## Lista de tareas
1. Revisar requisitos de la pantalla Envelope Welcome y confirmación de activos Lottie (swipe-right.json). [impacto: frontend] – done
2. Crear componente reutilizable `SwipeRightHintOverlay` basado en `ScrollIdleHintOverlay` con ciclo (espera 10s → muestra 10s → espera 10s). [impacto: frontend] – done
3. Mostrar sólo en dispositivos táctiles por defecto; opción para desktop vía prop. [impacto: frontend] – done
4. Estilos: overlay fondo blanco translúcido, animación tamaño grande, título "Desliza hacia la derecha". [impacto: frontend] – done
5. Integrar overlay en `EnvelopeWelcome` y asegurar cleanup al desmontar (al entrar a InvitationContent). [impacto: frontend] – done
6. Build de producción para validar compilación. [impacto: tests/manual] – done
7. Alinear comportamiento de espera y reglas con `ScrollIdleHintOverlay` (delaysMs cíclico, idleGrace, persistente hasta gesto, reschedule tras ocultar). [impacto: frontend] – done
8. Mantener compatibilidad hacia atrás con `intervalMs` en `SwipeRightHintOverlay`. [impacto: frontend] – done

## Notas y decisiones
- Ciclo implementado con cadena de `setTimeout` para evitar derivas de `setInterval` y facilitar cleanup.
- Timers se limpian en unmount; al abandonar EnvelopeWelcome (abrir invitación) el listener se cancela automáticamente.
- Se usa `/public/lottie/swipe-right.json` para la animación.
- No se añadieron dependencias nuevas.

## Pendientes de validación manual
- Verificar overlay en dispositivos táctiles reales.
- Ajustar copy/tiempos si el cliente lo requiere (props `title`, `intervalMs`).
