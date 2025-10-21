# Tareas — GIFTS-LIVE-BUTTON

Estado de estándares: No existe `./junie/development-standards.md`; se siguen patrones del proyecto (Next.js App Router, componentes cliente/servidor separados, Tailwind). Si se crea el documento en el futuro, revisar y alinear.

## Lista de tareas
1. Analizar requerimiento: agregar botón "Ver transmisión" arriba de `<Gift />` en `/gifts`. [impacto: frontend] — done ✓
2. Identificar componente reutilizable `LiveStreamButton` y fuente de `live_url` (`fetchWeddingGeneralities`). [impacto: frontend] — done ✓
3. Crear componente cliente `GiftsLiveButton` que lee `live_url` y renderiza `LiveStreamButton` si existe. [impacto: frontend] — done ✓
4. Integrar `<GiftsLiveButton />` en `src/app/gifts/page.tsx` arriba de `<Gift />`, manteniendo la lógica de `wedding_id`. [impacto: frontend] — done ✓
5. Validación manual: navegar a `/gifts?wedding_id=XYZ` y verificar botón cuando hay `live_url`. [impacto: tests/manual] — done ✓
6. Documentar requisitos en `junie/requirements-GIFTS-LIVE-BUTTON.md`. [impacto: docs] — done ✓

## Notas
- No se añadieron dependencias.
- El botón no se muestra cuando no existe `live_url`.
- Se respetó la arquitectura: página servidor, componente cliente para efectos del botón.
