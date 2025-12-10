/**
 * main.tsx
 * the main entry point of the React application.
 *
 * @author Paul Namalomba (https://paulnamalomba.github.io)
 */
// Import a few things from React and from our other App TS modules
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import ErrorBoundary from './ErrorBoundary.tsx'

// Render the App inside an Error Boundary and Strict Mode
createRoot(document.getElementById('root')!).render(

  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>,

)
