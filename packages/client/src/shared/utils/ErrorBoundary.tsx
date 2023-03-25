import React, { ReactNode } from 'react';
import { Alert } from 'antd';

type ErrorBoundaryState = {
  hasError: boolean;
};

type ErrorBoundaryProps = {
  children: ReactNode;
};

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error(`error ${error}`);
    console.error(`errorInfo: ${JSON.stringify(errorInfo)}`);
    console.error(`componentStack: ${errorInfo.componentStack}`);
  }

  render() {
    const { hasError } = this.state;
    const { children } = this.props;
    if (hasError) {
      return (
        <Alert
          message="Error"
          description="App crashed"
          type="error"
          showIcon
          closable
      />
      );
    }
    return children;
  }
}

export default ErrorBoundary;
