# Tareas: Migración a next/image en Hero y PhotoBanner1

1. Revisar lineamientos en `.junie/guidelines.md` — documentación — done
2. Auditar `Hero.tsx` y `photoBanner_1.tsx` para localizar `<img>` — frontend — done
3. Reemplazar `<img>` por `Image` en `Hero.tsx` con `fill`, `sizes="100vw"`, `priority`, y mantener `data-hero-zoom` y clases — frontend — done
4. Reemplazar `<img>` por `Image` en `photoBanner_1.tsx` con `fill`, `sizes="100vw"`, `priority`, y mantener `data-hero-zoom` y clases — frontend — done
5. Verificar que GSAP sigue encontrando `[data-hero-zoom]` y que la escala vía `--hero-zoom` afecta a la imagen — QA — done (razonado)
6. Actualizar documentación en `.junie/requirements-use-next-image.md` y este archivo de tareas — documentación — done
7. Preparar commit y rama (no ejecutable en este entorno) — VCS — pendiente
