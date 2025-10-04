# Tasks — DIRECTUS-REFACTOR

1. Revisar estándares del proyecto en `./junie/development-standards.md` y documentar hallazgos. [impacto: proceso] — No existe; se siguen patrones del repo (Next.js App Router, TS estricto). — done ✓
2. Auditar uso actual de Directus (tipos, cliente y servicios) y referencias (`getInvitationContent`, `getDigitalGuests`). [impacto: backend] — done ✓
3. Crear archivo centralizado de interfaces: `src/lib/directus-interfaces.ts` con `InvitationContent` y `Guest`. [impacto: backend, typings] — done ✓
4. Extraer cliente de Directus a `src/server/directus-client.ts` para uso exclusivo server-side. [impacto: backend] — done ✓
5. Mover lógica de negocio a servicios:
   - `src/server/services/invitation.service.ts` → `getInvitationContent`. [impacto: backend] — done ✓
   - `src/server/services/guests.service.ts` → `getDigitalGuests`. [impacto: backend] — done ✓
6. Actualizar ruta API `src/app/api/digital-guests/route.ts` para importar desde `guests.service`. [impacto: backend] — done ✓
7. Convertir `src/lib/directus.ts` en barrel: re-exportar interfaces, cliente y servicios para compatibilidad. [impacto: backend] — done ✓
8. Verificar tipado y rutas de importación (`@/*`) en `tsconfig.json`. [impacto: build] — done ✓ (sin cambios requeridos)
9. Validación rápida: compilar mentalmente/estáticamente cambios (sin secretos expuestos; lógica sin side-effects en cliente). [impacto: QA] — done ✓

Notas:
- No se añadieron dependencias nuevas.
- No se añadieron comentarios innecesarios en código.
- Si aparecen nuevas rutas/servicios que usen Directus, se recomienda seguir el mismo patrón (`interfaces` + `server/services/*` + `server/directus-client`).
