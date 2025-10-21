# Tasks — GIFTS-OPTIONS

Estado de estándares: No existe ./junie/development-standards.md en el repo; se siguen patrones del proyecto (Next.js App Router, TypeScript, Tailwind, gsap vía hook useGsapContext, react-modal para diálogos, Iconify para íconos).

1. Revisar componentes existentes para estilos y patrones (botones, modales, tipografías). [impacto: frontend] — done
2. Definir estructura de datos para opciones de regalo (id, icono, título, gradiente, detalles). [impacto: frontend] — done
3. Implementar tarjetas (cards) clicables para cada opción con estilos consistentes. [impacto: frontend] — done
4. Reutilizar react-modal para mostrar detalles por opción, con accesibilidad básica y estilos del proyecto. [impacto: frontend] — done 
5. Agregar acción de copiar al portapapeles para campos clave (routing, cuenta, email), con feedback discreto. [impacto: frontend] — done
6. Mantener animación de entrada con useGsapContext. [impacto: frontend] — done
7. Validar integración en InvitationContent (import Gift sin cambios de ruta). [impacto: frontend] — done
8. Verificar dependencias existentes (@iconify/react, react-modal) y evitar introducir nuevas. [impacto: proceso] — done

Notas:
- No se añadieron dependencias nuevas.
- Se preservaron convenciones de Tailwind y variables de color existentes (var(--color-dusty-*)).
- Se evitó agregar comentarios en código salvo donde ya existían patrones.

Actualización (HIDE-COPY):
- Se añadió prop opcional hideCopy?: boolean al componente Gift para ocultar el botón de copiar en los diálogos. [impacto: frontend] — done
- Gift pasa showCopy a GiftDialog; cuando hideCopy=true, los botones de copiar no se renderizan. [impacto: frontend] — done
- Build de producción verificado sin errores (Next.js 15.5.2). [impacto: proceso] — done

Actualización (ESTILO DUSTYBLUE + CTA):
- Cards: avatar con fondo dusty blue y iconos blancos; hover sutil con sombra y leve elevación. [impacto: frontend] — done
- Botón Copiar: estilo minimalista (pill) con fondo dusty blue e ícono blanco, mantiene animación GSAP. [impacto: frontend] — done
- CTA bajo el grid: título "¿Tienes dudas?" y botón "Hablar con la pareja" (WhatsApp). [impacto: frontend] — done
- Nota adicional: baúl de regalos disponible para efectivo el día de la boda. [impacto: frontend] — done
- Verificar build. [impacto: proceso] — done

Actualización (FIX COPIAR: animación y alerta):
- La animación ahora se aplica al ícono del botón presionado, no al último renderizado. Se dejó de usar un ref compartido y se anima el ícono encontrado en el botón clickeado vía data attribute. [impacto: frontend] — done
- Se muestra un alert tras copiar, similar al feedback de confirmación de invitación. [impacto: frontend] — done
- Build de producción verificado sin errores. [impacto: proceso] — done

# Tasks — GIFTS-OPTIONS

Estado de estándares: No existe ./junie/development-standards.md en el repo; se siguen patrones del proyecto (Next.js App Router, TypeScript, Tailwind, gsap vía hook useGsapContext, react-modal para diálogos, Iconify para íconos).

1. Revisar componentes existentes para estilos y patrones (botones, modales, tipografías). [impacto: frontend] — done
2. Definir estructura de datos para opciones de regalo (id, icono, título, gradiente, detalles). [impacto: frontend] — done
3. Implementar tarjetas (cards) clicables para cada opción con estilos consistentes. [impacto: frontend] — done
4. Reutilizar react-modal para mostrar detalles por opción, con accesibilidad básica y estilos del proyecto. [impacto: frontend] — done 
5. Agregar acción de copiar al portapapeles para campos clave (routing, cuenta, email), con feedback discreto. [impacto: frontend] — done
6. Mantener animación de entrada con useGsapContext. [impacto: frontend] — done
7. Validar integración en InvitationContent (import Gift sin cambios de ruta). [impacto: frontend] — done
8. Verificar dependencias existentes (@iconify/react, react-modal) y evitar introducir nuevas. [impacto: proceso] — done

Notas:
- No se añadieron dependencias nuevas.
- Se preservaron convenciones de Tailwind y variables de color existentes (var(--color-dusty-*)).
- Se evitó agregar comentarios en código salvo donde ya existían patrones.

Actualización (HIDE-COPY):
- Se añadió prop opcional hideCopy?: boolean al componente Gift para ocultar el botón de copiar en los diálogos. [impacto: frontend] — done
- Gift pasa showCopy a GiftDialog; cuando hideCopy=true, los botones de copiar no se renderizan. [impacto: frontend] — done
- Build de producción verificado sin errores (Next.js 15.5.2). [impacto: proceso] — done

