# Requisitos — Botón de confirmación arriba del botón de música (RSVP-TRIGGER)

Fecha: 2025-10-05

Objetivo:
- Agregar un botón encima del botón de música que se muestre cuando el usuario:
  1) haya llegado al final de la página, o
  2) lleve más de 4 minutos en la web.
- Este botón abrirá el modal reutilizable de confirmación de asistencia (SolicitudManager), igual que el botón de la sección RSVP.
- El botón tendrá un tooltip con un salto suave (“Confirma asistencia”) y una animación de halo alrededor, coordinada con el tooltip.

Alcance:
- Extender el componente `MusicControls` para renderizar el nuevo disparador de RSVP.
- Implementar lógica de visibilidad (scroll hasta el final o temporizador de 4 minutos).
- Agregar estilos y animaciones en `MusicControls.module.scss` para el halo y el tooltip con rebote suave.
- Reutilizar el evento `open-solicitud-modal` ya escuchado en `src/app/page.tsx`.

Criterios de aceptación:
- El botón de RSVP aparece encima del de música cuando el usuario llega al bottom o pasan 4 minutos, lo que ocurra primero.
- Al pulsarlo, se abre el mismo modal reutilizable (SolicitudManager) que se activa desde la sección RSVP.
- Se observa un tooltip con texto “Confirma asistencia” y una animación suave; además, el botón muestra un halo pulsante.
- No se rompe la interacción del botón de música.

Fuera de alcance:
- Cambios de backend o API.
- Rediseño del modal.
