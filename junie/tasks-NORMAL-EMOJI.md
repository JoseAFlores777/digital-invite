# Tasks — NORMAL-EMOJI in CustomBtn icon

Contexto: Permitir que `CustomBtn` reciba en la prop `icon` un valor con el prefijo `normal-emoji:` para renderizar un emoji nativo en lugar de un ícono de Iconify. Ejemplo: `icon="normal-emoji:💖"`.

Estado de estándares: No existe `./junie/development-standards.md`; se respetan patrones actuales (Next.js App Router, TS, Tailwind, @iconify/react). No se introducen dependencias nuevas.

## Tareas
1. Detectar prefijo `normal-emoji:` en `CustomBtn` antes de renderizar el ícono. [impacto: frontend] — done ✓
2. Extraer el texto del emoji tras el prefijo y renderizar `<span>` en lugar de `<Icon/>`. [impacto: frontend] — done ✓
3. Mantener compatibilidad con `iconPosition` (left/right) y con tamaños existentes. [impacto: frontend] — done ✓
4. Mantener el tipo de prop `icon` como `string` sin cambios para no romper usos existentes. [impacto: frontend] — done ✓
5. Verificar accesibilidad: `aria-hidden` en el emoji decorativo y conservar `aria-label` del botón. [impacto: QA/A11y] — done ✓
6. QA visual mínimo: el emoji respeta el espaciado del botón y no rompe layout. [impacto: QA] — pending *

## Notas
- El tamaño usa las clases del ícono existentes (w/h) y `inline-block leading-none` para consistencia mínima sin tocar estilos globales.
- No se añadieron comentarios innecesarios en el código.
- No se detectaron llamadas afectadas fuera de `CustomBtn`.
