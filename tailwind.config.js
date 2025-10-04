// tailwind.config.ts
import pluginTypography from '@tailwindcss/typography'
import pluginForms from '@tailwindcss/forms'
import pluginAspectRatio from '@tailwindcss/aspect-ratio'

const config = {
    darkMode: ['class'],
    content: [
        './app/**/*.{ts,tsx,js,jsx,mdx}',
        './pages/**/*.{ts,tsx,js,jsx,mdx}',
        './components/**/*.{ts,tsx,js,jsx,mdx}',
        './content/**/*.{md,mdx}',
    ],
    theme: {
        // Contenedor centrado, cómodo para layouts de boda
        container: {
            center: true,
            padding: '1rem',
            screens: {
                sm: '640px',
                md: '768px',
                lg: '1024px',
                xl: '1200px',   // un poco más contenido que 1280 para elegancia
                '2xl': '1400px',
                '3xl': '1600px', // para héroes full-width/galerías grandes
            },
        },

        extend: {
            // ---- COLORES -----------------------------------------------------------
            colors: {
                wedgewood: {
                    '50':  '#f6fcff',
                    '100': '#dceafd',
                    '200': '#b3d2f4',
                    '300': '#8fc1ef',
                    '400': '#7cafdc',
                    '500': '#709dc5',
                    '600': '#6d98be',
                    '700': '#678eb1',
                    '800': '#5f83a3',
                    '900': '#577793',
                    '1000': '#52708a',
                    '1100': '#4c6881',
                    '1200': '#466076',
                    '1300': '#3f566b',
                    '1400': '#374c5f',
                    '1500': '#2f4252',
                    '1600': '#273746',
                    '1700': '#1f2c3a',
                    '1800': '#16212d',
                    '1900': '#0f1922',
                },

                // Alias semánticos (útiles para modo claro/oscuro o theming rápido)
                primary: {
                    DEFAULT: '#5f83a3',        // wedgewood-800
                    foreground: '#f6fcff',     // wedgewood-50
                    soft: '#8fc1ef',           // wedgewood-300
                    deep: '#374c5f',           // wedgewood-1400
                },
                background: '#ffffff',
                foreground: '#0f1922',       // wedgewood-1900 como texto profundo
                muted: {
                    DEFAULT: '#f6fcff',        // sutiles fondos
                    foreground: '#4c6881',
                },
                card: {
                    DEFAULT: '#ffffff',
                    foreground: '#1f2c3a',
                },
                border: '#dceafd',
                ring: '#8fc1ef',
            },

            // ---- TIPOGRAFÍA (usa variables de next/font) --------------------------
            fontFamily: {
                display: ['var(--font-display)', 'serif'],      // Títulos
                sans: ['var(--font-sans)', 'system-ui', 'sans-serif'], // UI / cuerpo
                script: ['var(--font-script)', 'cursive'],      // Acentos (nombres, detalles)
                body: ["var(--font-body)", "ui-sans-serif", "system-ui"],
            },

            // ---- RADIUS Y SOMBRAS -------------------------------------------------
            borderRadius: {
                xl: '1rem',
                '2xl': '1.25rem',
                '3xl': '1.75rem',
            },
            boxShadow: {
                soft: '0 10px 30px -10px rgba(20,30,45,0.15)',
                ring: '0 0 0 6px rgba(143,193,239,0.25)', // acorde a primary.soft
            },

            // ---- BREAKPOINTS EXTRA ------------------------------------------------
            screens: {
                xs: '360px', // móviles chicos
                '3xl': '1920px', // hero de foto grande
            },

            // ---- TIPOGRAFÍA (prose) ----------------------------------------------
            typography: (theme) => ({
                DEFAULT: {
                    css: {
                        color: theme('colors.foreground'),
                        a: {
                            color: theme('colors.primary.DEFAULT'),
                            textDecoration: 'none',
                            fontWeight: '600',
                            '&:hover': {
                                color: theme('colors.primary.deep'),
                                textDecoration: 'underline',
                            },
                        },
                        h1: {
                            fontFamily: theme('fontFamily.display')?.toString(),
                            letterSpacing: '-0.02em',
                            color: theme('colors.foreground'),
                        },
                        h2: {
                            fontFamily: theme('fontFamily.display')?.toString(),
                            letterSpacing: '-0.01em',
                        },
                        'h3,h4': {
                            fontFamily: theme('fontFamily.display')?.toString(),
                        },
                        blockquote: {
                            borderLeftColor: theme('colors.primary.soft'),
                            color: theme('colors.wedgewood.1100'),
                        },
                    },
                },
            }),
        },
    },

    plugins: [pluginTypography, pluginForms, pluginAspectRatio],
}

export default config