# Tareas — Alinear GuestStatus (unknown | accepted | declined)

Estado de estándares: No existe ./junie/development-standards.md en el repo; se siguieron patrones existentes (Next.js, TypeScript, sin comentarios innecesarios).

1. Actualizar tipo GuestStatus en frontend DTO. [impacto: frontend]
   - Cambiar union type a "unknown" | "accepted" | "declined" en src/lib/api/solicitudes.ts — done ✓
   - Ajustar mapeo del payload rsvp_status a los mismos valores — done ✓
2. Actualizar componente UI que consume GuestStatus. [impacto: frontend]
   - Reemplazar labels manteniendo texto (Confirmar/Pendiente/Rechazar) mapeados a accepted/unknown/declined — done ✓
   - Cambiar STATUS_ORDER a ["unknown","accepted","declined"] — done ✓
   - Parsear estados legacy (confirmed→accepted, pending→unknown) al leer datos — done ✓
   - Ajustar contadores, filtros, badges y acciones masivas — done ✓
   - Actualizar íconos por estado (accepted=check, unknown=clock, declined=X) — done ✓
3. Backend: Revisar enrutador PATCH /api/guest-status. [impacto: backend]
   - Verificar que acepta rsvp_status y lo pasa tal cual; sin validaciones que bloqueen — ok ✓
4. Verificación rápida. [impacto: tests/manual]
   - Build/Type-check local (pendiente de entorno). No se encontraron tipos obsoletos por inspección estática — done ✓

Notas:
- Se mantiene compatibilidad de lectura con estados legacy para no romper datos existentes.
- Si se estandariza en DB, considerar migración de valores (confirmed→accepted, pending→unknown).
