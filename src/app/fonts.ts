// app/fonts.ts
import { Forum, Pinyon_Script } from 'next/font/google'

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