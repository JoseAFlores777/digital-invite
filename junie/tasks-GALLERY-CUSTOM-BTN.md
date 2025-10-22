# Tasks: GALLERY-CUSTOM-BTN

1. Review development standards at ./junie/development-standards.md. [blocked]
   - File not found in repo snapshot. Proceeded with existing patterns (React/TS, Tailwind) and minimal changes. Requires human validation.
2. Assess CustomBtn capabilities for replacing native toggle button. [done]
3. Extend CustomBtn to support `ariaExpanded` and forward as `aria-expanded`. [done]
4. Replace native toggle button in `src/components/Gallery.tsx` with `CustomBtn`. [done]
5. Replace native toggle button in `src/components/ResponsiveImageGallery.tsx` with `CustomBtn`. [done]
6. Build/type-check project to verify no errors. [done]
7. Smoke test UI (manual) to verify look & behavior unchanged apart from styling. [pending]

Notes:
- Kept styling consistent using `variant="filled"` and `size="md"`. Adjust via design tokens if needed.
- Preserved accessibility by wiring `aria-expanded` through `CustomBtn`.
