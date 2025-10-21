# Tasks — GIFT-CUSTOMBTN-REFACTOR

Contexto: Refactorizar todos los botones dentro del componente `<Gift/>` para usar el componente reutilizable `CustomBtn`, manteniendo funcionalidad y evitando problemas de hidratación.

Estado de estándares: No existe `./junie/development-standards.md`; se siguen patrones actuales (Next.js App Router, TS, Tailwind v4). Cambios mínimos, sin dependencias nuevas.

## Tareas
1. Reemplazar importación de `GiftsShareButton` por `CustomBtn` en `src/components/Gift.tsx`. [impacto: frontend] — done ✓
2. Sustituir el botón/anchor de compartir (debajo del título) por `CustomBtn` usando `shareHref` pasado por props (SSR-safe). [impacto: frontend/SSR] — done ✓
3. Reemplazar la tarjeta clicable de cada opción (button) por `CustomBtn` con `onClick` y `children` para conservar el layout interno. [impacto: frontend] — done ✓
4. Reemplazar el anchor "Hablar con la pareja" por `CustomBtn` (href externo, variant="primary", icono WhatsApp). [impacto: frontend] — done ✓
5. Reemplazar el botón de cierre (×) del diálogo por `CustomBtn` (onClick, ariaLabel, size="sm"). [impacto: frontend] — done ✓
6. Reemplazar el botón "Copiar" de cada detalle por `CustomBtn` usando `children` para mantener el `iconRef` y la animación. [impacto: frontend] — done ✓
7. Reemplazar el anchor de redirección del diálogo por `CustomBtn` (href, icon opcional, variant="primary"). [impacto: frontend] — done ✓
8. Validar determinismo SSR/CSR: el único href dinámico proviene de `shareHref` calculado en Server Component de `/gifts` y se pasa por props. [impacto: QA] — pending *
9. Corregir parpadeo en instancias de `CustomBtn` al cambiar icon/label dinámicamente: mover `Wrapper` fuera del cuerpo del componente para estabilizar la identidad. [impacto: frontend/perf] — done ✓
10. Envolver `CustomBtn` en `React.memo` para evitar re-renders cuando las props no cambian. [impacto: frontend/perf] — done ✓
11. QA manual en flujo Gift: abrir modal, presionar botones de copiar y cierre; verificar que no parpadeen otros botones. [impacto: QA] — pending *

## Notas
- `CustomBtn` permite usar `children` para contenido totalmente custom; se aprovechó para conservar el icono dinámico y el `ref` del botón de copiar.
- Se mantuvieron las clases utilitarias originales mediante `className` de `CustomBtn` para cambios visuales mínimos.
- No se tocó lógica de datos ni endpoints.
