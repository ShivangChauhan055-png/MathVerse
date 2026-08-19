/**
 * pages/Topics/TopicsPage.tsx
 *
 * Displays the full theorem library sourced from theorems.json.
 *
 * Features:
 *  - Search / filter by name
 *  - Category badge display
 *  - Animated card grid (Framer Motion stagger)
 *  - Each card links to the theorem detail (future route)
 *  - Stage count from individual JSON files (static count from theorems list)
 *
 * Data: reads theorems.json (read-only, never modified).
 */

import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  RiSearchLine,
  RiArrowRightLine,
  RiBookOpenLine,
} from 'react-icons/ri'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { GlowOrb } from '@/components/ui/GlowOrb'
import { cn } from '@/utils/cn'

// Dataset — read-only source of truth
import theoremsData from '@/data/data/theorems.json'
import type { TheoremMeta, BadgeVariant } from '@/types'

const theorems = theoremsData as TheoremMeta[]

// ─── Static category mapping ──────────────────────────────────────────────────
// Manually categorised for the initial dataset — extensible as data grows

const categoryMap: Record<string, { label: string; colour: BadgeVariant }> = {
  'fermats-little':     { label: 'Number Theory',  colour: 'indigo' },
  'handshake':          { label: 'Combinatorics',  colour: 'cyan' },
  'chinese-remainder':  { label: 'Number Theory',  colour: 'indigo' },
  'coupon-collector':   { label: 'Probability',    colour: 'amber' },
  'euclidean-algorithm':{ label: 'Algorithms',     colour: 'green' },
  'modular-inverse':    { label: 'Number Theory',  colour: 'indigo' },
  'binary-exponentiation':{ label: 'Algorithms',   colour: 'green' },
}

const defaultCategory = { label: 'Mathematics', colour: 'violet' as BadgeVariant }

function getCategory(id: string) {
  return categoryMap[id] ?? defaultCategory
}

// ─── All unique category labels for filtering ─────────────────────────────────

const ALL_CATEGORIES = ['All', ...Array.from(new Set(theorems.map((t) => getCategory(t.id).label)))]

// ─── Animation Variants ───────────────────────────────────────────────────────

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
}

