# Tareas: quoteText respeta espacios + Proverbios 3:6 (RVR1960)

1. Revisar estándares en ./junie/development-standards.md (si existe) — done ✓
2. Analizar el split de `quoteText` en `PerspectiveZoom.tsx`. — done ✓
3. Preservar espacios: convertir " " -> `\u00A0` en el split. — done ✓
4. Preservar saltos de línea: convertir "\n" en `<br>`. — done ✓
5. Robustecer el párrafo con `whitespace-pre-wrap`. — done ✓
6. Actualizar `InvitationContent.tsx` para usar `Proverbios 3:6 (RVR1960)`. — done ✓
7. Documentar requisitos en `junie/requirements-quote-preserve-spaces-prov-3-6.md`. — done ✓
8. Verificación rápida (build mental/estática). — done ✓

Notas:
- Cambios mínimos; sin dependencias nuevas.
- Mantener compatibilidad SSR y animaciones actuales.
