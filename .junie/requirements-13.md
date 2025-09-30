# Requisitos — Ticket 13: Usar tipografías Pinyon Script + Forum

## Objetivo
Adoptar exclusivamente las tipografías "Pinyon Script" (para acentos/scripts) y "Forum" (para display y cuerpo) en toda la aplicación, gestionadas con `next/font/google` y variables CSS ya integradas en el tema Tailwind v4.

## Alcance
- Cargar Pinyon Script y Forum con `next/font/google`.
- Mapear las fuentes a las variables CSS existentes:
  - `--font-display` → Forum
  - `--font-sans` → Forum
  - `--font-script` → Pinyon Script
- Eliminar cargas de fuentes previas (Inter/Playfair) del layout para evitar descargas innecesarias.
- Mantener la integración con Tailwind v4 y las utilidades `font-display`, `font-sans` y `font-script` vía `fontFamily` del tema.

## Criterios de aceptación
- El `layout` aplica únicamente las variables de Forum (display/sans) y Pinyon Script (script).
- No se cargan Inter ni Playfair en tiempo de ejecución.
- El sitio renderiza correctamente con Forum como tipografía base y Pinyon Script para acentos.
- Build de producción sin errores.

## Notas
- Forum solo tiene peso 400; si alguna clase usa `font-bold`, el navegador hará síntesis. Si se desea un contraste más sutil, sustituir por `font-medium`/`font-normal` en futuros ajustes.
- Opcional (fuera de alcance inmediato): reemplazar clases personalizadas antiguas (p. ej., `display-font`) por utilidades Tailwind `font-display` para consistencia.
