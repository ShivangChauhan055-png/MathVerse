/**
 * components/layout/MainLayout.tsx
 *
 * The main content area layout for authenticated / app pages.
 * Manages the left-margin offset based on sidebar open state.
 *
 * This is a pure presentation component — it receives children
 * and reads sidebar state from the store.
 */

import { useAppStore } from '@/store/useAppStore'
import { cn } from '@/utils/cn'

interface MainLayoutProps {
  children: React.ReactNode
}

export function MainLayout({ children }: MainLayoutProps) {
  const sidebarOpen = useAppStore((s) => s.sidebarOpen)

  return (
    <main
      className={cn(
        // Push content right of the sidebar (desktop only)
        'lg:transition-[margin-left] lg:duration-400 lg:ease-in-out',
        sidebarOpen ? 'lg:ml-[260px]' : 'lg:ml-[72px]',
        // Account for fixed navbar height
        'pt-24',
        // Full viewport height minus navbar
        'min-h-dvh',
        // Padding for content breathing room
        'px-4 md:px-6 lg:px-8',
        'py-8',
      )}
    >
      {children}
    </main>
  )
}
