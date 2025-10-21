# Tasks – GIFTS-HEADERS-AWAIT

Context: Fix Next.js error "headers() should be awaited" on /gifts page.

1. Review project development standards in junie/ (file not found). Note absence and proceed with minimal, aligned change. Impact: documentation ✓
2. Locate offending usage in src/app/gifts/page.tsx and change to `const hdrs = await headers();`. Impact: frontend/server component ✓
3. Verify function is async and no further changes needed. Impact: frontend ✓
4. Validate share URL still formed with sane defaults when headers are missing. Impact: frontend ✓
5. Run/verify that the sync dynamic API warning/error no longer occurs on /gifts. Impact: tests/manual *

Notes:
- No external dependencies added. No comments introduced in code.
- If any additional dynamic API (cookies(), draftMode()) is used elsewhere, apply the same `await` pattern.
