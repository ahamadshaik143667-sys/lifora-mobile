import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_KEYS } from '@/lib/constants';
import { useColorScheme } from 'react-native';

/* -------------------------------------------------------------------------- */
/*                               THEME TYPES                                  */
/* -------------------------------------------------------------------------- */

type Theme = 'light' | 'dark' | 'system';

interface ThemeContextType {
  theme: Theme;
  isDark: boolean;
  colors: typeof lightColors;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

/* -------------------------------------------------------------------------- */
/*                               COLOR PALETTES                               */
/* -------------------------------------------------------------------------- */

const lightColors = {
  background: '#ffffff',
  foreground: '#09090b',

  card: '#ffffff',
  cardForeground: '#09090b',

  primary: '#1f1f1f',
  primaryForeground: '#fafafa',

  secondary: '#f4f4f5',
  secondaryForeground: '#1f1f1f',

  muted: '#f4f4f5',
  mutedForeground: '#71717a',

  accent: '#e5e7eb',
  accentForeground: '#1f1f1f',

  destructive: '#ef4444',
  destructiveForeground: '#fafafa',

  border: '#e4e4e7',
  input: '#e4e4e7',

  ring: '#18181b',
};

const darkColors = {
  background: '#0b0b0d',
  foreground: '#fafafa',

  card: '#18181b',
  cardForeground: '#fafafa',

  primary: '#fafafa',
  primaryForeground: '#18181b',

  secondary: '#27272a',
  secondaryForeground: '#fafafa',

  muted: '#27272a',
  mutedForeground: '#a1a1aa',

  accent: '#3f3f46',
  accentForeground: '#fafafa',

  destructive: '#7f1d1d',
  destructiveForeground: '#fafafa',

  border: '#3f3f46',
  input: '#27272a',

  ring: '#d4d4d8',
};

/* -------------------------------------------------------------------------- */
/*                           EXPORT FOR NATIVEWIND                            */
/* -------------------------------------------------------------------------- */

export const themeColors = {
  light: lightColors,
  dark: darkColors,
};

/* -------------------------------------------------------------------------- */
/*                           CREATE THEME CONTEXT                             */
/* -------------------------------------------------------------------------- */

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

/* -------------------------------------------------------------------------- */
/*                             THEME PROVIDER                                 */
/* -------------------------------------------------------------------------- */

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const systemScheme = useColorScheme();
  const [theme, setThemeState] = useState<Theme>('system');

  // Load saved theme
  useEffect(() => {
    const loadTheme = async () => {
      const saved = await AsyncStorage.getItem(STORAGE_KEYS.THEME);
      if (saved === 'light' || saved === 'dark' || saved === 'system') {
        setThemeState(saved);
      }
    };
    loadTheme();
  }, []);

  const setTheme = async (next: Theme) => {
    setThemeState(next);
    await AsyncStorage.setItem(STORAGE_KEYS.THEME, next);
  };

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const isDark = theme === 'dark' || (theme === 'system' && systemScheme === 'dark');

  const colors = isDark ? darkColors : lightColors;

  return (
    <ThemeContext.Provider value={{ theme, isDark, colors, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

/* -------------------------------------------------------------------------- */
/*                           CONSUMER HOOK                                    */
/* -------------------------------------------------------------------------- */

export const useTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used inside ThemeProvider');
  return ctx;
};

/* -------------------------------------------------------------------------- */
/*                     BONUS: STYLED SHORTCUTS FOR RN UI                      */
/* -------------------------------------------------------------------------- */

export const useAppColors = () => {
  const { colors } = useTheme();
  return {
    bg: { backgroundColor: colors.background },
    card: { backgroundColor: colors.card },
    text: { color: colors.foreground },
    border: { borderColor: colors.border },
    muted: { color: colors.mutedForeground },
    primary: { color: colors.primary },
  };
};
