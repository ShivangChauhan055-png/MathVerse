/**
 * components/ui/Card.tsx
 *
 * Glassmorphism card container used throughout the app.
 *
 * Variants:
 *  - default : subtle glass with thin border
 *  - strong  : heavier glass (for overlays, modals)
 *  - flat    : no blur (for nested content within a glass surface)
 */

import React from 'react'
import { cn } from '@/utils/cn'

type CardVariant = 'default' | 'strong' | 'flat'

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant
  hover?: boolean
  padding?: 'none' | 'sm' | 'md' | 'lg'
}

const variantClasses: Record<CardVariant, string> = {
  default: 'glass rounded-2xl',
  strong:  'glass-strong rounded-2xl',
  flat:    'bg-white/[0.04] border border-white/[0.08] rounded-2xl',
}

const paddingClasses = {
  none: '',
  sm:   'p-4',
  md:   'p-6',
  lg:   'p-8',
}

export function Card({
  variant = 'default',
  hover = false,
  padding = 'md',
  className,
  children,
  ...rest
}: CardProps) {
  return (
    <div
      className={cn(
        variantClasses[variant],
        paddingClasses[padding],
        hover && 'card-hover cursor-pointer',
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  )
}

// ── Subcomponents for semantic structure ──────────────────────────────────────

interface CardSectionProps {
  className?: string
  children: React.ReactNode
}

Card.Header = function CardHeader({ className, children }: CardSectionProps) {
  return (
    <div className={cn('mb-4', className)}>{children}</div>
  )
}

Card.Body = function CardBody({ className, children }: CardSectionProps) {
  return (
    <div className={cn('', className)}>{children}</div>
  )
}

Card.Footer = function CardFooter({ className, children }: CardSectionProps) {
  return (
    <div className={cn('mt-4 pt-4 border-t border-white/[0.06]', className)}>
      {children}
    </div>
  )
}
