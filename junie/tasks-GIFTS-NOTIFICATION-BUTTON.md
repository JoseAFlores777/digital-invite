# Tasks — GIFTS-NOTIFICATION-BUTTON

Issue: Dentro del modal de cada opción de pago en Gifts, agregar botón en el footer: "Notifica de envia de regalo" con efecto shine. El enlace debe venir de wedding generalities `gift_notification_link`.

1. Revisar estándares en ./junie/development-standards.md. [impacto: proceso] ✓
2. Analizar `src/components/Gift.tsx` para ubicar el footer del modal y confirmar layout. [impacto: frontend] ✓
3. Leer `gift_notification_link` desde wedding-generalities usando `useWeddingData()` con rutas tolerantes (wg.wedding.gift_notification_link | wg.gift_notification_link | wg.generalities.gift_notification_link). [impacto: datos/frontend] ✓
4. Renderizar botón `CustomBtn` label exacto "Notifica de envia de regalo" con `shine`, `target="_blank"`, y `fullWidth`, a la par del botón existente de redirect si aplica. [impacto: frontend] ✓
5. Mostrar el botón solo si existe `gift_notification_link`. Mantener layout responsive (flex columna en mobile, fila en sm+). [impacto: frontend] ✓
6. Validar no romper otros flujos (modal abre/cierra, copy to clipboard). [impacto: tests/manual] *
7. Documentar tareas y resultado. [impacto: doc] ✓

Notas:
- Cambios mínimos, sin tocar backend. Se reutiliza `useWeddingData` (cache de `/api/wedding-generalities`).
- Se usa `CustomBtn` con `fullWidth` y efecto shine para consistencia visual.
