# TKT: RSVP-LEGEND-BELOW-BUTTONS — Leyenda bajo botones de estado por invitado

Estado de estándares: No existe ./junie/development-standards.md; se siguen patrones del proyecto (Next.js + TS + Tailwind). Sin dependencias nuevas.

## Tareas
1. Localizar el render de los tres botones (Pendiente/Confirmar/Rechazar) por invitado en SolicitudManager. [frontend] — done
2. Cuando los botones estén visibles (¡no en banner de cierre!), renderizar debajo una leyenda alineada a la derecha y en tamaño pequeño: "Haz clic en cualquiera de estas opciones". [frontend] — done
3. Mantener el banner existente cuando `isClosed && !adminMode` sin leyenda. [frontend] — done
4. Verificar que el layout siga siendo responsive (wrapper en columna con `items-end`, botones en fila con `flex-wrap`). [manual] — pending

## Notas
- No se tocan servicios ni tipos.
- La leyenda se muestra tanto en modo público como en admin (cuando hay botones).
- Copiado del texto con ortografía: "Haz clic en cualquiera de estas opciones".
