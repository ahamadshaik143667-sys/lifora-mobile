// FILE: styles/tw.ts
import { ImageStyle, StyleProp, StyleSheet, TextStyle, ViewStyle } from 'react-native';
import { themeColors } from './theme';

/* -------------------------
   Types & shared helpers
   ------------------------- */

export const twColors = {
  light: themeColors.light,
  dark: themeColors.dark,
};

type NamedStyle = ViewStyle | TextStyle | ImageStyle;

/* -------------------------
   Spacing / size scales
   (copied from your file)
   ------------------------- */

const spacingScale: Record<string, number> = {
  '0': 0,
  '0.5': 2,
  '1': 4,
  '1.5': 6,
  '2': 8,
  '2.5': 10,
  '3': 12,
  '3.5': 14,
  '4': 16,
  '5': 20,
  '6': 24,
  '7': 28,
  '8': 32,
  '10': 40,
  '12': 48,
  '14': 56,
  '16': 64,
  '20': 80,
  '24': 96,
  '32': 128,
  '48': 192,
  '64': 256,
};

const sizeScale: Record<string, number> = {
  '1': 4,
  '2': 8,
  '4': 16,
  '6': 24,
  '8': 32,
  '10': 40,
  '12': 48,
  '16': 64,
  '24': 96,
  '48': 192,
  '64': 256,
};

/* -------------------------
   Base styles (your file)
   ------------------------- */

const baseStyles: Record<string, NamedStyle> = {
  'flex-1': { flex: 1 },
  'flex-row': { flexDirection: 'row' },
  'flex-col': { flexDirection: 'column' },
  'items-center': { alignItems: 'center' },
  'items-start': { alignItems: 'flex-start' },
  'items-end': { alignItems: 'flex-end' },
  'justify-center': { justifyContent: 'center' },
  'justify-between': { justifyContent: 'space-between' },
  'justify-end': { justifyContent: 'flex-end' },
  'justify-start': { justifyContent: 'flex-start' },
  relative: { position: 'relative' },
  absolute: { position: 'absolute' },
  'inset-0': { top: 0, right: 0, bottom: 0, left: 0 },
  'bottom-0': { bottom: 0 },
  'top-0': { top: 0 },
  'left-0': { left: 0 },
  'right-0': { right: 0 },
  'w-full': { width: '100%' },
  'h-full': { height: '100%' },
  'overflow-hidden': { overflow: 'hidden' },
  rounded: { borderRadius: 8 },
  'rounded-lg': { borderRadius: 12 },
  'rounded-xl': { borderRadius: 16 },
  'rounded-full': { borderRadius: 9999 },
  shadow: {
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
    elevation: 4,
  },
  'shadow-lg': {
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 12 },
    shadowRadius: 16,
    elevation: 8,
  },
  'border-b': { borderBottomWidth: StyleSheet.hairlineWidth },
  uppercase: { textTransform: 'uppercase' },
  capitalize: { textTransform: 'capitalize' },
  'text-center': { textAlign: 'center' },
  'text-left': { textAlign: 'left' },
  'text-right': { textAlign: 'right' },
  'text-white': { color: '#ffffff' },
  'text-black': { color: '#000000' },
  'bg-white': { backgroundColor: '#ffffff' },
  'bg-white/30': { backgroundColor: 'rgba(255,255,255,0.3)' },
  'bg-black/50': { backgroundColor: 'rgba(0,0,0,0.5)' },
  'bg-gray-300': { backgroundColor: '#d1d5db' },
  'opacity-60': { opacity: 0.6 },
  'leading-6': { lineHeight: 24 },
  'text-xs': { fontSize: 12, lineHeight: 16 },
  'text-sm': { fontSize: 14, lineHeight: 20 },
  'text-base': { fontSize: 16, lineHeight: 24 },
  'text-lg': { fontSize: 18, lineHeight: 28 },
  'text-xl': { fontSize: 20, lineHeight: 28 },
  'text-2xl': { fontSize: 24, lineHeight: 32 },
  'text-3xl': { fontSize: 30, lineHeight: 36 },
  'font-medium': { fontWeight: '500' },
  'font-semibold': { fontWeight: '600' },
  'font-bold': { fontWeight: '700' },
  'gap-2': { gap: 8 },
};

/* -------------------------
   Regex patterns
   ------------------------- */

