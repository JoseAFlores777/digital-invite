# Tasks: PZ-QUOTE-WYSIWYG

1. Revisar estándares en ./junie/development-standards.md. [done]
2. Diseñar compatibilidad de quoteText con HTML/Markdown (WYSIWYG) sin nuevas dependencias. [done]
3. Implementar helpers en PerspectiveZoom:
   - isHtmlString, isLikelyMarkdown, markdownToHtml, escapeHtml. [done]
4. Render para strings:
   - Si HTML: render con dangerouslySetInnerHTML.
   - Si Markdown: convertir a HTML básico y render.
   - Si texto plano: mantener <p> y animación por caracteres. [done]
5. Ajustar animación GSAP para secciones HTML/Markdown (fade/pin simple) y mantener split por caracteres para texto plano. [done]
6. Validar compilación local y smoke test. [pending]

Notas:
- No se añadieron nuevas dependencias. Conversión Markdown mínima (negritas, cursivas, links, código inline, saltos de línea/parrafos).
- Se mantiene compatibilidad con ReactNode en quoteText y con los strings actuales.
- Seguridad: se escapa Markdown antes de aplicar reglas para evitar inyección.
