import React, { Component, ErrorInfo, ReactNode } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { logger } from '@/lib/logger';
import { useTheme } from '@/styles/theme';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    logger.error('ErrorBoundary caught an error', error, {
      componentStack: errorInfo.componentStack,
    });
  }

  handleReset = (): void => {
    this.setState({
      hasError: false,
      error: null,
    });
  };

  render(): ReactNode {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return <ErrorFallback error={this.state.error} onReset={this.handleReset} />;
    }

    return this.props.children;
  }
}

function ErrorFallback({ error, onReset }: { error: Error | null; onReset: () => void }) {
  const { colors } = useTheme();

  return (
    <View style={{ flex: 1, backgroundColor: colors.background, padding: 20 }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ fontSize: 24, fontWeight: 'bold', color: colors.destructive, marginBottom: 16 }}>
          Something went wrong
        </Text>
        <Text style={{ fontSize: 16, color: colors.foreground, textAlign: 'center', marginBottom: 24 }}>
          We're sorry for the inconvenience. Please try again or contact support if the problem persists.
        </Text>
        {error && __DEV__ && (
          <View style={{ backgroundColor: colors.card, padding: 16, borderRadius: 8, marginBottom: 24, width: '100%' }}>
            <Text style={{ fontSize: 12, color: colors.destructive, fontFamily: 'monospace' }}>
              {error.toString()}
            </Text>
          </View>
        )}
        <TouchableOpacity
          onPress={onReset}
          style={{
            backgroundColor: colors.primary,
            paddingHorizontal: 24,
            paddingVertical: 12,
            borderRadius: 8,
          }}
        >
          <Text style={{ color: colors.primaryForeground, fontSize: 16, fontWeight: '600' }}>
            Try Again
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

