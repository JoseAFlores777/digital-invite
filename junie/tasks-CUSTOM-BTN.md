# Tasks — CUSTOM-BTN

Contexto: Crear un botón dinámico (similar a GiftsShareButton) altamente abstracto llamado `CustomBtn` con soporte para:
- Props de entrada/salida: `href` (anchor externo) u `onClick` (handler) para el exterior.
- Iconos (Iconify) a la izquierda o derecha, y `label` configurable.
- Variantes visuales: `primary`, `secondary`, `danger`, `warning`, `tertiary`, `outline`, `filled`.
- Activación opcional del efecto de borde animado usando `src/components/ui/shine-border.tsx` (prop `shine`).

Estado de estándares: No existe `./junie/development-standards.md`. Se siguen patrones del proyecto (Next.js App Router, TS, Tailwind v4, util `cn`, Iconify, componentes en `src/components`).

## Tareas
1. Implementar `src/components/CustomBtn.tsx` con API flexible y sin dependencias nuevas. [impacto: frontend] — done ✓
   - Discriminación de props por `href` (render `<a>`) u `onClick` (render `<button>`). — done ✓
   - Props: `label`, `icon`, `iconPosition` ("left" | "right"), `variant`, `shine`, `ariaLabel`, `disabled`, `className`, `children`. — done ✓
   - Variantes estilísticas mapeadas a clases Tailwind en línea con la paleta `dusty`. — done ✓
   - Integración opcional de `ShineBorder` como overlay al contenedor del botón. — done ✓
2. Validación de SSR/CSR: Sin uso de `window` ni datos variables; componentes deterministas (evita hydration mismatch). [impacto: QA] — done ✓
3. Documentar props y ejemplo de uso en este archivo. [impacto: docs] — done ✓

## Ejemplo de uso
```tsx
import CustomBtn from "@/components/CustomBtn";

// Link externo con icono a la izquierda y brillo
<CustomBtn
  href="https://api.whatsapp.com/send?text=hola"
  label="Compartir"
  icon="mdi:whatsapp"
  iconPosition="left"
  variant="outline"
  shine
/>

// Botón con onClick, icono a la derecha
<CustomBtn
  onClick={() => console.log('click')}
  label="Continuar"
  icon="lucide:arrow-right"
  iconPosition="right"
  variant="primary"
/>
```

## Notas
- `aria-label` por defecto usa `label` si no se provee explícitamente.
- Cuando `target="_blank"` se aplica `rel="noopener noreferrer"` por seguridad.
- Mantiene consistencia con estilos existentes (`rounded-xl`, tamaños, paleta `dusty`).
