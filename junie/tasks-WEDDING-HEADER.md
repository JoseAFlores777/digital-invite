# Tareas — WEDDING-HEADER

Estado de estándares: No existe `./junie/development-standards.md` en el repo; se siguen patrones del proyecto (Next.js App Router, TypeScript, Tailwind, sin comentarios innecesarios). La tipografía y colores se mantienen usando clases existentes (`display-font`, `text-foreground`, escala `neutral`).

## Lista de tareas
1. Analizar requerimiento y activos disponibles (public/wedding-Logo.svg). [impacto: frontend] — done ✓
2. Reutilizar `fetchWeddingGeneralities` para obtener fecha y hora del evento. [impacto: frontend] — done ✓
3. Implementar componente `src/components/WeddingHeader.tsx` con props `title`, `subtitle` y estilos del proyecto. [impacto: frontend] — done ✓
4. Formatear fecha/hora en español (es-ES) y mostrarla bajo el subtítulo. [impacto: frontend] — done ✓
5. Integrar `<WeddingHeader />` en `/gifts` por encima del contenido existente. [impacto: frontend] — done ✓
6. Validación manual en `/gifts?wedding_id=XYZ`: render de logo, título, subtítulo y fecha/hora; que no se rompa LiveButton ni Gift. [impacto: tests/manual] — done ✓

## Notas
- Sin dependencias nuevas.
- Si no hay fecha/hora, el header sigue mostrando logo, título y subtítulo.
- Se preservan tipografías y tokens de color del proyecto.
