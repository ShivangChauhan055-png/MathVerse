/**
 * components/ui/Button.tsx
 *
 * Reusable button primitive.
 *
 * Variants:
 *  - primary  : solid indigo fill — main CTA
 *  - secondary: solid cyan fill
 *  - ghost    : transparent, text only
 *  - outline  : bordered, no fill
 *  - danger   : red destructive action
 *
 * Sizes: sm | md | lg
 */

import React from 'react'
import { cn } from '@/utils/cn'
import type { ButtonVariant, ButtonSize } from '@/types'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  /** Show loading spinner and disable interaction */
  loading?: boolean
  /** Render as full-width block */
  fullWidth?: boolean
  /** Left slot for icon */
  leftIcon?: React.ReactNode
  /** Right slot for icon */
  rightIcon?: React.ReactNode
}

const variantClasses: Record<ButtonVariant, string> = {
  primary: [
    'bg-accent hover:bg-teal-600 active:bg-teal-700',
    'text-white font-display tracking-wide',
    'shadow-sm shadow-accent-glow',
    'border border-transparent',
  ].join(' '),

  secondary: [
    'bg-secondary hover:bg-amber-600 active:bg-amber-700',
    'text-white font-display tracking-wide',
    'shadow-sm',
    'border border-transparent',
  ].join(' '),

  ghost: [
    'bg-transparent hover:bg-ink-900/5 active:bg-ink-900/10',
    'text-ink-700 hover:text-ink-900 font-display tracking-wide',
    'border border-transparent',
  ].join(' '),

  outline: [
    'bg-surface hover:bg-ink-900/5 active:bg-ink-900/10',
    'text-ink-800 hover:text-ink-900 font-display tracking-wide',
    'border border-[color:var(--color-border)] shadow-sm',
  ].join(' '),

  danger: [
    'bg-red-600 hover:bg-red-500 active:bg-red-700',
    'text-white font-display tracking-wide',
    'shadow-sm shadow-red-500/20',
    'border border-red-400/20',
  ].join(' '),
}

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'h-8 px-3 text-xs gap-1.5 rounded-lg',
  md: 'h-10 px-5 text-sm gap-2 rounded-xl',
  lg: 'h-12 px-7 text-base gap-2.5 rounded-2xl',
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      loading = false,
      fullWidth = false,
      leftIcon,
      rightIcon,
      className,
      disabled,
      children,
      ...rest
    },
    ref,
  ) => {
    const isDisabled = disabled ?? loading

    return (
      <button
        ref={ref}
        disabled={isDisabled}
        className={cn(
          // Base
          'inline-flex items-center justify-center font-medium',
          'transition-all duration-150 ease-out',
          'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500',
          'select-none whitespace-nowrap',
          // Disabled
          'disabled:opacity-50 disabled:pointer-events-none',
          // Variants & sizes
          variantClasses[variant],
          sizeClasses[size],
          // Full width
          fullWidth && 'w-full',
          className,
        )}
        {...rest}
      >
        {loading ? (
          <span className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full" />
        ) : (
          leftIcon
        )}
        {children}
        {!loading && rightIcon}
      </button>
    )
  },
)

Button.displayName = 'Button'
