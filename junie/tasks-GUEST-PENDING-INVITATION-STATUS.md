# Tasks — GUEST-PENDING-INVITATION-STATUS

1. Revisar estándares en ./junie/development-standards.md y contexto previo de SolicitudManager. [impacto: proceso]
   - Hallazgo: No existe `development-standards.md`; se siguen patrones del repo (Next.js + TS, sin comentarios innecesarios, Tailwind). ✓
2. Analizar flujo de cambio de estado de invitados y puntos de actualización de invitación. [impacto: frontend] ✓
3. Definir reglas de agregación para estado de invitación (accepted_all, declined_all, accepted_partial, sent con pendientes). [impacto: análisis] ✓
4. Implementar cambio mínimo en computeAggregateStatus para retornar `sent` cuando haya pendientes y ningún confirmado. [impacto: frontend] ✓
5. Verificar que maybePatchInvitationStatus se ejecute tras cambios individuales y masivos; mantener onChanged para refrescar lista. [impacto: frontend] ✓
6. Probar manualmente: 
   - Cambiar un invitado a Pendiente con el resto Pendientes → estado invitación "Enviada". 
   - Mezclar Confirmados/Pendientes → "Parcial". 
   - Todos Confirmados → "Confirmada". 
   - Todos Rechazados → "Rechazada". [impacto: tests] *
7. Documentar requisitos y tareas en ./junie/. [impacto: docs] ✓

Notas:
- Sin dependencias nuevas.
- Se respeta arquitectura y estilos.
- Cambios localizados al componente SolicitudManager; API ya soporta estado `sent`. 
