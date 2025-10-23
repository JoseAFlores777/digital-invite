# Tareas – Configurar dominio remoto para next/image (Ticket: IMG-CONFIG-PICSUM)

Estado de estándares: No existe `./junie/development-standards.md`; se siguieron patrones del proyecto (Next.js App Router, TS) y guía oficial de `next/image` (context7/Next.js).

## Lista de tareas
1. Detectar error en runtime por dominio no configurado (picsum.photos) usado por `PerspectiveZoom` con `next/image`. [impacto: frontend/runtime] – done ✓
2. Actualizar `next.config.ts` para permitir `picsum.photos` (domains + remotePatterns `/seed/**`). [impacto: build] – done ✓
3. Validar que no queden otros hosts remotos sin configurar en componentes con `next/image`. [impacto: QA] – in progress *
4. Documentar cambios y próximos pasos. [impacto: docs] – done ✓

## Notas
- `PerspectiveZoom` genera imágenes por defecto desde `https://picsum.photos/seed/.../600/600`. Next.js requiere configurar el host para `next/image`.
- Se añadió `images.domains = ["picsum.photos"]` y `remotePatterns` específico.
- TTL de caché de imágenes se mantiene en 30 días.

## Pendientes / Revisión humana
- Si se migra a un proveedor diferente de imágenes aleatorias o se reemplaza por assets locales, remover dominio de `picsum.photos` para minimizar superficie externa.
- Confirmar en entorno real (Turbopack) que ya no aparece la advertencia `next-image-unconfigured-host` y que el layout visual de `PerspectiveZoom` se mantiene estable.