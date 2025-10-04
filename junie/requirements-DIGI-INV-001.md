# Requerimientos DIGI-INV-001

Crear una función en `src/lib/directus.ts` que devuelva una lista de todos los invitados cuya invitación sea digital. Debe usar el cliente de Directus ya existente y permitir configurar la colección y el campo que determina si la invitación es digital.

Criterios de aceptación:
- La función debe exportarse públicamente.
- Debe devolver `Guest[]`.
- Debe consultar a Directus filtrando por el campo que indica invitación digital.
- Debe manejar ausencia de configuración o error devolviendo `[]` sin lanzar excepción.
- La colección y el campo deben poder configurarse por variables de entorno.

Variables de entorno propuestas:
- `DIRECTUS_GUESTS_COLLECTION` (por defecto: `guests`)
- `DIRECTUS_GUESTS_DIGITAL_FIELD` (por defecto: `is_digital`)
- `DIRECTUS_GUESTS_DIGITAL_VALUE` (por defecto: `true`)
