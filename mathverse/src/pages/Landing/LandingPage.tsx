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

const MATH_SYMBOLS = ['∑', 'π', '∞', '√', 'Δ', 'Φ', '∂', 'λ', '∫', 'ℕ']

function FloatingSymbol({
  symbol,
  style,
}: {
  symbol: string
  style: React.CSSProperties
}) {
  return (
    <motion.span
      className="absolute text-indigo-400/20 font-mono font-bold select-none pointer-events-none"
      style={style}
      animate={{
        y: [0, -20, 0],
        opacity: [0.15, 0.35, 0.15],
      }}
      transition={{
        duration: 4 + Math.random() * 4,
        repeat: Infinity,
        ease: 'easeInOut',
        delay: Math.random() * 3,
      }}
    >
      {symbol}
    </motion.span>
  )
}

// ─── Landing Page ─────────────────────────────────────────────────────────────

export function LandingPage() {
  return (
    <div className="min-h-dvh bg-space-900 overflow-x-hidden">
      <Navbar landing />

      {/* ══════════════════════════════════════════════════════════════════════
          HERO
      ══════════════════════════════════════════════════════════════════════ */}
      <section
        id="hero"
        className="relative min-h-dvh flex flex-col items-center justify-center pt-24 pb-20 px-4 text-center overflow-hidden"
      >
        {/* Background glows */}
        <GlowOrb colour="indigo" size={700} top="-15%" left="-10%" opacity={0.5} />
        <GlowOrb colour="violet" size={500} top="20%" right="-15%" opacity={0.3} />
        <GlowOrb colour="cyan" size={400} bottom="-5%" left="30%" opacity={0.25} />

        {/* Dot grid */}
        <div className="absolute inset-0 bg-dot-grid opacity-100 pointer-events-none" />

        {/* Floating symbols */}
        {MATH_SYMBOLS.map((sym, i) => (
          <FloatingSymbol
            key={i}
            symbol={sym}
            style={{
              left: `${5 + (i * 9.5) % 90}%`,
              top: `${10 + (i * 17) % 75}%`,
              fontSize: `${1.5 + (i % 4) * 0.5}rem`,
            }}
          />
        ))}

        {/* Content */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="show"
          className="relative z-10 max-w-4xl mx-auto flex flex-col items-center gap-6"
        >
          {/* Tag pill */}
          <motion.div variants={fadeUp}>
            <Badge variant="indigo" dot>
              Now in Beta · 15 theorems and counting
            </Badge>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={fadeUp}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-[1.05] tracking-tight"
          >
            <span className="text-white">{APP_NAME}</span>
            <br />
            <span className="gradient-text">Explore Math.</span>
            <br />
            <span className="text-slate-300">Like Never Before.</span>
          </motion.h1>

          {/* Tagline */}
          <motion.p
            variants={fadeUp}
            className="text-lg sm:text-xl text-slate-400 max-w-2xl leading-relaxed"
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
              className="shadow-2xl shadow-indigo-500/30"
              onClick={() => { window.location.href = '/topics' }}
            >
              Start Learning
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => { window.location.href = '/dashboard' }}
            >
              View Dashboard
            </Button>
          </motion.div>

          {/* Social proof strip */}
          <motion.div
            variants={fadeUp}
            className="flex items-center gap-4 mt-4 text-sm text-slate-500"
          >
            <span>Free forever</span>
            <span className="w-1 h-1 rounded-full bg-slate-600" />
            <span>No sign-up required</span>
            <span className="w-1 h-1 rounded-full bg-slate-600" />
            <span>15 theorems</span>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
        >
          <div className="flex flex-col items-center gap-1 text-slate-600">
            <span className="text-xs tracking-widest uppercase">Scroll</span>
            <div className="w-px h-8 bg-gradient-to-b from-slate-600 to-transparent" />
          </div>
        </motion.div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          FEATURES
      ══════════════════════════════════════════════════════════════════════ */}
      <section
        id="features"
        className="relative py-28 px-4 overflow-hidden"
      >
        <GlowOrb colour="violet" size={600} top="-20%" right="-10%" opacity={0.2} />

        <div className="max-w-6xl mx-auto">
          {/* Section header */}
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-100px' }}
            className="text-center mb-16"
          >
            <motion.p variants={fadeUp} className="text-indigo-400 text-sm font-medium tracking-widest uppercase mb-3">
              Why MathVerse
            </motion.p>
            <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-bold text-white mb-4">
              Learning reimagined for{' '}
              <span className="gradient-text">mathematicians</span>
            </motion.h2>
            <motion.p variants={fadeUp} className="text-slate-400 text-lg max-w-2xl mx-auto">
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
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {features.map((f) => (
              <motion.div key={f.title} variants={cardReveal}>
                <Card hover className="h-full group">
                  <div
                    className={`
                      inline-flex items-center justify-center
                      w-11 h-11 rounded-xl mb-4
                      bg-${f.colour}-500/15 text-${f.colour}-400
                      group-hover:bg-${f.colour}-500/25
                      transition-colors duration-200
                    `}
                  >
                    <f.icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-white font-semibold text-base mb-2">
                    {f.title}
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{f.desc}</p>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          TOPICS PREVIEW
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="relative py-28 px-4 overflow-hidden">
        <GlowOrb colour="cyan" size={500} bottom="-10%" left="-5%" opacity={0.18} />

        <div className="max-w-6xl mx-auto">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-100px' }}
            className="text-center mb-14"
          >
            <motion.p variants={fadeUp} className="text-cyan-400 text-sm font-medium tracking-widest uppercase mb-3">
              The Library
            </motion.p>
            <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-bold text-white mb-4">
              Explore the <span className="gradient-text">Theorems</span>
            </motion.h2>
            <motion.p variants={fadeUp} className="text-slate-400 text-lg max-w-xl mx-auto">
              A curated collection of the most beautiful and important results in mathematics.
            </motion.p>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-60px' }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
          >
            {theorems.slice(0, 8).map((t, i) => (
              <motion.div key={t.id} variants={cardReveal}>
                <Link to="/topics" className="block h-full group">
                  <Card hover padding="md" className="h-full flex flex-col gap-3">
                    {/* Index */}
                    <div className="flex items-center justify-between">
                      <Badge variant={badgeColourMap[t.id] ?? 'indigo'}>
                        #{String(i + 1).padStart(2, '0')}
                      </Badge>
                      <RiArrowRightLine className="w-4 h-4 text-slate-600 group-hover:text-indigo-400 transition-colors" />
                    </div>
                    {/* Theorem name */}
                    <h3 className="text-white font-semibold text-sm leading-snug">
                      {t.theorem}
                    </h3>
                    {/* Core idea */}
                    <p className="text-slate-500 text-xs leading-relaxed line-clamp-3 flex-1">
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
            className="flex justify-center mt-10"
          >
            <Link to="/topics">
              <Button variant="outline" size="lg" rightIcon={<RiArrowRightLine className="w-4 h-4" />}>
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
            <Card variant="strong" padding="lg" className="relative text-center overflow-hidden">
              <GlowOrb colour="indigo" size={400} top="-50%" left="20%" opacity={0.4} animate={false} />
              <div className="relative z-10">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  Ready to become a{' '}
                  <span className="gradient-text">MathVerse Explorer?</span>
                </h2>
                <p className="text-slate-400 text-lg mb-8 max-w-xl mx-auto">
                  Start your journey through the most beautiful theorems in mathematics.
                  No textbooks. No lectures. Just pure discovery.
                </p>
                <div className="flex flex-wrap gap-4 justify-center">
                  <Link to="/topics">
                    <Button size="lg" variant="primary" rightIcon={<RiArrowRightLine className="w-5 h-5" />}>
                      Explore Topics
                    </Button>
                  </Link>
                  <Link to="/dashboard">
                    <Button size="lg" variant="ghost">
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
      <footer className="border-t border-white/[0.06] py-10 px-4">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center text-white text-xs font-bold font-mono">
              Σ
            </div>
            <span className="text-white font-semibold">{APP_NAME}</span>
          </div>
          <p className="text-slate-600 text-sm">
            Built with ❤️ for mathematics. {new Date().getFullYear()} MathVerse.
          </p>
          <div className="flex items-center gap-4">
            <Link to="/topics" className="text-slate-500 hover:text-white text-sm transition-colors">
              Topics
            </Link>
            <Link to="/dashboard" className="text-slate-500 hover:text-white text-sm transition-colors">
              Dashboard
            </Link>
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="text-slate-500 hover:text-white transition-colors"
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
