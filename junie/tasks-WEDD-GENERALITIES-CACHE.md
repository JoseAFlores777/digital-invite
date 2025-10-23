# Tareas — WEDD-GENERALITIES-CACHE (Zustand)

Estado de estándares: No existe ./junie/development-standards.md en el repo; se siguen patrones del proyecto (Next.js App Router + TS, Tailwind, componentes client/server). Sin contradicciones.

1. Crear store global con Zustand para wedding-generalities, con memo de promesa por weddingId. [impacto: frontend] — done
2. Agregar dependencia `zustand` en package.json. [impacto: tooling] — done
3. Refactorizar componentes para leer del store y evitar fetch duplicados: [impacto: frontend]
   3.1. Countdown — done
   3.2. Gallery — done  
   3.3. GiftsLiveButton — done  
   3.4. Itinerary — done  
   3.5. WeddingHeader — done  
   3.6. SharedAlbum — done  
   3.7. InvitationContent (collage) — done
4. Eliminar llamada redundante a /api/wedding-generalities en src/app/page.tsx (carga suplementaria). [impacto: frontend] — done
5. Mantener SolicitudManager sin cambios por ahora (usa weddingId específico y flujo distinto). Documentar posible migración futura al store si se requiere. [impacto: frontend] — done
6. Validaciones manuales: carga principal hace una sola llamada a /api/wedding-generalities; UI intacta en secciones que consumen datos. [impacto: tests/manual] — pendiente

Notas:
- La store calcula weddingId desde query (?wedding_id) o env (NEXT_PUBLIC_WEDDING_ID/DIRECTUS_WEDDING_ID).
- `useWeddingData(weddingId?)` expone { data, loading, error, refresh } y dispara carga perezosa la primera vez; promesas simultáneas se comparten para evitar duplicados.
- No se añadieron comentarios en código salvo lo mínimo necesario.
- SSR/preload de datos en layout se puede agregar en futuro para cache por request si se requiere, pero no es necesario para cumplir reducir llamadas en cliente.
