# Tasks — SCROLL-CONDITIONAL-ADMIN-LIST

1. Revisar estándares de desarrollo y contexto previo de scroll interno. [impacto: proceso] ✓
2. Identificar contenedor del card y lista de ítems en `AdminInvitationsList`. [impacto: frontend] ✓
3. Implementar medición de altura del card vs `window.innerHeight`. [impacto: frontend] ✓
   - Agregar `ref` al card. ✓
   - Estado booleano `listShouldScroll`. ✓
   - `useEffect` con `ResizeObserver` y `resize` para actualizar. ✓
4. Aplicar clases condicionales al `<ul>`: solo `max-h-[60vh] overflow-y-auto` si `listShouldScroll` es `true`. [impacto: frontend] ✓
5. Validación manual: distintos tamaños de ventana y cantidades de datos; verificar que no haya scroll interno cuando el card < 100vh. [impacto: tests] *
6. Documentar en `junie/requirements-SCROLL-CONDITIONAL-ADMIN-LIST.md` y actualizar este archivo. [impacto: documentación] ✓
