# Tareas — HYDRATION-LIVE

1. Analizar error de hidratación en /live (Countdown muestra texto dinámico SSR vs CSR). [impacto: frontend] — done
2. Identificar causa: uso de Date.now() en SSR a través de useCountdown produce desajustes de segundos. [impacto: frontend] — done
3. Mitigación mínima: agregar `suppressHydrationWarning` al nodo de texto del contador en `Countdown.tsx`. [impacto: frontend] — done
4. Validación manual: iniciar app, abrir /live y verificar ausencia de error de hidratación y correcto tick. [impacto: tests] — pendiente
5. Alternativa (si persiste): gatear render de valores hasta `mounted` o inicializar a ceros sólo en CSR. [impacto: frontend] — pendiente

Notas:
- Se mantiene la accesibilidad (aria-live="polite").
- No se alteró la lógica de `useCountdown`; sólo se evitó el mismatch de hidratación en el valor visible.
