# tasks-13.md — Tipografías Pinyon Script + Forum

Ticket: 13
Rama: JUNIE-WIP-13

## Tareas
1. Crear rama de trabajo `JUNIE-WIP-13`. (blocked por entorno)
2. Actualizar `src/app/fonts.ts` para usar `Forum` (display y sans) y `Pinyon_Script` (script). (done)
3. Limpiar `src/app/layout.tsx`: remover Inter/Playfair y aplicar solo variables de `display`, `sans`, `script`. (done)
4. Verificar que `globals.scss` siga mapeando `--font-display`, `--font-sans`, `--font-script` y que `fontFamily` en Tailwind las consuma. (done)
5. Ejecutar build: `npm run build` (local). Validar que no hay errores y que no se descargan Inter/Playfair. (pending)
6. QA visual: revisar Hero y texto general con Forum; acentos renderizados con Pinyon Script donde se use `font-script`. (pending)
7. Documentar requisitos y tareas en `.junie/requirements-13.md` y `.junie/tasks-13.md`. (done)

## Impacto
- Frontend: fuentes globales de la app.
- Accesibilidad: legibilidad con Forum; evitar pesos falsos excesivos.

## Notas y riesgos
- Forum solo tiene peso 400. Si hay estilos que fuerzan `font-bold`, el navegador sintetizará bold; revisar si se prefiere `font-medium`.
- La clase heredada `display-font` (si existe en componentes antiguos) puede no aplicar; ideal migrar a `font-display` en futuros cambios.
