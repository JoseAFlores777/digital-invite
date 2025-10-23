# Tasks – SOLICITUD-TOOLTIP

Ticket: SOLICITUD-TOOLTIP

Objetivo: Agregar un ícono con animación pulse que, al presionarlo, despliegue un tooltip con explicación junto al aviso de cuenta regresiva (deadline) en SolicitudManager.

## Tareas
1. Auditar el bloque de "Countdown / Notice" en `SolicitudManager.tsx`. (impacto: frontend) — done
2. Agregar estado local y referencia para controlar la visibilidad del tooltip. (impacto: frontend) — done
3. Implementar botón con `animate-pulse` y accesibilidad (aria-expanded, role=tooltip). (impacto: frontend) — done
4. Cerrar tooltip en click fuera y tecla ESC. (impacto: frontend) — done
5. Ajustar layout para mostrar el botón a la par del badge en ambos estados (activo/finalizado). (impacto: frontend) — done
6. Validar que no se introduzcan dependencias nuevas y que compile. (impacto: tests/manual) — pending

## Notas
- Se evitó agregar nuevos iconos externos; se usa un botón circular con "?" para mantener cero dependencias.
- Texto del tooltip: breve y claro sobre el funcionamiento del tiempo de confirmación.
- Si se requiere también un ícono por cada opción de estado (Confirmar/Pendiente/Rechazar), se puede extender de forma similar cerca de cada botón.
