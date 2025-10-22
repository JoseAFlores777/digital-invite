# Tasks: RESPONSIVE-GALLERY

1. Review development standards at ./junie/development-standards.md. [blocked]
   - File not found in repo snapshot. Proceeded with common project conventions (TypeScript, React, Tailwind) and minimalism. Requires human validation. 
2. Analyze requirements for responsive image gallery with collapse, fade-out, and toggle. [done]
3. Implement reusable component `ResponsiveImageGallery` in `src/components/ResponsiveImageGallery.tsx`. [done]
   - Props: images, className, maxCollapsedHeight, rounded, gap, columns, fadeHeight, seeMoreLabel, seeLessLabel. [done]
   - Behavior: measure overflow, show gradient fade when collapsed and overflowing, animate max-height on toggle, accessible button with aria-expanded. [done]
   - Layout: responsive CSS grid with object-cover, rounded corners, consistent aspect ratio (4/3). [done]
4. Ensure easy integration for React/Next.js. [done]
   - No external deps; client component, Tailwind utility classes, accepts configuration via props. [done]
5. Server: Ensure all web_photos are returned (not only 5). [done]
   - Add deep `_limit: -1` and `_sort: ["sort"]` in `weddings.service.ts`. [done]
6. Local build/type-check and smoke test. [done]
   - Run `npm run build` and hit `/api/wedding-generalities` to confirm >5 photos return and UI behavior. [done]
7. Accessibility & UX polish. [done]
   - Focus styles on button, aria-expanded, gradient has `aria-hidden`. [done]

Notes:
- No API contract changes introduced.
- Please validate design tokens (colors) against design system if available.
- If ./junie/development-standards.md exists elsewhere, align naming and export patterns accordingly.
