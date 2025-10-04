# Tareas: PerspectiveZoom blanco + contenido bíblico

1. Revisar estándares del proyecto en ./junie/development-standards.md (si existe) y patrones de componentes actuales. — done
2. Añadir `inline?: boolean` a `biblical-verse_1.tsx` para modo embebido. — done
3. Extender `PerspectiveZoom`:
   - Agregar prop `headingContent?: React.ReactNode`. — done
   - Cambiar tema por defecto a blanco (bg/text). — done
   - Actualizar defaults: `headingText`="Nuestra historia" y `quoteText` a versículo bíblico en español. — done
   - Mantener animaciones (heading, items, quote). — done
4. Actualizar uso en `InvitationContent`:
   - Pasar `headingContent={<BiblicalVerse_1 inline .../>}`. — done
   - Ajustar `quoteText` a un versículo. — done
5. Documentar requisitos y este desglose en `junie/requirements-perspective-zoom-white.md` y este archivo. — done
6. Verificación rápida de tipos/build (estático). — pending

Notas:
- Cambios mínimos y sin dependencias nuevas.
- `biblical-verse_1` en modo `inline` evita `min-h` y el wrapper de sección para poder incrustar en overlays/headers.
