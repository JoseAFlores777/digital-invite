# Requisitos — WEDDING-HEADER

Objetivo: Crear un componente reutilizable que muestre el logo de la boda, el título, un subtítulo y la fecha/hora del evento manteniendo tipografía y colores del proyecto.

Alcance:
- Ubicación: `src/components/WeddingHeader.tsx`.
- Debe renderizar el SVG `public/wedding-Logo.svg`.
- Título por defecto: "Boda Clari y Jose" (configurable por props).
- Subtítulo opcional (prop), por defecto: "Invitación de boda".
- Fecha y hora: obtener desde `fetchWeddingGeneralities` y formatear en español (es-ES).
- Usar tipografías/clases existentes (ej.: `display-font`, `text-foreground`) y utilidades Tailwind del proyecto.
- No agregar dependencias externas.

Criterios de aceptación:
- El componente muestra el logo centrado, el título con la tipografía display, el subtítulo en tono neutro y debajo la fecha/hora si está disponible.
- Si no hay fecha/hora en los datos, el componente sigue mostrando logo, título y subtítulo sin errores.
- Integrado en la página `/gifts` en la parte superior sin romper el layout.
