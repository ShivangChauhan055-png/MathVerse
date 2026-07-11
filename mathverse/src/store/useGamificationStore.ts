/**
 * store/useGamificationStore.ts
 *
 * Zustand store for gamification state (Coins, XP, Streaks, Achievements).
 * Uses persist middleware to save to localStorage.
 */

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { GamificationState, Achievement } from '@/types'

export const ACHIEVEMENTS: Achievement[] = [
  { id: 'first_question', title: 'First Steps', description: 'Answer your first question correctly.', icon: 'RiFocus2Line', rewardCoins: 50, rewardXP: 20 },
  { id: 'first_topic', title: 'Topic Master', description: 'Complete your first topic.', icon: 'RiBookOpenLine', rewardCoins: 100, rewardXP: 50 },
  { id: '10_correct', title: 'On a Roll', description: 'Answer 10 questions correctly.', icon: 'RiFireLine', rewardCoins: 150, rewardXP: 100 },
  { id: '100_xp', title: 'Centurion', description: 'Reach 100 XP.', icon: 'RiStarLine', rewardCoins: 100, rewardXP: 0 },
  { id: '100_coins', title: 'Wealthy', description: 'Collect 100 Coins.', icon: 'RiCopperCoinLine', rewardCoins: 0, rewardXP: 50 },
  { id: '3_day_streak', title: 'Consistent', description: 'Achieve a 3-day streak.', icon: 'RiCalendarCheckLine', rewardCoins: 200, rewardXP: 150 },
]

export const XP_PER_LEVEL = 100;

interface GamificationStore extends GamificationState {
  addCoins: (amount: number) => void
  addXP: (amount: number) => void
  recordActivity: () => void
  unlockAchievement: (id: string) => void
  // Transient state for UI animations (not persisted)
  animationQueue: { type: 'xp' | 'coin' | 'achievement' | 'level', payload: any, id: number }[]
  queueAnimation: (type: 'xp' | 'coin' | 'achievement' | 'level', payload: any) => void
  removeAnimation: (id: number) => void
}

let nextAnimId = 0;

export const useGamificationStore = create<GamificationStore>()(
  persist(
    (set, get) => ({
      coins: 0,
      xp: 0,
      level: 1,
      currentStreak: 0,
      longestStreak: 0,
      lastActiveDate: null,
      unlockedAchievements: [],
      animationQueue: [],

      queueAnimation: (type, payload) => {
        set((state) => ({
          animationQueue: [...state.animationQueue, { type, payload, id: ++nextAnimId }]
        }))
      },

      removeAnimation: (id) => {
        set((state) => ({
          animationQueue: state.animationQueue.filter(a => a.id !== id)
        }))
      },

      addCoins: (amount) => set((state) => {
        const newCoins = state.coins + amount
        
        // Check 100 coins achievement
        if (newCoins >= 100 && !state.unlockedAchievements.includes('100_coins')) {
           // We schedule it after current frame to avoid nested setState loops if needed
           setTimeout(() => get().unlockAchievement('100_coins'), 0);
        }

        return { coins: newCoins }
      }),

      addXP: (amount) => set((state) => {
        const newXP = state.xp + amount
        const newLevel = Math.floor(newXP / XP_PER_LEVEL) + 1
        
        const updates: Partial<GamificationStore> = { xp: newXP, level: newLevel }

        if (newLevel > state.level) {
          get().queueAnimation('level', { level: newLevel });
        }

        // Check 100 xp achievement
        if (newXP >= 100 && !state.unlockedAchievements.includes('100_xp')) {
           setTimeout(() => get().unlockAchievement('100_xp'), 0);
        }

        return updates
      }),

      recordActivity: () => set((state) => {
        const today = new Date().toISOString().split('T')[0]
        if (state.lastActiveDate === today) return state; // Already active today

        let newStreak = 1
        if (state.lastActiveDate) {
          const lastDate = new Date(state.lastActiveDate)
          const currentDate = new Date(today)
          const diffTime = Math.abs(currentDate.getTime() - lastDate.getTime())
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

          if (diffDays === 1) {
            newStreak = state.currentStreak + 1
          }
        }

        const newLongest = Math.max(state.longestStreak, newStreak)

        if (newStreak >= 3 && !state.unlockedAchievements.includes('3_day_streak')) {
           setTimeout(() => get().unlockAchievement('3_day_streak'), 0);
        }

        return {
          lastActiveDate: today,
          currentStreak: newStreak,
          longestStreak: newLongest
        }
      }),

      unlockAchievement: (id) => {
        const state = get()
        if (state.unlockedAchievements.includes(id)) return;

        const achievement = ACHIEVEMENTS.find(a => a.id === id)
        if (!achievement) return;

        set((s) => ({
          unlockedAchievements: [...s.unlockedAchievements, id]
        }))

        get().queueAnimation('achievement', achievement)

        if (achievement.rewardCoins > 0) {
          get().addCoins(achievement.rewardCoins)
          get().queueAnimation('coin', { amount: achievement.rewardCoins, reason: achievement.title })
        }
        if (achievement.rewardXP > 0) {
          get().addXP(achievement.rewardXP)
          get().queueAnimation('xp', { amount: achievement.rewardXP, reason: achievement.title })
        }
      }
    }),
    {
      name: 'mathverse-gamification',
      partialize: (state) => ({
        coins: state.coins,
        xp: state.xp,
        level: state.level,
        currentStreak: state.currentStreak,
        longestStreak: state.longestStreak,
        lastActiveDate: state.lastActiveDate,
        unlockedAchievements: state.unlockedAchievements
      }) // don't persist animation queue
    }
  )
)
