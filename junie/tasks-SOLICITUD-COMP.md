# Tasks — SOLICITUD-COMP

Estado de estándares: No existe ./junie/development-standards.md en el repo; se siguen patrones existentes (Next.js App Router, TypeScript, Tailwind + SCSS Modules, servicios Directus con @directus/sdk y RxJS donde aplica).

Asunciones:
- solicitudId corresponde al id de la invitación (Invitations.id) en Directus.
- El cambio de estado se realizará sobre Guests.rsvp_status (y rsvp_at).

Tareas
1. Crear endpoint GET /api/invitation-by-id?id=… que devuelva una invitación con sus invitados. [impacto: backend] — done ✓
2. Crear endpoint PATCH /api/guest-status para actualizar rsvp_status/rsvp_at del invitado. [impacto: backend] — done ✓
3. Agregar cliente API en src/lib/api/solicitudes.ts con funciones fetchInvitationById y patchGuestStatus. [impacto: frontend] — done ✓
4. Crear componente UI src/components/SolicitudManager.tsx que reciba solicitudId y permita cambiar estado (confirmado/pendiente/rechazado). [impacto: frontend] — done ✓
5. Crear página src/app/solicitud/page.tsx que lea ?solicitudId= y renderice el componente. [impacto: frontend] — done ✓
6. Estilos: adaptar al tema actual (variables color: var(--color-…)). [impacto: frontend] — done ✓
7. Pruebas: pendiente integrar pruebas e2e o unitarias al tener backend disponible. [impacto: tests] — pending 

Notas
- Se reutilizan tipos/estructuras de directus-interfaces.ts.
- Para status UI -> Directus se mapea a Guests.rsvp_status ("confirmed" | "pending" | "declined").
- Si se requiere persistir invitation_status en lugar de rsvp_status, ajustar /api/guest-status y el cliente.

# Tasks — SOLICITUD-COMP

Estado de estándares: No existe ./junie/development-standards.md en el repo; se siguen patrones existentes (Next.js App Router, TypeScript, Tailwind + SCSS Modules, servicios Directus con @directus/sdk y RxJS donde aplica).

Asunciones:
- solicitudId corresponde al id de la invitación (Invitations.id) en Directus.
- El cambio de estado se realizará sobre Guests.rsvp_status (y rsvp_at).

Tareas
1. Crear endpoint GET /api/invitation-by-id?id=… que devuelva una invitación con sus invitados. [impacto: backend] — done ✓
2. Crear endpoint PATCH /api/guest-status para actualizar rsvp_status/rsvp_at del invitado. [impacto: backend] — done ✓
3. Agregar cliente API en src/lib/api/solicitudes.ts con funciones fetchInvitationById y patchGuestStatus. [impacto: frontend] — done ✓
4. Crear componente UI src/components/SolicitudManager.tsx que reciba solicitudId y permita cambiar estado (confirmado/pendiente/rechazado). [impacto: frontend] — done ✓
5. Crear página src/app/solicitud/page.tsx que lea ?solicitudId= y renderice el componente. [impacto: frontend] — done ✓
6. Estilos: adaptar al tema actual (variables color: var(--color-…)). [impacto: frontend] — done ✓
7. Pruebas: pendiente integrar pruebas e2e o unitarias al tener backend disponible. [impacto: tests] — pending 
8. Integrar SolicitudManager dentro del flujo principal (src/app/page.tsx) como una sección adicional con id="#solicitud". [impacto: frontend] — done ✓
9. Navegación por hash: si hay hash en la URL, auto-abrir el flujo (ocultar sobre) y hacer scroll al ancla correspondiente al montar el contenido. [impacto: frontend] — done ✓

Notas
- Se reutilizan tipos/estructuras de directus-interfaces.ts.
- Para status UI -> Directus se mapea a Guests.rsvp_status ("confirmed" | "pending" | "declined").
- Si se requiere persistir invitation_status en lugar de rsvp_status, ajustar /api/guest-status y el cliente.



# Addenda — Modal y Generalidades de Boda

Tareas adicionales
8. Crear servicio getWeddingLocation (wedding_events->venue) para obtener location. [impacto: backend] — done ✓
9. Crear API GET /api/wedding-generalities que combine generalidades + location. [impacto: backend] — done ✓
10. Cliente fetchWeddingGeneralities en src/lib/api/solicitudes.ts. [impacto: frontend] — done ✓
11. SolicitudManager: soportar modo modal via prop asModal/open/onClose. [impacto: frontend] — done ✓
12. SolicitudManager: encabezado con fecha/hora inicio (start_time) y location (venue/address) consumiendo la nueva API. [impacto: frontend] — done ✓



# Changelog — 2025-10-05
- Corrección: ReferenceError `asModal is not defined` en `src/components/SolicitudManager.tsx`.
  - Causa: el componente referenciaba `asModal`, `open`, `onClose` sin desestructurarlos de las props.
  - Fix: se desestructuraron props en la firma del componente con valores por defecto: `asModal = false`, `open = true`, `onClose`.
  - Impacto: frontend — evita error en tiempo de ejecución y habilita el modo modal correctamente. ✓


# Tareas — Modal con CTA de Confirmación (2025-10-05)
1. Agregar botón “Confirmar asistencia” en `src/app/page.tsx` que abra `SolicitudManager` en modo modal. — done ✓
2. Renderizar `SolicitudManager` con `asModal` y props `open/onClose` controladas por estado local. — done ✓
3. Mejorar `SolicitudManager` en modo modal: barra de acciones con dos opciones grandes “Asistiré” y “No asistiré” que actualicen a todos los invitados. — done ✓
4. Optimización móvil: modal en bottom-sheet en móviles, botones de acción full‑width, ocultar “Pendiente” en controles por invitado cuando es modal. — done ✓
5. Mantener controles por invitado en vista de sección (no modal). — done ✓
