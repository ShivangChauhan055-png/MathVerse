import { motion, useReducedMotion } from 'framer-motion'
import { cn } from '@/utils/cn'

interface MathIllustrationProps {
  id?: string
  variant?: 'hero' | 'card' | 'detail'
  className?: string
}

const colors = {
  ink: '#14202f',
  muted: '#556372',
  accent: '#2e988e',
  accent2: '#c88b2f',
  accent3: '#6d5ab5',
  paper: '#fcfaf4',
}

function renderIllustration(id?: string) {
  const common = <rect x="18" y="18" width="284" height="184" rx="22" fill={colors.paper} stroke="rgba(20,32,47,0.08)" strokeWidth="1" />

  switch (id) {
    case 'fermats-little':
      return (
        <svg viewBox="0 0 320 220" className="w-full h-full" role="img" aria-label="Modular number pattern illustration">
          {common}
          <rect x="44" y="42" width="232" height="136" rx="16" fill="none" stroke={colors.ink} strokeOpacity="0.12" />
          <circle cx="110" cy="110" r="44" fill="none" stroke={colors.accent} strokeWidth="2" />
          <circle cx="210" cy="110" r="44" fill="none" stroke={colors.accent2} strokeWidth="2" />
          <path d="M110 66 L210 66" stroke={colors.ink} strokeOpacity="0.3" strokeDasharray="3 3" />
          <path d="M110 154 L210 154" stroke={colors.ink} strokeOpacity="0.3" strokeDasharray="3 3" />
          <circle cx="110" cy="110" r="6" fill={colors.accent} />
          <circle cx="210" cy="110" r="6" fill={colors.accent2} />
          <circle cx="160" cy="110" r="5" fill={colors.accent3} />
          <path d="M134 84 C150 72, 170 72, 186 84" stroke={colors.ink} strokeOpacity="0.35" fill="none" />
          <path d="M134 136 C150 148, 170 148, 186 136" stroke={colors.ink} strokeOpacity="0.35" fill="none" />
          <text x="160" y="190" textAnchor="middle" fontSize="16" fill={colors.muted} fontFamily="serif">modular harmony</text>
        </svg>
      )
    case 'handshake':
      return (
        <svg viewBox="0 0 320 220" className="w-full h-full" role="img" aria-label="Handshake lemma graph illustration">
          {common}
          <circle cx="92" cy="86" r="12" fill={colors.accent} />
          <circle cx="228" cy="86" r="12" fill={colors.accent} />
          <circle cx="160" cy="140" r="12" fill={colors.accent2} />
          <circle cx="160" cy="64" r="12" fill={colors.accent3} />
          <path d="M92 86 L160 64" stroke={colors.ink} strokeOpacity="0.35" />
          <path d="M228 86 L160 64" stroke={colors.ink} strokeOpacity="0.35" />
          <path d="M92 86 L160 140" stroke={colors.ink} strokeOpacity="0.35" />
          <path d="M228 86 L160 140" stroke={colors.ink} strokeOpacity="0.35" />
          <path d="M160 64 L160 140" stroke={colors.ink} strokeOpacity="0.28" strokeDasharray="3 3" />
          <text x="160" y="190" textAnchor="middle" fontSize="16" fill={colors.muted} fontFamily="serif">edge count</text>
        </svg>
      )
    case 'chinese-remainder':
      return (
        <svg viewBox="0 0 320 220" className="w-full h-full" role="img" aria-label="Chinese remainder circles illustration">
          {common}
          <circle cx="112" cy="110" r="48" fill="none" stroke={colors.accent} strokeWidth="2" />
          <circle cx="208" cy="110" r="48" fill="none" stroke={colors.accent2} strokeWidth="2" />
          <circle cx="160" cy="110" r="10" fill={colors.accent3} />
          <path d="M112 62 C150 72, 170 78, 208 62" stroke={colors.ink} strokeOpacity="0.24" fill="none" />
          <path d="M112 158 C150 148, 170 142, 208 158" stroke={colors.ink} strokeOpacity="0.24" fill="none" />
          <text x="160" y="190" textAnchor="middle" fontSize="16" fill={colors.muted} fontFamily="serif">shared residue</text>
        </svg>
      )
    case 'euclidean-algorithm':
      return (
        <svg viewBox="0 0 320 220" className="w-full h-full" role="img" aria-label="Euclidean algorithm rectangle illustration">
          {common}
          <rect x="74" y="62" width="172" height="106" fill="none" stroke={colors.ink} strokeOpacity="0.24" strokeWidth="2" />
          <rect x="74" y="62" width="92" height="48" fill={colors.accent} fillOpacity="0.18" />
          <rect x="166" y="62" width="80" height="106" fill={colors.accent2} fillOpacity="0.18" />
          <rect x="74" y="110" width="92" height="58" fill={colors.accent3} fillOpacity="0.14" />
          <path d="M166 62 L166 168" stroke={colors.ink} strokeOpacity="0.26" />
          <path d="M74 110 L246 110" stroke={colors.ink} strokeOpacity="0.26" />
          <text x="160" y="190" textAnchor="middle" fontSize="16" fill={colors.muted} fontFamily="serif">division steps</text>
        </svg>
      )
    case 'binary-exponentiation':
      return (
        <svg viewBox="0 0 320 220" className="w-full h-full" role="img" aria-label="Binary exponentiation tree illustration">
          {common}
          <circle cx="160" cy="72" r="12" fill={colors.accent} />
          <circle cx="108" cy="122" r="10" fill={colors.accent2} />
          <circle cx="212" cy="122" r="10" fill={colors.accent3} />
          <circle cx="82" cy="168" r="8" fill={colors.ink} fillOpacity="0.4" />
          <circle cx="132" cy="168" r="8" fill={colors.ink} fillOpacity="0.4" />
          <circle cx="188" cy="168" r="8" fill={colors.ink} fillOpacity="0.4" />
          <circle cx="238" cy="168" r="8" fill={colors.ink} fillOpacity="0.4" />
          <path d="M160 72 L108 122" stroke={colors.ink} strokeOpacity="0.3" />
          <path d="M160 72 L212 122" stroke={colors.ink} strokeOpacity="0.3" />
          <path d="M108 122 L82 168" stroke={colors.ink} strokeOpacity="0.3" />
          <path d="M108 122 L132 168" stroke={colors.ink} strokeOpacity="0.3" />
          <path d="M212 122 L188 168" stroke={colors.ink} strokeOpacity="0.3" />
          <path d="M212 122 L238 168" stroke={colors.ink} strokeOpacity="0.3" />
          <text x="160" y="190" textAnchor="middle" fontSize="16" fill={colors.muted} fontFamily="serif">binary branching</text>
        </svg>
      )
    case 'workspace':
      return (
        <svg viewBox="0 0 320 220" className="w-full h-full" role="img" aria-label="Mathematical workspace illustration">
          {common}
          <path d="M66 160 C100 100, 150 96, 190 110 C220 122, 246 146, 256 168" fill="none" stroke={colors.accent} strokeWidth="2" />
          <path d="M80 132 C120 90, 178 90, 236 132" fill="none" stroke={colors.accent2} strokeWidth="2" strokeDasharray="5 4" />
          <circle cx="110" cy="92" r="6" fill={colors.accent3} />
          <circle cx="196" cy="118" r="6" fill={colors.accent} />
          <circle cx="234" cy="144" r="6" fill={colors.accent2} />
          <path d="M60 46 H260" stroke={colors.ink} strokeOpacity="0.18" />
          <path d="M58 46 V176" stroke={colors.ink} strokeOpacity="0.18" />
          <text x="160" y="190" textAnchor="middle" fontSize="16" fill={colors.muted} fontFamily="serif">workspace</text>
        </svg>
      )
    default:
      return (
        <svg viewBox="0 0 320 220" className="w-full h-full" role="img" aria-label="Mathematical playground illustration">
          {common}
          <path d="M44 152 C88 118, 116 122, 144 142 C172 160, 214 158, 276 92" fill="none" stroke={colors.accent} strokeWidth="2.4" />
          <path d="M52 110 C96 84, 126 82, 162 100 C198 118, 236 118, 268 78" fill="none" stroke={colors.accent2} strokeWidth="2.4" strokeDasharray="5 4" />
          <circle cx="92" cy="116" r="6" fill={colors.accent3} />
          <circle cx="144" cy="142" r="6" fill={colors.accent} />
          <circle cx="214" cy="118" r="6" fill={colors.accent2} />
          <line x1="60" y1="52" x2="260" y2="52" stroke={colors.ink} strokeOpacity="0.12" />
          <line x1="60" y1="52" x2="60" y2="164" stroke={colors.ink} strokeOpacity="0.12" />
          <text x="160" y="190" textAnchor="middle" fontSize="16" fill={colors.muted} fontFamily="serif">interactive exploration</text>
        </svg>
      )
  }
}

export function MathIllustration({ id, variant = 'card', className }: MathIllustrationProps) {
  const prefersReducedMotion = useReducedMotion()
  const content = renderIllustration(id)

  const wrapperClassName = cn(
    'relative overflow-hidden rounded-[24px] border border-[color:var(--color-border)] bg-[color:var(--color-surface)] p-3 shadow-[0_10px_24px_rgba(20,32,47,0.04)]',
    variant === 'hero' ? 'w-full aspect-[4/3] min-h-[280px]' : 'w-full aspect-[4/3]',
    className,
  )

  if (prefersReducedMotion) {
    return <div className={wrapperClassName}>{content}</div>
  }

  return (
    <motion.div
      className={wrapperClassName}
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
      {content}
    </motion.div>
  )
}
