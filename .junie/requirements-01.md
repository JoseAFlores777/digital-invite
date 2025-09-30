### Historia de Usuario: Divisor con difuminado entre Hero y “Nuestra Historia”

#### Descripción
Como visitante del sitio, quiero que la transición visual entre el hero y la sección “Nuestra Historia” sea un difuminado progresivo desde `blue-dusty` hacia blanco (o hacia el color de la tarjeta de la sección siguiente), para percibir una continuidad suave sin líneas duras ni saltos visuales.

#### Valor
- Mejora la percepción de calidad y cuidado visual del sitio.
- Reduce la sensación de “corte” entre secciones, favoreciendo la continuidad narrativa.
- Sienta base para transiciones consistentes en futuras secciones.

---

### Alcance y supuestos
- El color `blue-dusty` existe en el sistema de diseño (Tailwind) o se agregará como color extendido.
- El color de fondo de la tarjeta de “Nuestra Historia” estará disponible via variable CSS o clase Tailwind (p. ej., `bg-card` o `var(--card-bg)`).
- El proyecto usa Next.js/React con TailwindCSS y GSAP (con `ScrollTrigger`).
- Animación únicamente decorativa; no debe requerir interacción para consumir contenido.

---

### Criterios de Aceptación (Gherkin)
1) Difuminado estático y continuidad cromática
- Dado que estoy en la sección hero,
- Cuando hago scroll hasta el límite inferior del hero,
- Entonces observo un difuminado vertical de `blue-dusty` a blanco (o al color de la tarjeta siguiente) sin líneas divisorias visibles.

2) Adaptación al color de destino
- Dado un color de tarjeta distinto de blanco,
- Cuando la sección “Nuestra Historia” define `--card-bg`,
- Entonces el difuminado usa ese color como destino final (no blanco).

3) Responsivo
- Dado que uso distintos tamaños de pantalla (320px hasta 4K),
- Cuando visualizo la transición,
- Entonces el gradiente cubre el ancho completo y su altura se ajusta (p. ej., 56–160px) para mantener una transición suave sin banding visible.

4) Accesibilidad: preferencia de movimiento reducido
- Dado que tengo activado “reducir movimiento” a nivel del sistema,
- Cuando hago scroll,
- Entonces la animación basada en scroll queda deshabilitada y el difuminado se muestra en su estado final estático.

5) Rendimiento
- Dado un dispositivo móvil de gama media,
- Cuando navego y hago scroll,
- Entonces no se presentan caídas perceptibles de FPS y no hay cambios de layout (CLS ≤ 0.1) causados por el divisor.

6) Compatibilidad
- Dado que uso navegadores modernos (últimas 2 versiones de Chrome, Safari, Firefox, Edge),
- Cuando navego al sitio,
- Entonces el difuminado y la animación funcionan de forma consistente; en navegadores sin `ScrollTrigger` o con JS desactivado, el degradado estático se ve correcto.

7) Integración visual
- Dado el stacking context de hero y la sección siguiente,
- Cuando la página se renderiza,
- Entonces el divisor queda correctamente por encima del fondo del hero y por debajo del contenido de “Nuestra Historia” (sin tapar texto o elementos interactivos).

---

### Definición de Hecho (DoD)
- Gradiente implementado y visible en todas las breakpoints definidas por diseño.
- Animación con GSAP `ScrollTrigger` enlazada al scroll, desactivada con `prefers-reduced-motion`.
- Sin reflows innecesarios: solo animar propiedades GPU-friendly (`opacity`, `transform`).
- Linter/formatter pasan sin errores.
- Pruebas manuales cruzadas en Chrome, Safari, Firefox, Edge (desktop y mobile simulados) sin issues perceptibles.
- Medidas de Lighthouse muestran CLS ≤ 0.1, LCP no degradado por el divisor.
- Documentación breve de uso y toggles de color destino.

---

### Plan de Implementación

#### 1) Configuración de Tailwind
- Agregar el color `blue-dusty` a `tailwind.config.(js|ts)` si no existe.

