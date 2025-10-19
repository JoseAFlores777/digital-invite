# TKT: RESPONSIVE-TITLES — Títulos de ubicación y fecha responsivos en SolicitudManager

Estado de estándares: No existe ./junie/development-standards.md; se siguen patrones del proyecto (Next.js + TS + Tailwind). Sin dependencias nuevas.

## Tareas
1. Identificar sección de encabezado en SolicitudManager donde se renderizan fecha y ubicación. [frontend] — done
2. Hacer contenedores responsivos: agregar `min-w-0` para que `truncate` funcione, `shrink-0` en iconos para que no colapsen, y `break-words md:truncate` en textos para envolver en pantallas pequeñas y truncar en md+. [frontend] — done
3. Mantener `flex-wrap` para que fecha y ubicación salten de línea cuando el ancho sea reducido. [frontend] — done
4. Verificación manual: comprobar en viewport XS/SM/MD que los textos no se desborden, que envuelvan en XS y trunquen en MD+, y que iconos permanezcan visibles. [tests/manual] — pending

## Notas
- No se modificaron servicios ni tipos.
- Cambios mínimos y localizados en `src/components/SolicitudManager.tsx`.
