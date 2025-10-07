# Tasks — SYNC-DYNAMIC-APIS-COOKIES

Estado de estándares: No existe ./junie/development-standards.md. Se siguen patrones del proyecto (Next.js App Router, TS, sin comentarios innecesarios, Tailwind utilitario).

1. Identificar uso síncrono de `cookies()` en /api/auth/solicitudes-admin GET. [impacto: backend] — done
2. Cambiar a `await cookies()` para cumplir con Next.js sync-dynamic-apis. [impacto: backend] — done
3. Validación manual: navegar a /solicitudes-admin sin cookie → formulario; tras POST correcto, GET debe responder authorized=true sin error; refrescar mantiene sesión. [impacto: tests] — pendiente
4. Monitorear consola/servidor para confirmar que desaparece el error `sync-dynamic-apis`. [impacto: tests] — pendiente