Actualización (ESTILO DUSTYBLUE + CTA):
- Cards: avatar con fondo dusty blue y iconos blancos; hover sutil con sombra y leve elevación. [impacto: frontend] — done
- Botón Copiar: estilo minimalista (pill) con fondo dusty blue e ícono blanco, mantiene animación GSAP. [impacto: frontend] — done
- CTA bajo el grid: título "¿Tienes dudas?" y botón "Hablar con la pareja" (WhatsApp). [impacto: frontend] — done
- Nota adicional: baúl de regalos disponible para efectivo el día de la boda. [impacto: frontend] — done
- Verificar build. [impacto: proceso] — done

Actualización (FIX COPIAR: animación y alerta):
- La animación ahora se aplica al ícono del botón presionado, no al último renderizado. Se dejó de usar un ref compartido y se anima el ícono encontrado en el botón clickeado vía data attribute. [impacto: frontend] — done
- Se muestra un alert tras copiar, similar al feedback de confirmación de invitación. [impacto: frontend] — done
- Build de producción verificado sin errores. [impacto: proceso] — done

Actualización (TOAST EN VEZ DE ALERT):
- Reemplacé window.alert por toast.success de react-hot-toast al copiar en Gift.tsx. [impacto: frontend] — done
- Se importó toast, { Toaster } y se añadió <Toaster /> dentro del componente Gift para asegurar el contenedor de notificaciones. [impacto: frontend] — done
- Build de producción verificado sin errores. [impacto: proceso] — done

Actualización (LOCK SCROLL EN MODALES):
- Se desactiva el scroll del documento cuando los modales están abiertos (GiftDialog y RSVPModal) ajustando overflow en body y html y restaurándolo al cerrar. [impacto: frontend] — done
- Verificado en build de producción (Next.js 15.5.2) sin errores. [impacto: proceso] — done

Actualización (FOOTER REDIRECT EN MODAL):
- Se agregó propiedad redirectBtn en GiftOption: { hide?: boolean; url?: string; label?: string; icon?: string }. [impacto: frontend] — done
- Para PayPal y Amazon se muestra botón de footer en el modal que abre en nueva pestaña; para ACH/BAC se oculta. [impacto: frontend] — done
- Estilo consistente (dusty blue, icono blanco, pill). [impacto: frontend] — done
- Build de producción verificado sin errores. [impacto: proceso] — done



Actualización (DINÁMICO DESDE DIRECTUS):
- Se actualizó el tipo GiftOptions.details a Record<string, string> en src/lib/directus-interfaces.ts, removiendo unknown|null. [impacto: tipos] — done
- Se creó endpoint GET /api/gift-options que recibe wedding_id (query o env) y devuelve opciones normalizadas desde Directus. [impacto: backend] — done
- Gift.tsx ahora obtiene datos de forma asíncrona desde /api/gift-options, mapeando a su modelo local y manejando estados de carga. [impacto: frontend] — done
- Se mantuvo la UI/UX existente (cards, modal, copiar con toast, lock de scroll). [impacto: frontend] — done
- No se añadieron dependencias nuevas. [impacto: proceso] — done


Actualización (UX COPIAR: feedback visual)
- Al presionar el botón Copiar, el label cambia temporalmente a "Copiado" y el icono a un check (lucide:check). [impacto: frontend] — done
- Se reutiliza el estado copiedKey existente en Gift.tsx, propagado al GiftDialog para condicionar icono y texto por campo. [impacto: frontend] — done
- Se mantiene el toast de confirmación y la animación GSAP del ícono. [impacto: frontend] — done

# Tasks — GIFTS-OPTIONS

Estado de estándares: No existe ./junie/development-standards.md en el repo; se siguen patrones del proyecto (Next.js App Router, TypeScript, Tailwind, gsap vía hook useGsapContext, react-modal para diálogos, Iconify para íconos).

1. Revisar componentes existentes para estilos y patrones (botones, modales, tipografías). [impacto: frontend] — done
2. Definir estructura de datos para opciones de regalo (id, icono, título, gradiente, detalles). [impacto: frontend] — done
3. Implementar tarjetas (cards) clicables para cada opción con estilos consistentes. [impacto: frontend] — done
4. Reutilizar react-modal para mostrar detalles por opción, con accesibilidad básica y estilos del proyecto. [impacto: frontend] — done 
5. Agregar acción de copiar al portapapeles para campos clave (routing, cuenta, email), con feedback discreto. [impacto: frontend] — done
6. Mantener animación de entrada con useGsapContext. [impacto: frontend] — done
7. Validar integración en InvitationContent (import Gift sin cambios de ruta). [impacto: frontend] — done
8. Verificar dependencias existentes (@iconify/react, react-modal) y evitar introducir nuevas. [impacto: proceso] — done

