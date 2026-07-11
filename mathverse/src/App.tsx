/**
 * App.tsx
 *
 * Root application component.
 * Provides the React Router context and mounts the router.
 *
 * Kept intentionally thin — all routing logic lives in AppRouter.tsx.
 */

import { BrowserRouter } from 'react-router-dom'
import { AppRouter } from '@/routes/AppRouter'

export function App() {
  return (
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  )
}