const positionRegex = /^(top|right|bottom|left)-(\d+)$/;
const sizeRegex = /^(w|h)-(\d+)$/;
const spacingRegex = /^(p|m)([trblxy]?)-(\d+(?:\.\d+)?)$/;
const negativeSpacingRegex = /^(p|m)([trblxy]?)-\[(\-?\d+)px\]$/;
const gapRegex = /^gap-(\d+(?:\.\d+)?)$/;

/* -------------------------
   Theme runtime control
   ------------------------- */

let currentTheme: 'light' | 'dark' = 'light';

/**
 * Call this from your ThemeProvider when theme changes:
 * import { setThemeMode } from 'styles/tw';
 * setThemeMode('dark');
 */
export function setThemeMode(mode: 'light' | 'dark') {
  if (mode !== 'light' && mode !== 'dark') return;
  currentTheme = mode;
}

/* -------------------------
   Helpers: spacing, size
   ------------------------- */

function getSpacing(value: string) {
  return spacingScale[value];
}

function applySpacing(type: 'padding' | 'margin', axis: string, value: number) {
  const style: Record<string, number> = {};
  if (axis === '') {
    style[type] = value;
  } else if (axis === 'x') {
    // @ts-ignore
    style[`${type}Horizontal`] = value;
  } else if (axis === 'y') {
    // @ts-ignore
    style[`${type}Vertical`] = value;
  } else if (axis === 't') {
    // @ts-ignore
    style[`${type}Top`] = value;
  } else if (axis === 'b') {
    // @ts-ignore
    style[`${type}Bottom`] = value;
  } else if (axis === 'l') {
    // @ts-ignore
    style[`${type}Left`] = value;
  } else if (axis === 'r') {
    // @ts-ignore
    style[`${type}Right`] = value;
  }
  return style;
}

function applyGap(value: number) {
  return { gap: value } as NamedStyle;
}

function applySize(dimension: 'width' | 'height', key: string) {
  const numeric = sizeScale[key];
  if (numeric == null) {
    return undefined;
  }
  return { [dimension]: numeric } as NamedStyle;
}

/* -------------------------
   Color token parsing
   Supports:
    - bg-primary / text-primary (maps to themeColors)
    - bg-white/30 (opacity)
    - text-white / bg-black etc
   ------------------------- */

function parseOpacity(token: string) {
  // token like "white/30" => { hex: '#ffffff', opacity: 0.3 }
  const parts = token.split('/');
  if (parts.length === 2) {
    const val = Number(parts[1]);
    if (!Number.isNaN(val)) {
      return { key: parts[0], alpha: val / 100 };
    }
  }
  return { key: token, alpha: 1 };
}

function resolveColorFromTheme(colorKey: string) {
  const palette = twColors[currentTheme] ?? twColors.light;
  // allow keys like 'primary', 'card', 'muted', 'accent', 'foreground', 'background'
  if ((palette as any)[colorKey]) {
    return (palette as any)[colorKey] as string;
  }
  // fallback: allow 'gray-300' name mapping to baseStyles pre-existing hexes:
  switch (colorKey) {
    case 'white':
      return '#ffffff';
    case 'black':
      return '#000000';
    case 'gray-300':
      return '#d1d5db';
    default:
      return undefined;
  }
}

function parseColorToken(token: string): NamedStyle | undefined {
  // bg-primary, text-muted, bg-white/30, text-black
  if (token.startsWith('bg-')) {
    const raw = token.slice(3); // after 'bg-'
    const { key, alpha } = parseOpacity(raw);
    const hex = resolveColorFromTheme(key) ?? resolveColorFromTheme(raw);
    if (hex) {
      if (alpha === 1) return { backgroundColor: hex } as NamedStyle;
      // convert hex to rgba:
      const rgba = hexToRgba(hex, alpha);
      return { backgroundColor: rgba } as NamedStyle;
    }
  }

  if (token.startsWith('text-')) {
    const raw = token.slice(5);
    const { key, alpha } = parseOpacity(raw);
    const hex = resolveColorFromTheme(key) ?? resolveColorFromTheme(raw);
    if (hex) {
      if (alpha === 1) return { color: hex } as NamedStyle;
      const rgba = hexToRgba(hex, alpha);
      return { color: rgba } as NamedStyle;
    }
  }

  // allow 'border-...' token
  if (token.startsWith('border-')) {
    const raw = token.slice(7);
    const { key, alpha } = parseOpacity(raw);
    const hex = resolveColorFromTheme(key) ?? resolveColorFromTheme(raw);
    if (hex) {
      if (alpha === 1) return { borderColor: hex } as NamedStyle;
      const rgba = hexToRgba(hex, alpha);
      return { borderColor: rgba } as NamedStyle;
    }
  }

  return undefined;
}

