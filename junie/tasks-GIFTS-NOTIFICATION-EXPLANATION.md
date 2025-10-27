# Tasks — GIFTS-NOTIFICATION-EXPLANATION

Issue: "arriba del boton de notifica el regalo agrega una breve explicacion del proposito de este boton"

1. Revisar estándares en ./junie/development-standards.md. [impacto: proceso] ✓
2. Identificar el lugar exacto del botón en `src/components/Gift.tsx` (footer del modal de GiftDialog). [impacto: frontend] ✓
3. Agregar breve explicación en texto, visible solo si existe `gift_notification_link`, ubicada encima del botón. [impacto: frontend] ✓
4. Mantener estilos consistentes (tipografía pequeña, color neutro, margen inferior). [impacto: frontend] ✓
5. Validar que no se rompa el layout responsive del footer con 1 o 2 botones. [impacto: tests/manual] *
6. Documentar tareas en este archivo. [impacto: doc] ✓

Notas:
- No requiere cambios de backend ni de servicio; el enlace ya se obtiene desde wedding generalities con `useWeddingData()`.
- Texto agregado: "Este botón te permite notificarnos que ya enviaste tu regalo para poder confirmarlo y agradecerte."