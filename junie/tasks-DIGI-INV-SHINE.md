# Tareas — DIGI-INV-SHINE

Estado de estándares: No existe ./junie/development-standards.md en el repo; se siguen patrones del proyecto (Next.js App Router + TS, Tailwind v4 CSS-first). Contexto externo: MagicUI (via Context7) para ShineBorder y AnimatedShinyText.

## Lista de tareas
1. Revisar setup Tailwind v4 y archivos globales importados en layout. [impacto: proceso] — done
2. Añadir tokens y keyframes de MagicUI (shine y shiny-text) en src/app/globals.scss con @theme inline. [impacto: frontend] — done
3. Ajustar composición de CustomBtn para usar ShineBorder por debajo del contenido y asegurar z-index correcto. [impacto: frontend] — done
   - Renderizar ShineBorder antes del contenido dentro de Wrapper. — done
   - Agregar z-10 al botón/enlace y z-0 al ShineBorder. — done
4. Mantener un solo global activo (globals.scss). No importar globals.css. [impacto: proceso/frontend] — done (layout ya importa globals.scss)
5. Verificación manual: comprobar en UI que se anima el borde (clase motion-safe:animate-shine → animation-name: shine). [impacto: QA] — pendiente de validación manual en entorno local.
6. Notas de accesibilidad: tener en cuenta que motion-safe deshabilita animación si el usuario tiene "reducir movimiento". [impacto: docs] — done

## Cambios sensibles
- src/app/globals.scss: se agregan @theme inline con variables --animate-shine y --animate-shiny-text, y sus @keyframes.
- src/components/CustomBtn.tsx: ShineBorder se renderiza bajo el contenido; se ajusta z-index.

## Pendientes / revisión humana
- Validar visualmente el contraste de colores del borde para variantes de botón.
- Confirmar que no existan estilos que sobrescriban background-position u otras props en componentes que compongan CustomBtn.

