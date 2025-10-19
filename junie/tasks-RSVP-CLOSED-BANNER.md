# TKT: RSVP-CLOSED-BANNER — Banner de estado por invitado cuando vence el countdown

Estado de estándares: No existe ./junie/development-standards.md; se siguen patrones del proyecto (Next.js + TS + Tailwind). Sin dependencias nuevas.

## Tareas
1. Identificar render de botones por invitado en SolicitudManager. [frontend] — done
2. Condicionar el render: si `isClosed` mostrar banner con icono y copy según `guest.status`; si no, mostrar los botones actuales. [frontend] — done
3. Mantener colores identificativos (verde/azul/rosa) en el banner y accesibilidad básica (aria-label). [frontend] — done 
4. Verificar que el banner ocupa la misma línea de acciones y que el layout responsive se mantiene. [frontend] — done
5. Validación manual: states accepted/declined/unknown con `isClosed=true`. [tests/manual] — done

## Notas
- Sin cambios en backend ni tipos.
- Los botones siguen operativos cuando `isClosed=false`.
- El banner usa los iconos existentes (Check/Clock/X) y textos: 
  - accepted → "Ha aceptado la invitación"
  - declined → "Ha rechazado la invitación"
  - unknown → "Pendiente"
