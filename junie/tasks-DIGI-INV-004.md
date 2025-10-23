# Tareas – DIGI-INV-004

Estado de estándares: No existe ./junie/development-standards.md en el repo; se siguen patrones del proyecto (Next.js App Router + TypeScript + Tailwind) y consistencia con componentes actuales.

1. Dinamizar “sea/sean” en InvitationContent para el 3er quote de PerspectiveZoom. [impacto: frontend]
   - Añadir prop invitedCount a InvitationContent. (done)
   - Pasar invitedCount desde app/page.tsx (donde ya se calcula). (done)
   - Renderizar “sea” si invitedCount === 1, de lo contrario “sean”. (done)

2. Controlar ScrollIdleHintOverlay para suprimir hints en la sección Galería. [impacto: frontend]
   - Extender ScrollIdleHintOverlay con prop opcional suppressWhenInViewRef para suprimir mientras un elemento esté en viewport. (done)
   - En InvitationContent, crear ref hacia el contenedor de <Gallery /> y pasarlo a suppressWhenInViewRef. (done)
   - Ajustar endTolerancePx/showAgainOffsetPx en la instancia (0 y 120 respectivamente) para evitar supresión por “final de página” y permitir reactivación al salir de la galería. (done)

3. Mejorar responsividad del card de Menú en móviles angostos. [impacto: frontend]
   - Reducir padding horizontal en móviles: px-6 sm:px-8 md:px-12 lg:px-20 en el contenedor. (done)
   - Mantener paddings amplios en md+ para una buena lectura. (done)

Notas:
- No se agregaron dependencias externas.
- Cambios mínimos, sin comentarios innecesarios en código.
- Se recomienda validación manual en dispositivos angostos (<360px) para verificar el confort visual del Menú.


4. Corregir ReferenceError: invitedCount no está definido en app/page.tsx. [impacto: frontend]
   - Subir invitedCount a estado de componente: const [invitedCount, setInvitedCount] = useState<number>(0). (done)
   - En el efecto que carga la invitación, calcular count y llamar setInvitedCount(count). (done)
   - Usar count para construir el subtítulo y pasar invitedCount por props a InvitationContent. (done)
