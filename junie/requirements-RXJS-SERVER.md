# Requisitos — RXJS-SERVER

Objetivo: Implementar RxJS en el lado del servidor para el flujo de obtención de invitados digitales, manteniendo compatibilidad hacia las rutas API (Promesa) y sin cambios en el cliente.

Alcance:
- Añadir dependencia `rxjs` al proyecto.
- Crear un servicio server-side basado en RxJS que replique la funcionalidad actual de `getDigitalGuests`.
- Aplicar reintentos y timeout básicos en el pipeline RxJS, con fallback a filtrado en cliente si es necesario.
- Mantener la firma de salida como `Promise<Guest[]>` para el consumo desde rutas API.
- Actualizar una ruta de API para usar el nuevo servicio RxJS, sin cambiar el contrato de respuesta.

Criterios de aceptación:
- Existe `src/server/services/guests.rx.service.ts` exportando `getDigitalGuestsRx(): Promise<Guest[]>`.
- La ruta `GET /api/digital-guests` usa `getDigitalGuestsRx` y responde `{ guests }`.
- Manejo de errores: respuesta `500` con `{ guests: [], error: "failed_to_fetch" }` preservado.
- No hay cambios en UI.
- El proyecto compila sin errores de tipos.

No Alcance (por ahora):
- Integración de RxJS en otros servicios.
- Pruebas automatizadas nuevas (se documenta la decisión por alcance mínimo).
- Manejo de cancelación atada al request (posible mejora futura).
