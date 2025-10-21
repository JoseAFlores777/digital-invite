# Requisitos — WEDDING-HEADER-BG

Objetivo: Agregar un prop en `WeddingHeader` para controlar el fondo. Si el fondo es `secondary`, debe usar `var(--color-dusty-500)` y cambiar los colores del contenido para garantizar contraste. Si es `primary`, se mantiene el comportamiento actual.

Alcance:
- Componente: `src/components/WeddingHeader.tsx`.
- Nuevo prop: `backgroundVariant?: "primary" | "secondary"` (por defecto `primary`).
- Cuando `secondary`:
  - Aplicar `backgroundColor: var(--color-dusty-500)` al header.
  - Cambiar color de textos a blanco (o variantes `text-white/…`) para contraste.
  - Ajustar el color del logo a blanco para contraste por defecto.
- No agregar dependencias externas ni modificar otras rutas/páginas.

Criterios de aceptación:
- `<WeddingHeader backgroundVariant="secondary" />` muestra el header con fondo `var(--color-dusty-500)`, textos en blanco y el logo en blanco.
- `<WeddingHeader />` (o `backgroundVariant="primary"`) mantiene el look actual.
- La página `/gifts` compila y renderiza como antes (sigue en `primary` por defecto) sin romper botón de transmisión ni lista de regalos.