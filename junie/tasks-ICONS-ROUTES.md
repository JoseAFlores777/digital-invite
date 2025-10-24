# Tareas – ICONS-ROUTES

Estado de estándares: No existe ./junie/development-standards.md; se siguen patrones del repo (Next.js App Router, TypeScript, Tailwind). Se alinean íconos con los definidos en `src/app/layout.tsx`.

1. Revisar rutas con `export const metadata` y detectar bloques `icons` simples. [impacto: frontend] – done
2. Unificar `metadata.icons` en cada ruta con el set de favicons del layout raíz (`/favicon/*`). [impacto: frontend] – done
   - src/app/gifts/page.tsx – reemplazado
   - src/app/live/page.tsx – reemplazado
   - src/app/solicitud/page.tsx – reemplazado
   - src/app/live/edit/layout.tsx – reemplazado
   - src/app/solicitudes-admin/layout.tsx – reemplazado
3. Verificar ausencia de referencias a `/wedding-Logo.svg` en `src/app` para íconos. [impacto: frontend] – done
4. Validación: revisión estática de tipos y estructura conforme a `Metadata.icons` de Next 14. [impacto: tests/manual] – done (por inspección)

Notas:
- Se reutiliza exactamente la estructura del layout raíz: icon (ico/png), shortcut (ico), apple (180x180), other (android/ms).
- No se introducen dependencias nuevas ni cambios de UX.
