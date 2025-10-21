# Tasks — WEDDING-HEADER-SETDATELABEL

Contexto: `setDateLabel(label)` no estaba siendo alcanzado en algunos entornos. Posibles causas identificadas: uso de `minute: undefined` en Intl (opción inválida), `timeZone` potencialmente inválida/ausente arrojando excepción, y condiciones que evitaban construir la etiqueta si faltaba hora.

Estado de estándares: No existe `./junie/development-standards.md`; se siguen patrones actuales del proyecto (Next.js + TS + Tailwind v4). Cambios mínimos y defensivos.

## Tareas
1. Revisar `WeddingHeader` y flujo de datos desde `/api/wedding-generalities`. [impacto: frontend] — done ✓
2. Reemplazar `minute: undefined` y validar `timeZone` (IANA) antes de pasarla a Intl; fallback a tz local. [impacto: frontend] — done ✓
3. Tolerar ausencia de hora: si no hay hora, mostrar solo la fecha; si hay, mostrar `h am/pm` + `GMT±offset` (shortOffset). [impacto: frontend] — done ✓
4. Asegurar que el efecto depende de `weddingId` y que no hay retornos tempranos antes de construir etiqueta cuando hay fecha válida. [impacto: frontend] — done ✓
5. Validación rápida: smoke test manual en `/gifts` verificando render de fecha/hora. [impacto: QA] — pending

## Notas
- Se añadió `isValidIanaTimeZone` para evitar excepciones de Intl. 
- Se mantiene la estética previa y la variante `secondary` con texto blanco.
- El componente sigue sin romperse si faltan datos; simplemente oculta la etiqueta si no hay fecha.