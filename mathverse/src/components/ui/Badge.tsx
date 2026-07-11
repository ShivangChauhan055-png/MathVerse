/**
 * components/ui/Badge.tsx
 *
 * Coloured pill badge for categories, tags, difficulty levels, etc.
 */

import React from 'react'
import { cn } from '@/utils/cn'
import type { BadgeVariant } from '@/types'

interface BadgeProps {
  variant?: BadgeVariant
  children: React.ReactNode
  className?: string
  /** Adds a small dot indicator before the label */
  dot?: boolean
}

const variantClasses: Record<BadgeVariant, string> = {
  indigo: 'bg-indigo-500/15 text-indigo-300 border-indigo-500/30',
  cyan:   'bg-cyan-500/15   text-cyan-300   border-cyan-500/30',
  violet: 'bg-violet-500/15 text-violet-300 border-violet-500/30',
  green:  'bg-emerald-500/15 text-emerald-300 border-emerald-500/30',
  amber:  'bg-amber-500/15  text-amber-300  border-amber-500/30',
  red:    'bg-red-500/15    text-red-300    border-red-500/30',
}

const dotColour: Record<BadgeVariant, string> = {
  indigo: 'bg-indigo-400',
  cyan:   'bg-cyan-400',
  violet: 'bg-violet-400',
  green:  'bg-emerald-400',
  amber:  'bg-amber-400',
  red:    'bg-red-400',
}

export function Badge({
  variant = 'indigo',
  children,
  className,
  dot = false,
}: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5',
        'px-2.5 py-0.5 rounded-full',
        'text-xs font-medium',
        'border',
        variantClasses[variant],
        className,
      )}
    >
      {dot && (
        <span
          className={cn('w-1.5 h-1.5 rounded-full flex-shrink-0', dotColour[variant])}
        />
      )}
      {children}
    </span>
  )
}
