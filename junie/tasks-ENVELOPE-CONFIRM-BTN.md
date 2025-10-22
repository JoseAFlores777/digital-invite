# Tasks: ENVELOPE-CONFIRM-BTN

1. Review development standards at ./junie/development-standards.md. [blocked]
   - File not present in repo; followed existing patterns (React/TS, Tailwind) and minimal change approach. Requires maintainer validation.
2. Analyze EnvelopeWelcome.tsx to determine placement and data needed (invitationID). [done]
3. Add `confirmHref` state in EnvelopeWelcome. [done]
4. In `useEffect`, read `invitationID` from `window.location` and build `https://invite.joseiz.com/solicitud/?invitationID=<id>`. [done]
5. Render second `CustomBtn` next to gifts button with label "Confirmar invitación" and aria-label. [done]
6. Adjust layout to display buttons side by side with spacing (`gap-3`, `flex-wrap`). [done]
7. Build/type-check project to ensure no errors. [pending]

Notes:
- No backend changes.
- Kept UI consistent using `variant="outline"` and `size="lg"`.
- Button opens in a new tab (`target="_blank"`).