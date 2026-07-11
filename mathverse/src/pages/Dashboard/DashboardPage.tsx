/**
 * pages/Dashboard/DashboardPage.tsx
 *
 * Dashboard placeholder page.
 *
 * Shows a skeleton UI that communicates the upcoming features:
 *  - Stats overview cards
 *  - Recent activity feed
 *  - Learning streak
 *  - Quick-start buttons
 *
 * No real data yet — the structure and design system are established here
 * so feature implementation slots in cleanly.
 */

import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  RiBookOpenLine,
  RiArrowRightLine,
  RiFlashlightLine,
  RiTrophyLine,
  RiTimeLine,
} from 'react-icons/ri'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { GlowOrb } from '@/components/ui/GlowOrb'

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
}

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
}

// ─── Stat Card ────────────────────────────────────────────────────────────────

interface StatCardProps {
  icon: React.ElementType
  label: string
  value: string
  sub: string
  colour: 'indigo' | 'cyan' | 'violet' | 'amber'
}

const colourClasses = {
  indigo: { icon: 'bg-indigo-500/15 text-indigo-400', ring: 'shadow-indigo-500/10' },
  cyan:   { icon: 'bg-cyan-500/15   text-cyan-400',   ring: 'shadow-cyan-500/10' },
  violet: { icon: 'bg-violet-500/15 text-violet-400', ring: 'shadow-violet-500/10' },
  amber:  { icon: 'bg-amber-500/15  text-amber-400',  ring: 'shadow-amber-500/10' },
}

function StatCard({ icon: Icon, label, value, sub, colour }: StatCardProps) {
  const c = colourClasses[colour]
  return (
    <Card className={`shadow-lg ${c.ring}`}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-slate-500 text-xs font-medium mb-1">{label}</p>
          <p className="text-2xl font-bold text-white">{value}</p>
          <p className="text-slate-500 text-xs mt-1">{sub}</p>
        </div>
        <div className={`p-2.5 rounded-xl ${c.icon}`}>
          <Icon className="w-5 h-5" />
        </div>
      </div>
    </Card>
  )
}

// ─── Skeleton loader bar ──────────────────────────────────────────────────────

function Skeleton({ className }: { className?: string }) {
  return (
    <div
      className={`bg-white/[0.05] rounded-lg animate-pulse ${className ?? ''}`}
    />
  )
}

// ─── Dashboard Page ───────────────────────────────────────────────────────────

