/**
 * components/layout/Sidebar.tsx
 *
 * Left-side navigation sidebar used in the app layout (/dashboard, /topics).
 *
 * Behaviour:
 *  - Desktop (≥ lg): persistent, collapsible (icon-only ↔ full labels)
 *  - Mobile (< lg):  hidden by default, slides in as an overlay with backdrop
 *
 * Architectural note: Sidebar reads open state from Zustand so any component
 * (e.g. Navbar hamburger) can control it without prop-drilling.
 */

import { useEffect } from 'react'
import { NavLink, Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  RiDashboardLine,
  RiBookOpenLine,
  RiArrowLeftSLine,
  RiArrowRightSLine,
  RiCloseLine,
} from 'react-icons/ri'
import { cn } from '@/utils/cn'
import { useAppStore } from '@/store/useAppStore'
import { NAV_LINKS, APP_NAME } from '@/constants/nav'
import type { NavItem } from '@/types'

// Map icon string → component (avoids dynamic import tree-shaking issues)
const iconMap: Record<string, React.ElementType> = {
  RiDashboardLine,
  RiBookOpenLine,
}

function NavLinkItem({
  item,
  collapsed,
  onClick,
}: {
  item: NavItem
  collapsed: boolean
  onClick?: () => void
}) {
  const Icon = iconMap[item.icon] ?? RiDashboardLine

  return (
    <NavLink
      to={item.to}
      end={item.end}
      onClick={onClick}
      title={collapsed ? item.label : undefined}
      className={({ isActive }) =>
        cn(
          'group relative flex items-center gap-3',
          'h-10 rounded-xl px-3',
          'text-sm font-medium transition-all duration-150',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500',
          isActive
            ? [
                'bg-indigo-500/15 text-indigo-300',
                'before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2',
                'before:h-5 before:w-1 before:rounded-r-full before:bg-indigo-400',
              ].join(' ')
            : 'text-slate-400 hover:text-white hover:bg-white/5',
        )
      }
    >
      {({ isActive }) => (
        <>
          <Icon
            className={cn(
              'w-5 h-5 flex-shrink-0 transition-colors',
              isActive ? 'text-indigo-400' : 'text-slate-500 group-hover:text-white',
            )}
          />
          <AnimatePresence initial={false}>
            {!collapsed && (
              <motion.span
                key="label"
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: 'auto' }}
                exit={{ opacity: 0, width: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden whitespace-nowrap"
              >
                {item.label}
              </motion.span>
            )}
          </AnimatePresence>

          {/* Tooltip when collapsed */}
          {collapsed && (
            <span
              className={cn(
                'absolute left-full ml-3 px-2.5 py-1.5',
                'text-xs font-medium text-white',
                'bg-space-700 border border-white/10 rounded-lg',
                'opacity-0 group-hover:opacity-100 pointer-events-none',
                'transition-opacity duration-150 whitespace-nowrap z-50',
              )}
            >
              {item.label}
            </span>
          )}
        </>
      )}
    </NavLink>
  )
}

// ── Desktop Sidebar ───────────────────────────────────────────────────────────

function DesktopSidebar() {
  const { sidebarOpen, toggleSidebar } = useAppStore()
  const collapsed = !sidebarOpen

  return (
    <aside
      className={cn(
        'hidden lg:flex flex-col',
        'fixed left-0 top-16 bottom-0 z-30',
        'glass-strong border-r border-white/[0.07]',
        'sidebar-transition overflow-hidden',
        collapsed ? 'w-[72px]' : 'w-[260px]',
      )}
    >
      {/* Nav links */}
      <nav className="flex-1 overflow-y-auto overflow-x-hidden p-3 space-y-1" aria-label="Sidebar navigation">
        {NAV_LINKS.map((item) => (
          <NavLinkItem key={item.to} item={item} collapsed={collapsed} />
        ))}
      </nav>

      {/* Collapse toggle */}
      <div className="p-3 border-t border-white/[0.06]">
        <button
          id="sidebar-collapse-toggle"
          onClick={toggleSidebar}
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          className={cn(
            'w-full flex items-center justify-center gap-2',
            'h-9 rounded-xl text-sm',
            'text-slate-500 hover:text-white hover:bg-white/10',
            'transition-colors duration-150',
          )}
        >
          {collapsed ? (
            <RiArrowRightSLine className="w-5 h-5" />
          ) : (
            <>
              <RiArrowLeftSLine className="w-5 h-5" />
              <span className="text-xs">Collapse</span>
            </>
          )}
        </button>
      </div>
    </aside>
  )
}

// ── Mobile Sidebar Overlay ────────────────────────────────────────────────────

function MobileSidebar() {
  const { mobileSidebarOpen, setMobileSidebarOpen } = useAppStore()
  const location = useLocation()

  // Close on route change
  useEffect(() => {
    setMobileSidebarOpen(false)
  }, [location.pathname, setMobileSidebarOpen])

  return (
    <AnimatePresence>
      {mobileSidebarOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
            onClick={() => setMobileSidebarOpen(false)}
            aria-hidden="true"
          />

          {/* Panel */}
          <motion.aside
            key="panel"
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className={cn(
              'fixed left-0 top-0 bottom-0 z-50',
              'w-72 glass-strong border-r border-white/[0.07]',
              'flex flex-col lg:hidden',
            )}
          >
            {/* Header */}
            <div className="flex items-center justify-between h-16 px-4 border-b border-white/[0.06]">
              <Link to="/" className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center text-white text-sm font-bold font-mono">
                  Σ
                </div>
                <span className="text-white font-bold text-lg tracking-tight">{APP_NAME}</span>
              </Link>
              <button
                onClick={() => setMobileSidebarOpen(false)}
                aria-label="Close sidebar"
                className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
              >
                <RiCloseLine className="w-5 h-5" />
              </button>
            </div>

            {/* Nav links */}
            <nav
              className="flex-1 overflow-y-auto p-3 space-y-1"
              aria-label="Mobile navigation"
            >
              {NAV_LINKS.map((item) => (
                <NavLinkItem
                  key={item.to}
                  item={item}
                  collapsed={false}
                  onClick={() => setMobileSidebarOpen(false)}
                />
              ))}
            </nav>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}

// ── Exported Sidebar ──────────────────────────────────────────────────────────

export function Sidebar() {
  return (
    <>
      <DesktopSidebar />
      <MobileSidebar />
    </>
  )
}
