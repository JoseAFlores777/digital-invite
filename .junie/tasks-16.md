# tasks-16.md — El contador debe seguir después del Hero

Ticket: 16
Rama sugerida: JUNIE-WIP-16

## Tareas
1. Crear rama de trabajo `JUNIE-WIP-16`. (!)
2. Reordenar secciones en `src/components/InvitationContent.tsx` para mover `<Countdown />` justo después de `<Hero />`. (done)
3. Revisar que no quede un `<Countdown />` duplicado y que el resto del orden se mantenga. (done)
4. Actualizar comentarios de numeración en el JSX para reflejar el nuevo orden. (done)
5. Verificación rápida: levantar dev/build local y comprobar flujo visual (Hero → Countdown → Historia → …). (!)
6. Documentar cambios en `.junie/requirements-16.md` y este archivo. (done)

## Dependencias
- Ninguna (cambio de orden en JSX únicamente).

## Impacto
- Frontend (estructura visual / orden de secciones). Sin cambios en lógica ni estilos.

## Notas
- La creación de la rama puede estar bloqueada por restricciones del entorno; proceder a commitear cuando sea posible.
