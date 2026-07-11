/**
 * components/ui/GlowOrb.tsx
 *
 * Decorative animated gradient orb used as a background element.
 * Positioned absolutely — parent must be position: relative.
 *
 * Usage:
 *   <div className="relative overflow-hidden">
 *     <GlowOrb colour="indigo" size={600} top="-20%" left="-10%" />
 *     ...content
 *   </div>
 */

import { cn } from '@/utils/cn'

type OrbColour = 'indigo' | 'cyan' | 'violet' | 'pink'

interface GlowOrbProps {
  colour?: OrbColour
  size?: number
  top?: string
  left?: string
  right?: string
  bottom?: string
  opacity?: number
  className?: string
  /** Slow floating animation */
  animate?: boolean
}

const colourMap: Record<OrbColour, string> = {
  indigo: 'from-indigo-600/40 via-indigo-500/20 to-transparent',
  cyan:   'from-cyan-500/40   via-cyan-400/20   to-transparent',
  violet: 'from-violet-600/40 via-violet-500/20 to-transparent',
  pink:   'from-pink-600/40   via-pink-500/20   to-transparent',
}

export function GlowOrb({
  colour = 'indigo',
  size = 500,
  top,
  left,
  right,
  bottom,
  opacity = 0.6,
  className,
  animate = true,
}: GlowOrbProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        'absolute rounded-full pointer-events-none',
        'bg-radial-[at_50%_50%] bg-gradient-radial',
        `bg-gradient-to-r ${colourMap[colour]}`,
        animate && 'animate-pulse-slow',
        className,
      )}
      style={{
        width: size,
        height: size,
        top,
        left,
        right,
        bottom,
        opacity,
        filter: 'blur(80px)',
      }}
    />
  )
}
