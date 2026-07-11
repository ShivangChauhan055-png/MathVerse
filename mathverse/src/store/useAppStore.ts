/**
 * store/useAppStore.ts
 *
 * Zustand global store.
 *
 * Architectural decision: we use a single flat store for UI state that
 * needs to be shared across the component tree (sidebar open state,
 * theme). Feature-specific state (quiz progress, etc.) will live in
 * separate slices when implemented.
 *
 * Zustand v5 uses a function-based API — no `set` / `get` wrapper needed.
 */

import { create } from 'zustand'
import type { AppState } from '@/types'

interface AppStore extends AppState {
  // ── Sidebar actions ──────────────────────────────────────────────────────
  toggleSidebar: () => void
  setSidebarOpen: (open: boolean) => void
  toggleMobileSidebar: () => void
  setMobileSidebarOpen: (open: boolean) => void

  // ── Theme actions ────────────────────────────────────────────────────────
  setTheme: (theme: AppState['theme']) => void
  toggleTheme: () => void
}

export const useAppStore = create<AppStore>((set) => ({
  // ── Initial state ─────────────────────────────────────────────────────────
  sidebarOpen: true,       // Desktop sidebar expanded by default
  mobileSidebarOpen: false, // Mobile overlay closed by default
  theme: 'dark',           // Dark mode first

  // ── Sidebar ───────────────────────────────────────────────────────────────
  toggleSidebar: () =>
    set((state) => ({ sidebarOpen: !state.sidebarOpen })),

  setSidebarOpen: (open) => set({ sidebarOpen: open }),

  toggleMobileSidebar: () =>
    set((state) => ({ mobileSidebarOpen: !state.mobileSidebarOpen })),

  setMobileSidebarOpen: (open) => set({ mobileSidebarOpen: open }),

  // ── Theme ─────────────────────────────────────────────────────────────────
  setTheme: (theme) => {
    // Sync with the `dark` class on <html> for Tailwind dark mode
    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
    set({ theme })
  },

  toggleTheme: () =>
    set((state) => {
      const next = state.theme === 'dark' ? 'light' : 'dark'
      if (next === 'dark') {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
      return { theme: next }
    }),
}))
