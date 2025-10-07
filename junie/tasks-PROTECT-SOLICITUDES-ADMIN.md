# Tasks — PROTECT-SOLICITUDES-ADMIN

Estado de estándares: No existe ./junie/development-standards.md en el repo; se siguen patrones existentes (Next.js App Router, TS, sin comentarios innecesarios, Tailwind utilitario).

1. Definir password en .env (variable sugerida: SOLICITUDES_ADMIN_PASSWORD). [impacto: config] — depende de devops
2. Crear endpoint API GET/POST /api/auth/solicitudes-admin para validar contra env y setear cookie HttpOnly. [impacto: backend] — done
3. Gatear renderizado de /solicitudes-admin mostrando formulario de contraseña antes de cargar el listado. [impacto: frontend] — done
4. Evitar exponer la contraseña en cliente; usar API + cookie. [impacto: seguridad] — done
5. Validación manual: navegar a /solicitudes-admin, verificar prompt; ingresar contraseña incorrecta → error; correcta → se muestra lista; refrescar (cookie persiste). [impacto: tests] — pendiente
6. Documentar variable requerida en README o pipeline. [impacto: docs] — pendiente

Notas:
- Cookie: solicitudes_admin_auth=1, HttpOnly, SameSite=Lax, maxAge 8h.
- Si el nombre de la variable real difiere, actualizar getPassword() en el endpoint o ajustar el .env.
