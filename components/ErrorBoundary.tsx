import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Button } from './Button';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: undefined });
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-demmy-cream flex items-center justify-center p-6">
          <div className="max-w-2xl w-full bg-white rounded-[3rem] p-12 md:p-16 text-center shadow-2xl">
            <div className="text-6xl mb-8">⚠️</div>
            <h1 className="font-serif text-4xl md:text-5xl text-demmy-green mb-6">
              Oops! Something went wrong
            </h1>
            <p className="text-slate-600 text-lg mb-8 leading-relaxed">
              We encountered an unexpected error. Don't worry, your data is safe. 
              Please try refreshing the page.
            </p>
            {this.state.error && (
              <details className="mb-8 text-left bg-red-50 p-6 rounded-2xl">
                <summary className="cursor-pointer font-bold text-red-700 mb-2">
                  Technical Details
                </summary>
                <pre className="text-xs text-red-600 overflow-auto">
                  {this.state.error.toString()}
                </pre>
              </details>
            )}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                variant="primary" 
                className="px-8 py-4 rounded-2xl"
                onClick={this.handleReset}
              >
                Refresh Page
              </Button>
              <Button 
                variant="outline" 
                className="px-8 py-4 rounded-2xl"
                onClick={() => window.location.href = '/'}
              >
                Go Home
              </Button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
