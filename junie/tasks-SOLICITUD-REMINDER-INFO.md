# Tasks – SOLICITUD-REMINDER-INFO

Ticket: SOLICITUD-REMINDER-INFO

Objetivos:
- Hacer que el botón de información esté disponible en formato modal o como tooltip.
- Agregar un botón para añadir un recordatorio de confirmación (RSVP) junto al botón de "Añadir al calendario" en SolicitudManager.

## Estándares
- No existe `./junie/development-standards.md` en el repo. Se siguieron patrones del proyecto (Next.js App Router, TS, Tailwind, componentes sin dependencias adicionales innecesarias), tal como en tickets previos.

## Tareas
1. Añadir prop `infoDisplay?: "tooltip" | "modal"` en `SolicitudManager.tsx` y valor por defecto `"tooltip"`. (frontend) — done
2. Agregar estado `showInfoModal` y reutilizar `react-modal` para un modal pequeño informativo. (frontend) — done
3. Cambiar el onClick del botón de info para alternar entre tooltip y modal según `infoDisplay`. (frontend) — done
4. Asegurar que el tooltip solo se renderice cuando `infoDisplay === "tooltip"`. (frontend) — done
5. Montar el modal informativo en ambos modos de render del componente (cuando `asModal` es true o false). (frontend) — done
6. Agregar botón "Recordatorio RSVP" que genera ICS con DTSTART en `deadlineIso` y URL hacia `/solicitud?invitationID=<id>`. (frontend) — done
7. Incluir icono inline (campana) para el botón de recordatorio sin agregar dependencias. (frontend) — done
8. Validación rápida: compilar mentalmente los tipos y revisar imports; no se añadieron nuevas dependencias. (tests/manual) — pending

## Notas
- El recordatorio se crea como evento simple con `SUMMARY: "Recordatorio: Confirmar asistencia"`, `DTSTART` local y `URL` al enlace de confirmación.
- `react-modal` ya se usa en este componente, por lo que la variante modal informativa es coherente y segura (incluye cierre por ESC y overlay click).
- El botón de info conserva la animación `animate-pulse` como antes.
