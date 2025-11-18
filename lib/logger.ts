/**
 * Production-ready logging utility
 * Replaces console.log/error with structured logging
 * In production, logs are sent to analytics/monitoring services
 */

type LogLevel = 'debug' | 'info' | 'warn' | 'error';

interface LogEntry {
  level: LogLevel;
  message: string;
  timestamp: string;
  context?: Record<string, unknown>;
  error?: Error;
}

class Logger {
  private isDevelopment: boolean;

  constructor() {
    this.isDevelopment = __DEV__ || process.env.NODE_ENV === 'development';
  }

  private formatMessage(
    level: LogLevel,
    message: string,
    context?: Record<string, unknown>,
    error?: Error
  ): LogEntry {
    return {
      level,
      message,
      timestamp: new Date().toISOString(),
      context,
      error: error
        ? ({
            name: error.name,
            message: error.message,
            stack: error.stack,
          } as Error)
        : undefined,
    };
  }

  private log(
    level: LogLevel,
    message: string,
    context?: Record<string, unknown>,
    error?: Error
  ): void {
    const entry = this.formatMessage(level, message, context, error);

    if (this.isDevelopment) {
      // In development, use console for immediate feedback
      const consoleMethod =
        level === 'error'
          ? console.error
          : level === 'warn'
            ? console.warn
            : level === 'info'
              ? console.info
              : console.log;

      if (error) {
        consoleMethod(`[${level.toUpperCase()}] ${message}`, { context, error });
      } else if (context) {
        consoleMethod(`[${level.toUpperCase()}] ${message}`, context);
      } else {
        consoleMethod(`[${level.toUpperCase()}] ${message}`);
      }
    } else {
      // In production, send to monitoring service
      try {
        const { captureException, captureMessage } = require('./sentry');
        if (error) {
          captureException(error, context);
        } else {
          captureMessage(
            message,
            level === 'error' ? 'error' : level === 'warn' ? 'warning' : 'info'
          );
        }
      } catch {
        // Sentry not configured, silently fail
      }
    }
  }

  debug(message: string, context?: Record<string, unknown>): void {
    if (this.isDevelopment) {
      this.log('debug', message, context);
    }
  }

  info(message: string, context?: Record<string, unknown>): void {
    this.log('info', message, context);
  }

  warn(message: string, context?: Record<string, unknown>): void {
    this.log('warn', message, context);
  }

  error(message: string, error?: Error, context?: Record<string, unknown>): void {
    this.log('error', message, context, error);
  }
}

export const logger = new Logger();
