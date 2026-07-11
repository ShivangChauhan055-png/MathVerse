/**
 * constants/nav.ts
 *
 * Centralised navigation definitions.
 * Adding a route to the app only requires touching this file
 * plus AppRouter.tsx — Navbar and Sidebar pick up changes automatically.
 */

import type { NavItem } from '@/types'

/**
 * Primary navigation links — rendered in both Navbar (desktop)
 * and Sidebar (app layout).
 */
export const NAV_LINKS: NavItem[] = [
  {
    label: 'Dashboard',
    to: '/dashboard',
    icon: 'RiDashboardLine',
  },
  {
    label: 'Topics',
    to: '/topics',
    icon: 'RiBookOpenLine',
  },
]

/**
 * Landing-page-only links (no icon needed, simple anchor links)
 */
export const LANDING_NAV_LINKS = [
  { label: 'Features', to: '/#features' },
  { label: 'Topics', to: '/topics' },
]

/** App name / brand */
export const APP_NAME = 'MathVerse' as const

/** App tagline */
export const APP_TAGLINE = 'Learn Mathematics Like an Adventure.' as const
