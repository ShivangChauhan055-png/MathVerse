/**
 * pages/Landing/LandingPage.tsx
 *
 * Premium landing page for MathVerse.
 *
 * Sections:
 *  1. Hero       — headline, tagline, CTAs, animated math symbols
 *  2. Features   — 6 feature cards with icons
 *  3. Topics     — preview cards from theorems.json
 *  4. CTA Banner — final conversion section
 *  5. Footer
 */

import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  RiArrowRightLine,
  RiFlashlightLine,
  RiShieldStarLine,
  RiBarChartBoxLine,
  RiBrainLine,
  RiBookOpenLine,
  RiGlobalLine,
  RiGithubLine,
} from 'react-icons/ri'

import { Navbar } from '@/components/layout/Navbar'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { GlowOrb } from '@/components/ui/GlowOrb'
import { APP_NAME, APP_TAGLINE } from '@/constants/nav'

// Import the index from the dataset (read-only — never modified)
import theoremsData from '@/data/data/theorems.json'
import type { TheoremMeta } from '@/types'

const theorems = theoremsData as TheoremMeta[]

// ─── Animation variants ───────────────────────────────────────────────────────

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
}

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
}

const cardReveal = {
  hidden: { opacity: 0, y: 24, scale: 0.97 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
}

// ─── Feature data ─────────────────────────────────────────────────────────────

const features = [
  {
    icon: RiBrainLine,
    title: 'Story-Driven Learning',
    desc: 'Each theorem unfolds like a narrative — you discover the why before the how.',
    colour: 'indigo' as const,
  },
  {
    icon: RiFlashlightLine,
    title: 'Bite-Size Stages',
    desc: 'Complex proofs broken into micro-steps. Master one concept before the next.',
    colour: 'cyan' as const,
  },
  {
    icon: RiBarChartBoxLine,
    title: 'Visual Illustrations',
    desc: 'Interactive diagrams make abstract math tangible and memorable.',
    colour: 'violet' as const,
  },
  {
    icon: RiShieldStarLine,
    title: 'Real-World Context',
    desc: 'Every theorem comes with concrete applications — cryptography, physics, code.',
    colour: 'green' as const,
  },
  {
    icon: RiBookOpenLine,
    title: 'Rich Theorem Library',
    desc: "From Fermat's Little Theorem to Banach\u2013Tarski \u2014 curated, authoritative content.",
    colour: 'amber' as const,
  },
  {
    icon: RiGlobalLine,
    title: 'Always Free',
    desc: 'World-class mathematics education, accessible to everyone, everywhere.',
    colour: 'cyan' as const,
  },
]

const badgeColourMap: Record<string, 'indigo' | 'cyan' | 'violet' | 'green' | 'amber'> = {
  'fermats-little': 'indigo',
  'handshake': 'cyan',
  'chinese-remainder': 'violet',
  'coupon-collector': 'amber',
  'euclidean-algorithm': 'green',
  'modular-inverse': 'indigo',
  'binary-exponentiation': 'cyan',
}

// ─── Floating math symbols ────────────────────────────────────────────────────

const MATH_SYMBOLS = [
  { sym: '∑', type: 'text', style: { top: '15%', left: '10%', fontSize: '4rem', opacity: 0.2, rotate: 10 } },
  { sym: 'π', type: 'text', style: { top: '70%', left: '15%', fontSize: '5rem', opacity: 0.15, rotate: -15 } },
  { sym: '∫', type: 'text', style: { top: '25%', right: '12%', fontSize: '6rem', opacity: 0.1, rotate: 5 } },
  { sym: '∞', type: 'text', style: { top: '80%', right: '20%', fontSize: '4.5rem', opacity: 0.2, rotate: -10 } },
  { sym: 'Δ', type: 'text', style: { top: '45%', left: '5%', fontSize: '3rem', opacity: 0.25, rotate: 20 } },
  { sym: 'θ', type: 'text', style: { top: '55%', right: '8%', fontSize: '3.5rem', opacity: 0.15, rotate: -25 } },
  { sym: 'e^(iπ)+1=0', type: 'text', style: { top: '10%', right: '30%', fontSize: '2rem', opacity: 0.15, rotate: 0 } },
  { sym: 'f(x)', type: 'text', style: { top: '85%', left: '40%', fontSize: '2.5rem', opacity: 0.2, rotate: -5 } },
  // Geometric shapes
  { sym: 'ring', type: 'shape', style: { top: '60%', left: '25%', width: '120px', height: '120px', border: '2px solid rgba(46,152,142,0.2)', borderRadius: '50%' } },
  { sym: 'cube', type: 'shape', style: { top: '30%', right: '25%', width: '80px', height: '80px', border: '1px solid rgba(200,139,47,0.3)', transform: 'rotateX(60deg) rotateZ(45deg)' } },
  { sym: 'triangle', type: 'shape', style: { top: '20%', left: '30%', borderLeft: '40px solid transparent', borderRight: '40px solid transparent', borderBottom: '69.3px solid rgba(109,90,181,0.15)' } },
]

function FloatingEnvironment() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none perspective-[1000px]">
      {MATH_SYMBOLS.map((item, i) => (
        <motion.div
          key={i}
          className="absolute flex items-center justify-center font-display tracking-tight text-ink-900 dark:text-white drop-shadow-xl"
          style={{ ...item.style, zIndex: Math.floor(Math.random() * 10) }}
          animate={{
            y: [0, Math.random() * -40 - 20, 0],
            rotateZ: item.style.rotate ? [item.style.rotate, (item.style.rotate as number) + 10, item.style.rotate] : [0, 5, 0],
            rotateX: item.type === 'shape' && item.sym === 'cube' ? [60, 70, 60] : 0,
            opacity: item.type === 'text' ? [(item.style.opacity as number), (item.style.opacity as number) + 0.1, (item.style.opacity as number)] : 1,
          }}
          transition={{
            duration: 6 + Math.random() * 6,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: Math.random() * 4,
          }}
        >
          {item.type === 'text' && item.sym}
        </motion.div>
      ))}
    </div>
  )
}