/* -------------------------
   Utility: hex to rgba
   ------------------------- */
function hexToRgba(hex: string, alpha = 1) {
  const c = hex.replace('#', '');
  const bigint = parseInt(
    c.length === 3
      ? c
          .split('')
          .map(s => s + s)
          .join('')
      : c,
    16
  );
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

/* -------------------------
   Token parser (extends your original)
   ------------------------- */

function parseToken(token: string): NamedStyle | undefined {
  if (baseStyles[token]) {
    return baseStyles[token];
  }

  // color tokens
  const color = parseColorToken(token);
  if (color) return color;

  const spacingMatch = token.match(spacingRegex);
  if (spacingMatch) {
    const [, type, axis, rawValue] = spacingMatch;
    const value = getSpacing(rawValue);
    if (value != null) {
      return applySpacing(type === 'p' ? 'padding' : 'margin', axis, value) as NamedStyle;
    }
  }

  const negativeSpacingMatch = token.match(negativeSpacingRegex);
  if (negativeSpacingMatch) {
    const [, type, axis, rawValue] = negativeSpacingMatch;
    const value = Number(rawValue);
    return applySpacing(type === 'p' ? 'padding' : 'margin', axis, value) as NamedStyle;
  }

  const gapMatch = token.match(gapRegex);
  if (gapMatch) {
    const value = getSpacing(gapMatch[1]);
    if (value != null) {
      return applyGap(value) as NamedStyle;
    }
  }

  const positionMatch = token.match(positionRegex);
  if (positionMatch) {
    const [, position, raw] = positionMatch;
    const value = getSpacing(raw) ?? Number(raw);
    if (value != null) {
      return { [position]: value } as NamedStyle;
    }
  }

  const sizeMatch = token.match(sizeRegex);
  if (sizeMatch) {
    const [, dim, raw] = sizeMatch;
    const style = applySize(dim === 'w' ? 'width' : 'height', raw);
    if (style) {
      return style as NamedStyle;
    }
  }

  switch (token) {
    case 'w-10':
      return { width: 40 };
    case 'h-10':
      return { height: 40 };
    case 'w-12':
      return { width: 48 };
    case 'h-12':
      return { height: 48 };
    case 'w-24':
      return { width: 96 };
    case 'h-24':
      return { height: 96 };
    case 'w-8':
      return { width: 32 };
    case 'h-8':
      return { height: 32 };
    case 'h-48':
      return { height: 192 };
    case 'h-64':
      return { height: 256 };
    case 'h-1':
      return { height: 4 };
    case 'mx-auto':
      return { marginLeft: 'auto', marginRight: 'auto' } as NamedStyle;
    default:
      return undefined;
  }
}

/* -------------------------
   tw / twMerge (unchanged API)
   ------------------------- */

type ClassValue = string | false | null | undefined | ClassValue[];

function flatten(input: ClassValue): string[] {
  if (!input) {
    return [];
  }
  if (Array.isArray(input)) {
    return input.flatMap(flatten);
  }
  return input
    .split(/\s+/)
    .map(token => token.trim())
    .filter(Boolean);
}

export function tw(className: ClassValue): StyleProp<NamedStyle> {
  const tokens = flatten(className);
  if (tokens.length === 0) {
    return [];
  }
  const styles: NamedStyle[] = [];
  tokens.forEach(token => {
    const style = parseToken(token);
    if (style) {
      styles.push(style);
    }
  });
  return styles;
}

export function twMerge(
  className: ClassValue,
  style?: StyleProp<NamedStyle>
): StyleProp<NamedStyle> {
  const classStyles = tw(className);
  const result: StyleProp<NamedStyle>[] = [];
  if (Array.isArray(classStyles)) {
    result.push(classStyles);
  } else if (classStyles) {
    result.push(classStyles);
  }
  if (style) {
    if (Array.isArray(style)) {
      result.push(style);
    } else {
      result.push(style);
    }
  }
  return result.flat();
}
