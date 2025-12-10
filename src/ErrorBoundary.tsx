/**
 * ErrorBoundary.tsx
 * Render the app with error boundary to catch and display errors.
 *
 * @author Paul Namalomba (https://paulnamalomba.github.io)
 */
// Import React components and types, error info etc
import { Component, ErrorInfo, ReactNode } from 'react'

// Define Props interfaces for the Error Boundary component
interface Props {
  
  children: ReactNode

}

// Define State interface for tracking error status and details
interface State {

  hasError: boolean
  error?: Error

}

// This TypeScript React component acts as an error boundary to catch and display errors in the UI.
class ErrorBoundary extends Component<Props, State> {

  public state: State = {

    hasError: false,

  }

  public static getDerivedStateFromError(error: Error): State {

    return { hasError: true, error }

  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {

    console.error('Uncaught error:', error, errorInfo)

  }

  public render() {

    if (this.state.hasError) {

      return (

        <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
          <h1 style={{ color: '#dc2626' }}>Something went wrong</h1>
          <details style={{ whiteSpace: 'pre-wrap', marginTop: '1rem' }}>
            <summary>Error details</summary>
            <p style={{ marginTop: '1rem', fontFamily: 'monospace', fontSize: '0.875rem' }}>
              {this.state.error?.toString()}
            </p>
            <p style={{ marginTop: '0.5rem', fontFamily: 'monospace', fontSize: '0.875rem' }}>
              {this.state.error?.stack}
            </p>
          </details>
          <button
            onClick={() => window.location.reload()}
            style={{
              marginTop: '1rem',
              padding: '0.5rem 1rem',
              backgroundColor: '#3b82f6',
              color: 'white',
              border: 'none',
              borderRadius: '0.375rem',
              cursor: 'pointer',
            }}
          >
            Reload page
          </button>
        </div>

      )

    }

    return this.props.children

  }

}

export default ErrorBoundary
