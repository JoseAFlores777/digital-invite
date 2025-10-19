# TKT: RSVP-BUTTONS-ROW — Unificar botones en una sola fila

Estado de estándares: No existe ./junie/development-standards.md en el repo; se siguen patrones del proyecto (Next.js + TypeScript + Tailwind, componentes sin comentarios superfluos, estilos utilitarios, sin dependencias nuevas).

## Tareas
1. Mover el botón "Añadir al calendario" fuera del header de título y colocarlo en una barra de herramientas (toolbar). [impacto: frontend] — done
2. Combinar en esa toolbar (misma fila) los botones "Confirmar todos" y "Rechazar todos" alineados a la derecha, dejando el de calendario a la izquierda. [impacto: frontend] — done
3. Mantener `disabled` con `isClosed` y `saving` para los tres botones. [impacto: frontend] — done
4. Hacer la fila responsive con `flex`, `ml-auto`, `gap-2` y `flex-wrap`, manteniendo grupos separados (izquierda/derecha). [impacto: frontend] — done
5. Reubicar el campo de búsqueda en una fila independiente debajo del toolbar para no romper el layout. [impacto: frontend] — done
6. Verificar que no haya duplicados del botón de calendario y que los estilos de disabled conserven colores identificativos. [impacto: frontend] — done

## Notas
- No se tocaron servicios ni tipos.
- Se respetan clases utilitarias existentes y se minimizó el cambio en JSX.
- El toolbar aparece siempre el botón de calendario; los masivos solo si `!asModal && showBulkActions`.
