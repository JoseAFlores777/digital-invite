# Tasks — LIVE-EDIT (Editar live_url)

1. Revisar estándares en `./junie/development-standards.md` y notas previas. [impacto: proceso] — Hallazgo: no existe el archivo; se siguen patrones del repo (Next.js App Router, TS, Tailwind). ✓
2. Reutilizar gate de contraseña de `/solicitudes-admin` a través de `/api/auth/solicitudes-admin`. [impacto: frontend/backend] ✓
3. Crear ruta `src/app/live/edit/` con:
   - `layout.tsx` con metadata noindex y favicon. [impacto: frontend] ✓
   - `page.tsx` client: muestra WeddingHeader; si no autorizado, formulario de contraseña; si autorizado, input texto para `live_url` y botón Guardar. [impacto: frontend] ✓
4. Prefill de `live_url` leyendo `/api/wedding-generalities` con `wedding_id` (query o env). [impacto: frontend/datos] ✓
5. Endpoint para guardar: `POST /api/wedding-live` que actualiza `weddings.live_url` vía Directus SDK con token estático. [impacto: backend] ✓
6. Validación manual:
   - Navegar a `/live/edit` → pide contraseña; al ingresar correcta muestra formulario. [impacto: tests] ⭑
   - Carga valor actual de `live_url` desde API. [impacto: tests] ⭑
   - Guardar actualiza en Directus (requiere `DIRECTUS_URL` y `DIRECTUS_STATIC_TOKEN`). [impacto: tests] ⭑

Notas:
- No se agregaron dependencias nuevas.
- Se evita indexación en buscadores.
- Se respeta UI mínima: solo WeddingHeader, input y botón.
- Puntos para revisión humana: confirmar que `/api/auth/solicitudes-admin` esté operativo en el entorno, y que variables de entorno `NEXT_PUBLIC_WEDDING_ID`/`DIRECTUS_WEDDING_ID` y `DIRECTUS_STATIC_TOKEN` estén definidas.

Actualización (botón copiar + CustomBtn):
7. Agregar botón "Copiar" a la par del input que copie el `live_url` al portapapeles. [impacto: frontend] ✓
8. Reemplazar botones nativos por `CustomBtn` en toda la pantalla (/live/edit): login, guardar, copiar. [impacto: frontend] ✓
9. Feedback de acciones: mostrar mensajes breves para "Copiado" y errores de copia/guardado. [impacto: frontend] ✓

Corrección de build (Next.js Suspense):
10. Envolver el contenido de /live/edit en <Suspense fallback={null}> para cumplir con el requisito de useSearchParams y evitar el prerender error. [impacto: frontend/build] ✓