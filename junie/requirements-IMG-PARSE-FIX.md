# Requisitos – Fix parse error en next/image

Objetivo: Corregir error de parseo en `next/image` causado por URL mal formada en componente y limpiar configuración de imágenes remotas.

Error:
- Uncaught Error: Failed to parse src "httpsum.photos/seed/812/600/600" on `next/image`.

Alcance:
- Arreglar la URL mal escrita en `InvitationContent.tsx`.
- Remover `remotePatterns` inválido de `next.config.ts` para hostname inexistente.

Criterios de aceptación:
- La app no lanza el error de parseo y renderiza la home correctamente.
- No existen referencias a `httpsum.photos` en el repositorio.
- La configuración de imágenes remotas sólo incluye hosts válidos necesarios (`picsum.photos`, etc.).

Notas:
- `picsum.photos` ya está permitido en `images.domains` y `remotePatterns`.
- El ajuste es minimalista y no toca lógica de negocio.