Notas:
- No se añadieron dependencias nuevas.
- Se preservaron convenciones de Tailwind y variables de color existentes (var(--color-dusty-*)).
- Se evitó agregar comentarios en código salvo donde ya existían patrones.

Actualización (HIDE-COPY):
- Se añadió prop opcional hideCopy?: boolean al componente Gift para ocultar el botón de copiar en los diálogos. [impacto: frontend] — done
- Gift pasa showCopy a GiftDialog; cuando hideCopy=true, los botones de copiar no se renderizan. [impacto: frontend] — done
- Build de producción verificado sin errores (Next.js 15.5.2). [impacto: proceso] — done

Actualización (ESTILO DUSTYBLUE + CTA):
- Cards: avatar con fondo dusty blue y iconos blancos; hover sutil con sombra y leve elevación. [impacto: frontend] — done
- Botón Copiar: estilo minimalista (pill) con fondo dusty blue e ícono blanco, mantiene animación GSAP. [impacto: frontend] — done
- CTA bajo el grid: título "¿Tienes dudas?" y botón "Hablar con la pareja" (WhatsApp). [impacto: frontend] — done
- Nota adicional: baúl de regalos disponible para efectivo el día de la boda. [impacto: frontend] — done
- Verificar build. [impacto: proceso] — done

Actualización (FIX COPIAR: animación y alerta):
- La animación ahora se aplica al ícono del botón presionado, no al último renderizado. Se dejó de usar un ref compartido y se anima el ícono encontrado en el botón clickeado vía data attribute. [impacto: frontend] — done
- Se muestra un alert tras copiar, similar al feedback de confirmación de invitación. [impacto: frontend] — done
- Build de producción verificado sin errores. [impacto: proceso] — done

Actualización (TOAST EN VEZ DE ALERT):
- Reemplacé window.alert por toast.success de react-hot-toast al copiar en Gift.tsx. [impacto: frontend] — done
- Se importó toast, { Toaster } y se añadió <Toaster /> dentro del componente Gift para asegurar el contenedor de notificaciones. [impacto: frontend] — done
- Build de producción verificado sin errores. [impacto: proceso] — done

Actualización (LOCK SCROLL EN MODALES):
- Se desactiva el scroll del documento cuando los modales están abiertos (GiftDialog y RSVPModal) ajustando overflow en body y html y restaurándolo al cerrar. [impacto: frontend] — done
- Verificado en build de producción (Next.js 15.5.2) sin errores. [impacto: proceso] — done

Actualización (FOOTER REDIRECT EN MODAL):
- Se agregó propiedad redirectBtn en GiftOption: { hide?: boolean; url?: string; label?: string; icon?: string }. [impacto: frontend] — done
- Para PayPal y Amazon se muestra botón de footer en el modal que abre en nueva pestaña; para ACH/BAC se oculta. [impacto: frontend] — done
- Estilo consistente (dusty blue, icono blanco, pill). [impacto: frontend] — done
- Build de producción verificado sin errores. [impacto: proceso] — done

Actualización (DINÁMICO DESDE DIRECTUS):
- Se actualizó el tipo GiftOptions.details a Record<string, string> en src/lib/directus-interfaces.ts, removiendo unknown|null. [impacto: tipos] — done
- Se creó endpoint GET /api/gift-options que recibe wedding_id (query o env) y devuelve opciones normalizadas desde Directus. [impacto: backend] — done
- Gift.tsx ahora obtiene datos de forma asíncrona desde /api/gift-options, mapeando a su modelo local y manejando estados de carga. [impacto: frontend] — done
- Se mantuvo la UI/UX existente (cards, modal, copiar con toast, lock de scroll). [impacto: frontend] — done
- No se añadieron dependencias nuevas. [impacto: proceso] — done

Actualización (UX COPIAR: feedback visual)
- Al presionar el botón Copiar, el label cambia temporalmente a "Copiado" y el icono a un check (lucide:check). [impacto: frontend] — done
- Se reutiliza el estado copiedKey existente en Gift.tsx, propagado al GiftDialog para condicionar icono y texto por campo. [impacto: frontend] — done
- Se mantiene el toast de confirmación y la animación GSAP del ícono. [impacto: frontend] — done

Actualización (FIX COPY FALLBACK)
- Se implementó una estrategia robusta de copiado: navigator.clipboard.writeText con fallback a textarea + document.execCommand("copy") y reintento final. [impacto: frontend] — done
- Ahora, aunque el contexto no sea seguro (http) o el permiso falle, el botón copia y el label cambia a "Copiado" con ícono de check, manteniendo el toast. [impacto: frontend] — done
