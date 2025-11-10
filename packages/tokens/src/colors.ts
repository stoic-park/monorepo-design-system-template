/**
 * Design System Color Tokens
 * Based on shadcn/ui and Tailwind CSS color system
 * https://ui.shadcn.com/colors
 */

export const colors = {
  // Pure colors
  white: '#FFFFFF',
  black: '#000000',

  // Neutral colors (Slate - primary choice for shadcn/ui)
  slate: {
    50: '#F8FAFC',
    100: '#F1F5F9',
    200: '#E2E8F0',
    300: '#CBD5E1',
    400: '#94A3B8',
    500: '#64748B',
    600: '#475569',
    700: '#334155',
    800: '#1E293B',
    900: '#0F172A',
    950: '#020617',
  },

  // Alternative neutral colors
  gray: {
    50: '#F9FAFB',
    100: '#F3F4F6',
    200: '#E5E7EB',
    300: '#D1D5DB',
    400: '#9CA3AF',
    500: '#6B7280',
    600: '#4B5563',
    700: '#374151',
    800: '#1F2937',
    900: '#111827',
    950: '#030712',
  },

  zinc: {
    50: '#FAFAFA',
    100: '#F4F4F5',
    200: '#E4E4E7',
    300: '#D4D4D8',
    400: '#A1A1AA',
    500: '#71717A',
    600: '#52525B',
    700: '#3F3F46',
    800: '#27272A',
    900: '#18181B',
    950: '#09090B',
  },

  // Semantic status colors
  red: {
    50: '#FEF2F2',
    100: '#FEE2E2',
    200: '#FECACA',
    300: '#FCA5A5',
    400: '#F87171',
    500: '#EF4444',
    600: '#DC2626',
    700: '#B91C1C',
    800: '#991B1B',
    900: '#7F1D1D',
    950: '#450A0A',
  },

  green: {
    50: '#F0FDF4',
    100: '#DCFCE7',
    200: '#BBF7D0',
    300: '#86EFAC',
    400: '#4ADE80',
    500: '#22C55E',
    600: '#16A34A',
    700: '#15803D',
    800: '#166534',
    900: '#14532D',
    950: '#052E16',
  },

  amber: {
    50: '#FFFBEB',
    100: '#FEF3C7',
    200: '#FDE68A',
    300: '#FCD34D',
    400: '#FBBF24',
    500: '#F59E0B',
    600: '#D97706',
    700: '#B45309',
    800: '#92400E',
    900: '#78350F',
    950: '#451A03',
  },

  blue: {
    50: '#EFF6FF',
    100: '#DBEAFE',
    200: '#BFDBFE',
    300: '#93C5FD',
    400: '#60A5FA',
    500: '#3B82F6',
    600: '#2563EB',
    700: '#1D4ED8',
    800: '#1E40AF',
    900: '#1E3A8A',
    950: '#172554',
  },

  // Additional useful colors
  emerald: {
    50: '#ECFDF5',
    100: '#D1FAE5',
    200: '#A7F3D0',
    300: '#6EE7B7',
    400: '#34D399',
    500: '#10B981',
    600: '#059669',
    700: '#047857',
    800: '#065F46',
    900: '#064E3B',
    950: '#022C22',
  },

  orange: {
    50: '#FFF7ED',
    100: '#FFEDD5',
    200: '#FED7AA',
    300: '#FDBA74',
    400: '#FB923C',
    500: '#F97316',
    600: '#EA580C',
    700: '#C2410C',
    800: '#9A3412',
    900: '#7C2D12',
    950: '#431407',
  },

  // Semantic aliases (shadcn/ui style)
  primary: {
    DEFAULT: '#0F172A', // slate-900
    foreground: '#FFFFFF',
  },

  secondary: {
    DEFAULT: '#F1F5F9', // slate-100
    foreground: '#0F172A', // slate-900
  },

  muted: {
    DEFAULT: '#F8FAFC', // slate-50
    foreground: '#64748B', // slate-500
  },

  accent: {
    DEFAULT: '#F8FAFC', // slate-50
    foreground: '#0F172A', // slate-900
  },

  destructive: {
    DEFAULT: '#EF4444', // red-500
    foreground: '#FFFFFF',
  },

  border: '#E2E8F0', // slate-200
  input: '#E2E8F0', // slate-200
  ring: '#94A3B8', // slate-400

  background: '#FFFFFF',
  foreground: '#0F172A', // slate-900

  // Semantic status colors (for alerts, badges, etc)
  success: {
    DEFAULT: '#10B981', // emerald-500
    light: '#D1FAE5', // emerald-100
    dark: '#047857', // emerald-700
    foreground: '#FFFFFF',
  },

  error: {
    DEFAULT: '#EF4444', // red-500
    light: '#FEE2E2', // red-100
    dark: '#B91C1C', // red-700
    foreground: '#FFFFFF',
  },

  warning: {
    DEFAULT: '#F59E0B', // amber-500
    light: '#FEF3C7', // amber-100
    dark: '#B45309', // amber-700
    foreground: '#000000',
  },

  info: {
    DEFAULT: '#3B82F6', // blue-500
    light: '#DBEAFE', // blue-100
    dark: '#1D4ED8', // blue-700
    foreground: '#FFFFFF',
  },

  // Chart colors for data visualization
  chart: {
    1: '#0F172A', // slate-900
    2: '#3B82F6', // blue-500
    3: '#10B981', // emerald-500
    4: '#F59E0B', // amber-500
    5: '#EF4444', // red-500
    6: '#8B5CF6', // violet-500
    7: '#EC4899', // pink-500
    8: '#06B6D4', // cyan-500
    9: '#F97316', // orange-500
    10: '#14B8A6', // teal-500
  },
} as const;

export type Colors = typeof colors;
