# Tareas DIGI-INV-003

1. Revisar estándares del proyecto en `./junie/development-standards.md` y alinear la solución. [impacto: docs] — done ✓
   - Hallazgo: No existe `development-standards.md`; se respetan patrones del repo (Next.js App Router, TypeScript, Directus SDK, manejo de env y no exponer secretos en cliente).
2. Analizar esquema real de Directus mediante MCP (colección `guests`, relaciones y permisos de campo). [impacto: análisis] — done ✓
   - Hallazgo: Campo `is_digital` con restricciones; `guests` incluye relación `person`. Se actúa en consecuencia.
3. Mejorar `getDigitalGuests()` en `src/lib/directus.ts`. [impacto: backend]
   - Eliminar logs temporales. — done ✓
   - Permitir selección de campos vía `DIRECTUS_GUESTS_FIELDS`. — done ✓
   - Intentar filtro directo por el campo digital; si falla por permisos, fallback a fetch sin filtro y filtrado local. — done ✓
   - Normalizar salida (`id`, `name`, `email`, `phone`) usando `person` como respaldo. — done ✓
4. Limpiar logs en `src/app/page.tsx` para evitar ruido en consola. [impacto: frontend] — done ✓
5. Actualizar `.env.example` agregando `DIRECTUS_GUESTS_FIELDS` con guía. [impacto: devops] — done ✓
6. Añadir comentario opcional en `.env` sobre `DIRECTUS_GUESTS_FIELDS`. [impacto: devops] — done ✓
7. Validar compilación/typos (ejecución local recomendada: `npm run build`). [impacto: build/tests] — pendiente
8. Documentar requisitos y tareas en `junie/requirements-DIGI-INV-003.md` y este archivo. [impacto: docs] — done ✓

Notas:
- Si el entorno de permisos sigue restringiendo el filtrado, el fallback garantiza que la función siga devolviendo resultados coherentes cuando el dato esté presente en los ítems accesibles.
