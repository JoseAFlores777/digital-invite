# Tareas — COUNTDOWN-WEDDING

Estado de estándares: No existe ./junie/development-standards.md en el repo; se siguen patrones del proyecto (Next.js App Router, TypeScript, Tailwind, GSAP hook). Si se agregan estándares, revisar y alinear.

1. Analizar requerimiento: el Countdown debe contar regresivamente según wedding-generalities (date + start_time). [impacto: frontend] — done
2. Revisar Countdown y hook useCountdown; detectar fecha hardcodeada. [impacto: frontend] — done
3. Integrar fetchWeddingGeneralities en Countdown y construir ISO objetivo a partir de date + start_time (fallback 00:00). [impacto: frontend] — done
4. Pasar el ISO dinámico al hook useCountdown, conservando animaciones y UI vigente. [impacto: frontend] — done
5. Mantener fallback local (fecha fija) si el fetch falla; no romper layout. [impacto: frontend] — done
6. Validación manual: verificar que el contador refleja la fecha del backend y llega a "¡Es hoy!" al vencer. [impacto: QA] — pendiente

Notas:
- Se omitió manejo de zona horaria IANA por simplicidad del ticket; se toma date + start_time en zona local del navegador.
- Si en el futuro se requiere precisión por TZ, considerar convertir a Date con la zona de la boda (p. ej. usando Intl/Temporal o librería).