```ts
// tailwind.config.ts
export default {
  theme: {
    extend: {
      colors: {
        'blue-dusty': '#8CAFD1', // ajustar al token oficial de diseño
        'card': 'var(--card-bg, #ffffff)',
      },
      backgroundImage: {
        // Gradiente vertical del difuminado
        'hero-fade-white': 'linear-gradient(to bottom, var(--fade-from, theme(colors.blue-dusty)) 0%, rgba(255,255,255,0) 40%, theme(colors.white) 100%)',
        'hero-fade-card': 'linear-gradient(to bottom, var(--fade-from, theme(colors.blue-dusty)) 0%, rgba(255,255,255,0) 40%, var(--fade-to, theme(colors.card)) 100%)',
      },
    },
  },
  plugins: [],
};
```

Notas:
- Se usan variables CSS `--fade-from` y `--fade-to` para sobrescribir colores si hiciera falta sin recompilar Tailwind.

#### 2) Marcado y estructura (React/Next.js)
- Insertar un contenedor `div` al final del hero que actúe como capa de fade.
- Debe estar posicionado y con `pointer-events-none` para no interferir con la interacción.

```tsx
// Hero.tsx (fragmento)
export function Hero() {
  return (
    <section className="relative isolate">
      {/* ...contenido del hero... */}

      {/* Divisor por difuminado */}
      <div
        id="hero-fade"
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 -bottom-px h-24 sm:h-28 md:h-32 lg:h-40 xl:h-48"
      >
        <div className="h-full w-full bg-hero-fade-card" />
      </div>
    </section>
  );
}
```

- En la sección “Nuestra Historia” o en la tarjeta, declarar el color objetivo si no es blanco:

```tsx
// OurStorySection.tsx (fragmento)
export function OurStorySection() {
  return (
    <section
      id="our-story"
      style={{
        // Color de tarjeta configurable; fallback a blanco
        // Esto alimenta el gradiente `bg-hero-fade-card` a través de `var(--fade-to)`
        // y también la clase `bg-card` si se usa.
        ["--card-bg" as any]: "#FAF7F2", // ejemplo: tono marfil de tarjeta
        ["--fade-to" as any]: "var(--card-bg)",
      }}
      className="relative bg-card"
    >
      {/* contenido */}
    </section>
  );
}
```

Opciones de utilidad:
- Usar `bg-hero-fade-white` si el destino debe ser explícitamente blanco.
- Cambiar la altura `h-24 ... xl:h-48` según densidad deseada del fade.

#### 3) Animación con GSAP + ScrollTrigger
- Objetivo: sutil aparición/desaparición del fade al hacer scroll para evitar salto visual.
- Animar solo `opacity` del `#hero-fade` o traducir unos píxeles el wrapper (GPU-friendly).

```ts
// useHeroFade.ts (o en un hook GSAP centralizado)
import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined' && gsap && !gsap.core.globals()["ScrollTrigger"]) {
  gsap.registerPlugin(ScrollTrigger);
}

export function useHeroFade() {
  useEffect(() => {
    const motionReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (motionReduced) return; // accesibilidad: sin animación

    const fadeEl = document.querySelector('#hero-fade');
    if (!fadeEl) return;

    const ctx = gsap.context(() => {
      gsap.set(fadeEl, { opacity: 0.9 });

      gsap.to(fadeEl, {
        opacity: 0, // el fade se desvanece conforme aparece la siguiente sección
        ease: 'power1.out',
        scrollTrigger: {
          trigger: fadeEl, // está al final del hero
          start: 'top bottom', // cuando la parte superior del fade entra en el viewport inferior
          end: 'bottom center',
          scrub: true,
          fastScrollEnd: true,
          invalidateOnRefresh: true,
        },
      });
    });

    return () => ctx.revert();
  }, []);
}
```

- Invocar el hook en el componente `Hero`:

```tsx
// Hero.tsx (fragmento)
import { useHeroFade } from '@/hooks/useHeroFade';

export function Hero() {
  useHeroFade();
  // ...
}
```

Recomendaciones:
- Si el proyecto ya dispone de un `useGsapContext`, integrar la lógica dentro de ese contexto para evitar fugas.
- En SSR, envolver la carga de GSAP con comprobaciones de `window` o `dynamic(() => import(...), { ssr: false })` si fuera necesario.

#### 4) Z-index y stacking
- Asegurar que el fade no tape contenido interactivo:
    - `hero` como `relative`, `fade` con `z-10` y la sección siguiente con `z-20` si hiciera falta.
    - Alternativamente, colocar el `fade` dentro del hero (como en el ejemplo) y la tarjeta por encima por flujo natural.

