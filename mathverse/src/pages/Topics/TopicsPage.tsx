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
    <motion.div variants={cardReveal} className="h-full">
      <Link to={`/theorem/${theorem.id}`} className="block h-full">
      <Card
        hover
        padding="md"
        className="h-full flex flex-col gap-4 group"
      >
        {/* Top row */}
        <div className="flex items-start justify-between gap-2">
          {/* Index + Icon */}
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-indigo-500/15 flex items-center justify-center text-indigo-400 flex-shrink-0 font-mono text-xs font-bold">
              {String(index + 1).padStart(2, '0')}
            </div>
          </div>
          <Badge variant={cat.colour} dot>
            {cat.label}
          </Badge>
        </div>

        {/* Theorem name */}
        <div className="flex-1 space-y-2">
          <h2 className="text-white font-semibold text-sm leading-snug group-hover:text-indigo-300 transition-colors">
            {theorem.theorem}
          </h2>
          <p className="text-slate-500 text-xs leading-relaxed line-clamp-4">
            {theorem.coreIdea}
          </p>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-2 border-t border-white/[0.05]">
          <span className="text-slate-600 text-xs flex items-center gap-1">
            <RiBookOpenLine className="w-3.5 h-3.5" />
            View Theorem
          </span>
          <RiArrowRightLine className="w-4 h-4 text-slate-600 group-hover:text-indigo-400 transition-colors" />
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
      <GlowOrb colour="cyan" size={400} top="-10%" right="-10%" opacity={0.12} />

      {/* ── Page Header ────────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-white">Theorem Library</h1>
        <p className="text-slate-400 text-sm mt-1">
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
          <RiSearchLine className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input
            id="topics-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search theorems…"
            className={cn(
              'w-full h-11 pl-11 pr-4',
              'glass rounded-xl',
              'text-sm text-white placeholder:text-slate-600',
              'focus:outline-none focus:ring-2 focus:ring-indigo-500/50',
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
                'px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-150',
                activeCategory === cat
                  ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-500/25'
                  : 'glass text-slate-400 hover:text-white hover:bg-white/10',
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
          className="text-center py-20 text-slate-600"
        >
          <RiSearchLine className="w-12 h-12 mx-auto mb-4 opacity-40" />
          <p className="text-lg font-medium text-slate-500">No theorems found</p>
          <p className="text-sm mt-1">Try adjusting your search or filter.</p>
        </motion.div>
      ) : (
        <motion.div
          key={`${query}-${activeCategory}`}
          variants={stagger}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
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
          className="text-slate-600 text-xs text-center mt-8"
        >
          Showing {filtered.length} of {theorems.length} theorems
        </motion.p>
      )}
    </div>
  )
}
