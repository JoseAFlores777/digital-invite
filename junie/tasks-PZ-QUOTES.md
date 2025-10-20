# Tasks: PZ-QUOTES

1. Revisar estándares en ./junie/development-standards.md. [done]
2. Actualizar tipos de props en PerspectiveZoom para que `quoteText` acepte string | ReactNode | (string | ReactNode)[]. [done]
3. Normalizar `quoteText` a un arreglo y renderizar una sección por quote. [done]
4. Ajustar JSX: para strings usar `<p>`; para ReactNode (ej. BiblicalVerse_1) usar contenedor `<div>`. [done]
5. Reescribir animación GSAP para múltiples secciones (split sólo para strings). [done]
6. Validar compatibilidad con usos existentes (InvitationContent pasa string). [done]
7. Build/Type-check local. [pending]

Notas:
- Cambio minimiza impacto y mantiene compatibilidad hacia atrás.
- Animación por sección usa ScrollTrigger con el propio `section` como trigger.
