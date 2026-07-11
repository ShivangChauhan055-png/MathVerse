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
    'bg-indigo-500 hover:bg-indigo-600 active:bg-indigo-700',
    'text-white',
    'shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/40',
    'border border-indigo-400/20',
  ].join(' '),

  secondary: [
    'bg-cyan-500 hover:bg-cyan-400 active:bg-cyan-600',
    'text-space-900',
    'shadow-lg shadow-cyan-500/20',
    'border border-cyan-400/20',
  ].join(' '),

  ghost: [
    'bg-transparent hover:bg-white/5 active:bg-white/10',
    'text-slate-300 hover:text-white',
    'border border-transparent',
  ].join(' '),

  outline: [
    'bg-transparent hover:bg-indigo-500/10 active:bg-indigo-500/20',
    'text-indigo-400 hover:text-indigo-300',
    'border border-indigo-500/40 hover:border-indigo-400/70',
  ].join(' '),

  danger: [
    'bg-red-600 hover:bg-red-500 active:bg-red-700',
    'text-white',
    'shadow-lg shadow-red-500/20',
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
