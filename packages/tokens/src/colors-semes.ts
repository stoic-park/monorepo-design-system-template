/**
 * SEMES Color Tokens
 * Based on semes-front application color scheme
 */

export const colorsSemes = {
  // ===== White & Black =====
  white: '#FFFFFF',
  black: '#172554', // Primary base (어두운 네이비)

  // ===== Gray Scale (기존 Slate 유지) =====
  gray: {
    50: '#F8FAFC', // sub-separator
    100: '#F1F5F9',
    200: '#E2E8F0',
    300: '#CBD5E1', // sub-line
    400: '#94A3B8', // sub-point
    500: '#64748B',
    600: '#475569', // sub-word
    700: '#334155',
    800: '#1E293B',
    900: '#0F172A',
    950: '#020617',
  },

  // ===== Primary (SEMES Brand Color) =====
  primary: {
    DEFAULT: '#172554', // rgb(23, 37, 84) - 네이비 블루
    50: '#DBEAFE', // 매우 밝은
    100: '#BFDBFE',
    200: '#93C5FD',
    300: '#60A5FA',
    400: '#3B82F6', // point - rgb(59, 130, 246)
    500: '#172554', // base - 메인 브랜드 컬러
    600: '#1E40AF', // title - rgb(30, 64, 175)
    700: '#1D4ED8',
    800: '#1E3A8A',
    900: '#172554', // base
    foreground: '#FFFFFF',
  },

  // ===== Background =====
  background: {
    DEFAULT: '#FFFFFF',
    subtle: '#FAFAFA',
    muted: '#F8FAFC', // sub-separator
    elevated: '#FFFFFF',
  },

  // ===== Foreground (Text) =====
  foreground: {
    DEFAULT: '#172554', // primary-base
    muted: '#64748B', // slate-500
    subtle: '#94A3B8', // sub-point
  },

  // ===== Text =====
  text: {
    primary: '#172554', // primary-base
    secondary: '#475569', // sub-word
    disabled: '#94A3B8', // sub-point
    inverse: '#FFFFFF',
  },

  // ===== Border =====
  border: {
    DEFAULT: '#CBD5E1', // sub-line
    light: '#F1F5F9',
    muted: '#F1F5F9',
    dark: '#CBD5E1',
    strong: '#94A3B8', // sub-point
  },

  // ===== Accent (Point Color) =====
  accent: {
    DEFAULT: '#3B82F6', // primary-point
    hover: '#60A5FA',
    active: '#2563EB',
    foreground: '#FFFFFF',
  },

  // ===== Secondary =====
  secondary: {
    DEFAULT: '#F8FAFC', // sub-separator
    hover: '#E2E8F0',
    active: '#CBD5E1',
    foreground: '#172554',
  },

  // ===== Muted =====
  muted: {
    DEFAULT: '#F8FAFC', // sub-separator
    foreground: '#64748B',
  },

  // ===== Destructive (Alert) =====
  destructive: {
    DEFAULT: '#DC2626', // alert-base - rgb(220, 38, 38)
    hover: '#B91C1C',
    light: '#FCA5A5', // alert-line - rgb(252, 165, 165)
    foreground: '#FFFFFF',
  },

  // ===== Status Colors =====
  status: {
    success: {
      DEFAULT: '#10B981', // Emerald-500
      light: '#D1FAE5',
      foreground: '#065F46',
    },
    warning: {
      DEFAULT: '#F59E0B', // Amber-500
      light: '#FEF3C7',
      foreground: '#92400E',
    },
    error: {
      DEFAULT: '#DC2626', // alert-base
      light: '#FCA5A5', // alert-line
      foreground: '#991B1B',
    },
    info: {
      DEFAULT: '#3B82F6', // primary-point
      light: '#DBEAFE', // primary-select
      foreground: '#1E40AF', // primary-title
    },
  },

  // ===== Chart Colors =====
  chart: {
    // Status colors
    success: {
      DEFAULT: '#10B981',
      light: '#D1FAE5',
      dark: '#065F46',
    },
    error: {
      DEFAULT: '#DC2626', // alert-base
      light: '#FCA5A5', // alert-line
      dark: '#991B1B',
    },
    warning: {
      DEFAULT: '#F59E0B',
      light: '#FEF3C7',
      dark: '#92400E',
    },
    info: {
      DEFAULT: '#3B82F6', // primary-point
      light: '#DBEAFE',
      dark: '#1E40AF', // primary-title
    },
    running: {
      DEFAULT: '#0EA5E9',
      light: '#E0F2FE',
      dark: '#075985',
    },

    // Data series colors (SEMES 테마)
    series: [
      '#172554', // Primary base (네이비)
      '#3B82F6', // Primary point (브라이트 블루)
      '#1E40AF', // Primary title (미디엄 블루)
      '#64748B', // Slate-500
      '#10B981', // Emerald-500 (Success)
      '#94A3B8', // Sub-point
      '#F59E0B', // Amber-500 (Warning)
      '#475569', // Sub-word
      '#DC2626', // Alert-base (Error)
      '#CBD5E1', // Sub-line
    ],

    // Special states
    defect: '#DC2626', // alert-base
    normal: '#10B981',
    abort: '#F59E0B',
    idle: '#E2E8F0',

    // Calendar heatmap
    heatmap: {
      none: '#F1F5F9',
      success: '#10B981',
      fail: '#DC2626',
      mixed: '#F59E0B',
    },

    // Background colors
    background: {
      band: '#F8FAFC', // sub-separator
      grid: '#FFFFFF',
      highlight: '#DBEAFE', // primary-select
    },
  },

  // ===== Select (선택 상태) =====
  select: {
    DEFAULT: '#DBEAFE', // primary-select
    hover: '#BFDBFE',
    active: '#93C5FD',
  },
} as const;

export type ColorsSemes = typeof colorsSemes;
