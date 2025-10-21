# Requisitos — LOGO-COLOR

Objetivo: El logo debe mostrarse con el color por defecto `var(--color-dusty-500)` y permitir cambiar dicho color desde las props del componente que lo renderiza.

Alcance:
- Actualizar el componente `WeddingHeader` para admitir props de configuración del logo.
- Evitar advertencias de React relacionadas con atributos SVG inválidos (no reintroducir SVG inline problemático).
- Mantener estilo, tipografías y estructura existentes.

Criterios de aceptación:
- Por defecto, el logo se renderiza con `--color-dusty-500`.
- Es posible cambiar el color del logo pasando una prop (p. ej., `logoColor="#000"` o `logoColor="var(--mi-color)"`).
- La página `/gifts` sigue renderizando `WeddingHeader`, el botón de transmisión (si existe) y el componente `Gift` sin errores.
- No se añaden dependencias externas.
