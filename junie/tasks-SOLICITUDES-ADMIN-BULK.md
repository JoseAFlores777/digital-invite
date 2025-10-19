# TKT: SOLICITUDES-ADMIN-BULK — Botones masivos en modo admin

Estado de estándares: No existe ./junie/development-standards.md; se siguen patrones del proyecto (Next.js + TS + Tailwind). Sin dependencias nuevas.

## Tareas
1. Identificar condición que oculta acciones masivas en modal (`!asModal && showBulkActions`). [frontend] — done
2. Cambiar la condición para que en adminMode se muestren aunque sea modal: `(showBulkActions && (adminMode || !asModal))`. [frontend] — done
3. Verificar que `disabled` dependa de `canEdit = adminMode || !isClosed` y `saving === "all"`. [frontend] — done
4. Prueba manual en /solicitudes-admin: abrir invitación (como modal) y comprobar que aparecen y funcionan "Confirmar todos" y "Rechazar todos" aun con countdown vencido. [tests/manual] — pending

## Notas
- No se modificaron servicios ni tipos. Los handlers existentes (`updateAllGuestsStatus`) ya realizan las actualizaciones individuales y el agregado de estado de invitación.
- Se mantiene el toolbar: botón de calendario a la izquierda; grupo de acciones masivas a la derecha.
