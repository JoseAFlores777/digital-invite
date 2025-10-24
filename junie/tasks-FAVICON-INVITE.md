# Tareas – FAVICON-INVITE

Estado de estándares: No existe `./junie/development-standards.md`. Se siguen patrones actuales del repo (Next.js App Router, TS, Tailwind) y los íconos definidos en `src/app/layout.tsx`.

1. Analizar reporte: la URL raíz con `?invitationID=...` no muestra favicon. [impacto: frontend] – done
2. Verificar assets en `public/` y enlaces en `metadata.icons` del layout. [impacto: frontend] – done
3. Detectar ausencia de `/public/favicon.ico` en raíz; algunos navegadores lo solicitan por defecto. [impacto: frontend] – done
4. Implementar redirect permanente ` /favicon.ico → /favicon/favicon.ico` en `next.config.ts` para compatibilidad universal. [impacto: frontend/config] – done
5. Validación: la metadata mantiene `<link rel="icon" href="/favicon/...">`, y además navegadores que van directo a `/favicon.ico` ahora obtendrán el archivo correcto. [impacto: tests/manual] – pending (validación en despliegue)

Notas:
- Cambio mínimo, sin binarios nuevos. No afecta otras rutas.
- Si se prefiere, se puede añadir un `favicon.ico` en raíz más adelante; el redirect ya cubre el caso.
