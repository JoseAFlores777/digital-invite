# Tareas — INVITATIONS-BY-WEDDING-ID

1. Revisar estándares de desarrollo en `./junie/development-standards.md` y patrones de servicios existentes. [impacto: docs] — done ✓
   - Hallazgo: No existe `development-standards.md`. Se sigue el patrón de `guests.service.ts` (RxJS + Directus SDK + cliente centralizado).
2. Analizar schema y tipos (`src/lib/directus-interfaces.ts`) para `Invitations` y `Weddings`. [impacto: backend] — done ✓
3. Definir campos base a retornar para Invitations (id, code, invite_type, status, sent_at, public_link, notes, wedding). [impacto: backend] — done ✓
4. Implementar servicio `src/server/services/invitations.service.ts` con `getWeddingInvitations(weddingId: string)`. [impacto: backend]
   - Usar `getDirectusClient()` y `readItems`. [impacto: backend]
   - Filtrar por `{ wedding: { _eq: weddingId } }`. [impacto: backend]
   - Usar `fieldsFor(DirectusCollectionKeys.invitations)(...)`. [impacto: backend]
   - Patrón RxJS (defer/from/timeout/retry/catchError) y retornar `[]` en errores. [impacto: backend]
5. Validar compilación/errores de tipo. [impacto: tests]
6. Documentar este ticket (este archivo + requirements). [impacto: docs] — done ✓

Dependencias
- (4) depende de (2) y (3).

Notas
- No se crean rutas API ni UI en este ticket.
