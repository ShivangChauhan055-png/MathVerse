/**
 * layouts/AppLayout.tsx
 *
 * Route layout wrapper for all app pages (dashboard, topics, etc.).
 *
 * Structure:
 *   <Navbar />
 *   <Sidebar />     ← desktop persistent, mobile overlay
 *   <MainLayout>
 *     <Outlet />    ← child page is rendered here by React Router
 *   </MainLayout>
 *
 * Architectural decision: separating AppLayout from the page components
 * lets React Router keep Navbar + Sidebar mounted across route changes,
 * avoiding unnecessary remounts and animation flickers.
 */

import { Outlet } from 'react-router-dom'
import { Navbar } from '@/components/layout/Navbar'
import { Sidebar } from '@/components/layout/Sidebar'
import { MainLayout } from '@/components/layout/MainLayout'
import { GamificationOverlay } from '@/components/ui/GamificationOverlay'

export function AppLayout() {
  return (
    <>
      <Navbar landing={false} />
      <Sidebar />
      <MainLayout>
        <Outlet />
      </MainLayout>
      <GamificationOverlay />
    </>
  )
}

