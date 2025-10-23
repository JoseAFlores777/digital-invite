# Tareas: WELCOME-SUBTITLE-GUESTS

## Estado de estándares
- No existe `./junie/development-standards.md` en el repo; seguir patrones del proyecto (Next.js + TypeScript + Tailwind). No agregar comentarios innecesarios en código.

## Lista de tareas
1. Analizar flujo en `src/app/page.tsx` para obtener invitados de `/api/invitation-by-id`. [impacto: frontend] — done
2. Calcular conteo de invitados válidos (`guest.person`) y armar string con pluralización. [impacto: frontend] — done
3. Reemplazar `subtitle` hardcodeado en `EnvelopeWelcome` por `inviteSubtitle` dinámico. [impacto: frontend] — done
4. Documentar requisitos y tareas en `./junie/requirements-WELCOME-SUBTITLE-GUESTS.md` y este archivo. [impacto: docs] — done
5. Validar manualmente que el subtítulo muestre "Invitación para N persona(s)" según la invitación. [impacto: frontend/tests manuales] — pending
6. Revisión rápida de compilación/linters para asegurar que no hay errores. [impacto: frontend] — pending

## Notas de validación
- Si `guests` viene vacío o con entradas nulas, el conteo debe resultar en 0 y mostrarse "Invitación para 0 personas" (confirmar si se requiere un fallback distinto).
- No se modifica `EnvelopeWelcome` salvo consumo del prop `subtitle`. 