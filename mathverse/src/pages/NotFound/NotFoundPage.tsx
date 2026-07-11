/**
 * pages/NotFound/NotFoundPage.tsx
 *
 * 404 error page.
 *
 * Design: full-screen dark page with large animated "404",
 * floating math symbols, and navigation buttons back home.
 */

import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { RiHomeLine, RiArrowLeftLine } from 'react-icons/ri'
import { Button } from '@/components/ui/Button'
import { GlowOrb } from '@/components/ui/GlowOrb'

const MATH_SYMBOLS = ['∑', 'π', '∞', '√', 'Δ', 'λ', '∂', '∫', 'ℕ', 'Φ']

export function NotFoundPage() {
  return (
    <div className="min-h-dvh bg-space-900 flex items-center justify-center px-4 relative overflow-hidden">
      {/* Background glows */}
      <GlowOrb colour="indigo" size={600} top="-10%" left="-15%" opacity={0.3} />
      <GlowOrb colour="violet" size={400} bottom="-5%" right="-10%" opacity={0.25} />

      {/* Floating math symbols */}
      {MATH_SYMBOLS.map((sym, i) => (
        <motion.span
          key={i}
          className="absolute text-indigo-400/15 font-mono font-bold select-none pointer-events-none"
          style={{
            left: `${5 + (i * 9.5) % 90}%`,
            top: `${10 + (i * 17) % 80}%`,
            fontSize: `${1.2 + (i % 4) * 0.6}rem`,
          }}
          animate={{ y: [0, -15, 0], opacity: [0.1, 0.25, 0.1] }}
          transition={{
            duration: 3 + (i % 3),
            repeat: Infinity,
            ease: 'easeInOut',
            delay: i * 0.3,
          }}
        >
          {sym}
        </motion.span>
      ))}

      {/* Content */}
      <div className="relative z-10 text-center max-w-lg mx-auto">
        {/* Glitchy 404 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-6"
        >
          <h1 className="text-[10rem] md:text-[14rem] font-bold leading-none select-none">
            <span className="gradient-text">4</span>
            <span className="text-white/10">0</span>
            <span className="gradient-text">4</span>
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="space-y-4 mb-10"
        >
          <h2 className="text-2xl font-bold text-white">This page doesn't exist</h2>
          <p className="text-slate-400 leading-relaxed">
            Even in an infinite universe, some things can't be found.
            The page you're looking for has wandered off the number line.
          </p>
          <p className="text-slate-600 text-sm font-mono">
            Error: 404 — Page not found in ℝ
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.5 }}
          className="flex flex-wrap gap-4 justify-center"
        >
          <Link to="/">
            <Button
              variant="primary"
              size="lg"
              leftIcon={<RiHomeLine className="w-5 h-5" />}
            >
              Back to Home
            </Button>
          </Link>
          <Button
            variant="ghost"
            size="lg"
            leftIcon={<RiArrowLeftLine className="w-5 h-5" />}
            onClick={() => window.history.back()}
          >
            Go Back
          </Button>
        </motion.div>
      </div>
    </div>
  )
}
