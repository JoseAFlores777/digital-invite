# Tareas — Evitar mismatch de hidratación en /solicitud (HYDRATION-SOLICITUD)

Fecha: 2025-10-06

Resumen del alcance:
- Eliminar dependencia de `window.location.search` en la página `/solicitud`.
- Usar `searchParams` de Next.js para obtener `solicitudId`/`invitationID` y pasarlo a `SolicitudManager`.

Tareas
1. Revisar estándares de desarrollo y contexto MCP. [impacto: procesos] — done ✓
2. Convertir `src/app/solicitud/page.tsx` a Server Component (remover "use client"). [impacto: frontend] — done ✓
3. Leer `searchParams` y derivar `solicitudId` (fallback `invitationID`). [impacto: frontend] — done ✓
4. Pasar `solicitudId` a `<SolicitudManager />` y mantener fallback cuando falta. [impacto: frontend] — done ✓
5. Validación manual: visitar `/solicitud?solicitudId=<uuid>` y sin parámetro; confirmar que no hay errores de hidratación. [impacto: QA]

Notas:
- Cambio mínimo, sin impacto en API ni en `SolicitudManager`.
- Evita divergencias SSR/cliente que provocaban el cambio de `<main>` a `<div>` durante la hidratación.