export function DashboardPage() {
  return (
    <div className="relative max-w-5xl mx-auto">
      <GlowOrb colour="indigo" size={500} top="-20%" right="-10%" opacity={0.15} />

      <motion.div
        variants={stagger}
        initial="hidden"
        animate="show"
        className="space-y-8"
      >
        {/* ── Page Header ────────────────────────────────────────────── */}
        <motion.div variants={fadeUp}>
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-3xl font-bold text-white">Dashboard</h1>
              <p className="text-slate-400 text-sm mt-1">
                Your mathematics learning journey at a glance.
              </p>
            </div>
            <Link to="/topics">
              <Button
                variant="primary"
                size="sm"
                rightIcon={<RiArrowRightLine className="w-4 h-4" />}
              >
                Continue Learning
              </Button>
            </Link>
          </div>
        </motion.div>

        {/* ── Coming Soon Banner ─────────────────────────────────────── */}
        <motion.div variants={fadeUp}>
          <Card variant="flat" className="border-indigo-500/30 bg-indigo-500/5">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-indigo-500/20 rounded-xl">
                <RiFlashlightLine className="w-5 h-5 text-indigo-400" />
              </div>
              <div>
                <p className="text-white font-medium text-sm">
                  Full dashboard coming soon
                </p>
                <p className="text-slate-400 text-xs mt-0.5">
                  XP tracking, streaks, quiz history, and personalized recommendations
                  are on the roadmap.
                </p>
              </div>
              <Badge variant="indigo" className="ml-auto flex-shrink-0">
                Planned
              </Badge>
            </div>
          </Card>
        </motion.div>

        {/* ── Stats Grid ─────────────────────────────────────────────── */}
        <motion.div variants={stagger} className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { icon: RiBookOpenLine,  label: 'Topics Explored',  value: '—',    sub: 'Start a theorem', colour: 'indigo' },
            { icon: RiTrophyLine,    label: 'Stages Completed', value: '—',    sub: 'Complete a stage', colour: 'cyan' },
            { icon: RiFlashlightLine,label: 'Current Streak',   value: '—',    sub: 'Days in a row',   colour: 'violet' },
            { icon: RiTimeLine,      label: 'Time Spent',       value: '—',    sub: 'Keep going!',     colour: 'amber' },
          ].map((s) => (
            <motion.div key={s.label} variants={fadeUp}>
              <StatCard {...s as StatCardProps} />
            </motion.div>
          ))}
        </motion.div>

        {/* ── Main Content Grid ───────────────────────────────────────── */}
        <motion.div variants={stagger} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Activity (2/3 width) */}
          <motion.div variants={fadeUp} className="lg:col-span-2">
            <Card>
              <Card.Header>
                <div className="flex items-center justify-between">
                  <h2 className="text-white font-semibold">Recent Activity</h2>
                  <Badge variant="violet">Coming Soon</Badge>
                </div>
              </Card.Header>
              <Card.Body>
                <div className="space-y-3">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <Skeleton className="w-9 h-9 rounded-xl flex-shrink-0" />
                      <div className="flex-1 space-y-1.5">
                        <Skeleton className="h-3 w-3/4" />
                        <Skeleton className="h-2.5 w-1/2" />
                      </div>
                      <Skeleton className="h-5 w-12 rounded-full" />
                    </div>
                  ))}
                </div>
                <p className="text-slate-600 text-xs text-center mt-6">
                  Activity will appear here as you learn theorems.
                </p>
              </Card.Body>
            </Card>
          </motion.div>

          {/* Quick Start (1/3 width) */}
          <motion.div variants={fadeUp}>
            <Card className="h-full flex flex-col">
              <Card.Header>
                <h2 className="text-white font-semibold">Quick Start</h2>
                <p className="text-slate-500 text-xs mt-1">Jump into a theorem</p>
              </Card.Header>
              <Card.Body className="flex-1">
                <div className="space-y-2.5">
                  {['Euclidean Algorithm', "Fermat's Little Theorem", 'Handshake Lemma', 'Binary Exponentiation'].map(
                    (name) => (
                      <Link
                        key={name}
                        to="/topics"
                        className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors group"
                      >
                        <div className="w-7 h-7 rounded-lg bg-indigo-500/15 flex items-center justify-center text-indigo-400 flex-shrink-0 text-xs font-bold font-mono">
                          Σ
                        </div>
                        <span className="text-slate-300 text-xs group-hover:text-white transition-colors line-clamp-1">
                          {name}
                        </span>
                        <RiArrowRightLine className="w-3.5 h-3.5 text-slate-600 group-hover:text-indigo-400 ml-auto flex-shrink-0 transition-colors" />
                      </Link>
                    ),
                  )}
                </div>
              </Card.Body>
              <Card.Footer>
                <Link to="/topics" className="block">
                  <Button variant="ghost" size="sm" fullWidth rightIcon={<RiArrowRightLine className="w-3.5 h-3.5" />}>
                    All Topics
                  </Button>
                </Link>
              </Card.Footer>
            </Card>
          </motion.div>
        </motion.div>

        {/* ── Learning Progress placeholder ───────────────────────────── */}
        <motion.div variants={fadeUp}>
          <Card>
            <Card.Header>
              <div className="flex items-center justify-between">
                <h2 className="text-white font-semibold">Learning Progress</h2>
                <Badge variant="cyan">Coming Soon</Badge>
              </div>
            </Card.Header>
            <Card.Body>
              <div className="space-y-4">
                {['Number Theory', 'Combinatorics', 'Geometry', 'Algorithms'].map((cat) => (
                  <div key={cat}>
                    <div className="flex justify-between items-center mb-1.5">
                      <span className="text-slate-400 text-xs">{cat}</span>
                      <span className="text-slate-600 text-xs">—%</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-white/[0.06] overflow-hidden">
                      <div className="h-full w-0 rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 transition-all duration-1000" />
                    </div>
                  </div>
                ))}
              </div>
            </Card.Body>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  )
}
