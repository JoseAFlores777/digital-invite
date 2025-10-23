# Tareas – Fix parse error next/image (Ticket: IMG-PARSE-FIX)

Estado de estándares: No existe `./junie/development-standards.md`; se siguen patrones del proyecto (Next.js App Router, TS, Tailwind) y guías de `next/image` (context7).

## Lista de tareas
1. Buscar ocurrencias de `httpsum.photos` en el repo. [impacto: frontend] – done ✓
2. Corregir URL mal formada en `src/components/InvitationContent.tsx` (reemplazar por `https://picsum.photos/...`). [impacto: frontend] – done ✓
3. Limpiar `next.config.ts`: eliminar `remotePatterns` para `httpsum.photos` (host inválido). [impacto: build] – done ✓
4. Verificación: búsqueda final de `httpsum.photos` para asegurar 0 restantes. [impacto: QA] – done ✓
5. Validación manual: cargar Home y flujo inicial para confirmar ausencia del error y correcta carga de imágenes. [impacto: QA] – pendiente

## Notas
- `picsum.photos` ya está incluido en `images.domains` y `remotePatterns`.
- Cambios minimalistas, sin afectar lógica de negocio ni agregar dependencias.

## Riesgos / Revisión humana
- Verificar visualmente `PerspectiveZoom` y la sección inicial donde se usa `InvitationContent` para garantizar que todas las imágenes cargan correctamente.
