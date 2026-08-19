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
  indigo: 'bg-indigo-50 dark:bg-indigo-500/15 text-indigo-800 dark:text-indigo-300 border-indigo-300 dark:border-indigo-500/30 font-display font-semibold',
  cyan:   'bg-cyan-50   dark:bg-cyan-500/15   text-cyan-800   dark:text-cyan-300   border-cyan-300   dark:border-cyan-500/30   font-display font-semibold',
  violet: 'bg-violet-50 dark:bg-violet-500/15 text-violet-800 dark:text-violet-300 border-violet-300 dark:border-violet-500/30 font-display font-semibold',
  green:  'bg-emerald-50 dark:bg-emerald-500/15 text-emerald-800 dark:text-emerald-300 border-emerald-300 dark:border-emerald-500/30 font-display font-semibold',
  amber:  'bg-amber-50  dark:bg-amber-500/15  text-amber-900  dark:text-amber-300  border-amber-300  dark:border-amber-500/30  font-display font-semibold',
  red:    'bg-red-50    dark:bg-red-500/15    text-red-800    dark:text-red-300    border-red-300    dark:border-red-500/30    font-display font-semibold',
}

const dotColour: Record<BadgeVariant, string> = {
  indigo: 'bg-indigo-500',
  cyan:   'bg-cyan-500',
  violet: 'bg-violet-500',
  green:  'bg-emerald-500',
  amber:  'bg-amber-500',
  red:    'bg-red-500',
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
