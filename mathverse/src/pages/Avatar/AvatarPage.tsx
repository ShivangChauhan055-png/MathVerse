import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { useGamificationStore } from '@/store/useGamificationStore'
import { cn } from '@/utils/cn'
import { GlowOrb } from '@/components/ui/GlowOrb'

const AVATARS = [
  'https://api.dicebear.com/7.x/bottts/svg?seed=MathVerse1',
  'https://api.dicebear.com/7.x/bottts/svg?seed=MathVerse2',
  'https://api.dicebear.com/7.x/bottts/svg?seed=MathVerse3',
  'https://api.dicebear.com/7.x/bottts/svg?seed=MathVerse4',
  'https://api.dicebear.com/7.x/bottts/svg?seed=MathVerse5',
  'https://api.dicebear.com/7.x/bottts/svg?seed=MathVerse6',
  'https://api.dicebear.com/7.x/bottts/svg?seed=MathVerse7',
  'https://api.dicebear.com/7.x/bottts/svg?seed=MathVerse8',
]

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
}

export function AvatarPage() {
  const { avatarId, setAvatar } = useGamificationStore()
  const navigate = useNavigate()

  return (
    <div className="relative max-w-4xl mx-auto py-8">
      <GlowOrb colour="indigo" size={400} top="-10%" right="-10%" opacity={0.15} />
      
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="show"
        className="space-y-8"
      >
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-ink-900 dark:text-white tracking-tight">Choose Your Avatar</h1>
          <p className="text-ink-600 dark:text-slate-400 mt-3 text-lg">
            Select a robot companion for your mathematical journey.
          </p>
        </div>

        <Card className="p-8 border-indigo-400/20 dark:border-indigo-500/20 bg-indigo-50/50 dark:bg-indigo-500/5">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {AVATARS.map((avatar, idx) => {
              const isSelected = avatarId === avatar
              return (
                <motion.button
                  key={idx}
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setAvatar(avatar)}
                  className={cn(
                    'relative p-6 rounded-2xl border-2 transition-all duration-300',
                    isSelected 
                      ? 'border-indigo-500 bg-indigo-100 dark:bg-indigo-500/20 shadow-lg shadow-indigo-500/30' 
                      : 'border-ink-900/10 dark:border-white/10 hover:border-indigo-400/50 hover:bg-ink-900/5 dark:hover:bg-white/5 bg-ink-900/[0.02] dark:bg-white/[0.02]'
                  )}
                >
                  <img src={avatar} alt={`Avatar ${idx + 1}`} className="w-full h-auto drop-shadow-xl" />
                  
                  {isSelected && (
                    <motion.div 
                      layoutId="selected-ring"
                      className="absolute inset-0 rounded-2xl ring-2 ring-indigo-400 ring-offset-2 ring-offset-white dark:ring-offset-space-800"
                    />
                  )}
                </motion.button>
              )
            })}
          </div>

          <div className="flex justify-end pt-10 mt-8 border-t border-[color:var(--color-border)]">
            <Button 
              variant="primary" 
              size="lg"
              onClick={() => navigate('/dashboard')} 
              disabled={!avatarId}
            >
              Save & Continue
            </Button>
          </div>
        </Card>
      </motion.div>
    </div>
  )
}
