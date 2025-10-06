# Tareas — Botón de confirmación arriba del botón de música (RSVP-TRIGGER)

Fecha: 2025-10-05

Resumen del alcance:
- Agregar un botón sobre el control de música que aparezca cuando el usuario llegue al final de la página o después de 4 minutos.
- Al hacer clic, abrir el modal reutilizable de `SolicitudManager` (igual que el botón de la sección RSVP).
- Incluir tooltip con salto suave y animación de halo alrededor del botón, sincronizados.

Tareas
1. Revisar estándares `./junie/development-standards.md` y contexto MCP. [impacto: procesos] — no existe archivo, se siguen convenciones actuales ✓
2. Implementar lógica de visibilidad en `MusicControls.tsx` (scroll al bottom o timeout de 4 minutos). [impacto: frontend] — done ✓
3. Crear botón RSVP encima del botón de música y despachar `open-solicitud-modal`. [impacto: frontend] — done ✓
4. Agregar estilos/animaciones (halo y tooltip con rebote) en `MusicControls.module.scss`. [impacto: frontend] — done ✓
5. Verificar que `page.tsx` escucha `open-solicitud-modal` y abre `SolicitudManager`. [impacto: frontend] — done ✓
6. Validación manual: 
   - Scroll hasta el final muestra el botón. [impacto: QA]
   - Espera 4 minutos también lo muestra. [impacto: QA]
   - Clic abre el modal, tooltip visible con animación, halo pulsante. [impacto: QA]
   - No interfiere con el botón de música. [impacto: QA]

Notas:
- Cambios mínimos y confinados al frontend.
- No se tocan APIs ni lógica de negocio.
