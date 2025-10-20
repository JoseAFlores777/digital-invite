# Tasks: INVITATION-CODE-IN-QUOTES

1. Revisar estándares en ./junie/development-standards.md. [done]
2. Detectar referencia inválida a `guestName` en InvitationContent y definir estrategia. [done]
3. Agregar prop `inviteCode?: string` a InvitationContent y usarla en `quoteText`. [done]
4. Pasar `inviteSender` desde page.tsx a InvitationContent como `inviteCode`. [done]
5. Verificación de tipos y compilación (sincronizada con Next.js). [pending]
6. Smoke test: con `invitationID` válido, comprobar que el texto del quote incluye el código tal como en EnvelopeWelcome. [pending]

Notas:
- Cambio mínimo, sin dependencias nuevas.
- Se mantiene la compatibilidad; cuando no hay `inviteCode`, se muestra vacío en el slot del nombre.
- Cubre el requerimiento: “agregar el invitation code igual que en EnvelopeWelcome” dentro del array `quoteText` en PerspectiveZoom.
