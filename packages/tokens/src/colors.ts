/**
 * DBDS Color System
 * Minimal Black & White grayscale palette
 */

export const colors = {
  // Pure grayscale
  white: '#FFFFFF',
  black: '#000000',

  // Gray scale (50-950)
  gray: {
    50: '#FAFAFA',
    100: '#F5F5F5',
    200: '#E5E5E5',
    300: '#D4D4D4',
    400: '#A3A3A3',
    500: '#737373',
    600: '#525252',
    700: '#404040',
    800: '#262626',
    900: '#171717',
    950: '#0A0A0A',
  },

  // Semantic colors (grayscale based)
  primary: {
    DEFAULT: '#000000',
    hover: '#262626',
    active: '#404040',
  },

  secondary: {
    DEFAULT: '#737373',
    hover: '#525252',
    active: '#404040',
  },

  border: {
    DEFAULT: '#E5E5E5',
    dark: '#D4D4D4',
    light: '#F5F5F5',
  },

  background: {
    DEFAULT: '#FFFFFF',
    alt: '#FAFAFA',
    dark: '#F5F5F5',
  },

  text: {
    primary: '#000000',
    secondary: '#525252',
    disabled: '#A3A3A3',
    inverse: '#FFFFFF',
  },

  // Chart-specific semantic colors
  // Minimal accent colors for data visualization
  chart: {
    // Status colors
    success: {
      DEFAULT: '#22c55e', // Modern green
      light: '#86efac',
      dark: '#16a34a',
    },
    error: {
      DEFAULT: '#ef4444', // Modern red
      light: '#fca5a5',
      dark: '#dc2626',
    },
    warning: {
      DEFAULT: '#f59e0b', // Modern amber
      light: '#fcd34d',
      dark: '#d97706',
    },
    info: {
      DEFAULT: '#3b82f6', // Modern blue
      light: '#93c5fd',
      dark: '#2563eb',
    },
    running: {
      DEFAULT: '#06b6d4', // Cyan for active states
      light: '#67e8f9',
      dark: '#0891b2',
    },

    // Data series colors (for multiple lines/bars)
    // Grayscale-first approach with strategic accent colors
    series: [
      '#000000', // Pure black
      '#525252', // Dark gray
      '#3b82f6', // Blue accent
      '#737373', // Medium gray
      '#22c55e', // Green accent
      '#a3a3a3', // Light gray
      '#f59e0b', // Amber accent
      '#262626', // Very dark gray
      '#ef4444', // Red accent
      '#d4d4d4', // Very light gray
    ],

    // Special states for manufacturing/process charts
    defect: '#ef4444', // Same as error
    normal: '#22c55e', // Same as success
    abort: '#f59e0b', // Same as warning
    idle: '#d4d4d4', // Light gray

    // Calendar heatmap specific
    heatmap: {
      none: '#e5e5e5', // No data
      success: '#22c55e', // Success only
      fail: '#ef4444', // Fail only
      mixed: '#f59e0b', // Both success and fail
    },

    // Background colors for chart elements
    background: {
      band: '#f5f5f5', // Area bands
      grid: '#fafafa', // Grid background
      highlight: '#e5e5e5', // Highlighted areas
    },
  },
} as const;

export type Colors = typeof colors;
