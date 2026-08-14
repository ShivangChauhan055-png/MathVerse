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
  indigo: 'bg-indigo-50 text-indigo-600 border-indigo-200 font-display',
  cyan:   'bg-cyan-50   text-cyan-600   border-cyan-200 font-display',
  violet: 'bg-violet-50 text-violet-600 border-violet-200 font-display',
  green:  'bg-emerald-50 text-emerald-600 border-emerald-200 font-display',
  amber:  'bg-amber-50  text-amber-600  border-amber-200 font-display',
  red:    'bg-red-50    text-red-600    border-red-200 font-display',
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
