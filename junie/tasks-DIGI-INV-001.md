# Tareas DIGI-INV-001

1. Revisar estándares del proyecto en `./junie/development-standards.md` y documentar estado. [impacto: docs] — done
   - Hallazgo: No existe `./junie/development-standards.md`. Se siguen patrones existentes (TypeScript, Directus SDK, manejo de env vars).
2. Escanear el código para identificar colecciones/campos de invitados. [impacto: análisis] — done
   - Hallazgo: No hay referencias a esquema de invitados; se parametriza por env.
3. Implementar tipo `Guest` y función `getDigitalGuests()` en `src/lib/directus.ts` usando `@directus/sdk`. [impacto: backend] — done
   - Usa `DIRECTUS_GUESTS_COLLECTION` (por defecto `guests`).
   - Usa `DIRECTUS_GUESTS_DIGITAL_FIELD` (por defecto `is_digital`).
   - Usa `DIRECTUS_GUESTS_DIGITAL_VALUE` (por defecto `true`, admite boolean, número o string).
   - Maneja errores devolviendo `[]`.
4. Documentar requisitos y tareas en `junie/requirements-DIGI-INV-001.md` y este archivo. [impacto: docs] — done
5. Validar build local (`npm run build`) para asegurar tipos/compilación. [impacto: build] — pendiente
   - Nota: No se agregan tests unitarios por falta de configuración; considerar en ticket futuro.
