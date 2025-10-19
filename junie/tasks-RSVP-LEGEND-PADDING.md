# TKT: RSVP-LEGEND-PADDING — Ajustar padding por leyenda bajo botones

Estado de estándares: No existe ./junie/development-standards.md; se siguen patrones del proyecto (Next.js + TS + Tailwind). Cambios mínimos.

## Tareas
1. Agregar padding-top al contenedor de los tres botones (Pendiente, Confirmar, Rechazar) para compensar el espacio de la leyenda inferior. [frontend] — done
2. Verificar en móviles y escritorio que la separación visual quede equilibrada y no afecte el banner cuando el countdown expira. [manual] — pending

## Cambios
- `src/components/SolicitudManager.tsx`: en el contenedor de botones por invitado, se añadió la clase `pt-2`.

## Notas
- La leyenda "Haz clic en cualquiera de estas opciones" permanece debajo de los botones y no aparece cuando `isClosed && !adminMode` (banner).
- No se modificaron servicios, tipos ni lógica de negocio; solo espaciado visual.