#### 5) Responsivo y densidad del gradiente
- Ajustar la altura del `fade` por breakpoint (`h-24 sm:h-28 md:h-32 lg:h-40 xl:h-48`).
- Si aparece banding, incrementar la zona intermedia con `rgba` semi-transparente o añadir una leve `backdrop-blur-[2px]` opcional (evaluar costo de rendimiento).

---

### Accesibilidad (A11y)
- Respetar `prefers-reduced-motion: reduce` desactivando animaciones.
- Elemento `aria-hidden="true"` para evitar ruido en el árbol de accesibilidad.
- Contraste: asegurar que el texto de la tarjeta no solape sobre zonas donde el gradiente aún no alcanzó opacidad suficiente; verificar contrastes WCAG AA.

---

### Rendimiento
- Animar únicamente `opacity`/`transform` (GPU-friendly).
- Evitar imágenes pesadas como máscaras; el gradiente debe ser CSS puro.
- Usar `will-change: opacity` solo si beneficia y sin dejarlo permanente.
- `ScrollTrigger` con `scrub: true` y `invalidateOnRefresh: true` para layouts responsivos sin recálculos innecesarios.
- Verificar que no se disparen repaints costosos al cambiar variables CSS.

---

### Compatibilidad de Navegadores
- Soporte: últimas 2 versiones de Chrome, Safari, Firefox, Edge.
- Fallback: si GSAP no carga o JS está desactivado, el gradiente estático sigue visible y cumple el objetivo principal.

---

### Pruebas y Validación
- Visual: inspección del gradiente en pantallas de 320px, 768px, 1024px, 1440px, 1920px.
- A11y: simular `prefers-reduced-motion` y confirmar estado estático.
- Rendimiento: Lighthouse/WebPageTest, confirmar CLS ≤ 0.1 y sin degradar LCP.
- Cross-browser: verificar en Safari iOS (simulador o dispositivo), Firefox y Edge.
- Interacción: asegurar que elementos de “Nuestra Historia” sean clicables y no queden ocultos por el fade (uso de `pointer-events-none`).

---

### Riesgos y mitigaciones
- Banding en gradientes: usar stops adicionales o leve transparencia incremental.
- Superposición no deseada: revisar `z-index` y `pointer-events-none`.
- Desfase en SSR/CSR: proteger acceso a `window`, usar `dynamic import` si aplica.

---

### Entregables
- Componente/Hook de fade implementado.
- Configuración de Tailwind actualizada.
- Notas de uso en README o en `./junie/requirements-01.md` según flujo del proyecto.
- Pruebas manuales documentadas y capturas opcionales.

---

### Ejemplo mínimo funcional (combinado)

```tsx
// Hero.tsx
import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') gsap.registerPlugin(ScrollTrigger);

export function Hero() {
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return;
    const fadeEl = document.querySelector('#hero-fade');
    if (!fadeEl) return;

    const ctx = gsap.context(() => {
      gsap.set(fadeEl, { opacity: 0.95 });
      gsap.to(fadeEl, {
        opacity: 0,
        ease: 'power1.out',
        scrollTrigger: {
          trigger: fadeEl,
          start: 'top bottom',
          end: 'bottom center',
          scrub: true,
        },
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <section className="relative isolate bg-blue-dusty">
      {/* ...contenido del hero... */}

      <div
        id="hero-fade"
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 -bottom-px h-28 md:h-36 lg:h-44"
      >
        <div className="h-full w-full bg-hero-fade-card" />
      </div>
    </section>
  );
}
```

```tsx
// OurStorySection.tsx
export function OurStorySection() {
  return (
    <section
      id="our-story"
      style={{ ['--card-bg' as any]: '#FAF7F2', ['--fade-to' as any]: 'var(--card-bg)' }}
      className="relative bg-card"
    >
      <div className="mx-auto max-w-3xl p-6 md:p-10 rounded-2xl shadow-sm">
        {/* contenido */}
      </div>
    </section>
  );
}
```

---

### Notas finales
- Si el proyecto ya cuenta con `useGsapContext` y componentes establecidos, integrar el código en esos artefactos respetando las convenciones del repo.
- Mantener los nombres de clases y variables alineados con los estándares internos y tokens de diseño reales (sustituir `#8CAFD1`/`#FAF7F2` por los definitivos).
