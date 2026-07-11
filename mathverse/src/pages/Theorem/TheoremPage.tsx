import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { RiArrowRightLine, RiArrowLeftLine } from 'react-icons/ri'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { GlowOrb } from '@/components/ui/GlowOrb'
import type { TheoremDetail } from '@/types'

export function TheoremPage() {
  const { id } = useParams()
  const [data, setData] = useState<TheoremDetail | null>(null)
  const [loading, setLoading] = useState(true)

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
    return <div className="text-center py-20 text-slate-500">Loading...</div>
  }

  if (!data) {
    return <div className="text-center py-20 text-slate-500">Theorem not found</div>
  }

  return (
    <div className="relative max-w-4xl mx-auto pb-12">
      <GlowOrb colour="indigo" size={500} top="-10%" left="-10%" opacity={0.15} />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-8"
      >
        <div>
          <Link to="/topics" className="inline-flex items-center gap-1 text-sm text-slate-400 hover:text-white transition-colors mb-6">
            <RiArrowLeftLine className="w-4 h-4" /> Back to Library
          </Link>
          <h1 className="text-4xl font-bold text-white">{data.displayName}</h1>
          <p className="text-xl text-indigo-300 mt-2">{data.story.intro}</p>
        </div>

        <Card className="p-8 border-indigo-500/20 bg-indigo-500/5">
          <div className="space-y-6">
            <div>
              <h2 className="text-sm font-bold text-indigo-400 uppercase tracking-widest mb-2">The Theorem</h2>
              <p className="text-lg text-slate-200 leading-relaxed font-serif bg-white/5 p-4 rounded-xl border border-white/10">
                {data.story.theoremStatement}
              </p>
            </div>
            
            <div>
              <h2 className="text-sm font-bold text-cyan-400 uppercase tracking-widest mb-2">In Plain English</h2>
              <p className="text-slate-300 leading-relaxed">
                {data.story.plainEnglish}
              </p>
            </div>

            {data.story.applications && data.story.applications.length > 0 && (
              <div>
                <h2 className="text-sm font-bold text-amber-400 uppercase tracking-widest mb-3">Applications</h2>
                <ul className="space-y-3">
                  {data.story.applications.map((app, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-2 flex-shrink-0" />
                      <span className="text-slate-300 leading-relaxed">{app}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </Card>

        <div className="flex justify-end">
          <Link to={`/quiz/${data.id}`}>
            <Button size="lg" variant="primary" rightIcon={<RiArrowRightLine className="w-5 h-5" />}>
              Start Quiz
            </Button>
          </Link>
        </div>
      </motion.div>
    </div>
  )
}
