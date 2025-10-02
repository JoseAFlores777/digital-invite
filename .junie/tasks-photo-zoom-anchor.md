# Tareas: Anclaje de zoom direccionado en PhotoBanner1

1. Revisar lineamientos en `.junie/guidelines.md`. — documentación — done
2. Definir enum `PhotoZoomAnchor` con 9 posiciones estándar. — frontend — done
3. Agregar prop `anchor?: PhotoZoomAnchor` a `PhotoBanner1` con default `Center`. — frontend — done
4. Mapear enum a CSS `transform-origin` y aplicarlo al `<Image>`; retirar `origin-center` de clases. — frontend — done
5. Mantener intacta la lógica GSAP/ScrollTrigger (scrub, onUpdate, will-change). — frontend — done
6. Validar (razonado) que el zoom pivotea en el punto elegido y que `prefers-reduced-motion` se respeta. — QA — done
7. (Opcional) Exponer ejemplos en `PanelPinStack` pasando `anchor` a alguna instancia. — frontend — pending
8. Preparar rama/commits atómicos (no ejecutable aquí). — VCS — pending
