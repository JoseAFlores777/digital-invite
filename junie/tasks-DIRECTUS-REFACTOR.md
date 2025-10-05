# Tasks — DIRECTUS-REFACTOR

1. Revisar estándares en `./junie/development-standards.md` y alinear solución. [impacto: procesos]
   - Hallazgo: No existe `development-standards.md` en el repo. Se siguen patrones existentes (Next.js App Router, servicios TS, helpers `fieldsFor`). — done
2. Analizar archivos relevantes (`src/app/api/wedding-invitations/route.ts`, `src/server/services/invitations.service.ts`, `src/lib/directus-interfaces.ts`). [impacto: backend]
   - Detección: Campo duplicado `guests.guest.invitation_status` en `invitations.service.ts`. — done
3. Implementar nueva ruta `src/app/api/invitations/route.ts` con:
   - `export const dynamic = "force-dynamic"` (o ISR opcional),
   - función `withTimeout` con `AbortController`,
   - `getWeddingInvitations` usando `client.request(readItems(...), { signal })`,
   - lista de fields sin duplicados,
   - lectura de `wedding_id` (query/env) y respuestas JSON con códigos apropiados. [impacto: backend]
   — done
4. Refactor mínimo del servicio `invitations.service.ts` para remover el field duplicado. [impacto: backend]
   — done
5. Mantener compatibilidad de la ruta existente `/api/wedding-invitations`. [impacto: backend]
   — done
6. Validación rápida (tipado y consistencia de imports). [impacto: tests]
   — done (estática)

Notas:
- No se introdujeron dependencias nuevas.
- Se evitó modificar contratos públicos existentes; se agregó nueva ruta `/api/invitations`.
- Se sugiere cubrir con pruebas de integración de API en Playwright/Next si aplica.
