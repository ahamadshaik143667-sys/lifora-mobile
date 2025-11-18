/**
 * Sentry error tracking integration
 * Configure your DSN in .env file: EXPO_PUBLIC_SENTRY_DSN
 * Note: @sentry/react-native is optional - install it if you want error tracking
 */

import Constants from 'expo-constants';

const SENTRY_DSN = typeof process !== 'undefined' ? process.env?.EXPO_PUBLIC_SENTRY_DSN : undefined;
const ENABLE_CRASH_REPORTING =
  typeof process !== 'undefined'
    ? process.env?.EXPO_PUBLIC_ENABLE_CRASH_REPORTING === 'true'
    : false;

let Sentry: any = null;

// Try to import Sentry, but don't fail if it's not installed
try {
  Sentry = require('@sentry/react-native');
} catch {
  // Sentry not installed, will gracefully degrade
}

export const initSentry = () => {
  if (!Sentry || !SENTRY_DSN || !ENABLE_CRASH_REPORTING) {
    return;
  }

  Sentry.init({
    dsn: SENTRY_DSN,
    enableInExpoDevelopment: false,
    debug: __DEV__,
    environment: Constants.expoConfig?.extra?.eas?.projectId ? 'production' : 'development',
    tracesSampleRate: 1.0,
    enableAutoSessionTracking: true,
    sessionTrackingIntervalMillis: 30000,
    attachStacktrace: true,
    beforeSend(event) {
      // Filter out sensitive data
      if (event.request) {
        delete event.request.cookies;
        delete event.request.headers?.Authorization;
      }
      return event;
    },
  });
};

export const captureException = (error: Error, context?: Record<string, unknown>) => {
  if (!Sentry || !ENABLE_CRASH_REPORTING) return;

  Sentry.captureException(error, {
    extra: context,
  });
};

export const captureMessage = (
  message: string,
  level: 'debug' | 'info' | 'warning' | 'error' | 'fatal' = 'info'
) => {
  if (!Sentry || !ENABLE_CRASH_REPORTING) return;

  Sentry.captureMessage(message, level);
};

export const setUser = (user: { id: string; email?: string; username?: string }) => {
  if (!Sentry || !ENABLE_CRASH_REPORTING) return;

  Sentry.setUser(user);
};

export const clearUser = () => {
  if (!Sentry || !ENABLE_CRASH_REPORTING) return;

  Sentry.setUser(null);
};
