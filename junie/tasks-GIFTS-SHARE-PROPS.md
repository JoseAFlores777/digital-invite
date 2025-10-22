# Tasks — GIFTS-SHARE-PROPS

Contexto: Agregar nuevas props `label` e `icon` al componente `GiftsShareButton` para permitir personalizar el texto del botón y el ícono, manteniendo compatibilidad con implementaciones existentes y sin reintroducir problemas de hidratación.

Estado de estándares: No existe `./junie/development-standards.md`; se respetan patrones actuales (Next.js App Router, TS, Tailwind v4, @iconify/react).

## Tareas
1. Extender tipo de props en `src/components/GiftsShareButton.tsx` para incluir `label?: string` e `icon?: string`. [impacto: frontend] — done ✓
2. Asignar valores por defecto (`label: "Compartir regalos"`, `icon: "mdi:whatsapp"`) para no romper usos existentes. [impacto: frontend] — done ✓
3. Reemplazar texto e ícono hardcodeados en el render por las nuevas props. [impacto: frontend] — done ✓
4. Mantener lógica actual de SSR/CSR (uso de `shareHref` cuando está presente y cálculo cliente post-mount cuando no). [impacto: frontend] — done ✓
5. Validar visualmente que no cambie el estilo por defecto y que se pueda personalizar pasando props opcionales. [impacto: QA] — pending *
6. Gift.tsx: agregar prop opcional `finalGifts?` y estado `clientHref` con `useEffect` para construir href de WhatsApp en cliente, replicando la lógica de GiftsShareButton. [impacto: frontend] — done ✓
7. Gift.tsx: actualizar CustomBtn superior para usar `shareHref || clientHref` y evitar render SSR cuando no hay `shareHref` (previene mismatch). [impacto: frontend] — done ✓
8. Corregir error de hidratación: eliminar `typeof window` en el render. Introducir flag `mounted` y condicionar el render del botón de compartir a `(shareHref || (mounted && clientHref))` en Gift.tsx. [impacto: frontend] — done ✓
9. GiftsShareButton.tsx: reemplazar guard `if (!shareHref && typeof window === "undefined") return null;` por `if (!shareHref && !mounted) return null;`. Agregar `mounted` vía `useState` + `useEffect`. [impacto: frontend] — done ✓

## Notas
- No se modificaron los lugares donde se usa el botón; al ser props opcionales, no rompen compilación ni comportamiento existente.
- El `aria-label` ahora incluye el valor de `label` para mejorar accesibilidad.
