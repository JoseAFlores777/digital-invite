# tasks-17.md — Hero: título estilo “logo de boda”

Ticket: 17
Rama sugerida: JUNIE-WIP-17

## Tareas
1. Crear rama `JUNIE-WIP-17`. (!)
2. Revisar estándares del proyecto (`./junie/development-standards.md`). (no existe en repo; dejar nota)
3. Implementar bloque de título en `src/components/Hero.tsx`:
   - Contenedor `relative isolate grid place-items-center` con ampersand gigante decorativo. (done)
   - Etiquetas “TOGETHER” y “FOREVER” en mayúsculas con tracking amplio. (done)
   - Nombres “Clarisa” y “José” en dos líneas, `font-display italic`, tamaños responsivos. (done)
   - Fecha centrada “21 · 12 · 2025”. (done)
   - Evitar `text-white`; usar `text-foreground` y tonos Wedgewood. (done)
   - Mantener layout anclado al bottom (paddings actuales). (done)
4. QA visual rápido:
   - Legibilidad sobre la foto con overlay `bg-wedgewood-1400/35`. (*)
   - Ajustar a `drop-shadow` o subir overlay a `/45` si hiciera falta. (*)
5. Documentación: crear `.junie/requirements-17.md` y este archivo. (done)
6. Compilación: `npm run dev`/`npm run build` sin errores. (*)
7. Preparar commits/PR en la rama cuando el entorno lo permita. (*)

## Dependencias
- Tailwind v4 + PostCSS ya configurados.
- Tipografías Forum/Pinyon Script ya integradas vía `next/font`.

## Impacto
- Frontend (Hero): estructura y estilos del título.
- No hay cambios en backend ni BD.

## Notas y riesgos
- El archivo `./junie/development-standards.md` no existe; se deja nota en esta tarea.
- Si el contraste no es suficiente con `text-foreground`, considerar `drop-shadow` sutil o subir el nivel del tint overlay.
