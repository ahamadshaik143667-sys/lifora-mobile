import { Stack } from 'expo-router';
import { useEffect, useState } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';

import { ErrorBoundary } from '@/components/ErrorBoundary';
import { initSentry } from '@/lib/sentry';
import { Toast } from '@/lib/toast';
import '@/styles/classname-shim';
import { ThemeProvider } from '@/styles/theme';

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        // Pre-load fonts, make any API calls you need to do here
        await Font.loadAsync({
          // Add any custom fonts here if needed
          // Example: 'CustomFont': require('./assets/fonts/CustomFont.ttf'),
        });

        // Initialize error tracking
        initSentry();
      } catch (e) {
        console.warn('Error loading resources:', e);
      } finally {
        // Tell the application to render
        setAppIsReady(true);
        await SplashScreen.hideAsync();
      }
    }

    prepare();
  }, []);

  if (!appIsReady) {
    return null;
  }

  return (
    <ErrorBoundary>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <ThemeProvider>
          <Toast />

          <Stack screenOptions={{ headerShown: false }}>
            {/* Auth Screens */}
            <Stack.Screen name="(auth)" />

            {/* Tab Screens */}
            <Stack.Screen name="(tabs)" />

            {/* Course Screens */}
            <Stack.Screen name="course" />
            <Stack.Screen name="courses" />

            {/* Settings */}
            <Stack.Screen name="settings" />

            {/* Admin */}
            <Stack.Screen name="admin" />
          </Stack>
        </ThemeProvider>
      </GestureHandlerRootView>
    </ErrorBoundary>
  );
}
