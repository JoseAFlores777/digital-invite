# Tareas — INVITATIONS-ROUTE-AND-FRONTEND

1. Revisar estándares y patrón de rutas API existentes. [impacto: docs] — done ✓
2. Exportar `getWeddingInvitations` en `src/lib/directus.ts`. [impacto: backend] — done ✓
3. Crear ruta API `src/app/api/wedding-invitations/route.ts` (GET):
   - Leer `wedding_id` de query o de `NEXT_PUBLIC_WEDDING_ID`/`DIRECTUS_WEDDING_ID`. [impacto: backend] — done ✓
   - Si falta, responder 400 `{ error: 'missing_wedding_id' }`. [impacto: backend] — done ✓
   - Llamar servicio y responder `{ invitations }`. [impacto: backend] — done ✓
4. Actualizar `src/app/page.tsx` para llamar en paralelo a guests e invitations (Promise.all). [impacto: frontend] — done ✓
5. Manejar errores y estados locales (`setInvitations`). [impacto: frontend] — done ✓
6. Validar compilación e imports. [impacto: tests]

Dependencias
- (3) depende de (2).
- (4) depende de (3).

Notas
- No se agrega UI para invitaciones en este ticket.
- Se retorna arreglo vacío ante errores para robustez del frontend.