const cardReveal = {
  hidden: { opacity: 0, y: 20, scale: 0.97 },
  show:   { opacity: 1, y: 0,  scale: 1, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
}

// ─── Theorem Card ─────────────────────────────────────────────────────────────

function TheoremCard({ theorem, index }: { theorem: TheoremMeta; index: number }) {
  const cat = getCategory(theorem.id)

  return (
    <motion.div variants={cardReveal} className="h-full perspective-[1000px]">
      <Link to={`/theorem/${theorem.id}`} className="block h-full group">
      <Card
        hover
        padding="md"
        className="h-full flex flex-col gap-4 group relative overflow-hidden bg-surface dark:bg-space-800 border-[color:var(--color-border)] shadow-sm hover:shadow-lg transition-all duration-300 border-l-4 border-l-transparent group-hover:border-l-accent"
      >
        {/* Background Math Shape */}
        <div className="absolute -right-8 -bottom-8 w-32 h-32 opacity-5 pointer-events-none group-hover:scale-110 transition-transform duration-500 font-display font-bold text-9xl text-ink-900 dark:text-white">
          ∑
        </div>

        {/* Top row */}
        <div className="flex items-start justify-between gap-2 relative z-10">
          {/* Index + Icon */}
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-ink-100 dark:bg-space-800 flex items-center justify-center text-ink-700 dark:text-slate-500 flex-shrink-0 font-display text-xs font-bold border border-[color:var(--color-border)]">
              {String(index + 1).padStart(2, '0')}
            </div>
          </div>
          <Badge variant={cat.colour} dot className="font-display">
            {cat.label}
          </Badge>
        </div>

        {/* Theorem name */}
        <div className="flex-1 space-y-2 relative z-10">
          <h2 className="text-ink-900 dark:text-white font-bold font-display text-base leading-snug group-hover:text-accent transition-colors">
            {theorem.theorem}
          </h2>
          <p className="text-ink-700 dark:text-slate-400 text-sm leading-relaxed line-clamp-4">
            {theorem.coreIdea}
          </p>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-3 border-t border-[color:var(--color-border)] relative z-10 mt-auto">
          <span className="text-ink-600 dark:text-slate-500 font-semibold text-xs flex items-center gap-1">
            <RiBookOpenLine className="w-4 h-4" />
            View Theorem
          </span>
          <RiArrowRightLine className="w-4 h-4 text-ink-500 dark:text-slate-500 group-hover:text-accent transition-colors" />
        </div>
      </Card>
      </Link>
    </motion.div>
  )
}

// ─── Topics Page ──────────────────────────────────────────────────────────────

export function TopicsPage() {
  const [query, setQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState('All')

  const filtered = useMemo(() => {
    return theorems.filter((t) => {
      const matchesSearch =
        query.trim() === '' ||
        t.theorem.toLowerCase().includes(query.toLowerCase()) ||
        t.coreIdea.toLowerCase().includes(query.toLowerCase())

      const matchesCategory =
        activeCategory === 'All' || getCategory(t.id).label === activeCategory

      return matchesSearch && matchesCategory
    })
  }, [query, activeCategory])

  return (
    <div className="relative max-w-5xl mx-auto">
      <GlowOrb colour="emerald" size={400} top="-10%" right="-10%" opacity={0.15} />

      {/* ── Page Header ────────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-ink-900 dark:text-white font-display">Theorem Library</h1>
        <p className="text-ink-600 dark:text-slate-400 text-sm mt-1">
          {theorems.length} curated theorems. Explore at your own pace.
        </p>
      </motion.div>

      {/* ── Search & Filters ───────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="mb-8 space-y-4"
      >
        {/* Search input */}
        <div className="relative">
          <RiSearchLine className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-ink-500 dark:text-slate-500" />
          <input
            id="topics-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search theorems…"
            className={cn(
              'w-full h-12 pl-12 pr-4',
              'bg-surface dark:bg-space-800 border border-[color:var(--color-border-strong)] dark:border-[color:var(--color-border)] rounded-xl shadow-sm',
              'text-sm text-ink-900 dark:text-white placeholder:text-ink-500 dark:placeholder:text-slate-500 font-medium',
              'focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent',
              'transition-all duration-150',
            )}
          />
        </div>

        {/* Category filter chips */}
        <div className="flex flex-wrap gap-2">
          {ALL_CATEGORIES.map((cat) => (
            <button
              key={cat}
              id={`filter-${cat.toLowerCase().replace(/\s+/g, '-')}`}
              onClick={() => setActiveCategory(cat)}
              className={cn(
                'px-4 py-1.5 rounded-full text-xs font-bold font-display transition-all duration-150 border',
                activeCategory === cat
                  ? 'bg-accent text-white border-accent shadow-md shadow-accent-glow'
                  : 'bg-surface dark:bg-space-800 border-[color:var(--color-border-strong)] dark:border-[color:var(--color-border)] text-ink-800 dark:text-slate-400 hover:text-ink-950 dark:hover:text-white hover:bg-ink-100 dark:hover:bg-space-700 shadow-sm',
              )}
            >
              {cat}
            </button>
          ))}
        </div>
      </motion.div>

      {/* ── Grid ───────────────────────────────────────────────────────── */}
      {filtered.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-20 text-ink-500 dark:text-slate-500"
        >
          <RiSearchLine className="w-12 h-12 mx-auto mb-4 opacity-30 text-ink-400 dark:text-slate-500" />
          <p className="text-lg font-bold font-display text-ink-700 dark:text-slate-300">No theorems found</p>
          <p className="text-sm mt-1">Try adjusting your search or filter.</p>
        </motion.div>
      ) : (
        <motion.div
          key={`${query}-${activeCategory}`}
          variants={stagger}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filtered.map((theorem) => (
            <TheoremCard key={theorem.id} theorem={theorem} index={theorems.indexOf(theorem)} />
          ))}
        </motion.div>
      )}

      {/* Result count */}
      {filtered.length > 0 && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-ink-500 dark:text-slate-500 font-medium text-xs text-center mt-10"
        >
          Showing {filtered.length} of {theorems.length} theorems
        </motion.p>
      )}
    </div>
  )
}
