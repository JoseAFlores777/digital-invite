// app/fonts.ts
import {Cormorant_Garamond, Forum, Inter, Pinyon_Script} from 'next/font/google'

// Use Forum as both display and sans to align with the requirement of using
// only Pinyon Script + Forum across the site.
export const display = Forum({
    subsets: ['latin'],
    variable: '--font-display',
    weight: '400',
})

export const sans = Forum({
    subsets: ['latin'],
    variable: '--font-sans',
    weight: '400',
})

export const script = Pinyon_Script({
    subsets: ['latin'],
    variable: '--font-script',
    weight: '400',
})

// Serif elegante para títulos en versales
export const displaySerif = Cormorant_Garamond({
    subsets: ["latin"],
    weight: ["300", "400", "500", "600", "700"],
    variable: "--font-display-serif",
});


// Sans de apoyo para cuerpos/dirección
export const bodySans = Inter({
    subsets: ["latin"],
    variable: "--font-body",
});