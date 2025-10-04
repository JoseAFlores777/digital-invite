# Requisitos: Centrar siempre el headingContent

Objetivo: Asegurar que el contenido pasado en `headingContent` de `PerspectiveZoom` quede siempre centrado en pantalla.

Contexto:
- `PerspectiveZoom` centra el wrapper del heading mediante `absolute + translate(-50%, -50%)`.
- Se estaba pasando `<BiblicalVerse_1 />` sin `inline`, lo que envolvía el contenido en una `<section>` con `min-h-[100svh]`, generando discrepancias visuales dentro del wrapper absoluto.

Alcance de la solución:
- Usar `inline` en `BiblicalVerse_1` cuando se renderiza dentro de `headingContent` para retornar solo el bloque interno y preservar el centrado absoluto del contenedor.

Criterios de aceptación:
- El heading se visualiza centrado tanto horizontal como verticalmente en todos los tamaños de pantalla.
- `InvitationContent` utiliza `<BiblicalVerse_1 inline .../>` al pasarlo a `headingContent`.
- No se introducen efectos colaterales en el resto de secciones.

Notas:
- No existe `./junie/development-standards.md` en el repo; se siguen patrones observados (Tailwind, GSAP, SSR-safe).
- Cambios mínimos; no se alteran APIs públicas de componentes.
