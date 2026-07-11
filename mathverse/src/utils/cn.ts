/**
 * utils/cn.ts
 *
 * Class name merging utility.
 * Combines clsx (conditional class names) with tailwind-merge
 * (deduplication of conflicting Tailwind utilities).
 *
 * Usage:
 *   cn('px-4 py-2', condition && 'bg-indigo-500', 'px-6')
 *   → 'py-2 bg-indigo-500 px-6'  (px-4 is replaced by px-6)
 */

import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs))
}
