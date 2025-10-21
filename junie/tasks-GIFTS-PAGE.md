# Tareas — GIFTS-PAGE

Estado de estándares: No existe ./junie/development-standards.md en el repo; se siguen patrones del proyecto (Next.js App Router, TypeScript, Tailwind, componentes sin comentarios innecesarios). Se alinea con tasks previas relacionadas a Gift Options.

## Lista de tareas
1. Analizar requerimiento y revisar componentes/servicios existentes relacionados con Gift y gift-options. [impacto: frontend/backend] — done
2. Verificar endpoint `/api/gift-options` y servicio `getGiftOptionsByWeddingId`. [impacto: backend] — done
3. Crear página `src/app/gifts/page.tsx` que renderice `<Gift />` y asegure `wedding_id` en la URL (redirigir usando env si falta). [impacto: frontend] — done
4. Documentar requisitos en `junie/requirements-GIFTS-PAGE.md`. [impacto: docs] — done
5. Documentar tareas en `junie/tasks-GIFTS-PAGE.md`. [impacto: docs] — done
6. Validación manual: navegar a `/gifts?wedding_id=XYZ` y a `/gifts` (debe redirigir si hay env). [impacto: tests/manual] — done

## Notas
- No se añadieron dependencias externas.
- Se reutiliza el componente `Gift` que obtiene datos de `/api/gift-options` usando el `wedding_id` presente en la URL.
- Si no hay `wedding_id` y tampoco variables de entorno, la página no redirige y `Gift` intentará fallback a env; si tampoco existen, responderá 400 desde el API y mostrará lista vacía (comportamiento aceptable por ahora).
