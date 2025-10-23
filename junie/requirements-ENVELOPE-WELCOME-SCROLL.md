# Requisitos: ENVELOPE-WELCOME-SCROLL

Objetivo: Activar el scroll vertical cuando haya overflow en el componente EnvelopeWelcome (pantalla de sobre de bienvenida).

Alcance:
- Permitir desplazamiento vertical si el contenido excede el alto de la ventana.
- No permitir desplazamiento horizontal.
- Mantener estilos y transiciones actuales.

Criterios de aceptación:
- En viewports pequeños, cuando el contenido sobrepase la altura disponible, debe mostrarse scroll vertical y permitir navegar todo el contenido.
- No debe aparecer scroll horizontal.
- No se deben afectar las interacciones existentes (botón deslizante, enlaces de acciones, header).

Notas:
- No existe `./junie/development-standards.md` en el repositorio; se siguen patrones del proyecto (Next.js + TypeScript + TailwindCSS) y la guía de "NO COMENTARIOS" en código salvo necesidad.
