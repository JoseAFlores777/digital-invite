# TKT: SOLICITUD-MODAL-95 — Modal de SolicitudManager con 95% de pantalla

Estado de estándares: No existe ./junie/development-standards.md; se siguen patrones del proyecto (Next.js + TS + Tailwind). Cambios mínimos y localizados en el componente.

## Tareas
1. Identificar el modal de SolicitudManager (`react-modal`) y su `className` actual con anchos fijos (sm:max-w-2xl, md:max-w-4xl) y altura `max-h-[85vh]`. [frontend] — done
2. Ajustar tamaño del modal para ocupar 95% del viewport: `w-[95vw] h-[95vh] max-w-[95vw] max-h-[95vh]` y márgenes `my-[2.5vh]` para centrado. [frontend] — done
3. Actualizar el contenedor interno de scroll para usar `max-h-[calc(95vh-0px)]` (antes 85vh), manteniendo `overflow-y-auto` y paddings. [frontend] — done
4. Verificar que overlay/backdrop y cierre con ESC/click fuera funcionen sin cambios. [manual] — pending
5. Validar que en pantallas pequeñas el modal respete 95vw/95vh y que el contenido sea desplazable. [manual] — pending

## Notas
- No se modificaron servicios ni tipos.
- Se mantuvieron `rounded-2xl`, bordes y sombra para consistencia visual.
- El cambio solo aplica cuando `SolicitudManager` se usa con `asModal`.
