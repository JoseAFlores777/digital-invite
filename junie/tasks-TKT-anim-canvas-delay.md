# TKT-anim-canvas-delay — Mejorar inicio de animación de canvas en producción

## Objetivo
Eliminar el retraso (~10s) en producción al iniciar la animación del canvas (secuencia AnilloScrollSequence) inicializando ScrollTrigger de inmediato y cargando frames en paralelo.

## Tareas
1. Revisar `junie/development-standards.md` y alinear solución. [impacto: procesos] — done
2. Analizar `AnilloScrollSequence.tsx` para detectar el cuello de botella (carga secuencial + inicio tardío de ScrollTrigger). [impacto: frontend] — done
3. Refactorizar el efecto principal para:
   - Inicializar ScrollTrigger al inicio (o tras primer frame) sin esperar a todos los frames. [impacto: frontend] — done
   - Cargar imágenes en paralelo y renderizar el primer frame apenas esté listo. [impacto: frontend] — done
   - Mantener manejo de `resize`/`orientationchange` y `prefers-reduced-motion`. [impacto: frontend] — done
4. Validar integración con `page.tsx` y componentes relacionados (Loader/Envelope). [impacto: frontend] — done
5. Nota: Migrar Lottie del Loader a hosting local es opcional y fuera de alcance inmediato. Documentado para seguimiento. [impacto: frontend] — n/a

## Notas
- Se evitó introducir dependencias externas.
- No se alteró la API del componente.
- La solución es progresiva: el scroll responde al instante y el primer frame se pinta en cuanto carga.

## Pendientes de verificación manual
- Prueba en dispositivos móviles reales para confirmar ausencia de saltos y correcta respuesta del scroll.
- Medir TTI/TBT si aplica.
