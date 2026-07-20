import React from "react";

type Props = {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  fallbackRender?: (props: {
    error: unknown;
    resetErrorBoundary: () => void;
  }) => React.ReactNode;
  onReset?: () => void;
};

type State = {
  hasError: boolean;
  error: unknown;
};

class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: unknown) {
    return { hasError: true, error };
  }

  componentDidCatch(error: unknown, info: unknown) {
    console.error(error, info);
  }

  resetErrorBoundary = () => {
    this.props.onReset?.();
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallbackRender) {
        return this.props.fallbackRender({
          error: this.state.error,
          resetErrorBoundary: this.resetErrorBoundary,
        });
      }

      return this.props.fallback ?? null;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
