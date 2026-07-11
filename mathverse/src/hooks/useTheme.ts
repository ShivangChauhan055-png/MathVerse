/**
 * hooks/useTheme.ts
 *
 * Thin hook that provides a stable, ergonomic API to read and mutate
 * the current theme, delegating to useAppStore under the hood.
 *
 * Components that only need theme info use this hook — they don't need
 * to know about the full AppStore shape.
 */

import { useAppStore } from '@/store/useAppStore'

export function useTheme() {
  const theme = useAppStore((s) => s.theme)
  const setTheme = useAppStore((s) => s.setTheme)
  const toggleTheme = useAppStore((s) => s.toggleTheme)

  const isDark = theme === 'dark'
  const isLight = theme === 'light'

  return { theme, isDark, isLight, setTheme, toggleTheme }
}
