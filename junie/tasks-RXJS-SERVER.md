# Tasks — RXJS-SERVER

1. Revisar estándares del proyecto en `./junie/development-standards.md` y documentar hallazgos. [impacto: proceso] — No existe; se siguen convenciones del repo. — done ✓
2. Definir alcance y criterios de aceptación en `./junie/requirements-RXJS-SERVER.md`. [impacto: documentación] — done ✓
3. Agregar dependencia `rxjs` en `package.json`. [impacto: backend/build] — done ✓
4. Implementar `src/server/services/guests.rx.service.ts` con `getDigitalGuestsRx(): Promise<Guest[]>`. [impacto: backend] — done ✓
   - Componer pipeline con `defer`, `from`, `timeout`, `retry`, `catchError`, `map`. — done ✓
5. Actualizar `src/app/api/digital-guests/route.ts` para usar `getDigitalGuestsRx`. [impacto: backend] — done ✓
6. Exportar `getDigitalGuestsRx` en `src/lib/directus.ts` (barrel). [impacto: backend] — done ✓
7. Validación estática rápida (imports/paths y tipos). [impacto: QA] — done ✓
8. Pruebas: no se agregan nuevas por alcance mínimo; dejar nota aquí. [impacto: tests] — done ✓

Notas:
- Sin cambios en UI/UX.
- Mantener este archivo como fuente de verdad del progreso.