// ─── Landing Page ─────────────────────────────────────────────────────────────

export function LandingPage() {
  return (
    <div className="min-h-dvh bg-paper-50 dark:bg-space-900 overflow-x-hidden text-ink-900 dark:text-white">
      <Navbar landing />

      {/* ══════════════════════════════════════════════════════════════════════
          HERO
      ══════════════════════════════════════════════════════════════════════ */}
      <section
        id="hero"
        className="relative min-h-dvh flex flex-col items-center justify-center pt-24 pb-20 px-4 text-center overflow-hidden math-grid-bg"
      >
        {/* Background glows - muted for paper theme */}
        <GlowOrb colour="emerald" size={700} top="-15%" left="-10%" opacity={0.3} />
        <GlowOrb colour="amber" size={500} top="20%" right="-15%" opacity={0.2} />
        <GlowOrb colour="indigo" size={400} bottom="-5%" left="30%" opacity={0.15} />

        {/* Floating Environment */}
        <FloatingEnvironment />

        {/* Content */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="show"
          className="relative z-10 max-w-4xl mx-auto flex flex-col items-center gap-6"
        >
          {/* Tag pill */}
          <motion.div variants={fadeUp}>
            <Badge variant="indigo" dot className="bg-surface dark:bg-space-800 shadow-sm border-[color:var(--color-border)]">
              Now in Beta · 15 theorems and counting
            </Badge>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={fadeUp}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold font-display leading-[1.05] tracking-tight drop-shadow-sm"
          >
            <span className="text-ink-900 dark:text-white">{APP_NAME}</span>
            <br />
            <span className="gradient-text">Explore Math.</span>
            <br />
            <span className="text-ink-600 dark:text-slate-400">Like Never Before.</span>
          </motion.h1>

          {/* Tagline */}
          <motion.p
            variants={fadeUp}
            className="text-lg sm:text-xl text-ink-700 dark:text-slate-300 max-w-2xl leading-relaxed"
          >
            {APP_TAGLINE} Dive into story-driven lessons on real theorems — from
            Euclid's algorithm to Fermat's Last Theorem — one elegant step at a time.
          </motion.p>

          {/* CTAs */}
          <motion.div variants={fadeUp} className="flex flex-wrap gap-4 justify-center mt-2">
            <Button
              size="lg"
              variant="primary"
              rightIcon={<RiArrowRightLine className="w-5 h-5" />}
              className="shadow-lg shadow-accent-glow"
              onClick={() => { window.location.href = '/topics' }}
            >
              Start Learning
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="bg-surface dark:bg-space-800"
              onClick={() => { window.location.href = '/dashboard' }}
            >
              View Dashboard
            </Button>
          </motion.div>

          {/* Social proof strip */}
          <motion.div
            variants={fadeUp}
            className="flex items-center gap-4 mt-4 text-sm text-ink-600 dark:text-slate-400 font-medium"
          >
            <span>Free forever</span>
            <span className="w-1.5 h-1.5 rounded-full bg-accent" />
            <span>No sign-up required</span>
            <span className="w-1.5 h-1.5 rounded-full bg-accent" />
            <span>15 theorems</span>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
        >
          <div className="flex flex-col items-center gap-1 text-ink-500 dark:text-slate-500">
            <span className="text-xs tracking-widest uppercase font-bold">Scroll</span>
            <div className="w-px h-8 bg-gradient-to-b from-ink-500 to-transparent" />
          </div>
        </motion.div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          FEATURES
      ══════════════════════════════════════════════════════════════════════ */}
      <section
        id="features"
        className="relative py-28 px-4 overflow-hidden coordinate-bg"
      >
        <GlowOrb colour="indigo" size={600} top="-20%" right="-10%" opacity={0.15} />

        <div className="max-w-6xl mx-auto">
          {/* Section header */}
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-100px' }}
            className="text-center mb-16"
          >
            <motion.p variants={fadeUp} className="text-accent text-sm font-bold tracking-widest uppercase mb-3">
              Why MathVerse
            </motion.p>
            <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-bold text-ink-900 dark:text-white mb-4 font-display">
              Learning reimagined for{' '}
              <span className="gradient-text">mathematicians</span>
            </motion.h2>
            <motion.p variants={fadeUp} className="text-ink-700 dark:text-slate-300 text-lg max-w-2xl mx-auto">
              Not just another textbook online. MathVerse is an experience built for
              deep understanding and lasting insight.
            </motion.p>
          </motion.div>

          {/* Feature grid */}
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-80px' }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {features.map((f) => (
              <motion.div key={f.title} variants={cardReveal} className="perspective-[1000px]">
                <Card hover className="h-full group relative overflow-hidden bg-surface dark:bg-space-800 border-[color:var(--color-border)] shadow-md hover:shadow-xl transition-all duration-300">
                  <div className="absolute -right-10 -top-10 w-40 h-40 bg-gradient-radial from-[color:var(--color-border)] to-transparent opacity-20 pointer-events-none group-hover:scale-150 transition-transform duration-500" />
                  <div
                    className={`
                      inline-flex items-center justify-center
                      w-12 h-12 rounded-2xl mb-5 shadow-inner
                      bg-${f.colour}-50 border border-${f.colour}-200 text-${f.colour}-600
                      group-hover:bg-${f.colour}-100
                      transition-colors duration-200
                    `}
                  >
                    <f.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-ink-900 dark:text-white font-bold font-display text-lg mb-2">
                    {f.title}
                  </h3>
                  <p className="text-ink-700 dark:text-slate-300 text-sm leading-relaxed">{f.desc}</p>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          TOPICS PREVIEW
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="relative py-28 px-4 overflow-hidden border-t border-[color:var(--color-border)]">
        <GlowOrb colour="emerald" size={500} bottom="-10%" left="-5%" opacity={0.15} />
        <div className="absolute inset-0 math-grid-bg opacity-50" />

        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-100px' }}
            className="text-center mb-14"
          >
            <motion.p variants={fadeUp} className="text-secondary text-sm font-bold tracking-widest uppercase mb-3">
              The Library
            </motion.p>
            <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-bold text-ink-900 dark:text-white mb-4 font-display">
              Explore the <span className="gradient-text">Theorems</span>
            </motion.h2>
            <motion.p variants={fadeUp} className="text-ink-700 dark:text-slate-300 text-lg max-w-xl mx-auto">
              A curated collection of the most beautiful and important results in mathematics.
            </motion.p>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-60px' }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {theorems.slice(0, 8).map((t, i) => (
              <motion.div key={t.id} variants={cardReveal}>
                <Link to="/topics" className="block h-full group">
                  <Card hover padding="md" className="h-full flex flex-col gap-4 border-l-4 border-l-transparent group-hover:border-l-accent bg-surface dark:bg-space-800 shadow-sm hover:shadow-lg transition-all duration-300">
                    {/* Index */}
                    <div className="flex items-center justify-between">
                      <Badge variant={badgeColourMap[t.id] ?? 'indigo'} className="font-display">
                        #{String(i + 1).padStart(2, '0')}
                      </Badge>
                      <RiArrowRightLine className="w-5 h-5 text-ink-400 group-hover:text-accent transition-colors" />
                    </div>
                    {/* Theorem name */}
                    <h3 className="text-ink-900 dark:text-white font-bold font-display text-lg leading-tight">
                      {t.theorem}
                    </h3>
                    {/* Core idea */}
                    <p className="text-ink-600 dark:text-slate-400 text-sm leading-relaxed line-clamp-3 flex-1">
                      {t.coreIdea}
                    </p>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="flex justify-center mt-12"
          >
            <Link to="/topics">
              <Button variant="outline" size="lg" className="bg-surface dark:bg-space-800 border-accent text-accent hover:bg-accent hover:text-white" rightIcon={<RiArrowRightLine className="w-4 h-4" />}>
                View All Theorems
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          CTA BANNER
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="relative py-28 px-4 overflow-hidden">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <Card variant="strong" padding="lg" className="relative text-center overflow-hidden bg-ink-900 border-none shadow-2xl">
              <GlowOrb colour="cyan" size={400} top="-50%" left="20%" opacity={0.2} animate={false} />
              <div className="absolute inset-0 bg-dot-grid opacity-20" />
              <div className="relative z-10">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 font-display">
                  Ready to become a{' '}
                  <span className="gradient-text-warm">MathVerse Explorer?</span>
                </h2>
                <p className="text-ink-200 dark:text-slate-300 text-lg mb-8 max-w-xl mx-auto">
                  Start your journey through the most beautiful theorems in mathematics.
                  No textbooks. No lectures. Just pure discovery.
                </p>
                <div className="flex flex-wrap gap-4 justify-center">
                  <Link to="/topics">
                    <Button size="lg" variant="secondary" rightIcon={<RiArrowRightLine className="w-5 h-5" />}>
                      Explore Topics
                    </Button>
                  </Link>
                  <Link to="/dashboard">
                    <Button size="lg" variant="outline" className="text-white border-white/20 hover:bg-white/10 hover:border-white/40">
                      Go to Dashboard
                    </Button>
                  </Link>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          FOOTER
      ══════════════════════════════════════════════════════════════════════ */}
      <footer className="border-t border-[color:var(--color-border)] py-10 px-4 bg-paper-50 dark:bg-space-900">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-surface dark:bg-space-800 border border-[color:var(--color-border)] flex items-center justify-center text-accent text-sm font-bold font-display shadow-sm">
              ∑
            </div>
            <span className="text-ink-900 dark:text-white font-bold font-display">{APP_NAME}</span>
          </div>
          <p className="text-ink-600 dark:text-slate-400 text-sm">
            Built with ❤️ for mathematics. {new Date().getFullYear()} MathVerse.
          </p>
          <div className="flex items-center gap-4">
            <Link to="/topics" className="text-ink-600 dark:text-slate-400 hover:text-ink-900 dark:text-white text-sm transition-colors font-medium">
              Topics
            </Link>
            <Link to="/dashboard" className="text-ink-600 dark:text-slate-400 hover:text-ink-900 dark:text-white text-sm transition-colors font-medium">
              Dashboard
            </Link>
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="text-ink-600 dark:text-slate-400 hover:text-ink-900 dark:text-white transition-colors"
              aria-label="GitHub"
            >
              <RiGithubLine className="w-5 h-5" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}
