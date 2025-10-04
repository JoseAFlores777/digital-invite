# Tareas DIGI-INV-002

1. Revisar estándares del proyecto en `./junie/development-standards.md` y documentar hallazgos. [impacto: docs] — done ✓
   - Hallazgo: No existe `./junie/development-standards.md`. Se siguen patrones del repo (Next.js App Router, TypeScript, Tailwind, Directus SDK, variables de entorno en server).
2. Preparar plantilla `.env.example` con variables necesarias de Directus. [impacto: devops] — done ✓
   - Incluye: `DIRECTUS_URL`, `DIRECTUS_STATIC_TOKEN`, `DIRECTUS_COLLECTION`, `DIRECTUS_GUESTS_COLLECTION`, `DIRECTUS_GUESTS_DIGITAL_FIELD`, `DIRECTUS_GUESTS_DIGITAL_VALUE`.
3. Crear endpoint server-side `/api/digital-guests` que invoque `getDigitalGuests()` y devuelva `{ guests }`. [impacto: backend] — done ✓
4. Actualizar `src/app/page.tsx` para hacer `fetch('/api/digital-guests')` en `useEffect` al montar. [impacto: frontend] — done ✓
   - Se ignora el valor del estado para evitar variables no usadas (`const [, setDigitalGuests] = useState([])`).
5. Validar compilación/typos (`tsc` o `next build`). [impacto: build/tests] — pendiente
6. Anotar cualquier error encontrado y su corrección. [impacto: docs] — pendiente
