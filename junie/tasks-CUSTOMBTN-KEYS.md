# Tasks — CUSTOMBTN-KEYS

Contexto: Agregar un key único a cada CustomBtn, priorizando los que se renderizan dentro de iteraciones.

1. Revisar estándares en junie/development-standards.md y contexto previo de CustomBtn. Impacto: documentación ✓
2. Identificar renderizados de CustomBtn dentro de listas (.map) y elementos repetibles. Impacto: frontend ✓
3. Gift.tsx
   - Agregar key a botón de compartir en encabezado (stable: "share-info"). Impacto: frontend ✓
   - Mantener key en lista de opciones (ya existía key={opt.id}). Impacto: frontend ✓
   - Agregar key al botón de cierre del diálogo ("close-" + option.id). Impacto: frontend ✓
   - Agregar key al botón de copiar por cada detalle ("copy-" + label). Impacto: frontend ✓
   - Agregar key al botón de redirección del diálogo ("redirect-" + option.id). Impacto: frontend ✓
   - Agregar key al botón de contacto por WhatsApp ("contact-couple"). Impacto: frontend ✓
4. EnvelopeWelcome.tsx
   - Agregar key al botón de enlace a mesa de regalos ("envelope-gifts-link"). Impacto: frontend ✓
5. Validación estática: búsqueda de otros CustomBtn en listas; no se encontraron casos adicionales. Impacto: verificación ✓

Notas:
- No se modificó la API de CustomBtn ni se añadieron dependencias.
- Las keys se basan en identificadores estables disponibles (id, label) o literales fijos cuando es elemento único.
- No se añadieron comentarios en código, siguiendo las guías.
