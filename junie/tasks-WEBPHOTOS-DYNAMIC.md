# Tasks: WEBPHOTOS-DYNAMIC

1. Revisar estándares en ./junie/development-standards.md. [done]
2. Analizar uso actual de DESKTOP_ITEMS/MOBILE_ITEMS en InvitationContent. [done]
3. Extender API /api/wedding-generalities para exponer `directus_url`. [done]
4. Mapear `wedding.web_photos` → ZoomItemConfig (desktop con campos sin _m; mobile con *_m o fallback). [done]
5. Reemplazar arrays hardcodeados por estado derivado de la API con fallbacks. [done]
6. Ordenar por `sort` cuando exista. [done]
7. Build del proyecto y validación de compilación. [done]
8. Prueba de humo manual (pendiente en entorno real). [pending]

Notas:
- No se añadieron dependencias externas.
- Se preservan arrays de fallback para evitar pantallas vacías si no hay fotos.
- `src` se construye como `${DIRECTUS_URL}/assets/{asset}` provisto por la API.
