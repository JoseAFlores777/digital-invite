# Requerimientos DIGI-INV-003

Actualizar correctamente la función existente para traer los invitados digitales, alineándola con el esquema real de Directus y con los hallazgos obtenidos vía MCP (Directus). La función debe ser más robusta ante permisos de campo y devolver un formato coherente en la aplicación.

Criterios de aceptación:
- Debe seguir usando el cliente de Directus del servidor (no exponer secretos en el cliente).
- Debe permitir seleccionar los campos a recuperar (p. ej. incluir `person.first_name`/`person.last_name`).
- Debe filtrar por el campo configurado que indica invitación digital. Si el filtro directo falla por permisos, debe tener un fallback que obtenga los registros permitidos y filtre localmente.
- Debe normalizar el resultado a un `Guest[]` con `id`, `name`, `email`, `phone` cuando sea posible.
- No debe dejar logs temporales.
- Debe manejar errores devolviendo `[]` sin lanzar excepción.

Variables de entorno:
- `DIRECTUS_GUESTS_COLLECTION` (por defecto: `guests`)
- `DIRECTUS_GUESTS_DIGITAL_FIELD` (por defecto: `is_digital`)
- `DIRECTUS_GUESTS_DIGITAL_VALUE` (por defecto: `true`)
- `DIRECTUS_GUESTS_FIELDS` (opcional, lista separada por comas de campos a pedir; puede incluir relaciones como `person.first_name`)

Notas:
- Se asumió, por los hallazgos de MCP, que la entidad `guests` puede no tener un campo de nombre plano; se toma de la relación `person` cuando aplica.
- Si el rol no permite filtrar directamente por el campo digital, se hace un segundo intento sin filtro y se filtra en memoria.
