# Requisitos: PerspectiveZoom blanco + contenido bíblico

Objetivo: Ajustar el componente `PerspectiveZoom` para que use tema blanco y permitir que el heading sea un componente (por ejemplo `biblical-verse_1.tsx`), mientras el quote muestre un versículo bíblico.

Requisitos funcionales:
- Tema por defecto blanco (fondos claros y texto oscuro) en `PerspectiveZoom`.
- Permitir sustituir el contenido del heading por un `ReactNode` (slot) a través de `headingContent`.
- Mantener soporte de `headingText`/`quoteText` con nuevos defaults acordes al tema (quote con versículo bíblico en español).
- Conservar animación GSAP/ScrollTrigger actual (heading entra en Z, items por capas, quote con split básico).
- Compatibilidad SSR (sin acceso a `window` fuera de efectos) y limpieza de animaciones.

Requisitos no funcionales:
- Cambios mínimos y sin dependencias nuevas.
- Respetar patrones existentes (Tailwind, GSAP, `useGsapContext`).
- Reutilizar `biblical-verse_1.tsx` agregando un modo `inline` para incrustar el contenido sin `<section>` envolvente.

Criterios de aceptación:
- `PerspectiveZoom` renderiza con `bg-white` y `text-neutral-900` y su sección de quote también en claro.
- Existe prop `headingContent?: React.ReactNode` y, si se pasa, se usa dentro del wrapper animado del heading.
- `biblical-verse_1.tsx` soporta `inline?: boolean` que devuelve solo el bloque interno.
- `InvitationContent` usa `headingContent={<BiblicalVerse_1 inline .../>}` y establece `quoteText` con un versículo bíblico.
