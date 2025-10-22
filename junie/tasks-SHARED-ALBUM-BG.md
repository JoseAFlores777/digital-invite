# Tareas — SHARED-ALBUM-BG

1. Revisar estándares y hooks GSAP existentes (useGsapContext). [impacto: general] — done
2. Verificar que la API devuelva web_photos en wedding-generalities. [impacto: backend] — done
3. Extender SharedAlbum para consumir web_photos sin filtrar por type. [impacto: frontend] — done
4. Implementar background slideshow con GSAP (crossfade, baja opacidad). [impacto: frontend] — done
5. Asegurar contraste con overlay y mantener estética de Gift. [impacto: frontend] — done
6. Respetar prefers-reduced-motion (desactivar animación si aplica). [impacto: frontend] — done
7. Validación manual local: render, enlaces, animación cíclica. [impacto: tests] — pendiente

Notas:
- Se usó NEXT_PUBLIC_DIRECTUS_URL para construir las URLs de assets.
- No se filtran web_photos por tipo; sólo se descartan entradas sin asset.
