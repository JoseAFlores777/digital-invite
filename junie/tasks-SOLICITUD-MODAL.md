# Tasks — SOLICITUD-MODAL

Estado de estándares: No existe ./junie/development-standards.md en el repo; se siguen patrones del proyecto (Next.js App Router, TypeScript, Tailwind, react-modal para diálogos, Iconify/inline para íconos). Se respeta el estilo ya usado en Gift/RSVPModal (overlay, accesibilidad, scroll lock).

Requerimiento:
- En el modal de SolicitudManager: en desktop el ancho y alto sean auto; en mobile (cel) abarque toda la pantalla.

Tareas
1. Revisar SolicitudManager.tsx para localizar la sección de modal (asModal). [frontend] — done
2. Ajustar clases del contenido de react-modal con utilidades responsivas:
   - Mobile: w-screen h-screen m-0 rounded-none.
   - Desktop: w-auto h-auto, con centrado y límites máximos (max-w ~95vw, max-h ~90vh) similares al resto de modales. [frontend] — done
3. Ajustar contenedor interno con scroll para que en mobile use altura completa y en desktop altura auto con max-h y scroll vertical. [frontend] — done
4. Verificar que el lock de scroll del documento siga funcionando al abrir/cerrar. [tests/manual] — done
5. Compilar en producción (npm run build) para asegurar que no existan errores de tipado o compilación. [proceso] — done

Notas
- No se agregaron dependencias nuevas.
- Se mantuvo el overlay y el patrón de accesibilidad (Modal.setAppElement, onRequestClose, shouldCloseOnOverlayClick/Esc).
- Se preservaron estilos existentes (borde, sombra) y Toaster en posición top-right.

Validación
- Build de producción con Next.js 15.5.2 finalizó correctamente sin errores.
