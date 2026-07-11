/**
 * vite-env.d.ts
 *
 * Vite client type declarations.
 * - Provides import.meta.env types
 * - Declares CSS/asset module imports so TypeScript doesn't error on them
 */

/// <reference types="vite/client" />

// Allow importing CSS files as side-effects
declare module '*.css' {
  const stylesheet: string
  export default stylesheet
}

// Allow importing SVG as React components (via vite-plugin-svgr if added later)
declare module '*.svg?react' {
  import type React from 'react'
  const SvgComponent: React.FC<React.SVGProps<SVGSVGElement>>
  export default SvgComponent
}

// Allow importing SVG as URLs
declare module '*.svg' {
  const src: string
  export default src
}
