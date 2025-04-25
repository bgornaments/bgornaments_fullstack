import { Component, ErrorInfo, ReactNode } from 'react';
import NotFoundPage from './NotFoundPage';// Import the 404 page from your previous request

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    // Update state so the next render shows the fallback UI
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log the error to an error reporting service (optional)
    console.error('Error caught by ErrorBoundary:', error, errorInfo);
    this.setState({ errorInfo });
  }

  render() {
    if (this.state.hasError) {
      const errorMessage = this.state.error?.message.toLowerCase() || '';

      // Handle 404 errors
      if (errorMessage.includes('404') || errorMessage.includes('not found')) {
        return <NotFoundPage />;
      }

      // Default error page for unhandled errors
      return (
        <div style={{ textAlign: 'center', padding: '50px', color: 'white', background: '#2C3E50' }}>
          <h1>Something Went Wrong</h1>
          <p>An unexpected error occurred. Please try again later.</p>
          <button
            onClick={() => (window.location.href = '/')}
            style={{
              padding: '10px 20px',
              background: 'rgba(26,188,156,0.7)',
              border: 'none',
              color: 'white',
              cursor: 'pointer',
            }}
          >
            Go to Home
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;