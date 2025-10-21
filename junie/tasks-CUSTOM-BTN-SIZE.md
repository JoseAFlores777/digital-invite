# Tasks — CUSTOM-BTN-SIZE

Contexto: Agregar una nueva feature al componente `CustomBtn` para controlar el tamaño del botón (padding, tipografía e ícono) sin romper usos existentes.

Estado de estándares: No existe `./junie/development-standards.md`; se siguen patrones del proyecto (Next.js App Router, TS, Tailwind v4, util `cn`). Cambios mínimos y compatibles hacia atrás.

## Tareas
1. Definir tipo `CustomBtnSize = "xs" | "sm" | "md" | "lg" | "xl"` y prop opcional `size?: CustomBtnSize` (default: `"md"`). [impacto: frontend] — done ✓
2. Mapear clases por tamaño (contenedor: paddings y font-size; ícono: ancho/alto; label: font-size) y aplicarlas en el render. [impacto: frontend] — done ✓
3. Mantener `rounded-xl`, variantes visuales existentes y lógica `href`/`onClick` sin cambios. [impacto: frontend] — done ✓
4. Validar que los tamaños utilicen clases válidas de Tailwind (sin fracciones no soportadas). [impacto: QA] — done ✓
5. Documentar ejemplos de uso. [impacto: docs] — done ✓

## API
- Nueva prop: `size?: "xs" | "sm" | "md" | "lg" | "xl"`.
- Default: `"md"` (equivale a los valores anteriores por defecto del componente).

## Mapeos
- xs → container: `px-3 py-1.5 text-xs`, icon: `w-4 h-4`, label: `text-xs`
- sm → container: `px-4 py-2 text-sm`, icon: `w-4 h-4`, label: `text-sm`
- md → container: `px-5 py-2.5 text-sm`, icon: `w-5 h-5`, label: `text-sm`
- lg → container: `px-6 py-3 text-base`, icon: `w-6 h-6`, label: `text-base`
- xl → container: `px-7 py-3.5 text-lg`, icon: `w-6 h-6`, label: `text-lg`

## Ejemplos
```tsx
// Enlace externo, tamaño pequeño
<CustomBtn
  href="https://example.com"
  label="Abrir"
  icon="lucide:external-link"
  size="sm"
  variant="outline"
/>

// Acción con onClick, tamaño grande con brillo
<CustomBtn
  onClick={() => console.log('click')}
  label="Continuar"
  icon="lucide:arrow-right"
  iconPosition="right"
  size="lg"
  variant="primary"
  shine
/>
```

## Notas
- Sigue siendo determinista para SSR/CSR (no usa `window`).
- `aria-label` por defecto usa `label` si no se especifica.
- No se introducen dependencias nuevas ni cambios en otros componentes.