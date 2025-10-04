# Tareas: IMAGES-LOADER

1. Revisar estándares en ./junie/development-standards.md y documentar estado. [impacto: proceso] — Hallazgo: no existe el archivo; se siguen patrones del repo (Next.js App Router, TS, Tailwind). — done
2. Analizar componentes que usan imágenes (Hero, PanelPinStack, InvitationContent/PerspectiveZoom, EnvelopeWelcome). [impacto: frontend] — done
3. Implementar utilitario de pre-carga de imágenes (src/utils/preloadImages.ts) con timeout de seguridad. [impacto: frontend] — done
4. Integrar gating del loader en src/app/page.tsx: añadir estado assetsLoaded y condición mínima (delay + animación + assetsLoaded). [impacto: frontend] — done
5. Definir lista de URLs a precargar: sello, hero, imágenes de PanelPinStack y elementos de PerspectiveZoom (picsum seeds desktop+mobile). [impacto: frontend] — done
6. Validar que el overlay del loader se oculte únicamente cuando assetsLoaded=true. [impacto: frontend] — done
7. Agregar pre-carga de frames de AnilloScrollSequence (79 imágenes) y ampliar timeout a 45s para incluirlas en el gating del loader. [impacto: performance] — done

Observaciones:
- Se evita colgar indefinidamente el loader ante errores de red gracias a un timeout (45s en page.tsx al incluir frames del anillo). Ajustable según necesidad.
- No se agregan dependencias externas.
- No se añaden comentarios en código salvo lo mínimo.
- Nota: La inclusión de 79 imágenes puede impactar tiempos de carga en redes lentas. Si fuera necesario, evaluar conversión a WebP/AVIF, reducción de resolución o precarga progresiva (p.ej. primeros 20 frames + lazy del resto).
