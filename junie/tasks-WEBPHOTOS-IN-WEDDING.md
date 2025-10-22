# Tasks: WEBPHOTOS-IN-WEDDING

1. Review development standards and project patterns. [in_progress]
2. Add WebPhotos type to src/lib/directus-interfaces.ts. [done]
3. Extend Weddings type to include web_photos: any[] & WebPhotos[]. [done]
4. Update weddings.service.ts to include web_photos in WeddingGeneralities type. [done]
5. Update fields selection in weddings.service.ts to fetch web_photos fields. [done]
6. Build/Type-check project locally to validate changes. [done]
7. Smoke test getWeddingById to ensure web_photos are returned. [done]
8. Filter web_photos by status == 'published' using deep filter in Directus query. [done]

Notes:
- No external dependencies added.
- Kept changes minimal and aligned with existing coding style.
