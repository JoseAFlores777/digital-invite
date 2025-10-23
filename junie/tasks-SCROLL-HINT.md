# Tareas – Scroll Idle Hint Overlay

Estado de estándares: No existe ./junie/development-standards.md en el repo; se siguen patrones del proyecto (Next.js + TypeScript + Tailwind) y consistencia con componentes existentes (uso de DotLottieReact y clases utilitarias).

## Lista de tareas
1. Revisar componentes objetivo y punto de integración en InvitationContent. [impacto: frontend] – done
2. Implementar wrapper reutilizable ScrollIdleHintOverlay con:
   - Observación de inactividad de scroll. [impacto: frontend] – done
   - Configuración de delays por aparición (delaysMs[]) y duración visible (displayDurationMs). [impacto: frontend] – done
   - Render de animación DotLottie usando /public/lottie/swipe-up.json con título debajo. [impacto: frontend] – done
3. Integrar wrapper en InvitationContent para monitorear el scroll del usuario. [impacto: frontend] – done
4. Ajustar overlay según nueva solicitud:
   - Animación más grande y fondo blanco translúcido. [impacto: frontend] – done
   - Persistencia del overlay hasta detectar scroll hacia arriba; al ocultar reinicia el temporizador. [impacto: frontend] – done
   - Detección de dirección de scroll usando scrollY/scrollTop y deltaY de wheel. [impacto: frontend] – done
5. Verificación de compilación y limpieza. [impacto: tests/manual] – pendiente

## Notas y decisiones
- Se añade prop `delaysMs` para permitir modificar el “lapso” cada vez que aparece (secuencial/cíclico).
- La superposición aparece como overlay fijo centrado inferior, no bloquea interacción (pointer-events-none). Ahora permanece visible hasta un scroll ascendente.
- `displayDurationMs` se mantiene por compatibilidad, pero se ignora cuando la persistencia está activa (comportamiento actual solicitado).
- Se mantiene coherencia con el componente Loader que ya usa DotLottieReact.

## Próximos pasos
- Validar visualmente en dispositivos móviles y escritorio.
- Ajustar copy/título si el cliente lo desea.
- Añadir comportamiento diferenciado por dispositivo: táctil (swipe up, ocultar al hacer scroll up) vs escritorio (scroll down, ocultar al hacer scroll down). – done
- Duplicar tamaño del Lottie. – done
- Rotar animación 180° en escritorio para indicar desplazamiento hacia abajo. – done (obsoleto; reemplazado por Lottie específico de desktop)
- Usar Lottie distinto en desktop: /public/lottie/scroll-down.json. – done
- Seleccionar Lottie por dispositivo (touch: swipe-up.json, desktop: scroll-down.json) sin rotación. – done
- Validar visualmente en dispositivos móviles y escritorio.
- Ajustar copy/título si el cliente lo desea.
