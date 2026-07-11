/**
 * components/ui/GamificationOverlay.tsx
 *
 * Renders floating animations for +XP, +Coins, Level Ups, and Achievements.
 * Reads from the animation queue in useGamificationStore.
 */

import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { RiCopperCoinLine, RiStarLine, RiTrophyLine, RiArrowUpCircleLine } from 'react-icons/ri'
import { useGamificationStore } from '@/store/useGamificationStore'
import { soundService } from '@/services/SoundService'

function Toast({
  children,
  onRemove,
  delay = 3000
}: {
  children: React.ReactNode
  onRemove: () => void
  delay?: number
}) {
  useEffect(() => {
    const timer = setTimeout(onRemove, delay)
    return () => clearTimeout(timer)
  }, [delay, onRemove])

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.9 }}
      transition={{ type: 'spring', damping: 20, stiffness: 300 }}
      className="pointer-events-none"
    >
      {children}
    </motion.div>
  )
}

export function GamificationOverlay() {
  const { animationQueue, removeAnimation } = useGamificationStore()
  // Use local state to render items sequentially if desired, or just render all active
  // Since we use AnimatePresence, we just render them stacked.

  useEffect(() => {
    // Play sounds as animations enter the queue
    if (animationQueue.length > 0) {
      const latest = animationQueue[animationQueue.length - 1]
      switch (latest.type) {
        case 'coin':
          soundService.playCoin();
          break;
        case 'xp':
          // Optional: soundService.playCorrect() handled separately but we can play a small tick
          break;
        case 'level':
          soundService.playLevelUp();
          break;
        case 'achievement':
          soundService.playAchievement();
          break;
      }
    }
  }, [animationQueue])

  return (
    <div className="fixed bottom-8 right-8 z-50 flex flex-col items-end gap-3">
      <AnimatePresence>
        {animationQueue.map((anim) => {
          if (anim.type === 'coin') {
            return (
              <Toast key={anim.id} onRemove={() => removeAnimation(anim.id)}>
                <div className="glass-strong px-4 py-2 rounded-xl flex items-center gap-2 border-amber-500/30 bg-amber-500/10 shadow-lg shadow-amber-500/20">
                  <RiCopperCoinLine className="w-5 h-5 text-amber-400" />
                  <span className="text-amber-100 font-bold">+{anim.payload.amount} Coins</span>
                  {anim.payload.reason && <span className="text-amber-400/80 text-xs ml-1">({anim.payload.reason})</span>}
                </div>
              </Toast>
            )
          }
          if (anim.type === 'xp') {
            return (
              <Toast key={anim.id} onRemove={() => removeAnimation(anim.id)}>
                <div className="glass-strong px-4 py-2 rounded-xl flex items-center gap-2 border-cyan-500/30 bg-cyan-500/10 shadow-lg shadow-cyan-500/20">
                  <RiStarLine className="w-5 h-5 text-cyan-400" />
                  <span className="text-cyan-100 font-bold">+{anim.payload.amount} XP</span>
                  {anim.payload.reason && <span className="text-cyan-400/80 text-xs ml-1">({anim.payload.reason})</span>}
                </div>
              </Toast>
            )
          }
          if (anim.type === 'level') {
            return (
              <Toast key={anim.id} onRemove={() => removeAnimation(anim.id)} delay={4000}>
                <div className="glass-strong px-6 py-3 rounded-2xl flex items-center gap-3 border-indigo-500/50 bg-indigo-500/20 shadow-xl shadow-indigo-500/30">
                  <RiArrowUpCircleLine className="w-8 h-8 text-indigo-400 animate-bounce" />
                  <div>
                    <p className="text-indigo-200 text-xs font-bold uppercase tracking-wider">Level Up!</p>
                    <p className="text-white font-black text-xl">Level {anim.payload.level}</p>
                  </div>
                </div>
              </Toast>
            )
          }
          if (anim.type === 'achievement') {
            // Icon mapping could be improved, but let's just use Trophy for now
            return (
              <Toast key={anim.id} onRemove={() => removeAnimation(anim.id)} delay={5000}>
                <div className="glass-strong p-4 rounded-2xl flex gap-3 border-violet-500/50 bg-violet-500/20 shadow-xl shadow-violet-500/30 max-w-xs">
                  <div className="w-10 h-10 rounded-xl bg-violet-500/30 flex items-center justify-center flex-shrink-0 text-violet-300">
                     <RiTrophyLine className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-violet-300 text-xs font-bold uppercase tracking-wider mb-0.5">Achievement Unlocked</p>
                    <p className="text-white font-bold text-sm">{anim.payload.title}</p>
                    <p className="text-violet-200 text-xs mt-1 leading-tight">{anim.payload.description}</p>
                  </div>
                </div>
              </Toast>
            )
          }
          return null;
        })}
      </AnimatePresence>
    </div>
  )
}
