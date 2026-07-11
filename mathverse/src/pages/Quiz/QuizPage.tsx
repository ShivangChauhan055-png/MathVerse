import { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { RiCheckLine, RiCloseLine, RiLightbulbFlashLine, RiArrowRightLine, RiTrophyLine } from 'react-icons/ri'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { useGamificationStore } from '@/store/useGamificationStore'
import { soundService } from '@/services/SoundService'
import type { TheoremDetail, TheoremStage } from '@/types'
import { cn } from '@/utils/cn'

export function QuizPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addCoins, addXP, recordActivity, unlockAchievement } = useGamificationStore()

  const [data, setData] = useState<TheoremDetail | null>(null)
  const [loading, setLoading] = useState(true)

  const [stageIndex, setStageIndex] = useState(0)
  const [inputValue, setInputValue] = useState('')
  const [status, setStatus] = useState<'idle' | 'correct' | 'wrong'>('idle')
  const [showHint, setShowHint] = useState(false)
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    async function loadData() {
      try {
        const mod = await import(`../../data/data/${id}.json`)
        setData(mod.default)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    if (id) {
      loadData()
    }
  }, [id])

  if (loading) {
    return <div className="text-center py-20 text-slate-500">Loading Quiz...</div>
  }

  if (!data || data.stages.length === 0) {
    return <div className="text-center py-20 text-slate-500">Quiz not found or empty</div>
  }

  const currentStage = data.stages[stageIndex]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (status === 'correct') return;

    const isMatch = currentStage.acceptedAnswers.some(
      ans => ans.toLowerCase().replace(/\s+/g, '') === inputValue.toLowerCase().replace(/\s+/g, '')
    )

    if (isMatch) {
      setStatus('correct')
      soundService.playCorrect()
      addCoins(10)
      addXP(20)
      recordActivity()
      // Note: In a real app, track 'first_question' achievement safely
      unlockAchievement('first_question')
    } else {
      setStatus('wrong')
      soundService.playWrong()
    }
  }

  const handleNext = () => {
    if (stageIndex < data.stages.length - 1) {
      setStageIndex(prev => prev + 1)
      setInputValue('')
      setStatus('idle')
      setShowHint(false)
    } else {
      setIsComplete(true)
      soundService.playAchievement()
      unlockAchievement('first_topic')
    }
  }

  if (isComplete) {
    return (
      <div className="relative max-w-2xl mx-auto py-20 text-center">
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="space-y-8">
          <div className="w-24 h-24 mx-auto rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center border-4 border-indigo-500/30">
            <RiTrophyLine className="w-12 h-12" />
          </div>
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">Quiz Completed!</h1>
            <p className="text-slate-400 text-lg">You mastered <strong className="text-indigo-300">{data.displayName}</strong>.</p>
          </div>
          <div className="flex justify-center gap-4">
            <Link to="/topics">
              <Button variant="outline">Back to Library</Button>
            </Link>
            <Link to="/dashboard">
              <Button variant="primary">Go to Dashboard</Button>
            </Link>
          </div>
        </motion.div>
      </div>
    )
  }

  const progressPercent = ((stageIndex) / data.stages.length) * 100

  return (
    <div className="relative max-w-3xl mx-auto pb-12">
      <div className="mb-8">
        <div className="flex justify-between items-end mb-2">
          <h2 className="text-slate-400 text-sm font-medium">Stage {stageIndex + 1} of {data.stages.length}</h2>
          <span className="text-indigo-400 text-xs font-bold">{Math.round(progressPercent)}%</span>
        </div>
        <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-indigo-500" 
            initial={{ width: `${progressPercent}%` }}
            animate={{ width: `${progressPercent}%` }} 
          />
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={stageIndex}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="p-6 md:p-8 border-indigo-500/20 bg-indigo-500/5">
            <div className="mb-6">
              <span className="inline-block px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-bold tracking-wider uppercase mb-4">
                {currentStage.conceptLabel}
              </span>
              <p className="text-lg text-slate-200 leading-relaxed font-serif bg-white/5 p-4 rounded-xl border border-white/10 mb-6">
                {currentStage.conceptShown}
              </p>
              <h1 className="text-2xl font-bold text-white">{currentStage.question}</h1>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => {
                    setInputValue(e.target.value)
                    if (status === 'wrong') setStatus('idle')
                  }}
                  disabled={status === 'correct'}
                  placeholder="Type your answer here..."
                  className={cn(
                    "w-full bg-white/5 border-2 rounded-xl px-4 py-4 text-white text-lg transition-colors outline-none",
                    status === 'idle' ? "border-white/10 focus:border-indigo-500/50" : "",
                    status === 'correct' ? "border-green-500/50 bg-green-500/10" : "",
                    status === 'wrong' ? "border-red-500/50 bg-red-500/10" : ""
                  )}
                  autoFocus
                />
                {status === 'correct' && (
                  <RiCheckLine className="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 text-green-400" />
                )}
                {status === 'wrong' && (
                  <RiCloseLine className="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 text-red-400" />
                )}
              </div>

              <div className="flex items-center justify-between pt-4">
                <Button 
                  type="button"
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setShowHint(!showHint)}
                  className="text-amber-400 hover:text-amber-300 hover:bg-amber-400/10"
                >
                  <RiLightbulbFlashLine className="w-4 h-4 mr-1" />
                  {showHint ? 'Hide Hint' : 'Show Hint'}
                </Button>

                {status !== 'correct' ? (
                  <Button type="submit" variant="primary" size="lg" disabled={!inputValue.trim() || status === 'wrong'}>
                    Check Answer
                  </Button>
                ) : (
                  <Button type="button" variant="primary" size="lg" onClick={handleNext} rightIcon={<RiArrowRightLine className="w-5 h-5" />}>
                    {stageIndex < data.stages.length - 1 ? 'Next Question' : 'Finish Quiz'}
                  </Button>
                )}
              </div>
            </form>

            <AnimatePresence>
              {showHint && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-6 overflow-hidden"
                >
                  <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-200 text-sm leading-relaxed">
                    <strong>Hint:</strong> {currentStage.hint}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

          </Card>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
