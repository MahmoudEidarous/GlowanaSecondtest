/**
 * Glowana Design System
 * Purple → Pink palette. Dark mode only.
 * Fonts: Fredoka (display) + Quicksand (body)
 */

// ── Colors ──────────────────────────────────────────────
export const colors = {
  // Primary spectrum
  purple: '#A855F7',
  hotpink: '#EC4899',
  fuchsia: '#C026D3',
  mediumPink: '#F472B6',
  softPink: '#F9A8D4',

  // Backgrounds & surfaces
  bg: '#0F0B1A',
  surface: '#1A1428',
  surface2: '#221A33',

  // Text
  text: '#F5EEF8',
  textMuted: '#B49CC8',
  textDim: '#7B6890',

  // Semantic
  good: '#4ADE80',
  caution: '#FB923C',
  alert: '#F87171',
  info: '#67E8F9',

  // Borders & glows
  border: 'rgba(168,85,247,0.12)',
  borderPink: 'rgba(236,72,153,0.12)',
  glow: 'rgba(236,72,153,0.35)',
  glowPurple: 'rgba(168,85,247,0.3)',

  // Utility
  white: '#FFFFFF',
  transparent: 'transparent',
} as const;

// ── Gradients ───────────────────────────────────────────
// expo-linear-gradient colors arrays
export const gradients = {
  primary: {
    colors: ['#A855F7', '#EC4899'] as const,
    start: { x: 0, y: 0 },
    end: { x: 1, y: 1 },
  },
  button: {
    colors: ['#C026D3', '#EC4899'] as const,
    start: { x: 0, y: 0 },
    end: { x: 1, y: 1 },
  },
  wide: {
    colors: ['#A855F7', '#D946EF', '#EC4899'] as const,
    start: { x: 0, y: 0 },
    end: { x: 1, y: 1 },
  },
  soft: {
    colors: ['#A855F7', '#F472B6', '#F9A8D4'] as const,
    start: { x: 0, y: 0 },
    end: { x: 1, y: 1 },
  },
  scoreRing: {
    colors: ['#A855F7', '#D946EF', '#EC4899'] as const,
    start: { x: 0, y: 0 },
    end: { x: 1, y: 1 },
  },
} as const;

// ── Typography ──────────────────────────────────────────
export const fontFamilies = {
  // Display — Fredoka (bubbly, rounded, friendly)
  display: {
    light: 'Fredoka_300Light',
    regular: 'Fredoka_400Regular',
    medium: 'Fredoka_500Medium',
    semibold: 'Fredoka_600SemiBold',
    bold: 'Fredoka_700Bold',
  },
  // Body — Quicksand (clean, geometric, rounded)
  body: {
    light: 'Quicksand_300Light',
    regular: 'Quicksand_400Regular',
    medium: 'Quicksand_500Medium',
    semibold: 'Quicksand_600SemiBold',
    bold: 'Quicksand_700Bold',
  },
} as const;

export const typography = {
  // Display styles (Fredoka)
  heroTitle: {
    fontFamily: fontFamilies.display.semibold,
    fontSize: 42,
    lineHeight: 48,
    color: colors.text,
  },
  sectionTitle: {
    fontFamily: fontFamilies.display.semibold,
    fontSize: 32,
    lineHeight: 38,
    color: colors.text,
  },
  cardTitle: {
    fontFamily: fontFamilies.display.semibold,
    fontSize: 17,
    lineHeight: 22,
    color: colors.text,
  },
  buttonLabel: {
    fontFamily: fontFamilies.display.semibold,
    fontSize: 15,
    lineHeight: 20,
    color: colors.white,
  },
  scoreXL: {
    fontFamily: fontFamilies.display.semibold,
    fontSize: 64,
    lineHeight: 70,
    color: colors.white,
  },
  scoreLG: {
    fontFamily: fontFamilies.display.semibold,
    fontSize: 36,
    lineHeight: 40,
    color: colors.white,
  },
  label: {
    fontFamily: fontFamilies.display.bold,
    fontSize: 11,
    lineHeight: 14,
    letterSpacing: 2,
    textTransform: 'uppercase' as const,
    color: colors.textDim,
  },
  tagText: {
    fontFamily: fontFamilies.display.bold,
    fontSize: 11,
    lineHeight: 14,
    color: colors.white,
  },

  // Body styles (Quicksand)
  body: {
    fontFamily: fontFamilies.body.medium,
    fontSize: 15,
    lineHeight: 22,
    color: colors.text,
  },
  bodySmall: {
    fontFamily: fontFamilies.body.medium,
    fontSize: 13,
    lineHeight: 18,
    color: colors.textMuted,
  },
  caption: {
    fontFamily: fontFamilies.body.semibold,
    fontSize: 11,
    lineHeight: 14,
    color: colors.textMuted,
  },
  sectionSub: {
    fontFamily: fontFamilies.body.medium,
    fontSize: 15,
    lineHeight: 24,
    color: colors.textMuted,
  },
} as const;

// ── Spacing ─────────────────────────────────────────────
export const spacing = {
  xs: 4,
  sm: 8,
  md: 14,
  lg: 20,
  xl: 28,
  '2xl': 36,
  '3xl': 44,
  '4xl': 60,
  '5xl': 80,
} as const;

// ── Border Radii ────────────────────────────────────────
export const radii = {
  sm: 8,
  md: 14,
  lg: 18,
  xl: 22,
  '2xl': 30,
  '3xl': 34,
  pill: 100,
} as const;

// ── Shadows ─────────────────────────────────────────────
export const shadows = {
  glow: {
    shadowColor: '#EC4899',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.35,
    shadowRadius: 20,
    elevation: 8,
  },
  glowPurple: {
    shadowColor: '#A855F7',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 8,
  },
  card: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 4,
  },
} as const;

// ── Animation ───────────────────────────────────────────
export const animation = {
  float: {
    duration: 4000,
    translateY: -8,
  },
  pulseGlow: {
    duration: 3000,
  },
  springConfig: {
    damping: 15,
    stiffness: 150,
    mass: 1,
  },
} as const;
