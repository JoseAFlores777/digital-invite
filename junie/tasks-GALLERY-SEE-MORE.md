# Tasks: GALLERY-SEE-MORE

1. Review development standards at ./junie/development-standards.md and align approach. [blocked]
   - File not found; followed existing project patterns (React/TS, Tailwind, minimal code). Requires maintainer validation. [blocked]
2. Analyze Gallery.tsx to integrate "Ver más/Ver menos" without breaking PhotoSwipe. [done]
3. Add collapse/expand logic in Gallery.tsx with state (expanded, isOverflowing, maxHeight) and ResizeObserver. [done]
4. Wrap grid in container with animated max-height and fade overlay on overflow. [done]
5. Add centered toggle button with aria-expanded and Spanish labels. [done]
6. Keep existing grid layout and lightbox behavior intact. [done]
7. Build/type-check to ensure no errors and smoke test locally. [pending]

Notes:
- No API changes. UI-only enhancement.
- Gradient overlay uses inline style for precise control; colors align with white gallery background.
- Button uses existing Tailwind palette; adjust via design tokens if available.
