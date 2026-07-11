/**
 * routes/AppRouter.tsx
 *
 * Central routing table for MathVerse.
 *
 * Route tree:
 *  /              → LandingPage (no AppLayout — full-bleed)
 *  /dashboard     → AppLayout > DashboardPage
 *  /topics        → AppLayout > TopicsPage
 *  *              → NotFoundPage (no AppLayout)
 *
 * Framer Motion page transitions are applied via AnimatePresence
 * on the Routes container.
 */

import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'

import { AppLayout } from '@/layouts/AppLayout'
import { LandingPage } from '@/pages/Landing/LandingPage'
import { DashboardPage } from '@/pages/Dashboard/DashboardPage'
import { TopicsPage } from '@/pages/Topics/TopicsPage'
import { AvatarPage } from '@/pages/Avatar/AvatarPage'
import { ShopPage } from '@/pages/Shop/ShopPage'
import { NotFoundPage } from '@/pages/NotFound/NotFoundPage'

export function AppRouter() {
  const location = useLocation()

  return (
    <AnimatePresence mode="wait" initial={false}>
      <Routes location={location} key={location.pathname}>
        {/* ── Full-bleed pages (no sidebar/navbar) ─────────────────── */}
        <Route path="/" element={<LandingPage />} />
        <Route path="*" element={<NotFoundPage />} />

        {/* ── App pages (use AppLayout with Navbar + Sidebar) ───────── */}
        <Route element={<AppLayout />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/topics" element={<TopicsPage />} />
          <Route path="/avatar" element={<AvatarPage />} />
          <Route path="/shop" element={<ShopPage />} />
        </Route>
      </Routes>
    </AnimatePresence>
  )
}
