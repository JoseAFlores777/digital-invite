# Tareas — FONT-FIX / Inspector-Port

Estado de estándares: No existe ./junie/development-standards.md en el repo. Se sigue la guía del proyecto y se documenta el cambio.

1. Error Turbopack + next/font: "Module not found: Can't resolve '@vercel/turbopack-next/internal/font/google/font'" — investigar y aislar. [impacto: frontend] — done
2. Sustituir next/font por carga vía Google Fonts <link> para evitar dependencia interna de Turbopack. [impacto: frontend] — done
   - Editar src/app/layout.tsx: quitar import de ./fonts y agregar <head> con preconnect + stylesheet.
   - Simplificar clase de <body> (variables ya definidas en CSS global).
3. Definir variables de fuente en CSS global para mantener Tailwind y estilos existentes. [impacto: frontend] — done
   - Editar src/app/globals.scss para asignar:
     --font-display, --font-sans, --font-script, --font-display-serif, --font-body.
4. Eliminar conflicto de inspector: remover flag NODE_OPTIONS='--inspect' del script dev. [impacto: tooling] — done
   - package.json: "dev": "next dev --turbopack".
5. Verificación: buscar imports restantes de 'next/font'. [impacto: frontend] — done
   - src/app/fonts.ts queda sin uso; mantener por ahora (no bloquea compilación). Se puede limpiar en otra tarea.

Notas:
- Tailwind ya mapea fontFamily a var(--font-...) en tailwind.config.js; con las variables definidas en globals.scss, no cambia el resto de componentes.
- Si se desea volver a next/font, revisar compatibilidad de Turbopack/versión de Next; mientras tanto, el enlace a Google Fonts es estable.
