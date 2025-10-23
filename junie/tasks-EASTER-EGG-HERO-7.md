# Tareas — EASTER-EGG-HERO-7

Contexto: Agregar un easter egg que al hacer click 7 veces seguidas en el Hero redirija a https://youtu.be/s0_ksYbZXgg.

Estado de estándares: No se encontró ./junie/development-standards.md. Se respetan patrones existentes (Next.js + TS + React, sin dependencias nuevas, cambios mínimos y sin comentarios innecesarios).

## Tareas
1. Identificar el componente Hero y punto de montaje del handler. [impacto: frontend] — done
2. Implementar contador de taps con ventana de tiempo para considerar "seguidas" (timeout 800 ms):
   - useState para contador
   - useRef para timeout
   - al llegar a 7, redirigir a la URL indicada
   - limpiar timeout al desmontar [impacto: frontend] — done
3. Conectar el handler al elemento raíz de la sección Hero sin alterar estilos. [impacto: frontend] — done
4. Validar manualmente: 7 taps rápidos redirigen; taps espaciados se reinician. [impacto: tests/manual] — done

## Notas
- No se modificaron estilos ni se añadieron dependencias.
- Umbral de tiempo entre taps: 800 ms para interpretar "sin parar".
- El comportamiento no interfiere con la animación de scroll/zoom existente.
