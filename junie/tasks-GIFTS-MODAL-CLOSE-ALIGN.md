# Tasks — GIFTS-MODAL-CLOSE-ALIGN

Contexto: Los botones de cerrar (×) dentro del modal de Gifts deben estar alineados a la derecha.

Estado de estándares: No existe `./junie/development-standards.md`; se siguen patrones actuales (Next.js App Router, TS, Tailwind v4). Cambios mínimos y acotados al componente afectado.

## Tareas
1. Revisar el header del `GiftDialog` en `src/components/Gift.tsx` para confirmar estructura y clases existentes. [impacto: frontend] — done ✓
2. Asegurar que el contenedor del header ocupe todo el ancho agregando `w-full`. [impacto: frontend] — done ✓
3. Hacer que el título use `flex-1` para empujar el botón de cierre al extremo derecho, manteniendo `ml-auto` en el botón. [impacto: frontend] — done ✓
4. Añadir `shrink-0` al botón para evitar compresión en layouts estrechos. [impacto: frontend] — done ✓
5. Validación rápida: compilar y verificar visualmente que el botón quede pegado al borde derecho del modal en distintos anchos. [impacto: QA] — pending

## Notas
- Se mantiene la disposición actual (icono + título + botón cerrar) pero garantizando que el botón quede a la derecha en todo el ancho del modal.
- Cambios no afectan otros botones ni estilos del modal.
