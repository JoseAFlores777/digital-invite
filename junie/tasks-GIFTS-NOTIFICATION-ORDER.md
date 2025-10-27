# Tasks — GIFTS-NOTIFICATION-ORDER

Issue: "quiero que este boton este debajo del boton de option.redirectBtn.url como con una division abajo"

1. Revisar estándares en ./junie/development-standards.md. [impacto: proceso] ✓
2. Analizar el footer del modal en `src/components/Gift.tsx` para ubicar el orden y los contenedores existentes. [impacto: frontend] ✓
3. Reordenar el render del footer para que:
   - Se muestre primero el botón de `option.redirectBtn.url` cuando exista. [impacto: frontend] ✓
   - Si también existe `gift_notification_link`, insertar un divisor sutil entre ambos (línea `h-px`). [impacto: frontend] ✓
   - Debajo del divisor, mantener el texto explicativo y el botón "Notifica de envia de regalo". [impacto: frontend] ✓
4. Verificar estados condicionales: sólo redirect, sólo notify, ambos. [impacto: frontend] ✓
5. Mantener botones `fullWidth` y estilo consistente. [impacto: frontend] ✓
6. Validar compilación local (sin cambios de backend). [impacto: tests/manual]

Notas:
- Cambio mínimo y localizado en `Gift.tsx`. No se modifican servicios ni interfaces.
- Se conserva la explicación del botón de notificación por encima de dicho botón.
