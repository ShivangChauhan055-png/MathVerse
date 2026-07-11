/**
 * components/layout/Navbar.tsx
 *
 * Top navigation bar.
 *
 * Responsibilities:
 *  - Render the MathVerse logo + wordmark
 *  - Desktop: horizontal nav links
 *  - Mobile: hamburger button to toggle the mobile sidebar overlay
 *  - Theme toggle button
 *  - Glass effect that becomes opaque on scroll
 */

import { useState, useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  RiMenuLine,
  RiCloseLine,
  RiSunLine,
  RiMoonLine,
  RiExternalLinkLine,
  RiCopperCoinLine,
  RiStarLine,
} from 'react-icons/ri'
import { cn } from '@/utils/cn'
import { useAppStore } from '@/store/useAppStore'
import { useGamificationStore } from '@/store/useGamificationStore'
import { useTheme } from '@/hooks/useTheme'
import { APP_NAME, NAV_LINKS } from '@/constants/nav'

interface NavbarProps {
  /** When true, renders landing-page variant (no sidebar toggle, transparent) */
  landing?: boolean
}

export function Navbar({ landing = false }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false)
  const { toggleMobileSidebar, mobileSidebarOpen } = useAppStore()
  const { isDark, toggleTheme } = useTheme()
  const { coins, level, avatarId } = useGamificationStore()

  // Detect scroll to add backdrop
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={cn(
        'fixed top-0 inset-x-0 z-40',
        'h-16 flex items-center',
        'transition-all duration-300',
        scrolled || !landing
          ? 'glass-strong border-b border-white/[0.07] shadow-lg shadow-black/20'
          : 'bg-transparent border-b border-transparent',
      )}
    >
      <div className="w-full max-w-screen-2xl mx-auto px-4 md:px-6 flex items-center gap-4">
        {/* ── Hamburger (mobile, app pages only) ──────────────────────── */}
        {!landing && (
          <button
            id="navbar-menu-toggle"
            onClick={toggleMobileSidebar}
            className={cn(
              'lg:hidden p-2 rounded-xl',
              'text-slate-400 hover:text-white',
              'hover:bg-white/10 transition-colors',
            )}
            aria-label={mobileSidebarOpen ? 'Close menu' : 'Open menu'}
          >
            {mobileSidebarOpen ? (
              <RiCloseLine className="w-5 h-5" />
            ) : (
              <RiMenuLine className="w-5 h-5" />
            )}
          </button>
        )}

        {/* ── Logo + Wordmark ──────────────────────────────────────────── */}
        <Link
          to="/"
          id="navbar-logo"
          className="flex items-center gap-2.5 flex-shrink-0 group"
        >
          {/* Logo mark — stylised Σ */}
          <motion.div
            whileHover={{ rotate: 10, scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 300 }}
            className={cn(
              'w-8 h-8 rounded-xl',
              'bg-gradient-to-br from-indigo-500 to-violet-500',
              'flex items-center justify-center',
              'shadow-lg shadow-indigo-500/30',
              'text-white text-sm font-bold font-mono',
            )}
          >
            Σ
          </motion.div>
          <span className="text-white font-bold text-lg tracking-tight leading-none">
            {APP_NAME}
          </span>
        </Link>

        {/* ── Spacer ───────────────────────────────────────────────────── */}
        <div className="flex-1" />

        {/* ── Desktop Nav Links (landing only) ────────────────────────── */}
        {landing && (
          <nav className="hidden md:flex items-center gap-1" aria-label="Main navigation">
            {NAV_LINKS.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                id={`navbar-link-${item.label.toLowerCase()}`}
                className={({ isActive }) =>
                  cn(
                    'px-4 py-2 rounded-xl text-sm font-medium transition-all duration-150',
                    isActive
                      ? 'text-white bg-white/10'
                      : 'text-slate-400 hover:text-white hover:bg-white/5',
                  )
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        )}

        {/* ── Right actions ────────────────────────────────────────────── */}
        <div className="flex items-center gap-2">
          {/* Gamification Stats (app pages only) */}
          {!landing && (
            <div className="hidden sm:flex items-center gap-3 mr-2">
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400">
                <RiCopperCoinLine className="w-4 h-4" />
                <span className="text-sm font-bold">{coins}</span>
              </div>
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
                <RiStarLine className="w-4 h-4" />
                <span className="text-sm font-bold">Lvl {level}</span>
              </div>
            </div>
          )}

          {/* User Avatar */}
          {!landing && avatarId && (
            <Link to="/avatar" className="hidden sm:block mr-2">
              <img src={avatarId} alt="User Avatar" className="w-8 h-8 rounded-full border-2 border-indigo-500/50 hover:border-indigo-400 transition-colors" />
            </Link>
          )}

          {/* Theme toggle */}
          <button
            id="navbar-theme-toggle"
            onClick={toggleTheme}
            aria-label="Toggle colour theme"
            className={cn(
              'p-2 rounded-xl transition-all duration-150',
              'text-slate-400 hover:text-white hover:bg-white/10',
            )}
          >
            {isDark ? (
              <RiSunLine className="w-4.5 h-4.5" />
            ) : (
              <RiMoonLine className="w-4.5 h-4.5" />
            )}
          </button>

          {/* CTA — landing page only */}
          {landing && (
            <Link
              id="navbar-cta"
              to="/topics"
              className={cn(
                'hidden sm:inline-flex items-center gap-1.5',
                'px-4 py-2 rounded-xl text-sm font-medium',
                'bg-indigo-500 hover:bg-indigo-400 text-white',
                'shadow-lg shadow-indigo-500/25 transition-all duration-150',
              )}
            >
              Explore Topics
              <RiExternalLinkLine className="w-3.5 h-3.5" />
            </Link>
          )}
        </div>
      </div>
    </header>
  )
}
