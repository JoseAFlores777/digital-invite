# Tasks — WEDDING-HEADER-DATETIME

Contexto: Mostrar en el WeddingHeader la fecha y hora provenientes de wedding generalities con el formato solicitado: "sábado 13 de diciembre de 2025 — 3 pm GMT-6".

Estado de estándares: No existe `./junie/development-standards.md` en el repo; se respeta arquitectura y estilos existentes (Next.js, TypeScript, Tailwind v4, CSS vars). Cambios mínimos.

## Tareas
1. Revisar endpoint `/api/wedding-generalities` y contrato `getWeddingById` para confirmar campos (`date`, `start_time`, `timezone`). [impacto: backend/contrato] — done ✓
2. Ajustar `WeddingHeader` para:
   - Formatear fecha en español: `weekday long, day 2-digit, month long, year numeric`. [impacto: frontend] — done ✓
   - Formatear hora en 12h con `am/pm` en minúsculas y sin minutos si no son necesarios (hora exacta). [impacto: frontend] — done ✓
   - Incluir zona horaria usando `timeZoneName: 'shortOffset'` (ej. `GMT-6`) y respetar `wedding.timezone` si viene del endpoint. [impacto: frontend] — done ✓
   - Evitar capitalizar el día (mantener en minúsculas en es-ES). [impacto: frontend] — done ✓
3. Manejar fallbacks: si no hay datos, no renderizar etiqueta de fecha/hora. [impacto: frontend] — done ✓
4. Validación rápida: compilar / typecheck local y smoke test de render. [impacto: QA] — pending

## Notas
- Se mantiene el comportamiento de color por variante (`secondary` conserva texto blanco).
- Se usa `Intl.DateTimeFormat` con `timeZone` cuando `wedding.timezone` está disponible; de lo contrario usa tz local del navegador. `shortOffset` produce valores tipo `GMT-6`.
