/**
 * types/index.ts
 *
 * Centralised TypeScript interfaces for MathVerse.
 * All domain types live here so imports stay clean and consistent.
 */

// ─── Navigation ───────────────────────────────────────────────────────────────

export interface NavItem {
  /** Human-readable label */
  label: string
  /** React Router path */
  to: string
  /** react-icons icon name (used for dynamic lookup) */
  icon: string
  /** Whether this link ends the current segment exactly */
  end?: boolean
}

// ─── Dataset / Domain ─────────────────────────────────────────────────────────

/**
 * Matches the shape of each entry in theorems.json.
 * All fields come directly from the source data — never altered.
 */
export interface TheoremMeta {
  id: string
  theorem: string
  coreIdea: string
  slug: string
  illustration: string
}

/**
 * Full theorem detail — matches the shape of individual JSON files
 * e.g. euclidean-algorithm.json
 */
export interface TheoremDetail {
  id: string
  theorem: string
  displayName: string
  slug: string
  stageCount: number
  story: {
    intro: string
    theoremStatement: string
    plainEnglish: string
    applications: string[]
    completionBadge: string
  }
  stages: TheoremStage[]
}

export interface TheoremStage {
  id: number
  type: 'numeric' | 'multiple-choice' | 'text'
  conceptLabel: string
  conceptShown: string
  question: string
  hint: string
  acceptedAnswers: string[]
}

// ─── UI / Component Props ──────────────────────────────────────────────────────

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'outline' | 'danger'
export type ButtonSize = 'sm' | 'md' | 'lg'

export type BadgeVariant = 'indigo' | 'cyan' | 'violet' | 'green' | 'amber' | 'red'

// ─── Store ────────────────────────────────────────────────────────────────────

export interface AppState {
  /** Controls sidebar open/collapsed state */
  sidebarOpen: boolean
  /** Mobile overlay sidebar (separate from desktop collapse) */
  mobileSidebarOpen: boolean
  /** Current colour theme (dark by default) */
  theme: 'dark' | 'light'
}

// ─── Gamification ─────────────────────────────────────────────────────────────

export interface Achievement {
  id: string
  title: string
  description: string
  icon: string
  rewardCoins: number
  rewardXP: number
}

export interface GamificationState {
  coins: number
  xp: number
  level: number
  currentStreak: number
  longestStreak: number
  lastActiveDate: string | null
  unlockedAchievements: string[]
  avatarId: string | null
  purchasedItems: string[]
  equippedFrame: string | null
  equippedTheme: string | null
  equippedBadge: string | null
}

export interface ShopItem {
  id: string
  type: 'frame' | 'theme' | 'badge'
  name: string
  icon: string
  cost: number
}
