import React, { ReactNode, Component } from 'react';
import { Alert } from 'antd';

type TErrorBoundaryState = {
  hasError: boolean;
};

type TErrorBoundaryProps = {
  children: ReactNode;
};

export class ErrorBoundary extends Component<TErrorBoundaryProps, TErrorBoundaryState> {
  constructor(props: TErrorBoundaryProps) {
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
