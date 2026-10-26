import React, { Component, ErrorInfo, ReactNode } from 'react';
import { RotateCw, Box } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.warn('Recovered from component error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }
      return (
        <div className="p-6 rounded-2xl bg-neutral-900 border border-neutral-800 text-center space-y-3">
          <div className="w-10 h-10 mx-auto rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400">
            <Box className="w-5 h-5" />
          </div>
          <h4 className="text-sm font-semibold text-white">Pratinjau Model 3D</h4>
          <p className="text-xs text-neutral-400 max-w-sm mx-auto">
            Mode visual standar diaktifkan untuk kenyamanan peramban Anda.
          </p>
        </div>
      );
    }

    return this.props.children;
  }
}
