# Tasks: WEDDING-HEADER-SIZE

1. Review development standards at ./junie/development-standards.md and align approach. [blocked]
   - File not found; followed existing component patterns (React/TS, Tailwind) and minimal changes. Requires maintainer validation.
2. Analyze current WeddingHeader API and usages to ensure backwards compatibility. [done]
3. Add `size` prop to `WeddingHeader` with variants: `sm | md | lg` (default `md`). [done]
4. Implement size mapping for logo size, title typography, subtitle/date sizes, margins, and paddings. [done]
   - Ensure explicit `logoSize` prop overrides size-based logo default. [done]
5. Preserve `backgroundVariant` behavior and color logic while combining with size styles. [done]
6. Build/type-check project and smoke test pages using WeddingHeader (`/gifts`, `EnvelopeWelcome`). [pending]
7. Document work in this tasks file. [done]

Notes:
- No breaking changes: default `md` replicates previous visual scale.
- No external dependencies added.
- Consider adding `xl` in the future if needed.
