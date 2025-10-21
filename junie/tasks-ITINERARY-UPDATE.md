# Tareas — ITINERARY-UPDATE

Estado de estándares: No existe ./junie/development-standards.md en el repo; se siguen patrones del proyecto (Next.js App Router, TypeScript, Tailwind, Iconify, hooks gsap). No se introducen dependencias nuevas.

1. Analizar componente actual Itinerary y su uso en InvitationContent. [impacto: frontend] — done
2. Definir nuevo modelo de datos `EventItem` (icon, title, time, location, address, mapUrl, description). [impacto: frontend/TS] — done
3. Reemplazar grid de pasos por tarjetas con borde, icono circular, hora, descripción y bloque de dirección + botón "Cómo llegar". Adaptar estilos a tokens existentes (display-font, palette neutral, var(--color-dusty-*)), sin shadcn. [impacto: frontend/UI] — done
4. Mantener animación con `useGsapContext`; actualizar selector de animación a `[data-anim="card"]`. [impacto: frontend/anim] — done
5. Validar compilación y tipos (conceptual): sin errores de imports ni tipos. [impacto: build] — done
6. Documentar cambios en este archivo y señalar que no hay pruebas asociadas. [impacto: docs] — done

Notas:
- Íconos: `solar:church-bold`, `solar:confetti-minimalistic-bold`, `solar:clock-circle-bold`, `solar:map-point-bold` usando @iconify/react.
- Se conserva el id de sección `#itinerario` y la tipografía `display-font`.
- No se tocaron otros componentes.
